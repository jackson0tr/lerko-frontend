'use client';
import React, { useState } from 'react';
import Heading from '../../utils/Heading';
import Header from '../../components/Header';
import Policy from './Policy';
import Footer from '../../components/Footer';
import { NextIntlClientProvider } from 'next-intl';
import { Providers } from '@/app/Provider';
import { SessionProvider } from 'next-auth/react';


interface PolicyProps {
    params: {
        locale: string;
    }
}

const Page = ({ params: { locale } }: Readonly<PolicyProps>) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(3);
    const [route, setRoute] = useState("Login");
    return (
        <NextIntlClientProvider locale={locale}>
            <Providers>
                <SessionProvider>
                    <div>
                        <Heading
                            title='ليركو'
                            description="سياسة الخصوصية"
                            keywords="التسويق، تحسين محركات البحث، تحليل البيانات، علوم البيانات، البرمجة، الذكاء الاصطناعي ..." />
                        <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route} />
                        <Policy />
                        <Footer />
                    </div>
                </SessionProvider>
            </Providers>
        </NextIntlClientProvider>
    )
}

export default Page;