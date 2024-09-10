'use client';
import React,{FC,useEffect,useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { style } from "../../style/style";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";

type Props={    
    setRoute:(route:string)=>void;
}   

const schema = Yup.object().shape({
    name: Yup.string().required('من فضلك أدخل إسمك'),
    email: Yup.string().email('بريد إلكتروني خاطئ').required("رجاءا أدخل بريدك الإلكتروني"),
    password: Yup.string().required("من فضلك أدخل رقمك السري").min(6)
});

const SignUp:FC<Props> = ({setRoute}) =>{
    const [show,setShow] = useState(false);

    const [register,{data,isSuccess,error}] = useRegisterMutation();


    useEffect(()=>{
        if(isSuccess){
            // const message = data?.message || "تم التسجيل بنجاح";
            toast.success("تم التسجيل بنجاح");
            setRoute("Verifiy")
        }
        if(error){
            if("data" in error){
                const errDate = error as any;
                toast.error(errDate.data.message);
            }
        }
    },[isSuccess,error]);

    const formik = useFormik({
        initialValues: {name:"",email:"",password:""},
        validationSchema: schema,
        onSubmit: async({name,email,password})=>{
            const data = {
                name,email,password
            }
            await register(data);
        }
    });
    const {errors,touched,values,handleChange,handleSubmit} = formik;
    return(
        <>
            <div className="w-full">
                <h1 className={`${style.title}`}>
                قم بالتسجيل مع ليركو
                </h1> 
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label 
                        htmlFor="name" 
                        className={`${style.label}`}>
                            أدخل أسمك
                        </label>

                        <input 
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        id="name"
                        placeholder="أدخل أسمك"
                        className={`${errors.name && touched.name && "border-red-500"} ${style.input}`}
                        />

                    </div>
                        {errors.name && touched.name  &&(
                            <span className="text-red-500 pt-2 block">{errors.name}</span>
                        )}

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
                            <AiOutlineEye size={20} onClick={()=>setShow(false)} className="absolute bottom-3 text-black dark:text-white left-2 z-1 cursor-pointer"/>
                        )}

                    </div>
                        {errors.password && touched.password  &&(
                            <span className="text-red-500 pt-2 block">{errors.password}</span>
                        )}

                    <div className="w-full mt-5">
                        <input type="submit" value="اشتراك" className={`${style.button}`}/>
                    </div>
                    <br />
                    <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">أو انضم مع</h5>
                    <div className="flex items-center justify-center my-3">
                        <FcGoogle size={30} className="cursor-poniter ml-2"/>
                    </div>
                    <h5 className="text-center text-black dark:text-white pt-4 font-Poppins text-[14px]">
                    هل لديك حساب؟ {" "}
                    <span className="text-[#2190ff] pl-1 cursor-pointer" onClick={()=> setRoute("Login")}>
                    تسجيل الدخول
                    </span>
                    </h5>
                </form>
                <br />
            </div>
        </>
    )
}

export default SignUp;