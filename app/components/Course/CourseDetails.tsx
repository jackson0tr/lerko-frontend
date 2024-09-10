import { style } from '@/app/style/style';
import CoursePlayer from '@/app/utils/CoursePlayer';
import Ratings from '@/app/utils/Ratings';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import { IoCheckmarkDoneOutline, IoCloseOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';
import CourseContentList from './CourseContentList';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../Payment/CheckoutForm';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import Image from 'next/image';
import defaultAvatar from '../../../public/imgs/user.png';
import { VscVerifiedFilled } from 'react-icons/vsc';

type Props = {
    data: any;
    clientSecret: string;
    stripePromise: any;
    setOpen:any;
    setRoute:any;
}

const CourseDetails: FC<Props> = ({ data, clientSecret, stripePromise, setRoute, setOpen:openAuth }) => {
    // const {user} = useSelector((state:any)=>state.auth);
    const { data: userData } = useLoadUserQuery(undefined, {});
    const [user,setUser] = useState<any>("");
    const [open, setOpen] = useState(false);
    const discoutPercentege = ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100;
    const discoutPercentegePrice = discoutPercentege.toFixed(0);
    const isPurchased = user && user?.courses?.find((item: any) => item._id === data?._id);

    const handleOrder = (e: any) => {
        if(user){
            setOpen(true);
        }else{
            setRoute("Login");
            openAuth(true);
        }
    }

    useEffect(()=>{
        setUser(userData?.user);
    },[userData])

    const locale = 'ar';

    return (
        <div className='mt-[60px]'>
            <div className="w-[90%] 800px:w-[90%] m-auto py-5">
                <div className="w-full flex flex-col-reverse 800px:flex-row">
                    <div className="w-full 800px:w-[65%] 800px:pr-5">
                        <h1 className="text-[25px] font-Poppins font-[600] text-[#333] dark:text-[#fff]">
                            {data?.name}
                        </h1>
                        <div className="flex items-center justify-between pt-3">
                            <div className="flex items-center">
                                <Ratings rating={data?.rating} />
                                <h5 className='text-[#333] dark:text-[#fff]'>
                                    {data?.reviews?.length} تعليقات
                                </h5>
                            </div>
                            <h5 className='text-[#333] dark:text-[#fff]'>
                                {data?.purchased} طلاب
                            </h5>
                        </div>
                        <br />
                        <h1 className='text-[25px] font-Poppins text-[#333] dark:text-[#fff] font-[600]'>
                        ماذا ستتعلم من هذه الدورة؟
                        </h1>
                        <div>
                            {
                                data?.benefits?.map((item: any, index: number) => (
                                    <div key={index} className="flex w-full 800px:items-center py-2">
                                        <div className="w-[15px] mr1">
                                            <IoCheckmarkDoneOutline size={20} className='text-[#333] dark:text-[#fff] ' />
                                        </div>
                                        <p className='pl-2 text-[#333] dark:text-[#fff]'>
                                            {item.title}
                                        </p>
                                    </div>
                                ))
                            }
                            <br />
                            <br />
                        </div>
                        <h1 className='text-[25px] font-Poppins text-[#333] dark:text-[#fff] font-[600]'>
                        ما هي المتطلبات الأساسية لبدء هذه الدورة؟
                        </h1>
                        <div>
                            {
                                data?.prerequisites?.map((item: any, index: number) => (
                                    <div key={index} className="flex w-full 800px:items-center py-2">
                                        <div className="w-[15px] mr-1">
                                            <IoCheckmarkDoneOutline size={20} className='text-[#333] dark:text-[#fff] ' />
                                        </div>
                                        <p className='pl-2 text-[#333] dark:text-[#fff]'>
                                            {item.title}
                                        </p>
                                    </div>
                                ))
                            }
                            <br />
                            <br />
                        </div>
                        <div>
                            <h1 className='text-[25px] font-Poppins text-[#333] dark:text-[#fff] font-[600]'>
                            نظرة عامة على الدورة
                            </h1>
                            <CourseContentList data={data?.courseData} isDemo={true} />
                        </div>
                        <br />
                        <br />
                        <div className="w-full">
                            <h1 className='text-[25px] font-Poppins text-[#333] dark:text-[#fff] font-[600]'>
                            تفاصيل الدورة
                            </h1>
                            <p className='text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-[#333] dark:text-[#fff]'>
                                {data?.description}
                            </p>
                        </div>
                        <br />
                        <br />
                        <div className="w-full">
                            <div className="800px:fleix items-center">
                                <Ratings rating={data?.rating} />
                                <div className="mb-2 800px:mb-[unset]">
                                    <h5 className='text-[25px] font-Poppins text-[#333] dark:text-[#fff] '>
                                        {
                                            Number.isInteger(data?.rating) ? data?.rating?.toFixed(1) : data?.rating?.toFixed(2)
                                        }{' '}
                                        تقييم الدورة {data?.reviews?.length} تعليقات
                                    </h5>
                                </div>
                                <br />
                                {
                                    (
                                        data?.reviews && [...data?.reviews].reverse()
                                    )?.map((item: any, index: number) => (
                                        <div key={index} className="w-full pb-4">
                                            <div className="flex">
                                                <div className="w-[50px] h-[50px]">
                                                    <Image className="w-[50px] h-[50px] object-cover rounded-full" width={50} height={50} src={item.user.avatar ? item.user.avatar.url : defaultAvatar} alt="userAvatar" />
                                                </div>
                                                <div className="hidden 800px:block pl-2">
                                                    <div className="flex items-center">
                                                        <h5 className="text-[18px] pr-2 text-[#333] dark:text-[#fff]">
                                                            {item.user.name}
                                                        </h5>
                                                        <Ratings rating={item.rating} />
                                                    </div>
                                                    <p className='text-[#333] dark:text-[#fff]'>
                                                        {item.comment}
                                                    </p>
                                                    <small className='text-[#000000d1] dark:text-[#ffffff83]'>
                                                        {
                                                            format(item.createdAt)
                                                        }
                                                    </small>
                                                </div>
                                                <div className="pl-2 flex 800px:hidden itemx-center">
                                                    <h5 className='text-[18px] pr-2 text-[#333] dark:text-[#fff]'>
                                                        {item.user.name}
                                                    </h5>
                                                    <Ratings rating={item.rating} />
                                                </div>
                                            </div>
                                            {
                                                item.commentReplies?.map((i: any, index: number) => (
                                                    <div className="flex w-full 800px:ml-16 my-5" key={index}>
                                                        <div className="w-[50px] h-[50px]">
                                                            <Image className="w-[50px] h-[50px] object-cover rounded-full" width={50} height={50} src={i.user.avatar ? i.user.avatar.url : defaultAvatar} alt="userAvatar" />
                                                        </div>
                                                        <div className="pl-2">
                                                            <h5 className="text-[20px] text-[#333] dark:text-[#fff]">
                                                                {i.user.name}
                                                            </h5>{" "}{i.user.role === 'admin' && <VscVerifiedFilled className="text-[#00ceff] ml-2 text-[20px]" />}
                                                            <p className="text-[#333] dark:text-[#fff]">
                                                                {i.comment}
                                                            </p>
                                                            <small className="text-[#ffffff83] dark:text-[#fff]">
                                                                {format(i.createdAt)}
                                                            </small>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="w-full relative 800px:w-[35%]">
                        <div className="sticky top-[100px] left-0 z-50 w-full">
                            <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
                            <div className="flex items-center">
                                <h1 className="pt-5 text-[25px] text-[#333] dark:text-[#fff] ">
                                    {data?.price === 0 ? 'مجانا' : data?.price + '$'}
                                </h1>
                                <h5 className='pl-3 text-[20px] mt-2 line-through opacity-80 text-[#333] dark:text-[#fff] '>
                                    {data?.estimatedPrice}$
                                </h5>
                                <h4 className='pl-5 pt-4 text-[22px] text-[#333] dark:text-[#fff] '>
                                    {discoutPercentegePrice}% خصم
                                </h4>
                            </div>
                            <div className="flex items-center">
                                {
                                    isPurchased ? (
                                        <Link className={`${style.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson] `} href={`/${locale}/course-access/${data._id}`}>
                                            أدخل إلى الدورة
                                        </Link>
                                    ) : (
                                        <div className={`${style.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`} onClick={handleOrder}>
                                            اشتري الآن {data?.price}$
                                        </div>
                                    )
                                }
                            </div>
                            <br />
                            <div className='flex w-full 800px:items-center py-2'>
                                <IoCheckmarkDoneOutline size={20} className='text-[#333] dark:text-[#fff] ' />
                                <p className='pb-1 text-[#333] dark:text-[#fff]'>
                                تم تضمين الفيديو المصدر
                                </p>
                            </div>
                            <div className='flex w-full 800px:items-center py-2'>
                                <IoCheckmarkDoneOutline size={20} className='text-[#333] dark:text-[#fff] ' />
                                <p className='pb-1 text-[#333] dark:text-[#fff]'>
                                الوصول الكامل مدى الحياة
                                </p>
                            </div>
                            <div className='flex w-full 800px:items-center py-2'>
                                <IoCheckmarkDoneOutline size={20} className='text-[#333] dark:text-[#fff] ' />
                                <p className='pb-1 text-[#333] dark:text-[#fff]'>
                                شهادة إتمام
                                </p>
                            </div>
                            <div className='flex w-full 800px:items-center py-2'>
                                <IoCheckmarkDoneOutline size={20} className='text-[#333] dark:text-[#fff] ' />
                                <p className='pb-3 text-[#333] dark:text-[#fff]'>
                                دعم متميز
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <>
                {
                    open && (
                        <div className="w-full h-screen bg-[#00000036] fixed justify-center top-0 right-0 z-50 flex items-center">
                            <div className="w-[500px] min-h-[500px] bg-[#fff] rounded-xl shadow p-3">
                                <div className="w-full flex justify-end">
                                    <IoCloseOutline size={40} className='text-[#33] cursor-pointer' onClick={() => setOpen(false)} />
                                </div>
                                <div className="w-full">
                                    {
                                        stripePromise && clientSecret && (
                                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                                <CheckoutForm setOpen={setOpen} data={data} user={user} />
                                            </Elements>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </>
        </div>
    )
}

export default CourseDetails;