import React, { FC } from 'react';
import { IoMdCheckmark } from 'react-icons/io';

type Props={
    active:number;
    setActive: (active:number)=>void;
}

const CourseOptions:FC<Props> = ({active,setActive}) => {
    const options=[
        'معلومات الدورة',
        'خيارات الدورة',
        'محتوى الدورة',
        'معاينة الدورة',
    ]
    // #00b4ff
    return(
        <div>
            {options.map((option:any,index:number)=>(
                <div key={index} className="w-full py-5 flex">
                    <div className={`w-[35px] h-[35px] rounded-full flex items-center relative justify-center ${
                        active + 1 > index ? 'bg-[#00b4ff]' : 'bg-[#384766]'
                    }`}>
                        <IoMdCheckmark className='text-[25px] text-[#fff] '/>
                        {
                            index !== options.length -1  && (
                                <div className={`absolute bottom-[-100%] h-[30px] w-1 ${
                                    active + 1 > index ? 'bg-[#00b4ff]' : 'bg-[#384766]'
                                } `}>

                                </div>
                            )
                        }
                    </div>
                    <h5 className={`pl-3 text-[20px] ${
                        active === index ? 'text-[#46e256]' : 'dark:text-[#fff] text-[#333]'
                    }`}>
                        {option}
                    </h5>
                </div>
            ))}
        </div>
    )
}

export default CourseOptions;