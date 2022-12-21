import { AnalyticsWrapper } from "@/components/analytics";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "../theme";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />

        <script src="/assets/js/relicbrowser.js"></script>
        <link type="image/png" sizes="16x16" rel="icon" href="/assets/img/favicon/icons8-box-important-glyph-neue-16.png"></link>
        <link type="image/png" sizes="32x32" rel="icon" href="/assets/img/favicon/icons8-box-important-glyph-neue-32.png"></link>
        <link type="image/png" sizes="96x96" rel="icon" href="/assets/img/favicon/icons8-box-important-glyph-neue-96.png"></link>

        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
          <AnalyticsWrapper />
        </body>
      </Html>
    );
  }
}
