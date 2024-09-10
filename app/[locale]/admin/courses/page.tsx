'use client'
import AdminSidebar from '@/app/components/Admin/AdminSidebar';
import AllCourses from '@/app/components/Admin/Course/AllCourses';
import Dashboard from '@/app/components/Admin/Dashboard';
import AdminProtected from '@/app/hooks/adminProtected';
import Heading from '@/app/utils/Heading';
import React from 'react';

type Props={

}

const page = () => {
    return(
        <div>
            <AdminProtected>
                <Heading 
                title={`لوحة تحكم المشرف`} 
                description="لوحة الأسئلة الشائعة" 
                keywords="لوحة الادارة" />
                <div className="flex h-screen">
                    <div className="1500px:w-[16%] w-1/5">
                        <AdminSidebar/>
                    </div>
                    <div className="w-[85%]">
                        <Dashboard/>
                        <AllCourses/>
                    </div>
                </div>
            </AdminProtected>
        </div>
    )
}

export default page;