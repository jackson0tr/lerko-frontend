'use client'
import { useGetHomeDataQuery } from '@/redux/features/layout/layoutApi';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useState } from 'react'
import { BiSearch } from 'react-icons/bi';
import Loader from '../Loader/Loader';
import { useRouter } from 'next/navigation';
import HomeImg from '../../../public/imgs/home.jpg';
import { useTranslations } from 'next-intl';
import { useCourseSearchQuery } from '@/redux/features/courses/coursesApi';

type Props = {

}

const Home: FC<Props> = (props) => {
    const { data, refetch, isLoading } = useGetHomeDataQuery("Banner", {});
    const [search,setSearch] = useState('');
    const router = useRouter();
    const t = useTranslations();
    const locale = 'ar';

    const handleSearch = () => {
        if(search === ''){
            return;
        }else{
            router.push(`/${locale}/courses?title=${search}`);
        }
    }

    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <section className=" container flex  flex-col lg:flex-row px-5 pt-[50px] lg:pt-[130px] pb-[50px]  mx-auto">
                        <div className="mt-10 lg:w-1/2  ">
                            <div className="flex flex-col items-center text-center mt-[20px]">
                                <h2 className='dark:text-white text-[#000000c7] text-[30px] px-3 w-full  font-[600] fonst-Josefin py-2 1000pxd:leading-[75px] '>
                                    {/* Improve your Online learning experience better instantly */}
                                    {data?.layout?.banner?.title}
                                </h2>
                                <br />
                                <p className='dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px]'>
                                    {/* We have 2k+ online courses & 140k+ online registerd student. Find your desired courses from them.  */}
                                    {data?.layout?.banner?.subTitle}
                                </p>
                                <br />
                                <br />
                                <div className=" w-[90%] h-[50px] bg-transparent relative">
                                    <input type="search" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='البحث في الدورات'
                                        className='bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[crimson] placeholder:text-[#46e256] placeholder:pr-[50px] rounded-[5px] !pr-[50px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin' />
                                    <div onClick={handleSearch} className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]">
                                        <BiSearch className='text-white' size={30} />
                                    </div>
                                </div>
                                <br />
                                <br />
                                <div className=" w-[90%] flex items-center">
                                    <Image src={require("../../../public/imgs/client-1.png")} alt='client-img' className='rounded-full w-[50px] h-[50px]' />
                                    <Image src={require("../../../public/imgs/client-2.png")} alt='client-img' className='rounded-full w-[50px] h-[50px] mr-[-20px]' />
                                    <Image src={require("../../../public/imgs/client-3.png")} alt='client-img' className='rounded-full w-[50px] h-[50px] mr-[-20px]' />
                                    <p className='font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:px-3 text-[18px] font-[600]'>
                                        {t("140k+ شخص واثقون بنا")} {" "}
                                        <Link href={`/${locale}/courses`} passHref className='dark:text-[#46e256] text-[crimson]'>
                                            {t("مشاهدة الكورسات")}
                                        </Link>{" "}
                                    </p>
                                </div>
                                <br />
                            </div>
                        </div>
                        <div className='ml-4 items-center p-2'>
                            <Image
                                src={data?.layout?.banner?.image?.url}
                                // src={HomeImg}
                                width={400}
                                height={400}
                                alt="home-img"
                                className=' lg:w-[500px] rounded-[25%] lg:h-[500px] hero_animation w-[250px] h-[250px] object-fit' />
                        </div>
                    </section>
                )
            }
        </>
    )
}

export default Home;