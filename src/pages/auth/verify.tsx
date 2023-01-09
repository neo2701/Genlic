import {
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  HStack,
  PinInput,
  PinInputField,
  Spinner,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import Router from "next/router";
import React from "react";
import { useCookies } from "react-cookie";
import { DarkModeSwitch } from "../../components/DarkModeSwitch";

export async function getServerSideProps(context) {
  const session = context.req.cookies.session;
  var redirect = context.query.redirect;

  if (redirect === undefined) {
    redirect = "/generate";
  } else {
    redirect = decodeURIComponent(redirect);
  }

  return {
    props: {
      redirect: redirect,
    },
  };
}

export default function TwoFactor(props): JSX.Element {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [cookie, setCookie] = useCookies(["session"]);

  var redirect = props.redirect;
  if (cookie.session !== undefined)
    Router.push(redirect, undefined, { shallow: true });

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Head>
        <title>Useless App</title>
      </Head>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"sm"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={10}
      >
        <Center>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "2xl", md: "3xl" }}
            textAlign={"center"}
          >
            Verify Your 2FA Code
          </Heading>
        </Center>

        <form onSubmit={formHandler} onChange={formChange}>
          <FormControl marginTop={4}>
            <Center>
              <HStack>
                <PinInput>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <span></span>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
            </Center>
          </FormControl>

          <Stack spacing={6} marginTop={5}>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
              id="submitbtn"
            >
              {isSubmitting ? <Spinner /> : "Verify"}
            </Button>
          </Stack>
        </form>
      </Stack>
      <DarkModeSwitch />
    </Flex>
  );
  async function formHandler(event) {
    event.preventDefault();
    var code = "";
    var allcodes = document.querySelectorAll("input");
    for (var i = 0; i < allcodes.length; i++) {
      code += allcodes[i].value;
    }
    setIsSubmitting(true);
    fetch("/api/auth?code=" + code, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsSubmitting(false);
        if (data.error) {
          toast({
            title: "Error",
            description: data.error + "! Please try again",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Success",
            description: "You will be redirected in a second!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setTimeout(() => {
            setCookie("session", data.sessionid, { path: "/", maxAge: 600 });
            Router.push(redirect, undefined, { shallow: true });
          }, 2000);
        }
      });
  }

  function formChange(event) {
    var code = "";
    var allcodes = document.querySelectorAll("input");
    for (var i = 0; i < allcodes.length; i++) {
      code += allcodes[i].value;
    }
    if (code.length == 6) {
      formHandler(event);
    }
  }
}
