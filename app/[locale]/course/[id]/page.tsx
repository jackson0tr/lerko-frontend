'use client'
import React, { FC } from 'react';
import CourseDetailPage from '@/app/components/Course/CourseDetailPage';
import { NextIntlClientProvider } from 'next-intl';
import { Providers } from '@/app/Provider';
import { SessionProvider } from 'next-auth/react';

type Props = {
    params: {
        locale: string;
        id:string;
    }
}

const page:FC<Props> = ( {params:{ locale, id } } ) => {
    return (
        <NextIntlClientProvider locale={locale}>
            <Providers>
                <SessionProvider>
                    <div>
                        <CourseDetailPage id={id} />
                    </div>
                </SessionProvider>
            </Providers>
        </NextIntlClientProvider>
    )
}

export default page;