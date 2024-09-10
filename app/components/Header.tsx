'use client'
import Link from 'next/link';
import React,{FC,useEffect,useState} from 'react'
import NavItems from '../utils/NavItems'
import {ThemeSwitcher} from '../utils/ThemeSwitcher'
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { HiOutlineUserCircle } from 'react-icons/hi2';
import CustomModel from '../utils/CustomModel';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Verifiy from './Auth/Verifiy';
// import { useSelector } from 'react-redux';
import Image from 'next/image';
import avatar from '../../public/imgs/user.png';
import { SessionProvider, useSession } from 'next-auth/react';
import { useLogoutQuery, useSocialAuthMutation } from '@/redux/features/auth/authApi';
import { toast } from 'react-hot-toast';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import LocalSwithcer from './LocalSwithcer';
import { useTranslations } from 'next-intl';
import { useTranslation } from 'react-i18next';

type Props={
    open:boolean;
    setOpen:(open:boolean) => void;
    activeItem:number;
    route:string;
    setRoute:(route:string)=>void;
    
}

const Header:FC<Props> = ({activeItem,setOpen,route,open,setRoute})=>{
    const [active,setActive] = useState(false);
    // const {user} = useSelector((state:any)=>state.auth);
    const {data} = useSession();
    const {data:userData,refetch,isLoading} = useLoadUserQuery(undefined,{refetchOnMountOrArgChange:true});
    const [socialAuth,{isSuccess,error}] = useSocialAuthMutation();
    const [openSidebar,setOpenSidebar] = useState(false);
    const [logout,setLogout] = useState(false);
    

    const {} = useLogoutQuery(undefined,{
        skip: !logout ? true : false
    });

    const locale = 'ar';

    useEffect(()=>{
        if(!isLoading){
            if(!userData){
                if(data){
                    socialAuth({email:data?.user?.email,name:data?.user?.name,avatar:data?.user?.image});
                    refetch();
                }
            }
            if(data === null){
                if(isSuccess){
                    toast.success("Login Successfully");
                }
            }
            // if(data === null && !isLoading && !userData){
            //     setLogout(true);
            // }
        }
    },[data,isLoading,userData]);

    // useEffect(()=>{
    //     if(!user){
    //         if(data){
    //             socialAuth({email:data?.user?.email,name:data?.user?.name,avatar:data?.user?.image})
    //         }
    //     }
    //     if(data === null){
    //         if(isSuccess){
    //             toast.success("Login Successfully");
    //         }
    //     }
    //     if(data === null){
    //         setLogout(true);
    //     }
    // },[data,user]);

    if(typeof window !== "undefined"){
        window.addEventListener("scroll", ()=>{
            if(window.scrollY > 85){
                setActive(true);
            }else{
                setActive(false);
            }
        });
    }

    const handleClose = (e:any) =>{
        if(e.target.id === "screen"){
            {
                setOpenSidebar(false);
            }
        }
    }

    const {t} = useTranslation();

    return(
        <div className="w-full container relative">
            <div className={`${active} ? "dark:bg-opacity-50 bg-[#fff] dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500" : "w-full bg-[#fff] border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow "`}>
                <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
                    <div className="w-full h-[80px] flex items-center justify-between p-3">
                        <div>
                            <Link href={"/"}
                            className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}>
                                {t('ليركو')}
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <NavItems
                            activeItem={activeItem} 
                            isMobile={false}/>
                            {/* <LocalSwithcer/> */}
                            <ThemeSwitcher/>
                            <div className="800px:hidden">
                                <HiOutlineMenuAlt3 
                                size={25} 
                                className='cursor-pointer dark:text-white text-black'
                                onClick={()=> setOpenSidebar(true)}/>
                            </div>
                            {
                                userData ? (
                                    <Link href={`/${locale}/profile`}>
                                        <Image 
                                        width={30}
                                        height={30}
                                        style={{border: activeItem === 5 ? "2px solid #23bd70" : "none"}}
                                        src={userData?.user.avatar ? userData.user.avatar.url : avatar} 
                                        className='hidden 800px:block w-[30px] h-[30px] rounded-full cursor-pointer' 
                                        alt='profile'/>
                                    </Link>
                                ):(
                                    <HiOutlineUserCircle 
                                    onClick={()=>setOpen(true)}
                                    size={25} 
                                    className='hidden 800px:block cursor-pointer dark:text-white text-black' 
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
                {
                    openSidebar && (
                        <div className="w-full fixed h-screen top-0 right-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
                        onClick={handleClose} id='screen'>
                            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
                                <NavItems 
                                activeItem={activeItem} 
                                isMobile={true}/>
                                {
                                    userData ? (
                                        <Link href={`/${locale}/profile`} passHref>
                                            <Image 
                                            width={30}
                                            height={30}
                                            style={{border: activeItem === 5 ? "2px solid #23bd70" : "none"}}
                                            src={userData?.user.avatar ? userData.user.avatar.url : avatar} 
                                            className='block !mr-5 my-2 w-[30px] h-[30px] rounded-full cursor-pointer' 
                                            alt='profile'/>
                                        </Link>
                                    ):(
                                        <HiOutlineUserCircle 
                                        onClick={()=>setOpen(true)}
                                        size={25} 
                                        className='cursor-pointer !mr-5 my-2 dark:text-white text-black' 
                                        />
                                    )
                                }
                                <br />
                                <br />
                                <p className='text-[16px] px-2 pr-5 text-black dark:text-white'>
                                &copy; {t("2024 ليركو. جميع الحقوق محفوظة. صنع بواسطة")}
                                <a className="border-b border-[crimson] dark:border-[#23bd70] border-solid dark:text-[#23bd70] text-[crimson]" href="https://my-portfolio0tr.vercel.app">
                                    {t("محمود محمد")}
                                    </a>
                                </p>
                            </div>
                        </div>
                    ) 
                }
            </div>
            {
                route === "Login" && (
                    <>
                        {
                            open && (
                                <CustomModel 
                                open={open} 
                                setOpen={setOpen} 
                                setRoute={setRoute} 
                                activeItem={activeItem} 
                                component={Login}
                                refetch={refetch}/>
                            )
                        }
                    </>
                )
            }
            {
                route === "SignUp" && (
                    <>
                        {
                            open && (
                                <CustomModel 
                                open={open} 
                                setOpen={setOpen} 
                                setRoute={setRoute} 
                                activeItem={activeItem} 
                                component={SignUp}/>
                            )
                        }
                    </>
                )
            }
            {
                route === "Verifiy" && (
                    <>
                        {
                            open && (
                                <CustomModel 
                                open={open} 
                                setOpen={setOpen} 
                                setRoute={setRoute} 
                                activeItem={activeItem} 
                                component={Verifiy}/>
                            )
                        }
                    </>
                )
            }
            
        </div>
    )
}

export default Header;

