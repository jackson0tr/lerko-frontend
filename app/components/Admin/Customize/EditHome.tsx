import { style } from "@/app/style/style";
import { useEditLayoutMutation, useGetHomeDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {

}

const EditHome: FC<Props> = () => {
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const { data, refetch, error: bannerError } = useGetHomeDataQuery("Banner", { refetchOnMountOrArgChange: true });
    console.log(data);
    const [editLayout, { isSuccess, error }] = useEditLayoutMutation();

    useEffect(() => {
        if (data) {
            setTitle(data?.layout?.banner?.title);
            setSubTitle(data?.layout?.banner?.subTitle);
            setImage(data?.layout?.banner?.image?.url);
        }
        if (isSuccess) {
            refetch();
            toast.success('تم تحديث تخطيط المنزل بنجاح!');
        }
        if (error) {
            if ('data' in error) {
                const errMessage = error as any;
                toast.error(errMessage?.data?.message);
            }
        }
        if (bannerError) {
            if ('data' in bannerError) {
                const errMessage = bannerError as any;
                toast.error(errMessage?.data?.message);
            }
        }
    }, [data, isSuccess, error])

    const handleUpdate = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    setImage(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    }

    const handleEdit = async () => {
        await editLayout({
            type: 'Banner',
            image,
            title,
            subTitle
        });
    }

    return (
        <>
            <div className="container pr-[100px] relative 1000px:flex items-center">
                <div className="absolute top-0 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[500px] 1100px:w-[500px] pr-[80px]">
                    <div className="w-full flex min-h-screen items-center justify-end pt-[20px] z-10 ">
                        <div className="relative flex justify-end items-center">
                            <Image width={100} height={100} src={image} alt="img" className="object-contain w-full h-full z-10 " />
                            <input type="file" name="" id="banner" accept="image/*" onChange={handleUpdate} className="hidden" />
                            <label htmlFor="banner" className="absolute bottom-0 right-0 z-20">
                                <AiOutlineCamera className="dark:text-[#fff] text-[#333] text-[18px] cursor-pointer " />
                            </label>
                        </div>
                        <div className="w-full flex flex-col items-center text-center 800px:text-left pt-[40px] ">
                            <textarea rows={4} value={title} placeholder="أدخل العنوان" onChange={(e) => setTitle(e.target.value)} className="dark:text-[#fff] text-[#000000c7] resize-none text-[30px] px-3 w-full font-Poppins 1000px:text-[60px] 1500px:text-[70px] "></textarea>
                            <br />
                            <textarea value={subTitle} placeholder="أدخل العنوان الفرعي الخاص بك" onChange={(e) => setSubTitle(e.target.value)} className="dark:text-[#fff] text-[#000000c7] font-Josefin w-full font-[600] text-[18px] bg-transparent "></textarea>
                            <br />
                        </div>
                    </div>
                    <div className={`${style.button} !w-[100px] !rounded bottom-12 right-12 !min-h-[40px] !h-[40px] dark:text-[#fff] text-[#333] bg-[#cccccc34] ${data?.layout?.banner?.title !== title ||
                            data?.layout?.banner?.subTitle !== subTitle ||
                            data?.layout?.banner?.image?.url !== image ? '!cursor-pointer !bg-[#42383]' : '!cursor-not-allowed'
                        }`} onClick={
                            data?.layout?.banner?.title !== title ||
                                data?.layout?.banner?.subTitle !== subTitle ||
                                data?.layout?.banner?.image?.url !== image ? handleEdit : () => null
                        }>
                        حفظ
                    </div>
                    <br />
                    <br />
                    <br />
                </div>
            </div>
        </>
    )
}

export default EditHome;