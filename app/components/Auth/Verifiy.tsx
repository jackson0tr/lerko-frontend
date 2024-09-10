import { style } from "@/app/style/style";
import { useActivationMutation } from "@/redux/features/auth/authApi";
import React,{FC, useRef, useState,useEffect} from "react";
import {toast} from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";

type Props={
    setRoute:(route:string)=>void;
}

type VerifiyNumber={
    "0":string;
    "1":string;
    "2":string;
    "3":string;
}

const Verifiy:FC<Props> = ({setRoute}) =>{
    const [invalidError,setInvalidError]=useState<boolean>(false);
    const {token} = useSelector((state:any)=>state.auth);
    const[activation,{isSuccess,error}] = useActivationMutation();
    const inputRefs =[
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    useEffect(()=>{
        if(isSuccess){
            toast.success("تم تفعيل الحساب بنجاح");
            setRoute("/");
        }
        if(error){
            if("data" in error){
                const errDate = error as any;
                toast.error(errDate.data.message);
            }else{
                console.log('حدث خطأ', error);
            }
        }
    },[isSuccess,error])

    const  [verifiyNumber,setVerifiyNumber] = useState<VerifiyNumber>({
        0:"",
        1:"",
        2:"",
        3:"",
    });

    const verificationHandler = async () =>{
        const verificationNumber =  Object.values(verifiyNumber).join("");
        if(verificationNumber.length !== 4){
            setInvalidError(true);
            return;
        }
        await activation({
            activation_token: token,
            activation_code: verificationNumber
        })
    }
    
    const handleInputChange =  (index:number,value:string)=>{
        setInvalidError(false);
        const newVerifiyNumber = {...verifiyNumber, [index]:value};
        setVerifiyNumber(newVerifiyNumber);

        if(value === "" && index > 0){
            inputRefs[index - 1].current?.focus();
        }else if(value.length === 1 && index < 3){
            inputRefs[index + 1].current?.focus();
        }
    }


    return(
        <div>
            <h1 className={`${style.title}`}>
            تحقق من حسابك
            </h1>
            <br />
            <div className="w-full flex items-center justify-center mt-2">
                <div className="w-[80px] h-[80px] rounded-full bg-[#4927DF2] flex items-center justify-center">
                    <VscWorkspaceTrusted size={40} className="text-[#2190ff]"/>
                </div>
            </div>
            <br />
            <br />
            <div className="flex m-auto items-center justify-around">
                {Object.keys(verifiyNumber).map((key,index)=>(
                    <input 
                    type="number" 
                    key={key} 
                    ref={inputRefs[index]} 
                    className={`w-[65px] h-[65px] bgb-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${
                        invalidError ? "shake border-red-500" : "dark:border-white border-[#0000004a]"
                    } `}
                    placeholder=""
                    maxLength={1}
                    value={verifiyNumber[key as keyof VerifiyNumber]}
                    onChange={(e)=>handleInputChange(index,e.target.value)} />
                ))}
            </div>
            <br />
            <br />
            <div className="w-full flex justify-center">
                <button onClick={verificationHandler}
                className={`${style.button}`}>
                    التحقق من كلمة المرور لمرة واحدة (OTP).
                </button>
            </div>
            <br />
            <h5 className="text-center text-black dark:text-white pt-4 font-Poppins text-[14px]">
            العودة لتسجيل الدخول؟ <span className="text-[#2190ff] pl-1 cursor-pointer" onClick={()=>setRoute("Login")}>
            تسجيل الدخول
                </span>
            </h5>
        </div>
    )
}

export default Verifiy;