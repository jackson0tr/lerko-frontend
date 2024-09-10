import { style } from '@/app/style/style';
import { useEditLayoutMutation, useGetHomeDataQuery } from '@/redux/features/layout/layoutApi';
import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineDelete } from 'react-icons/ai';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { IoMdAddCircleOutline } from 'react-icons/io';
import Loader from '../../Loader/Loader';

type Props={

}

const FAQ:FC<Props> = () => {

    const {data,isLoading} = useGetHomeDataQuery("FAQ", {refetchOnMountOrArgChange: true});
    const [questions,setQuestions] = useState<any[]>([]);
    const [editLayout,{isSuccess,error}] = useEditLayoutMutation();

    useEffect(()=>{
        if(data){
            setQuestions(data.layout.faq)
        }
        if(isSuccess){
            toast.success('تم تحديث الأسئلة الشائعة بنجاح!')
        }
        if(error){
            if('data' in error){
                const errMessage = error as any;
                toast.error(errMessage?.data?.message);
            }
        }
    },[data,isSuccess,error])

    const toggleQuestion = (id:any)=> {
        setQuestions((prevQuestions)=> prevQuestions.map((q)=>(q._id === id ? {...q, active: !q.active} : q)))
    }

    const handleQuestionChange= (id:any,value:string)=>{
        setQuestions((prevQuestions)=> prevQuestions.map((q)=>(q._id === id ? {...q, question: value} : q)))
    }

    const handleAnswerChange = (id:any,value:string) =>{
        setQuestions((prevQuestions)=> prevQuestions.map((q)=>(q._id === id ? {...q, answer: value} : q)))
    }

    const newFaqHandler = () => {
        setQuestions([...questions, {question: '', answer: ''}])
    }

    const areQuestionsUnChanged = (
        originalQuestions: any[],
        newQuestions: any[]
    ) => {
        return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
    }

    const isAnyQuestionEmpty = (questions:any[]) => {
        return questions.some((q)=>q.question === '' || q.answer === '');
    } 

    const handleEdit = async () => {
        if(!areQuestionsUnChanged(data.layout.faq, questions) && !isAnyQuestionEmpty(questions)){
            await editLayout({
                type: 'FAQ',
                faq: questions
            });
        }
    }

    return(
        <>
            {isLoading ? (
                <Loader/>
            ): (
                <>
        <div className='w-[90%] 800px:w-[80%] m-auto mt-[120px]'>
            <div className="mt-12">
                <dl className="space-y-8">
                    {questions.map((q:any)=>(
                        <div key={q._id} className={`${q._id !== questions[0]?._id && 'border-t'}border-[cirmson] pt-6`}>
                            <dt className="text-lg">
                                <button 
                                onClick={()=>toggleQuestion(q._id)}
                                className='flex items-start dark:text-[#fff] text-[#333] justify-between w-full text-left focus:outline-none '>
                                    <input type="text" value={q.question} onChange={(e:any)=>handleQuestionChange(q._id, e.target.value)} className={`${style.input} border-none`} placeholder='أضف سؤالك...' />
                                    <span className="ml-6 flex-shrink-0">
                                        {q.active ? (
                                            <HiMinus className='h-6 w-6'/>
                                        ): (
                                            <HiPlus className='h-6 w-6'/>
                                        )}
                                    </span>
                                </button>
                            </dt>
                            {
                                q.active && (
                                    <dd className="mt-2 pr-12">
                                        <input type="text" value={q.answer} onChange={(e:any)=>handleAnswerChange(q._id, e.target.value)} className={`${style.input} border-none`} placeholder='أضف إجابتك...' />
                                        <span className="ml-6 flex-shrink-0">
                                            <AiOutlineDelete onClick={()=>{
                                                setQuestions((prevQuestions)=>prevQuestions.filter((item)=>item._id !== q._id))
                                            }} className='dark:text-[#fff] text-[#333] text-[18px] cursor-pointer' />
                                        </span>
                                    </dd>
                                )
                            }
                        </div>
                    ))}
                </dl>
                <br />
                <br />
                <IoMdAddCircleOutline className='dark:text-[#fff] text-[#333] text-[25px] cursor-pointer' onClick={newFaqHandler} />
                <br />
            </div>
        </div>
            <div className={`${style.button} !w-[100px] !rounded absolute bottom-12 left-12 !min-h-[40px] !h-[40px] dark:text-[#fff] text-[#333] bg-[#cccccc34] ${
                areQuestionsUnChanged(data.layout.faq,questions) || isAnyQuestionEmpty(questions) ? '!cursor-not-allowed' : '!cursor-pointer !bg-[#42d383]'
            }`} onClick={areQuestionsUnChanged(data.layout.faq, questions) || isAnyQuestionEmpty(questions) ? ()=> null : handleEdit} >
                حفظ
            </div>
            <br />
            <br />
            </>
    )}
    </>
    )
}

export default FAQ;