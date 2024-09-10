'use client'
import React from "react";
import Dashboard from "@/app/components/Admin/Dashboard";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import AdminSidebar from "@/app/components/Admin/AdminSidebar";
import UserAnalytics from "@/app/components/Admin/Analytics/UserAnalytics";

type Props={

}

const page = () => {
    return(
        <div>
            <AdminProtected>
                <Heading 
                    title={`لوحة تحكم المشرف`} 
                    description="لوحة تحكم ليركو" 
                    keywords="لوحة إدارة تحليلات المستخدم" />
                    <div className="flex h-screen">
                        <div className="1500px:[w-16%] w-1/5">
                            <AdminSidebar/>
                        </div>
                        <div className="w-[85%]">
                            <Dashboard/>
                            <UserAnalytics/>
                        </div>
                    </div>
            </AdminProtected>
        </div>
    )
}

export default page;