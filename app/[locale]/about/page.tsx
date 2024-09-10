'use client';
import React, { useState } from 'react';
import Heading from '../../utils/Heading';
import Header from '../../components/Header';
import About from './About';
import Footer from '../../components/Footer';
import { NextIntlClientProvider } from 'next-intl';
import { Providers } from '../../Provider';
import { SessionProvider } from 'next-auth/react';

interface AboutProps {
    params: {
      locale: string;
    }
  }

const Page = ({ params: {locale}} : Readonly<AboutProps>) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(2);
    const [route, setRoute] = useState("Login");
    return (
        <NextIntlClientProvider locale={locale}>
            <Providers>
                <SessionProvider>
                    <div>
                        <Heading
                            title='ليركو '
                            description="عنا - ليركو"
                            keywords="التسويق، تحسين محركات البحث، تحليل البيانات، علوم البيانات، البرمجة، الذكاء الاصطناعي ..." />
                        <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route} />
                        <About />
                        <Footer />
                    </div>
                </SessionProvider>
            </Providers>
        </NextIntlClientProvider>
    )
}

export default Page;