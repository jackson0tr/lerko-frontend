'use client';
import { Providers } from '@/app/Provider';
import CourseContentPaid from '@/app/components/Course/CourseContentPaid';
import Loader from '@/app/components/Loader/Loader';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';
import { redirect } from 'next/navigation';
import React, { FC, useEffect } from 'react';

type Props = {
    params: {
        locale: string;
        id:string;
    }
}

const Page: FC<Props> = ({params: {locale, id}}) => {
    // const id = params.id;
    const { isLoading, error, data } = useLoadUserQuery(undefined, {});

    useEffect(() => {
        if (data) {
            const isPurchased = data.user.courses.find((item: any) => item._id === id);
            if (!isPurchased) {
                redirect('/');
            }
            if (error) {
                redirect('/')
            }
        }
    }, [data, error]);

    return (
        <NextIntlClientProvider locale={locale}>
            <Providers>
                <SessionProvider>
                    <>
                        {
                            isLoading ? (
                                <Loader />
                            ) : (
                                <div>
                                    <CourseContentPaid id={id} user={data.user} />
                                </div>
                            )
                        }
                    </>
                </SessionProvider>
            </Providers>
        </NextIntlClientProvider>
    )
}

export default Page;