'use client';
import React, { FC, useEffect } from 'react';
import { style } from '@/app/style/style';
import { useForgetPasswordMutation } from '@/redux/features/auth/authApi';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import * as Yup from "yup";

type Props = {
    openPass: boolean;
    setOpenPass: (openPass: boolean) => void;
    setRoute?: (route: string) => void;
    setOpen: (open: boolean) => void;
    open?: boolean;
    // refetch?: any;
}

const ForgetPassword: FC<Props> = ({ setRoute, setOpen, openPass, setOpenPass }) => {

    const schema = Yup.object().shape({
        email: Yup.string().email('بريد إلكتروني خاطئ').required("رجاءا أدخل بريدك الإلكتروني"),
    });

    const [forgetPassword, { data, isSuccess, error }] = useForgetPasswordMutation();

    const formik = useFormik({
        initialValues: { email: "" },
        validationSchema: schema,
        onSubmit: async ({ email }) => {
            await forgetPassword({ email });
        }
    });


    useEffect(() => {
        if (isSuccess) {
            // const message = data?.message || 'تم ارسال كود التأكيد';
            toast.success('تم ارسال كود التأكيد');
            setOpen(false);
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
                        ادخل البريد الالكتروني
                    </h1>
                    <form className='p-4' onSubmit={handleSubmit}>
                        <label
                            htmlFor="email"
                            className={`${style.label}`}>
                            أدخل بريدك الإلكتروني
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            id="email"
                            placeholder="أدخل بريدك الإلكتروني"
                            className={`${errors.email && touched.email && "border-red-500"} ${style.input}`}
                        />
                        <br />
                        <span onClick={() => setOpenPass(false)} className="text-[#2190ff]  cursor-pointer">
                            الرجوع
                        </span>
                        <div className="w-full mt-5">
                            <input type="submit" value="ارسال" className={`${style.button}`} />
                        </div>
                    </form>
                    <br />
                </div>
            </div>
        </>
    )
}

export default ForgetPassword