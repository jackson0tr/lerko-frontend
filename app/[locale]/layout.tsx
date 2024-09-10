'use client'
import './globals.css';
import {Poppins} from 'next/font/google';
import {Josefin_Sans} from 'next/font/google';
import { ThemeProvider } from '../utils/theme';
import { Toaster } from 'react-hot-toast';
import { Providers } from '../Provider';
import { SessionProvider } from 'next-auth/react';
import Loader from '../components/Loader/Loader';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { FC, useEffect } from 'react';
import socketIO from "socket.io-client";
import { NextIntlClientProvider } from 'next-intl';
const ENDPOINT = process.env.PUBLIC_SOCKET_SERVER || "";
const socketId = socketIO(ENDPOINT, {transports: ["websocket"]});

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  }
}



const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400","500","600","700"],
  variable: "--font-Poppins"
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400","500","600","700"],
  variable: "--font-Josefin"
});

const Custom:React.FC<{children: React.ReactNode}> = ({children}) => {
  const {isLoading} = useLoadUserQuery({});

  useEffect(()=>{
    socketId.on("connection", ()=>{})
  },[])

  

  return (
    <>
      {
        isLoading ? <Loader/> : <>{children}</>
      }
    </>
  )
}


export default function RootLayout({
  children,
  params: {locale}
} : Readonly<RootLayoutProps>){

  return(
    <html dir={ locale === 'ar' ? 'rtl' : 'ltr'} lang={locale} suppressHydrationWarning={true}>
      <NextIntlClientProvider locale={locale}>
      <body className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}>
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem >
             <Custom>
                {children}
              </Custom>
              <Toaster position='top-center' reverseOrder={false}/>
            </ThemeProvider >
          </SessionProvider>
        </Providers>
      </body>
      </NextIntlClientProvider>
    </html>
  )
}