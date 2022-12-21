import { calc, Center, Heading } from "@chakra-ui/react";
import React from "react";
import Router from "next/router";
import Head from "next/head";
import { Button, FormControl, Flex, Input, Stack, useColorModeValue, HStack, Spinner, useToast } from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { DarkModeSwitch } from "../../components/DarkModeSwitch";
import { useCookies } from "react-cookie";

export default function TwoFactor(): JSX.Element {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [cookie, setCookie] = useCookies(["session"]);

  if (cookie.session !== undefined) Router.push("/generate", undefined, { shallow: true });
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Head>
        <title>Useless App</title>
      </Head>
      <Stack spacing={4} w={"full"} maxW={"sm"} bg={useColorModeValue("white", "gray.700")} rounded={"xl"} boxShadow={"lg"} p={6} my={10}>
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }} textAlign={"center"}>
            Verify Your 2FA Code
          </Heading>
        </Center>

        {/* <Center fontSize={{ base: "sm", sm: "md" }} color={useColorModeValue("gray.800", "gray.400")}>
          We have sent code to your email
        </Center>
        <Center fontSize={{ base: "sm", sm: "md" }} fontWeight="bold" color={useColorModeValue("gray.800", "gray.400")}>
          username@mail.com
        </Center> */}
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
      .then(res => res.json())
      .then(data => {
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
            Router.push("/generate", undefined, { shallow: true });
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
