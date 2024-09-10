import { style } from '@/app/style/style';
import { useResetPasswordMutation } from '@/redux/features/auth/authApi';
import { useFormik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import * as Yup from "yup";
import { redirect, useParams } from 'next/navigation';

type Props = {
    
}

const ResetPassword: FC<Props> = () => {
    const [show, setShow] = useState(false);

    const schema = Yup.object().shape({
        password: Yup.string().required("من فضلك أدخل رقمك السري").min(6)
    });

    const [resetPassword, { data, isSuccess, error }] = useResetPasswordMutation();

    const {id,token}:any = useParams();

    const formik = useFormik({
        initialValues: { password: "" },
        validationSchema: schema,
        onSubmit: async ({ password }) => {
            await resetPassword({ password, id, token });
        }
    });

    useEffect(() => {
        if (isSuccess) {
            // const message = data?.message || "تم تغير كلمة السر بنجاح";
            toast.success("تم تغير كلمة السر بنجاح");
            redirect('/');
        }
        if (error) {
            if ("data" in error) {
                const errDate = error as any;
                toast.error(errDate.data.message);
            }
        }
    }, [isSuccess, error]);

    const { errors, touched, values, handleChange, handleSubmit } = formik;
    return (
        <>
            <div className='container w-[400px] h-[400px] mx-auto px-5 py-5 items-center justify-center flex'>
                <div className="bg-[#fff]  shadow-md w-full rounded">
                    <h1 className={`${style.title}`}>
                        اعادة كلمة المرور
                    </h1>
                    <form className='p-4' onSubmit={handleSubmit}>
                    <div className="w-full mt-5 relative mb-1">
                        <label 
                        htmlFor="password" 
                        className={`${style.label}`}>
                            ادخل كلمة المرور الجديدة
                        </label>

                        <input 
                        type={!show ? "password" : "text"}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        id="password"
                        placeholder="ادخل رقمك السري"
                        className={`${errors.password && touched.password && "border-red-500"} ${style.input}`}
                        />

                        {!show ? (
                            <AiOutlineEyeInvisible size={20} onClick={()=>setShow(true)} className="absolute bottom-3 text-black dark:text-white left-2 z-1 cursor-pointer"/>
                        ) : (
                            <AiOutlineEye size={20} onClick={()=>setShow(false)} className="absolute bottom-3 left-2 text-black dark:text-white z-1 cursor-pointer"/>
                        )}

                        {errors.password && touched.password  &&(
                            <span className="text-red-500 pt-2 block">{errors.password}</span>
                        )}
                    </div>


                        <div className="w-full mt-5">
                            <input type="submit" value="تحديث" className={`${style.button}`} />
                        </div>
                    </form>
                    <br />
                </div>
            </div>
        </>
    )
}

export default ResetPassword