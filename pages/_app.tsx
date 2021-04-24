import { Provider } from "next-auth/client";
import type { AppProps } from "next/app";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  );
}
