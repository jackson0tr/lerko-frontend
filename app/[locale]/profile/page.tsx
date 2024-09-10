'use client'
import React, { FC, useState } from 'react';
import Protected from '../../hooks/useProtected';
import Heading from '../../utils/Heading';
import Header from '../../components/Header';
import Profile from '../../components/Profile/Profile';
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import { NextIntlClientProvider } from 'next-intl';
import { Providers } from '@/app/Provider';
import { SessionProvider } from 'next-auth/react';

type Props = {
    // user: any;
    params: {
        locale: string;
    }
}

const Page: FC<Props> = ({ params: { locale } }) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(5);
    const [route, setRoute] = useState("Login");
    const { user } = useSelector((state: any) => state.auth);

    return (
        <NextIntlClientProvider locale={locale}>
            <Providers>
                <SessionProvider>
                    <div className='min-h-screen'>
                        <Protected>
                            <Heading
                                title={`${user?.name} حساب تعريفي`}
                                description="ليركو هي عبارة عن منصة للطلاب للتعلم والحصول على المساعدة من المعلمين"
                                keywords="حسابي، ملفي الشخصي، صفحتي" />

                            <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route} />

                            <Profile user={user} />
                            <Footer />
                        </Protected>
                    </div>
                </SessionProvider>
            </Providers>
        </NextIntlClientProvider>
    )
}

export default Page;