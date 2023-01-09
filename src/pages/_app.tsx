import { ChakraProvider } from "@chakra-ui/react";

import { CookiesProvider } from "react-cookie";
import theme from "../theme";
import { AppProps } from "next/app";
import Router from "next/router";
import * as React from "react";
import NProgress from "nprogress";
import "../css/nprogress.css";

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </ChakraProvider>
  );
}

export default MyApp;
