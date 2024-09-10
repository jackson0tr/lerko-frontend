'use client';
import { useGetUserAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import { useGetHomeDataQuery } from '@/redux/features/layout/layoutApi';
import { useSearchParams } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader';
import Header from '../../components/Header';
import Heading from '../../utils/Heading';
import { style } from '../../style/style';
import CourseCard from '../../components/Course/CourseCard';
import Footer from '../../components/Footer';
import { NextIntlClientProvider } from 'next-intl';
import { Providers } from '@/app/Provider';
import { SessionProvider } from 'next-auth/react';

type Props = {
    params: {
        locale: string;
    }
}

const Page: FC<Props> = ({ params: { locale } }) => {
    const searchParams = useSearchParams();
    const search = searchParams?.get('title');
    const { data, isLoading } = useGetUserAllCoursesQuery(undefined, {});
    const { data: categoriesData, isLoading: categoriesIsLoading } = useGetHomeDataQuery("Categories", {});
    const [route, setRoute] = useState('Login');
    const [open, setOpen] = useState(false);
    const [courses, setCourses] = useState([]);
    const [category, setCategory] = useState("All");

    useEffect(() => {
        if (category === "All") {
            setCourses(data?.courses);
        }
        if (category !== "All") {
            setCourses(data?.courses.filter((item: any) => item.categories === category));
        }
        if (search) {
            setCourses(data?.courses.filter((item: any) => item.name.toLowerCase().includes(search.toLocaleLowerCase())))
        }
    }, [category, search, data]);

    const categories = categoriesData?.layout.categories;

    return (
        <NextIntlClientProvider locale={locale}>
            <Providers>
                <SessionProvider>
                    <div>
                        {
                            isLoading ? (
                                <Loader />
                            ) : (
                                <>
                                    <Header route={route} setRoute={setRoute} open={open} setOpen={setOpen} activeItem={1} />
                                    <div className="w-[95%] 800px:w-[85%] !mt-[60px] m-auto min-h-[70vh] ">
                                        <Heading
                                            title='جميع الدورات - ليركو'
                                            description="صفحة دورات ليركو"
                                            keywords="التسويق، تحسين محركات البحث، تحليل البيانات، علوم البيانات، البرمجة، الذكاء الاصطناعي ..." />
                                        <br />
                                        <div className="w-full flex items-center flex-wrap">
                                            <div
                                                onClick={() => setCategory("All")}
                                                className={`${category === "All" ? "bg-[#46e256] text-[#fff]" : "dark:bg-[#fff] dark:text-[#333] bg-[#3333] text-[#fff]"} h-[35px] m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer `}>
                                                الجميع
                                            </div>
                                            {
                                                categories && categories.map((item: any, index: number) => (
                                                    <div key={index}>
                                                        <div
                                                            onClick={() => setCategory(item.title)}
                                                            className={`${category === item.title ? "bg-[#46e256] text-[#fff]" : "dark:bg-[#fff] dark:text-[#333] bg-[#3333] text-[#fff]"} h-[35px] m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer `}>
                                                            {item.title}
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        {
                                            courses && courses.length === 0 && (
                                                <p className={`${style.label} justify-center min-h-[50vh] flex items-center`}>
                                                    {search ? "لا يوجد كورسات!" : "لايوجد كورسات في هذه الفئة. يرجي تحربة فئة أخري!!"}
                                                </p>
                                            )
                                        }
                                        <br />
                                        <br />
                                        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-[15px] ">
                                            {
                                                courses && courses.map((item: any, index: number) => (
                                                    <CourseCard item={item} key={index} />
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <Footer />
                                </>
                            )
                        }
                    </div>
                </SessionProvider>
            </Providers>
        </NextIntlClientProvider>
    )
}

export default Page;
