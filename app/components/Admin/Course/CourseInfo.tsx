import React, { FC, useEffect, useState } from 'react';
import {style} from '../../../style/style';
import EditCategories from '../Customize/EditCategories';
import { useGetHomeDataQuery } from '@/redux/features/layout/layoutApi';

type Props={    
    courseInfo:any;
    setCourseInfo:(courseInfo:any)=>void;
    active:number;
    setActive:(active:number)=>void;
}

const CourseInfo:FC<Props> = ({courseInfo,setCourseInfo,active,setActive}) =>{
    const [dragging,setDragging] = useState(false);

    const handleSubmit= (e:any) => {
        e.preventDefault();
        setActive(active + 1);
    }

    const handleFileChange = (e:any) => {
        const file = e.target.files?.[0]
        if(file){
            const reader = new FileReader();
            
            reader.onload = (e:any) => {
                if(reader.readyState === 2){
                    setCourseInfo({...courseInfo, thumbnail: reader.result});
                }
            }
            
            reader.readAsDataURL(file);
        }
    }

    const handleDragOver = (e:any) => {
        e.preventDefault();
        setDragging(true);
    }

    const handleDragLeave = (e:any) => {
        e.preventDefault();
        setDragging(false);
    }

    const handleDrop = (e:any) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];

        if(file){
            const reader = new FileReader();

            reader.onload = () => {
                setCourseInfo({...courseInfo, thumbnail: reader.result});
            }

            reader.readAsDataURL(file);
        }
    }

    const {data} = useGetHomeDataQuery("Categories",{});
    const [categories,setCategories] = useState([]);

    useEffect(()=>{
        if(data){
            setCategories(data.layout.categories)
        }
    },[data])

    return(
        <div className="w-[80%] m-auto mt-24 ">
            <form className={`${style.label}`} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">
                        الاسم
                    </label>
                    <input 
                    type="name" 
                    name='' 
                    required 
                    value={courseInfo.name} 
                    id='name' 
                    placeholder='ادخل اسم الكورس' 
                    className={`${style.input}`} 
                    onChange={(e:any)=>setCourseInfo({...courseInfo, name: e.target.value})} />
                </div>
                <br />
                <div className='mb-5'>
                    <label htmlFor="email">
                        الوصف
                    </label>
                    <textarea 
                    className={`${style.input} !h-min !py-2`} 
                    value={courseInfo.description} 
                    onChange={(e:any)=>setCourseInfo({...courseInfo, description: e.target.value})} 
                    placeholder='ادخل وصف الكورس' 
                    name="" 
                    id="description" 
                    cols={30} 
                    rows={8}></textarea>
                </div>
                <br />
                <div className='w-full flex justify-between'>
                    <div className="w-[45%]">
                    <label htmlFor="">
                        السعر
                    </label>
                    <input 
                    type="number" 
                    name='' 
                    required 
                    value={courseInfo.price} 
                    id='price' 
                    placeholder='ادخل سعر الكورس' 
                    className={`${style.input}`} 
                    onChange={(e:any)=>setCourseInfo({...courseInfo, price: e.target.value})} />
                    </div>
                    <div className="w-[45%]">
                    <label htmlFor="email">
                        السعر المقدر (اختياري)
                    </label>
                    <input 
                    type="number" 
                    name='' 
                    required 
                    value={courseInfo.estimatedPrice} 
                    id='estimatedPrice' 
                    placeholder='ادخل السعر المقدر' 
                    className={`${style.input}`} 
                    onChange={(e:any)=>setCourseInfo({...courseInfo, estimatedPrice: e.target.value})} />
                    </div>
                </div>
                <br />
                <div className='w-full flex justify-between'>
                <div className='w-[45%]'>
                    <label htmlFor="email">
                        العلامات
                    </label>
                    <input 
                    type="text" 
                    name='' 
                    required 
                    value={courseInfo.tags} 
                    id='tags' 
                    placeholder='ادخل علامات الكورس' 
                    className={`${style.input}`} 
                    onChange={(e:any)=>setCourseInfo({...courseInfo, tags: e.target.value})} />
                </div>
                    <div className="w-[45%]">
                    <label>
                        الفئات
                    </label>
                    <select name="" id="categories" 
                    onChange={(e:any)=>setCourseInfo({...courseInfo, category: e.target.value})} 
                    value={courseInfo.category} 
                    className={style.input}>
                        <option>اختار فئة</option>
                        {
                            categories.map((item:any)=>(
                                <option key={item._id} value={item._id}>
                                    {item.title}
                                </option>
                            ))
                        }
                    </select>
                    </div>
                </div>
                {/* <br /> */}
                {/* <div>
                    <label htmlFor="email">
                        Tags
                    </label>
                    <input 
                    type="text" 
                    name='' 
                    required 
                    value={courseInfo.tags} 
                    id='tags' 
                    placeholder='Enter course Tags' 
                    className={`${style.input}`} 
                    onChange={(e:any)=>setCourseInfo({...courseInfo, tags: e.target.value})} />
                </div> */}
                <br />
                <div className='w-full flex justify-between'>
                    <div className="w-[45%]">
                    <label htmlFor="">
                        المستوي
                    </label>
                    <input 
                    type="number" 
                    name='' 
                    required 
                    value={courseInfo.level} 
                    id='level' 
                    placeholder='ادخل مستوي الكورس' 
                    className={`${style.input}`} 
                    onChange={(e:any)=>setCourseInfo({...courseInfo, level: e.target.value})} />
                    </div>
                    <div className="w-[45%]">
                    <label htmlFor="email">
                        لينك تجريبي
                    </label>
                    <input 
                    type="text" 
                    name='' 
                    required 
                    value={courseInfo.demoUrl} 
                    id='demoUrl' 
                    placeholder='ادخل لينك الكورس التجريبي' 
                    className={`${style.input}`} 
                    onChange={(e:any)=>setCourseInfo({...courseInfo, demoUrl: e.target.value})} />
                    </div>
                </div>
                <br />
                <div className='w-full'>
                    <input 
                    type="file" 
                    accept='image/*' 
                    id='file' 
                    className='hidden' 
                    onChange={handleFileChange} />
                    <label 
                    onDragOver={handleDragOver}
                    onDrop={handleDrop} 
                    onDragLeave={handleDragLeave} 
                    className={`w-full min-h-[10vh] dark:border-[#fff] border-[#00000026] p-3 flex border items-center justify-center ${
                        dragging ? 'bg-[#00b4ff]' : 'bg-transparent'
                    } `} 
                    htmlFor="file">
                        {
                            courseInfo.thumbnail ? (
                                <img 
                                src={courseInfo.thumbnail} 
                                alt={courseInfo.name} 
                                className='max-h-full w-full object-cover'/>
                            ) : (
                                <span className='text-[#333] cursor-pointer dark:text-[#fff]'>
                                    قم بسحب ز اسقاط الصورة المصغرة لبخاصة بك او انقر للتصفح
                                    {/* Darg and Drop your thumbnail or click to browse */}
                                </span>
                            )
                        }
                    </label>
                </div>
                <br />
                <div className="w-full flex items-center justify-end">
                    <input type="submit" value='التالي' className='w-full 800px:w-[180px] h-[40px] bg-[#46e256] text-[#fff] text-center rounded mt-8 cursor-pointer ' />
                </div>
                <br />
                <br />
            </form>
        </div>
    )
}

export default CourseInfo;