'use client'
import React, { FC } from 'react';
import AdminSidebar from '@/app/components/Admin/AdminSidebar';
import Heading from '@/app/utils/Heading';
import CreateCourse from '@/app/components/Admin/Course/CreateCourse';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';


type Props={
   
} 

const page:FC<Props> = () => {
    return(
        <div>
            <Heading title={`Course Dashboard`} 
                description="لوحة تحكم دورة الإدارة ليركو" 
                keywords="لوحة إنشاء الدورة"/>
            <div className="flex">
                <div className="1500px:w-[16%] w-1/5">
                    <AdminSidebar/>
                </div>
                <div className="w-[85%]">
                    <DashboardHeader />
                    <CreateCourse/>
                </div>
            </div>
        </div>
    )
}

export default page;