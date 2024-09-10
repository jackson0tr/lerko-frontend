import { style } from '@/app/style/style';
import CoursePlayer from '@/app/utils/CoursePlayer';
import Ratings from '@/app/utils/Ratings';
import React, { FC } from 'react';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';

type Props={
    active: number;
    setActive: (active: number)=>void;
    courseData: any;
    handleCreateCourse: any;
    isEdit?: boolean;
}

const CoursePreview:FC<Props> = ({active,setActive,courseData,handleCreateCourse,isEdit}) => {
    const discountPercentenge = (
        (courseData?.estimatedPrice - courseData?.price) / courseData?.estimatedPrice
    ) * 100;

    const discountedPercentengePrice = discountPercentenge.toFixed(0);

    const prevButton = () => {
        setActive(active - 1);
    }

    const createButton = () =>{
        handleCreateCourse();
    }

    return(
        <div className="w-[90%] m-auto py-5 mb-5">
            <div className="relative w-full">
                <div className="mt-10 w-full">
                    <CoursePlayer videoUrl={courseData?.demoUrl} title={courseData?.title} />
                </div>
                <div className="flex items-center">
                    <h1 className="pt-5 text-[25px]">
                        {courseData?.price === 0 ? 'مجانا' : courseData?.price + '$'}
                    </h1>
                    <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
                        {courseData?.estimatedPrice}
                    </h5>
                    <h4 className='pl-5 pt-4 text-[22px]'>
                        {discountedPercentengePrice}٪ تخفيض
                    </h4>
                </div>
                <div className="flex items-center">
                    <div className={` ${style.button} !w-[180px] my-3 font-Poppins !bg-[#46e256] cursor-not-allowed `}>
                    اشتري الآن {courseData?.price}$
                    </div>
                </div>
                <div className="flex items-center">
                    <input type="text" name='' id='' placeholder='الرقم التسلسلي للخصم...' className={`${style.input} !w-[50%] ml-3 !mt-0`} />
                    <div className={`${style.button} !w-[120px] my-3 ml-4 font-Poppins cursor-pointer `}>
                    قدم
                    </div>
                </div>
                <p className='pb-1'>الوصول الكامل مدى الحياة</p>
                <p className='pb-1'>شهادة إتمام</p>
                <p className='pb-1'>دعم متميز</p>
            </div>
            <div className="w-full">
                <div className="w-full 800px:pr-5">
                    <h1 className="text-[25px] font-Poppins font-[600]">
                        {courseData?.name}
                    </h1>
                    <div className="flex items-center justify-between pt-3">
                        <div className="flex items-center">
                            <Ratings rating={0} />
                            <h5>0 تعليقات</h5>
                        </div>
                        <h5>0 طلاب</h5>
                    </div>
                    <br />
                    <h1 className='text-[25px] font-Poppins font-[600]'>
                    ماذا ستتعلم من هذه الدورة؟
                    </h1>
                </div>
                {
                    courseData?.benefits?.map((item:any, index:number)=>(
                        <div className="w-full flex 800px:items-center py-2" key={index}>
                            <div className="w-[15px] mr-1">
                                <IoCheckmarkDoneOutline size={20}/>
                            </div>
                            <p className='pl-2'>
                                {item.title}
                            </p>
                        </div>
                    ))
                }
                <br />
                <br />
                <h1 className="text-[25px] font-Poppins font-[600]">
                ما هي المتطلبات الأساسية لبدء هذه الدورة؟
                </h1>
                {
                    courseData?.prerequisites?.map((item:any, index:number)=>(
                        <div className="w-full flex 800px:items-center py-2" key={index}>
                            <div className="w-[15px] mr-1">
                                <IoCheckmarkDoneOutline size={20}/>
                            </div>
                            <p className='pl-2'>
                                {item.title}
                            </p>
                        </div>
                    ))
                }
                <br />
                <br />
                <div className="w-full">
                    <div className="text-[25px] font-Poppins font-[600]">
                    تفاصيل الدورة   
                    </div>
                    <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden">
                        {courseData?.description}
                    </p>
                </div>
                <br />
                <br />
            </div>
            <div className="w-full flex items-center justify-between">
                <div 
                onClick={()=>prevButton()}
                className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#46e256] text-center text-[#fff] rounded mt-8 cursor-pointer">
                    السابق
                </div>
                <div 
                onClick={()=>createButton()}
                className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#46e256] text-center text-[#fff] rounded mt-8 cursor-pointer">
                    {
                        isEdit ? 'تحديث' : 'انشاء' 
                    }
                </div>
            </div>
        </div>
    )
}

export default CoursePreview;