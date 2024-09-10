'use client'
import React,{FC,useEffect,useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { style } from "../../style/style";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import {signIn} from "next-auth/react";
import Link from "next/link";
import ForgetPassword from "./ForgotPassword";

type Props={  
    
    setRoute:(route:string)=>void;
    setOpen:(open:boolean)=>void;
    refetch?:any;
}   

const schema = Yup.object().shape({
    email: Yup.string().email('بريد إلكتروني خاطئ').required("رجاءا أدخل بريدك الإلكتروني"),
    password: Yup.string().required("من فضلك أدخل رقمك السري").min(6)
});

const Login:FC<Props> = ({setRoute,setOpen,refetch}) =>{
    const [show,setShow] = useState(false);
    const [openPass,setOpenPass] = useState(false);
    const [login,{isSuccess,error,data}] = useLoginMutation();
    
    const formik = useFormik({
        initialValues: {email:"",password:""},
        validationSchema: schema,
        onSubmit: async({email,password})=>{
            
            await login({email,password});

        }
    });

    useEffect(()=>{
        if(isSuccess){
            // const message = data?.message || "تم تسجيل الدخول بنجاح";
            toast.success("تم تسجيل الدخول بنجاح");
            setOpen(false);
            refetch();
        }
        if(error){
            if("data" in error){
                const errDate = error as any;
                toast.error(errDate.data.message);
            }
        }
    },[isSuccess,error]);

    const {errors,touched,values,handleChange,handleSubmit} = formik;
    const locale = 'ar';
    return(
        <>
        {
            openPass && (
                <ForgetPassword openPass={openPass} setOpenPass={setOpenPass} setOpen={setOpen}/>
            )
        }
            <div className={`w-full ${openPass ? "hidden": "block"}`}>
                <h1 className={`${style.title}`}>
                تسجيل الدخول مع ليركو
                </h1>
                <form onSubmit={handleSubmit}>

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

                    {errors.email && touched.email  &&(
                        <span className="text-red-500 pt-2 block">{errors.email}</span>
                    )}

                    <div className="w-full mt-5 relative mb-1">
                        <label 
                        htmlFor="password" 
                        className={`${style.label}`}>
                            ادخل رقمك السري
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
                        <input type="submit" value="تسجيل دخول" className={`${style.button}`}/>
                    </div>
                    <br />
                    <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">أو انضم مع</h5>
                    <div className="flex items-center justify-center my-3">
                        <FcGoogle size={30} onClick={()=> signIn("google")} className="cursor-pointer ml-2"/>
                    </div>
                    <h5 className="text-center text-black dark:text-white pt-4 font-Poppins text-[14px]">
                    ليس لديك أي حساب؟ {" "}
                    <span className="text-[#2190ff] pr-1 cursor-pointer" onClick={()=> setRoute("SignUp")}>
                    اشتراك  
                    </span>
                    <br />
                    {/* <Link href={`/${locale}/forgot-password`}> */}
                    <span onClick={()=> setOpenPass(true)} className="text-[#2190ff]  cursor-pointer">
                        نسيت كلمة المرور؟
                    </span>
                    {/* </Link> */}
                    </h5>
                </form>
                <br />
            </div>
        </>
    )
}

export default Login;