import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";

type Props={
    item:any;
    isProfile?:boolean;
    // index?:number;
    user?:any;
}

const CourseCard:FC<Props> = ({item,isProfile}) => {
    const locale = 'ar';
    return(
        <Link href={!isProfile ? `/${locale}/course/${item._id}` : `${locale}/course-access/${item._id}`} >
            <div className="w-full min-h-[35vh] dark:bg-slate-500 dark:opacity-60 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner">
                <Image width={500} height={300} objectFit="content" className="rounded w-full" src={item.thumbnail?.url} alt='thumbnail' />
                <br />
                <h1 className='font-Poppins text-[16px] text-[#333] dark:text-[#fff]'>
                    {item.name}
                </h1>
                <div className="w-full flex items-center justify-between pt-2">
                    <Ratings rating={item.ratings} />
                    <h5 className={`text-[#333] dark:text-[#fff] ${isProfile && 'hidden 800px:inline'}`}>
                        {item.purchased} طلاب
                    </h5>
                </div>
                <div className="w-full flex items-center justify-between pt-3">
                    <div className="flex">
                        <h3 className="text-[#333] dark:text-[#fff]">
                            {item.price === 0 ? 'Free' : item.price + 'EGP'}
                        </h3>
                        <h5 className="px-3 text-[14px] mt-[-5px] line-through opacity-80 text-[#333] dark:text-[#fff] ">
                            {item.estimatedPrice}{' '}EGP
                        </h5>
                    </div>
                    <div className="flex items-center pb-3">
                        <AiOutlineUnorderedList size={20} className="text-[#333] dark:text-[#fff]"/> 
                        <h5 className="px-2 text-[#333] dark:text-[#fff] ">
                            {item.courseData?.length} محاضرات
                        </h5> 
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CourseCard; 