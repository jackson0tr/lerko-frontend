import { useEditLayoutMutation, useGetHomeDataQuery } from '@/redux/features/layout/layoutApi';
import React, { useEffect, useState } from 'react';
import Loader from '../../Loader/Loader';
import { style } from '@/app/style/style';
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { toast } from 'react-hot-toast';

type Props={

}

const EditCategories = () => {
    const {data,isLoading,refetch} = useGetHomeDataQuery("Categories", {refetchOnMountOrArgChange: true});
    const [categories,setCategories] = useState<any[]>([]);
    const [editLayout,{isSuccess,error}] = useEditLayoutMutation();

    useEffect(()=>{
        if(data){
            setCategories(data.layout.categories)
        }
        if(isSuccess){
            refetch();
            toast.success('تم تحديث الفئات بنجاح!')
        }
        if(error){
            if('data' in error){
                const errMessage = error as any;
                toast.error(errMessage?.data?.message);
            }
        }
    },[data,isSuccess,error])

    const handleCategoriesAdd = (id:any,value:string)=> {
        setCategories((prevCategory:any)=>prevCategory.map((i:any)=>(i._id === id ? {...i, title:value}: i)))
    }

    const newCategoriesHandler = () => {
        if(categories[categories.length - 1].title === ''){
            toast.error('عنوان الفئة فارغ')
        }else{
            setCategories((prevCategory:any)=> [...prevCategory, {title: ''}]);
        }
    }

    const areCategoriesUnChanged = (
        originalCategories: any[],
        newCategories: any[]
    ) => {
        return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
    }

    const isAnyCategoriesEmpty = (categories:any[]) => {
        return categories.some((q)=>q.question === '' || q.answer === '');
    }

    const handleEdit = async () => {
        if(!areCategoriesUnChanged(data.layout.categories, categories) && !isAnyCategoriesEmpty(categories)){
            await editLayout({
                type: 'Categories',
                categories
            });
        }
    }

    return(
        <>
            {
                isLoading ? (
                    <Loader/>
                ) : (
                    <div className="mt-[120px] text-center">
                        <h1 className={style.title}>
                            جميع الفئات
                        </h1>
                        {
                            categories && categories.map((item:any,index:number)=> {
                                return(
                                    <div className="p-3" key={index}>
                                        <div className="flex items-center w-full justify-center">
                                            <input type="text" value={item.title} onChange={(e)=>handleCategoriesAdd(item._id, e.target.value)} placeholder='أدخل عنوان الفئة...' className={`${style.input} !w-[unset] !border-none !text-[20px] `} />
                                            <AiOutlineDelete 
                                            onClick={()=>{
                                                setCategories((prevCategory:any)=>prevCategory.filter((i:any)=>i._id !== item._id))
                                            }}
                                            className='dark:text-[#fff] text-[#333] text-[18px] cursor-pointer ' />
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <br />
                        <br />
                        <div className="flex items-center w-full justify-center">
                            <AiOutlinePlusCircle onClick={newCategoriesHandler} className='dark:text-[#fff] text-[#333] text-[25px] cursor-pointer ' />
                        </div>
                        <div className={`${style.button} !w-[100px] !rounded absolute bottom-12 left-12 !min-h-[40px] !h-[40px] dark:text-[#fff] text-[#333] bg-[#cccccc34] ${
                            areCategoriesUnChanged(data.layout.categories,categories) || isAnyCategoriesEmpty(categories) ? '!cursor-not-allowed' : '!cursor-pointer !bg-[#42d383]'
                        }`} onClick={areCategoriesUnChanged(data.layout.categories, categories) || isAnyCategoriesEmpty(categories) ? ()=> null : handleEdit} >
                            حفظ
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default EditCategories;
