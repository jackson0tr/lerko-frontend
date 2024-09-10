'use client'
import React from 'react';
import AdminSidebar from '@/app/components/Admin/AdminSidebar';
import Heading from '@/app/utils/Heading';
import EditCourse from '@/app/components/Admin/Course/EditCourse';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';


type Props={
    
} 



const page = ({params}:any) => {
    const id = params?.id;
    return(
        <div>
            <Heading title={`لوحة تحكم الدورة`} 
                description="لوحة تحكم دورة الإدارة ليركو" 
                keywords="لوحة تعديل الدورة"/>
            <div className="flex">
                <div className="1500px:w-[16%] w-1/5">
                    <AdminSidebar/>
                </div>
                <div className="w-[85%]">
                    <DashboardHeader/>
                    <EditCourse id={id} />
                </div>
            </div>
        </div>
    )
}

export default page;