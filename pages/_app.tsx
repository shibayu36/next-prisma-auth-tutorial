import { Provider } from "next-auth/client";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}
