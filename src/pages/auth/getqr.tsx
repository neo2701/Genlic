import { DarkModeSwitch } from "@/components/DarkModeSwitch";
import { checkSession, getAuthenticatorKey } from "@/helpers/db";
import {
  Button,
  Card,
  CardBody,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import authenticator from "authenticator";
import { useQRCode } from "next-qrcode";
import Router from "next/router";

export async function getServerSideProps(context) {
  const session = context.req.cookies.session;

  if (!(await checkSession(session))) {
    return {
      redirect: {
        destination: "/auth/verify?redirect=" + "/auth/getqr",

        permanent: false,
      },
    };
  } else {
    var key = await getAuthenticatorKey();
    var uri = authenticator.generateTotpUri(
      key,
      " Key",
      "Vmix Gen ",
      "SHA1",
      6,
      30
    );

    return {
      props: {
        uri: uri,
      },
    };
  }
}

export default function GetQR(props) {
  const { Canvas } = useQRCode();
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <DarkModeSwitch />
      <Card>
        <CardBody alignItems={"center"}>
          <Stack
            spacing={3}
            w={"full"}
            maxW={"sm"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            textAlign={"center"}
            alignItems={"center"}
          >
            <Canvas text={props.uri} />
            <Text>Scan this code On Authenticator App</Text>
            <Button
              onClick={() => {
                return Router.push("/", undefined, { shallow: true });
              }}
            >
              Return
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </Flex>
  );
}
