import { checkSession } from "@/helpers/db";
import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Progress,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import Router from "next/router";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import io from "socket.io-client";
import { DarkModeSwitch } from "../../components/DarkModeSwitch";
let socket;
export async function getServerSideProps(context) {
  const session = context.req.cookies.session;
  if (session == undefined) {
    return {
      redirect: {
        destination: "/auth/verify",
        permanent: false,
      },
    };
  }

  if (await checkSession(session)) {
    return {
      props: {},
    };
  } else {
    context.res.setHeader("Set-Cookie", "session=rnd; Max-Age=0");

    return {
      redirect: {
        destination: "/auth/verify",
        permanent: false,
      },
    };
  }
}

export default function Generate(): JSX.Element {
  useEffect(() => {
    socketInitializer();
  }, []);
  const [ProgressBar, setProgressBar] = React.useState(false);
  const [AuthStatus, setAuthStatus] = React.useState(0);
  const [generateBtn, setGenerateBtn] = React.useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(["session"]);

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Head>
        <title>Useless App</title>
      </Head>
      <DarkModeSwitch />
      <Stack
        spacing={4}
        w={"full"}
        maxW={"sm"}
        bg={useColorModeValue("white", "gray.500")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={15}
      >
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Get Your License
          </Heading>
        </Center>
        <Image
          src={useColorModeValue(
            "/assets/img/vMix-Logo-Black.png",
            "/assets/img/vMix-Logo-White.png"
          )}
          alt="VMix Logo"
        />
        <Stack spacing={3}>
          <Text id="statusText" textAlign={"center"}></Text>
          {ProgressBar ? <Progress size="sm" isIndeterminate /> : null}
          <Text id="info"></Text>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={getLicense}
            display={generateBtn ? "block" : "none"}
          >
            Generate
          </Button>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={() => {
              Router.push("/", undefined, { shallow: true });
            }}
          >
            Return
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );

  async function ClearCookies() {
    removeCookie("session");
    Router.reload();
  }

  async function updateStatusText(text) {
    document.getElementById("statusText").innerHTML = text;
  }

  async function updateInfoText(text) {
    document.getElementById("info").innerHTML = text;
  }

  async function socketInitializer() {
    
    // socket = io("https://VmixTrial.neo2701.repl.co");
    // socket = io("https://neo2701-curly-goldfish-x5rv6v5xv6j36q79-5000.preview.app.github.dev/");
    socket = io("https://genlic-backend-production.up.railway.app/");
    // socket = io("http://localhost:5000");
    updateStatusText("Connecting to server");
    setProgressBar(true);

    socket.on("connect", () => {
      console.log("Connected to server");
      updateStatusText("Connected to server");
      setGenerateBtn(false);
      setProgressBar(true);
      updateStatusText("Authenticating");
      socket.emit("auth", cookie.session, (response) => {
        setAuthStatus(0);
        if (response) {
          updateStatusText("Authenticated");
          setGenerateBtn(true);
          setAuthStatus(1);
          setProgressBar(false);
        } else {
          updateStatusText("Authentication failed, Refreshing page");
          setTimeout(() => {
            Router.reload();
          }, 1000);
        }
      });
    });
    socket.on('connect_error', () => {
     
      // setTimeout(() => {
      //   Router.reload();
      // }, 5000);
    })
    socket.on("disconnect", () => {
      setAuthStatus(0);
      updateStatusText("Disconnected from server");
    });
  }
  async function getLicense() {
    setProgressBar(true);
    socket.emit("generate", (response) => {
      updateStatusText(response);
      setGenerateBtn(false);
    });

    socket.on("message", (data) => {
      if (!data.completed) {
        updateStatusText(data.message);
      } else {
        updateStatusText(data.message);
        setProgressBar(false);
      }
      if (data.error) {
        updateStatusText(data.message);
        setProgressBar(false);
        setGenerateBtn(true);
      }
    });

    socket.on("license", (license) => {
      updateInfoText(`
      License: ${license.license}<br>
      Expiration Date: ${license.data.expiry_date}<br>
      Created At : ${license.data.created_at}<br>
      `);
      setProgressBar(false);
    });
  }
}
