import { Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Main } from "../components/Main";

const Index = () => (
  <Container height="100vh">
    <Hero title="Nothing Here!" />
    <Main></Main>

    <DarkModeSwitch />
    <Footer>
      <Stack textAlign={"center"} spacing={1}>
        <Text>Restricted Access!</Text>
        <Link href="/generate">------------</Link>
      </Stack>
    </Footer>
  </Container>
);

export default Index;
