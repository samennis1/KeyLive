import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react'
import type { AppProps } from "next/app";
import { api } from "../utils/api";

import "../styles/globals.css";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)
  const layout = getLayout(<Component {...pageProps}/>)

  return <SessionProvider session={session as Session}>{layout}</SessionProvider>;
};

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export default api.withTRPC(MyApp);
