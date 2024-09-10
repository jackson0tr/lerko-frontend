import React, { FC, useEffect, useState } from 'react';
import {ProSidebar, Menu, MenuItem} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {
    HomeOutlinedIcon,
    ArrowForwardIosIcon,
    ArrowBackIosIcon,
    PeopleOutlinedIcon,
    ReceiptOutlinedIcon,
    BarChartOutlinedIcon,
    MapOutlinedIcon,
    GroupsIcon,
    OndemandVideoIcon,
    VideoCallIcon,
    QuizIcon,
    WebIcon,
    WysiwygIcon,
    ManageHistoryIcon,
    ExitToAppIcon
} from './Icon'
import Image from 'next/image';
import avatarDefault from '../../../public/imgs/user.png';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Box, IconButton, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';


interface itemProps{
    title:string;
    to:string;
    icon:JSX.Element;
    selected:string;
    setSelected:any;
}

const Item:FC<itemProps> = ({title,to,icon,selected,setSelected}) =>{
    return(
        <MenuItem active={selected === title} onClick={()=>setSelected(title)} icon={icon}>
            <Typography className='!text-[16px] !font-Poppins'>
                {title}
            </Typography>
            <Link href={to} />
        </MenuItem>
    )
}

type Props={

}

const AdminSidebar:FC<Props> = () => {
    const {user} = useSelector((state:any)=>state.auth);
    const [isCollapsed,setIsCollapsed] = useState(false);
    const [logout,setLogout] = useState(false);
    const [selected,setSelected] = useState("Dashboard");
    const [mounted,setMounted] = useState(false);
    const {theme,setTheme} = useTheme();
    const t = useTranslations();
    const locale = 'ar';

    useEffect(()=>setMounted(true),[]);

    if(!mounted){
        return null;
    }

    const logoutHandler = () =>{
        setLogout(true);
    }

    return(
        <Box className='!bg-white dark:bg-[#111C43]' sx={{
            "& .pro-sidebar-inner": {
                background: `${
                    theme === "dark" ? "#111C43 !important" : "#fff !important" 
                }`,
            },
            "& .pro-icon-wrapper": {
                backgroundColor: "transparent !important"
            },
            "& .pro-inner-item:hover": {
                color: "#23bd70 !important"
            },
            "& .pro-menu-item.active": {
                color: "#23bd70 !important"
            },
            "& .pro-inner-item": {
                padding: "5px 35px 5px 20px !important",
                opacity: 1
            },
            "& .pro-menu-item": {
                color: `${theme !== "dark" && "#000"}`
            },
        }}>
            <ProSidebar collapsed={isCollapsed} style={{
                position: "fixed",
                top: "0",
                height: "100vh",
                width: isCollapsed ? "0%" : "16%"
            }}>
                <Menu iconShape='square'>
                    <MenuItem onClick={()=>setIsCollapsed(!isCollapsed)} icon={isCollapsed ? <ArrowForwardIosIcon/>: undefined} style={{
                        margin: "10px 0  20px 0"
                    }}>
                        {
                            !isCollapsed && (
                                <Box display="flex" justifyContent="space-between" alignItems="center" mr="15px">
                                    <Link href="/">
                                        <h3 className='text-[25px] font-Poppins uppercase dark:text-[#fff] text-[#333]' >
                                            ليركو
                                        </h3>
                                    </Link>
                                    <IconButton onClick={()=>setIsCollapsed(!isCollapsed)} className='inline-block'>
                                        <ArrowBackIosIcon className='text-[#333] dark:text-[#ffffffc1]'/>
                                    </IconButton>
                                </Box>
                            )
                        }
                    </MenuItem>
                    {
                        !isCollapsed && (
                            <Box mb='25px'>
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    {/* <Link href={`/${locale}/profile`}> */}
                                    <Image src={user.avatar ? user.avatar.url : avatarDefault} alt='profile' width={100} height={100} style={{
                                        cursor: "pointer",
                                        borderRadius: "50%",
                                        border: "3px solid #23bd70"
                                    }} />
                                    {/* </Link> */}
                                </Box>
                                <Box textAlign="center">
                                    <Typography variant='h4' sx={{m:"10px 0 0 0"}} className='!text-[20px] text-[#333] dark:text-[#ffffffc1]' >
                                        {user?.name}
                                    </Typography>
                                    <Typography variant='h6' sx={{m:"10px 0 0 0"}} className='!text-[20px] text-[#333] dark:text-[#ffffffc1] capitalize '>
                                        - {user?.role}
                                    </Typography>
                                </Box>
                            </Box>
                        )
                    }

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item title={t("لوحة القيادة")} to={`/${locale}/admin`} icon={<HomeOutlinedIcon/>} selected={selected} setSelected={setSelected}/>

                        <Typography variant='h5' sx={{m:'15px 0 5px 25px'}} className='!text-[18px] text-[#333] dark:text-[#ffffffc1] capitalize !font-[400] ' >
                            {isCollapsed && `${t("بيانات")}`}
                        </Typography>

                        <Item title={t("المستخدمين")} to={`/${locale}/admin/users`} icon={<GroupsIcon/>} selected={selected} setSelected={setSelected} />

                        <Item title={t("الفواتير")} to={`/${locale}/admin/invoices`} icon={<ReceiptOutlinedIcon/>} selected={selected} setSelected={setSelected} />

                        <Typography variant='h5' sx={{m:'15px 0 5px 20px'}} className='!text-[18px] text-[#333] dark:text-[#ffffffc1] capitalize !font-[400] ' >
                            {isCollapsed && `${t("محتوى")}`}
                        </Typography>

                        <Item title={t("إنشاء دورة")} to={`/${locale}/admin/create-course`} icon={<VideoCallIcon/>} selected={selected} setSelected={setSelected} />

                        <Item title={t("الدورات الحية")} to={`/${locale}/admin/courses`} icon={<OndemandVideoIcon/>} selected={selected} setSelected={setSelected} />

                        <Typography variant='h5' sx={{m:'15px 0 5px 20px'}} className='!text-[18px] text-[#333] dark:text-[#ffffffc1] capitalize !font-[400] ' >
                            {isCollapsed && `${t("التخصيص")}`}
                        </Typography>

                        <Item title={t("الرئيسية")} to={`/${locale}/admin/home`} icon={<WebIcon/>} selected={selected} setSelected={setSelected} />

                        <Item title={t("التعليمات")} to={`/${locale}/admin/faq`} icon={<QuizIcon/>} selected={selected} setSelected={setSelected} />

                        <Item title={t("فئات")} to={`/${locale}/admin/categories`} icon={<WysiwygIcon/>} selected={selected} setSelected={setSelected} />

                        <Typography variant='h5' sx={{m:'15px 0 5px 20px'}} className='!text-[18px] text-[#333] dark:text-[#ffffffc1] capitalize !font-[400] ' >
                            {isCollapsed && `${t("وحدات التحكم")}`}
                        </Typography>

                        <Item title={t("إدارة الفريق")} to={`/${locale}/admin/team`} icon={<PeopleOutlinedIcon/>} selected={selected} setSelected={setSelected} />

                        <Typography variant='h6' sx={{m:'15px 0 5px 20px'}} className='!text-[18px] text-[#333] dark:text-[#ffffffc1] capitalize !font-[400] ' >
                            {isCollapsed && `${t("التحليلات")}`}
                        </Typography>

                        <Item title={t("تحليلات الدورات")} to={`/${locale}/admin/courses-analytics`} icon={<BarChartOutlinedIcon/>} selected={selected} setSelected={setSelected} />

                        <Item title={t("تحليلات الطلبات")} to={`/${locale}/admin/order-analytics`} icon={<MapOutlinedIcon/>} selected={selected} setSelected={setSelected} />

                        <Item title={t("تحليلات المستخدم")} to={`/${locale}/admin/user-analytics`} icon={<ManageHistoryIcon/>} selected={selected} setSelected={setSelected} />

                        <Typography variant='h6' sx={{m:'15px 0 5px 20px'}} className='!text-[18px] text-[#333] dark:text-[#ffffffc1] capitalize !font-[400] ' >
                            {isCollapsed && `${t("آخر")}`}
                        </Typography>

                        <div onClick={logoutHandler}>
                            <Item title={t("تسجيل خروج")} to='/' icon={<ExitToAppIcon/>} selected={selected} setSelected={setSelected} />
                        </div>

                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    )
}

export default AdminSidebar;