import React, { FC, useEffect, useState } from 'react';
import { ThemeSwitcher } from '@/app/utils/ThemeSwitcher';
import { IoMdNotificationsOutline } from 'react-icons/io';
import socketIO from "socket.io-client";
import { useGetAllNotificationsQuery, useUpdateNotificationsMutation } from '@/redux/features/notifications/notificationsApi';
import { format } from 'timeago.js';
import LocalSwithcer from '../LocalSwithcer';
import { useTranslations } from 'next-intl';
const ENDPOINT = process.env.PUBLIC_SOCKET_SERVER || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
    open?: boolean;
    setOpen?: any;
}

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
    const { data, refetch } = useGetAllNotificationsQuery(undefined, { refetchOnMountOrArgChange: true });
    const [updateNotifications, { isSuccess }] = useUpdateNotificationsMutation();
    const [notifications, setNotifications] = useState<any>([]);
    const [audio] = useState(new Audio(
        "https://res.cloudinary.com/damk25wo5/video/upload/v1693465789/notification_vcetjn.mp3"
    ));
    const playerNotificationSound = () => {
        audio.play();
    }
    const t = useTranslations()

    useEffect(() => {
        if (data) {
            setNotifications(data.notifications.filter((item: any) => item.status === "غير مقرؤ"));
        }
        if (isSuccess) {
            refetch();
        }
        audio.load();
    }, [data, isSuccess]);

    useEffect(() => {
        socketId.on("newNotification", (data) => {
            refetch();
            playerNotificationSound();
        })
    }, []);


    const handleNotificationChanged = async (id: string) => {
        await updateNotifications(id);
    }

    return (
        <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0">
            <ThemeSwitcher />
            {/* <LocalSwithcer/> */}
            <div className="relative cursor-pointer m-2" onClick={() => setOpen(!open)}>
                <IoMdNotificationsOutline className='text-2xl cursor-pointer dark:text-[#fff] text-[#333]' />
                <span className='absolute -top-2 right-2 bg-[#46e256] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-[#fff]  '>
                    {notifications && notifications.length}
                </span>
            </div>
            {
                open && (
                    <div className="w-[350px] h-[50vh] dark:bg-[#111C43] bg-[#f5f5f5] shadow-xl absolute z-[9999] top-16 rounded ">
                        <h5 className="text-center text-[20px] font-Poppins text-[#333] dark:text-[#fff] p-3 ">
                            {t("إشعارات")}
                        </h5>
                        {
                            notifications && notifications.map((item: any, index: number) => (
                                <div className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#46e256] border-b-[crimson]" key={index}>
                                    <div className="w-full flex items-center justify-between p-2">
                                        <p className="text-[#333] dark:text-[#fff]">
                                            {item.title}
                                        </p>
                                        <p 
                                        onClick={()=>handleNotificationChanged(item._id)}
                                        className="cursor-pointer text-[#333] dark:text-[#fff]">
                                            {t("ضع إشارة مقروء")}
                                        </p>
                                    </div>
                                    <p className="px-2 text-[#333] dark:text-[#fff]">
                                        {item.message}
                                    </p>
                                    <p className="p-2 text-[14px] text-[#333] dark:text-[#fff]">
                                        {format(item.createdAt)}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default DashboardHeader;

