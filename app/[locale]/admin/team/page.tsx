'use client'
import AdminSidebar from '@/app/components/Admin/AdminSidebar';
import Dashboard from '@/app/components/Admin/Dashboard';
import AllUsers from '@/app/components/Admin/User/AllUsers';
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
                description="لوحة تحكم ليركو" 
                keywords="لوحة فريق الإدارة" />
                <div className="flex h-screen">
                    <div className="1500px:w-[16%] w-1/5">
                        <AdminSidebar/>
                    </div>
                    <div className="w-[85%]">
                        <Dashboard/>
                        <AllUsers isTeam={true}/>
                    </div>
                </div>
            </AdminProtected>
        </div>
    )
}

export default page;