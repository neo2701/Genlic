import { ChakraProvider } from "@chakra-ui/react";

import { CookiesProvider } from "react-cookie";
import theme from "../theme";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </ChakraProvider>
  );
}

export default MyApp;
