import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
import avatarIcon from '../../../public/imgs/user.png'
import { AiOutlineCamera } from 'react-icons/ai';
import {style} from '../../../app/style/style';
import { useUpdateAvatarMutation, useUpdateProfileMutation } from '@/redux/features/user/userApi';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { toast } from 'react-hot-toast';

type Props={
    avatar:string | null;
    user:any;
}

const ProfileInfo:FC<Props> = ({avatar,user}) => {

    const [name,setName] = useState(user && user.name);
    const [updateAvatar,{isSuccess,error}] = useUpdateAvatarMutation();
    const [loadUser,setLoadUser] = useState(false);
    const {} = useLoadUserQuery(undefined,{skip:loadUser ? false : true});
    const [updateProfile,{isSuccess:isSuccessInfo,error:errorInfo,data}] = useUpdateProfileMutation();
    const imgHandler = async(e:any)=>{
        const fileReader = new FileReader();

        fileReader.onload = () =>{
            if(fileReader.readyState === 2){
                const avatar = fileReader.result;
                updateAvatar(avatar);
            }
        }
        fileReader.readAsDataURL(e.target.files[0]);
    }

    useEffect(()=>{
        if(isSuccess ){
            setLoadUser(true);
        }
        if(error){
            console.log(error);
        }
        if(isSuccessInfo){
            const message = data?.message || "تم تحديث الملف الشخصي بنجاح";
            toast.success(message);
        }
        if(errorInfo){
            if("data" in errorInfo){
                const errDate = errorInfo as any;
                toast.error(errDate.data.message);
            }
        }
    },[isSuccess,error,isSuccessInfo,errorInfo]);


    const handleSubmit = async(e:any)=>{
       e.preventDefault();
       if(name !== ''){
            await updateProfile({
                name: name
            });
       }
    }

    return(
        <>
            <div className="w-full flex justify-center">
                <div className="relative">
                    <Image width={120} height={120} className='w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full ' src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon} alt={user.name} />
                    <input type="file" name="avatar" id="avatar" className='hidden' onChange={imgHandler} accept='image/png,image/jpg,image/jpeg,image/webp' />
                    <label htmlFor="avatar" className='w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer'>
                        <AiOutlineCamera size={20} className='z-1 text-[#fff]'/>
                    </label>
                </div>
            </div>
            <br />
            <br />
            <div className="w-full pl-6 800px:pl-10">
                <form onSubmit={handleSubmit}>
                    <div className="800px:w-[50%] m-auto block pb-4">
                        <div className="w-full">
                            <label className="block dark:text-[#fff] text-[#333] pb-2">الاسم الكامل</label>
                            <input type="text" required value={name} onChange={(e)=>setName(e.target.value)} className={`${style.input} !w-[95%] mb-4 800px:mb-0 `} />
                        </div>
                        <div className="w-full pt-2">
                            <label className='block dark:text-[#fff] text-[#333] pb-2'>عنوان البريد الإلكتروني</label>
                            <input type="text" readOnly value={user?.email} className={`${style.input} !w-[95%] mb-1 800px:mb-0 `} />
                        </div>
                        <input type="submit" required value='تحديث' className={`w-[60%] 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-[#333] rounded-[3px] mt-8 cursor-pointer`} />
                    </div>
                </form>
                <br />
            </div>
        </>
    )
}

export default ProfileInfo;