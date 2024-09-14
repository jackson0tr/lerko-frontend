'use client'
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { style } from "../../style/style";
import { toast } from "react-hot-toast";
import { useForgetPasswordMutation } from '@/redux/features/auth/authApi';

type Props = {
    setRoute: (route: string) => void;
    setOpen: (open: boolean) => void;
    refetch?: any;
}



const schema = Yup.object().shape({
    email: Yup.string().email("الايميل ليس موجود").required("يرجي ادخال البريد الالكتروني"),
});

const ForgotPassword: FC<Props> = ({ setRoute, setOpen, refetch }) => {
    const [openPass, setOpenPass] = useState(false);

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
            <div className={`w-full ${openPass ? "hidden" : "block"}`}>
                <h1 className={`${style.title}`}>
                    ادخل البريد الالكتروني
                </h1>
                <form className="p-4" onSubmit={handleSubmit}>

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

                    {errors.email && touched.email && (
                        <span className="text-red-500 pt-2 block">{errors.email}</span>
                    )}
                    <br />
                    <br />
                    <input
                        type="submit"
                        value="ارسال"
                        className={`${style.button} mt-3`}
                    />
                    <br />
                    <span onClick={() => setOpenPass(false)} className="text-[#2190ff]  cursor-pointer">
                        الرجوع
                    </span>
                </form>
                <br />
            </div>
        </>
    )
}

export default ForgotPassword;