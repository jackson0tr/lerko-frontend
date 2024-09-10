import Image from 'next/image';
import React, { FC } from 'react';
import avatarDefault from '../../../public/imgs/user.png';
import {RiLockPasswordLine} from 'react-icons/ri';
import {SiCoursera} from 'react-icons/si';
import { AiOutlineLogout } from 'react-icons/ai';
import {MdOutlineAdminPanelSettings} from 'react-icons/md';
import Link from 'next/link';

type Props={
    user:any;
    active:number;
    avatar:string | null;
    setActive: (active:number)=> void;
    logoutHandler:any;
}

const SidebarProfile:FC<Props> = ({user,active,avatar,setActive,logoutHandler}) => {
    const locale = 'ar';
    return(
        <div className="w-full">
            <div 
            onClick={()=> setActive(1)}
            className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1 ? " bg-white dark:bg-slate-800" : "bg-transparent"}`}>
                <Image width={20} height={20} className='w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full '
                src={user.avatar || avatar ? user.avatar.url || avatar : avatarDefault} alt='profile' />
                <h5 className='pr-2 800px:block hidden font-Poppins dark:text-[#fff] text-[#333]'>حسابي</h5>
            </div>
            <div onClick={()=>setActive(2)}
            className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`}>
                <RiLockPasswordLine className='dark:text-[#fff] text-[#333]' size={20} />
                <h5 className='pr-2 800px:block hidden font-Poppins dark:text-[#fff] text-[#333]'>تغيير كلمة المرور</h5>
            </div>
            <div onClick={()=>setActive(3)}
            className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`}>
                <SiCoursera className='dark:text-[#fff] text-[#333]' size={20} />
                <h5 className='pr-2 800px:block hidden font-Poppins dark:text-[#fff] text-[#333]'>الدورات المسجلة</h5>
            </div>
            {
                user.role === "admin" &&(
                    <Link href={`/${locale}/admin`}>
                        <div onClick={()=>setActive(4)}
                        className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`}>
                            <MdOutlineAdminPanelSettings className='dark:text-[#fff] text-[#333]' size={20} />
                            <h5 className='pr-2 800px:block hidden font-Poppins dark:text-[#fff] text-[#333]'>لوحة تحكم المشرف</h5>
                        </div>
                    </Link>
                )
            }
            <div onClick={()=> logoutHandler()}
            className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 5 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`}>
                <AiOutlineLogout className='dark:text-[#fff] text-[#333]' size={20} />
                <h5 className='pr-2 800px:block hidden font-Poppins dark:text-[#fff] text-[#333]'>تسجيل خروج</h5>
            </div>
        </div>
    )
}

export default SidebarProfile;