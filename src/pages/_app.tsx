import ThemeProvider from '@/contexts/ThemeProvider'
import '@/styles/globals.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'

// for layout with typeScript 
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

// for layout with typeScript 
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)

  // warp all everything inside ThemeProvider
  return <ThemeProvider initialTheme='dark'>
    {
      getLayout(
        <Component {...pageProps} />
      )
    }
  </ThemeProvider>
}
