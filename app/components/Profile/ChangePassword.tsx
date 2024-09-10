import React, { FC, useEffect, useState } from 'react';
import {style} from '../../style/style';
import { useUpdatePasswordMutation } from '@/redux/features/user/userApi';
import { toast } from 'react-hot-toast';

type Props={

}

const ChangePassword:FC<Props> = (props) => {          
    const [oldPassword,setOldPassword] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const [updatePassword,{isSuccess,error}] = useUpdatePasswordMutation();

    const passwordChangeHandler = async (e:any) =>{
        e.preventDefault();
        if(oldPassword === '' || newPassword === '' || confirmPassword === ''){
            toast.error('يرجى ملء الحقول الفارغة');
        }
        if(newPassword !== confirmPassword){
            toast.error("كلمات المرور غير متطابقة");
        }
        if(newPassword === confirmPassword){
            await updatePassword({oldPassword,newPassword});
        }
    }

    useEffect(()=>{
        if(isSuccess){
            toast.success("تم تغيير الرقم السري بنجاح");
        }
        if(error){
            if("data" in error){
                const errDate = error as any;
                toast.error(errDate.data.message);
            }
        }
    },[isSuccess,error]);

    return(
        <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0">
            <h1 className="block text-[25px] 800px:text-[30px] font-Poppins dark:text-[#fff] text-[#333] text-center font-[500] text-[#fff] pb-2">
            تغيير كلمة المرور
            </h1>
            <div className="w-full">
                <form aria-required onSubmit={passwordChangeHandler} className='flex flex-col items-center'>
                    <div className="w-full mt-5 800px:w-[60%]">
                        <label className='block pb-2 dark:text-[#fff] text-[#333]'>أدخل كلمة المرور القديمة الخاصة بك</label>
                        <input required value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} type="password" className={`${style.input} !w-[95%] mb-4 800px:mb-0`} />
                    </div>
                    <div className="w-full mt-5 800px:w-[60%]">
                        <label className='block pb-2 dark:text-[#fff] text-[#333]'>أدخل كلمة المرور الجديدة</label>
                        <input required value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} type="password" className={`${style.input} !w-[95%] mb-4 800px:mb-0`} />
                    </div>
                    <div className="w-full mt-5 800px:w-[60%]">
                        <label className='block pb-2 dark:text-[#fff] text-[#333]'>أدخل تأكيد كلمة المرور</label>
                        <input required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} type="password" className={`${style.input} !w-[95%] mb-4 800px:mb-0`} />
                    </div>
                    <input type="submit" required value='تحديث' className={`w-[60%] 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-[#333] rounded-[3px] mt-8 cursor-pointer`} />
                </form>
            </div>
        </div>
    )
}

export default ChangePassword;