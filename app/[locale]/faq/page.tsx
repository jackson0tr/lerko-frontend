'use client';
import React, { useState } from 'react';
import Heading from '../../utils/Heading';
import Header from '../../components/Header';
import FAQ from '../../components/FAQ';
import Footer from '../../components/Footer';
import { NextIntlClientProvider } from 'next-intl';
import { Providers } from '@/app/Provider';
import { SessionProvider } from 'next-auth/react';

interface FaqProps {
    params: {
        locale: string;
    }
}

const Page = ({ params: { locale } }: Readonly<FaqProps>) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(4);
    const [route, setRoute] = useState("Login");
    return (
        <NextIntlClientProvider locale={locale}>
            <Providers>
                <SessionProvider>
                    <div className='min-h-screen'>
                        <Heading
                            title='ليركو'
                            description="التعليمات"
                            keywords="التسويق، تحسين محركات البحث، تحليل البيانات، علوم البيانات، البرمجة، الذكاء الاصطناعي ..." />
                        <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route} />
                        <br />
                        <FAQ />
                        <Footer />
                    </div>
                </SessionProvider>
            </Providers>
        </NextIntlClientProvider>
    )
}

export default Page;