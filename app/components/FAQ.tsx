import { style } from '@/app/style/style';
import { useGetHomeDataQuery } from '@/redux/features/layout/layoutApi';
import { useTranslations } from 'next-intl';
import React, { FC, useEffect, useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';

type Props={

}

const FAQ:FC<Props> = () => {

    const {data} = useGetHomeDataQuery("FAQ",{});
    const [activeQuestion,setActiveQuestion] = useState(null);
    const [questions,setQuestions] = useState<any[]>([]);
    const t = useTranslations();

    useEffect(()=>{
        if(data){
            setQuestions(data?.layout?.faq);
        }
    },[data]);

    const toggleQuestion= (id:any)=> {
        setActiveQuestion(activeQuestion === id ? null : id);
    }

    return(
        <div>
            <div className="w-[90%] 800px:w-[80%] m-auto">
                <h1 className={`${style.title} 800px:text-[40px]`}>
                    {t("أسئلة مكررة")}
                </h1>
                <div className="mt-12">
                <dl className="space-y-8">
                    {questions?.map((q:any)=>(
                        <div key={q._id} className={`${q._id !== questions[0]?._id && 'border-t'}border-[cirmson] pt-6`}>
                            <dt className="text-lg">
                                <button 
                                onClick={()=> toggleQuestion(q._id)}
                                className='flex items-start dark:text-[#fff] text-[#333] justify-between w-full text-left focus:outline-none '>
                                    <span className='font-medium text-[#333] dark:text-[#fff] '>
                                        {q.question}
                                    </span>
                                    <span className="ml-6 flex-shrink-0">
                                        {activeQuestion === q._id ? (
                                            <HiMinus className='h-6 w-6 dark:text-[#fff] text-[#333]'/>
                                        ): (
                                            <HiPlus className='h-6 w-6 dark:text-[#fff] text-[#333]'/>
                                        )}
                                    </span>
                                </button>
                            </dt>
                            {
                                activeQuestion === q._id &&  (
                                    <dd className="mt-2 pr-12">
                                        <p className='text-base font-Poppins text-[#333] dark:text-[#fff]'>{q.answer}</p>
                                    </dd>
                                )
                            }
                        </div>
                    ))}
                </dl>
                <br />
                <br />
                <br />
            </div>
            </div>
        </div>
    )
}

export default FAQ;