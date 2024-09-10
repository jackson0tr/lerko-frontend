'use client'
import { Providers } from '@/app/Provider';
import Heading from '@/app/utils/Heading';
import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';
import ResetPassword from '@/app/components/Auth/ResetPassword';

interface ResetPassProps {
    params: {
        locale: string;
    }
}



const page = ({params: {locale}} : Readonly<ResetPassProps>) => {
   
    return (
        <div>
            <NextIntlClientProvider locale={locale}>
            <Providers>
                <SessionProvider>
                    <div className='min-h-screen'>
                        <Heading
                            title='ليركو'
                            description="اعادة تعين كلمة المرور"
                            keywords="التسويق، تحسين محركات البحث، تحليل البيانات، علوم البيانات، البرمجة، الذكاء الاصطناعي ..." />
                        <ResetPassword/>
                    </div>
                </SessionProvider>
            </Providers>
        </NextIntlClientProvider>
        </div>
    )
}

export default page