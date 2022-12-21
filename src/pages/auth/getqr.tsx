import TwoFactor from "./verify";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Center, Heading, HStack, PinInput, PinInputField, Spinner } from "@chakra-ui/react";
import { Button, FormControl, Flex, Input, Stack, useColorModeValue, Image, Card, CardBody, Text } from "@chakra-ui/react";
import Head from "next/head";
import Router from "next/router";
import { useQRCode } from "next-qrcode";
import { getAuthenticatorKey, checkSession } from "@/helpers/db";
import authenticator from "authenticator";

export async function getServerSideProps(context) {
  const session = context.req.cookies.session;
  //   var check = await checkSession(session);
  //   console.log(check);
  if (!(await checkSession(session))) {
    return {
      redirect: {
        destination: "/auth/verify?redirect=" + "/auth/getqr",

        permanent: false,
      },
    };
  } else {
    var key = await getAuthenticatorKey();
    var uri = authenticator.generateTotpUri(key, " Key", "Vmix Gen ", "SHA1", 6, 30);

    // console.log(uri);
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
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
      {/* <Image src={"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + props.uri} /> */}
      <Card>
        <CardBody alignItems={"center"}>
          <Stack spacing={3} w={"full"} maxW={"sm"} bg={useColorModeValue("white", "gray.700")} rounded={"xl"} boxShadow={"lg"} p={6} textAlign={"center"} alignItems={"center"}>
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
