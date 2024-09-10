import { style } from '@/app/style/style';
import React, { FC } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { toast } from 'react-hot-toast';

type Props={
    benefits: {title: string}[];
    setBenefits: (benefits: {title: string}[])=>void;
    prerequisites: {title: string}[];
    setPrerequisites: (prerequisites: {title: string}[])=>void;
    active: number;
    setActive: (active: number)=>void;
}

const CourseData:FC<Props> = ({benefits,setBenefits,prerequisites,setPrerequisites,active,setActive}) => {

    const handleBenefitChange = (index:number, value:any)=>{
        const updatedBenefits = [...benefits];
        updatedBenefits[index].title = value;
        setBenefits(updatedBenefits);
    }

    const handleAddBenefit = () =>{
        setBenefits([...benefits, {title: ''}]);
    }
    
    const handlePrerequisiteChange = (index:number, value:any)=>{
        const updatedPrerequisites = [...prerequisites];
        updatedPrerequisites[index].title = value;
        setPrerequisites(updatedPrerequisites);
    }

    const handleAddPrerequisite = () =>{
        setPrerequisites([...prerequisites, {title: ''}]);
    }

    const prevButton = () => {
        setActive(active - 1);
    }

    const nextButton = () => {
        if(benefits[benefits.length - 1]?.title !== '' && prerequisites[prerequisites.length - 1]?.title !== ''){
            setActive(active + 1);
        }else{
            toast.error('يرجى ملء الحقول للانتقال إلى العملية التالية')
        }
    }

    return(
        <div className="w-[80%] m-auto mt-24 block ">
            <div>
                <label htmlFor="email" className={`${style.label} text-[20px]`} >ما هي الفوائد التي تعود على الطلاب في هذه الدورة؟</label>
                <br />
                {
                    benefits.map((benefit:any,index:number)=>(
                        <input 
                        type="text" 
                        key={index} 
                        name='Benefit' 
                        placeholder='أدخل الفائدة!' 
                        required 
                        value={benefit.title} 
                        onChange={(e)=>handleBenefitChange(index, e.target.value)} 
                        className={`${style.input} mt-2`} />
                    ))
                }
                <AddCircleIcon style={{margin: '10px 0px', cursor: 'pointer', width: '30px'}} onClick={handleAddBenefit} />
            </div>

            <div>
                <label htmlFor="email" className={`${style.label} text-[20px]`} > ما هي المتطلبات الأساسية للطلاب في هذه الدورة؟ </label>
                <br />
                {
                    prerequisites.map((prerequisite:any,index:number)=>(
                        <input 
                        type="text" 
                        key={index} 
                        name='Prerequisite' 
                        placeholder='أدخل الشرط المسبق!' 
                        required 
                        value={prerequisite.title} 
                        onChange={(e)=>handlePrerequisiteChange(index, e.target.value)} 
                        className={`${style.input} mt-2`} />
                    ))
                }
                <AddCircleIcon style={{margin: '10px 0px', cursor: 'pointer', width: '30px'}} onClick={handleAddPrerequisite} />
            </div>
            
            <div className="w-full flex items-center justify-between">
                <div className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#46e256] text-center text-[#fff] rounded mt-8 cursor-pointer" onClick={()=>prevButton()}>
                    السابق
                </div>
                <div className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#46e256] text-center text-[#fff] rounded mt-8 cursor-pointer" onClick={()=>nextButton()}>
                    التالي
                </div>
            </div>
            <br />
            <br />
            
        </div>
    )
}

export default CourseData;
