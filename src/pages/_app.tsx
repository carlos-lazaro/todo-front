import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import "../app/globals.css";
import { AppProps } from "next/app";
import Header from "@/components/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CSSReset />
      <Header />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
