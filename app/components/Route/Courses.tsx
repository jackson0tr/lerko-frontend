import { useGetUserAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import CourseCard from '../Course/CourseCard'
import { useTranslations } from "next-intl";

type Props={

}

const Courses = () => {

    const {data,isLoading,refetch} = useGetUserAllCoursesQuery({}, {refetchOnMountOrArgChange: true});
    const [courses,setCourses] = useState<any[]>([]);
    const t = useTranslations();

    useEffect(()=>{
        setCourses(data?.courses);
    },[data]);

    return(
        <div className="w-[90%] 800px:w-[80%] m-auto ">
            <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-[#fff] 800px:!leading-[60px] text-[#333] font-[700] tracking-tight">
                {t("وسع حياتك المهنية")} {' '}
                <span className="text-gradient">{t("احجز")}</span> <br />
                {t("فرصتك مع كورساتنا")}
            </h1>
            <br />
            <br />
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
                {
                    courses && courses.map((item:any,index:number)=>(
                        <CourseCard item={item} key={index} />
                    ))
                }
            </div>
        </div>
    )
}

export default Courses;


