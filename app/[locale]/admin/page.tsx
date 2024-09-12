'use client';
import React, { FC } from 'react';
import Heading from '@/app/utils/Heading';
import AdminSidebar from '@/app/components/Admin/AdminSidebar';
import AdminProtected from '@/app/hooks/adminProtected';
import Dashboard from '@/app/components/Admin/Dashboard';
import { NextIntlClientProvider } from 'next-intl';
import { Providers } from '@/app/Provider';
import { SessionProvider } from 'next-auth/react';

type Props = {
    params: {
        locale: string;
    }
}

const Page: FC<Props> = ({ params: {locale}}) => {
    return (
        <NextIntlClientProvider locale={locale}>
            <Providers>
                <SessionProvider>
                    <div>
                        <AdminProtected>
                            <Heading
                                title={`لوحة تحكم المشرف`}
                                description="لوحة تحكم ليركو"
                                keywords="لوحة الادارة" />
                            <div className="flex h-[200vh]">
                                <div className="1500px:w-[16%] w-1/5">
                                    <AdminSidebar />
                                </div>
                                <div className="w-[85%]">
                                    <Dashboard isDashboard={true} />
                                </div>
                            </div>
                        </AdminProtected>
                    </div>
                </SessionProvider>
            </Providers>
        </NextIntlClientProvider>

    )
}

export default Page;