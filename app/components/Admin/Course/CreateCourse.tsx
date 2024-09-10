'use client'
import React, {FC, useEffect, useState} from 'react';
import CourseInfo from './CourseInfo';
import CourseOptions from './CourseOptions';
import CourseData from './CourseData';
import CourseContent from './CourseContent';
import CoursePreview from './CoursePreview';
import { useCreateCourseMutation } from '@/redux/features/courses/coursesApi';
import { toast } from 'react-hot-toast';
import { redirect } from 'next/navigation';

type Props={

}

const CreateCourse:FC<Props> = () => {
    const [active,setActive] = useState(0);
    const [courseInfo,setCourseInfo] = useState({
        name: '',
        description: '',
        price: '',
        estimatedPrice: '',
        tags: '',
        level: '',
        categories: '',
        demoUrl: '',
        thumbnail: '',
    });
    const [createCourse,{isSuccess,error,isLoading}] = useCreateCourseMutation();

    useEffect(()=> {
        if(isSuccess){
            toast.success('تم إنشاء الدورة بنجاح');
            redirect('/admin/courses');
        }
        if(error){
            if('data' in error){
                const errMessage = error as any;
                toast.error(errMessage.data.message);
            }
        }
    },[isSuccess,error,isLoading])


    const [benefits,setBenefits] = useState([{title: ''}]);
    const [prerequisites,setPrerequisites] = useState([{title: ''}]);
    const [courseContentData,setCourseContentData] = useState([
        {
            videoUrl: '',
            title: '',
            description: '',
            videoSection: 'Untitled Section',
            videoLength: '',
            links: [
                {
                    title: '',
                    url: ''
                }
            ],
            suggestion: ''
        }
    ]);
    const [courseData,setCourseData] = useState({});

    const handleSubmit = async () =>{
        // foramate arrays bcs, it's come from backend as single {object} not [array]
        // Benefit
        const formatedBenefits = benefits.map((benefit)=>({title: benefit.title}));
        // Prerequisites
        const formatedPrerequisites = prerequisites.map((prerequisite)=>({title: prerequisite.title}));
        // CourseContentData
        const formatedCourseContentData = courseContentData.map((courseContent)=>({
            videoUrl: courseContent.videoUrl,
            videoLength: courseContent.videoLength,
            title: courseContent.title,
            videoSection: courseContent.videoSection,
            links: courseContent.links.map((link)=> ({
                title: link.title,
                url: link.url
            })),
            suggestion: courseContent.suggestion
        }));
        // prepare ALL data
        const data = {
            name: courseInfo.name,
            description: courseInfo.description,
            price: courseInfo.price,
            estimatedPrice: courseInfo.estimatedPrice,
            tags: courseInfo.tags,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl,
            thumbnail: courseInfo.thumbnail,
            totalVideo: courseContentData.length,
            benefits: formatedBenefits,
            prerequisites: formatedPrerequisites,
            courseData: formatedCourseContentData
        }
        // send the final data (pure)
        setCourseData(data);
    }

    console.log(courseData);

    const handleCreateCourse = async (e:any) =>{
        const data = courseData;
        
        if(!isLoading){
            await createCourse(data);
        }
    }

    return(
        <div className="w-full flex min-h-screen">
            <div className="w-[80%]">
                {
                    active === 0 && (
                        <CourseInfo courseInfo={courseInfo} setCourseInfo={setCourseInfo} active={active} setActive={setActive} />
                    )
                }
                {
                    active === 1 && (
                        <CourseData benefits={benefits} setBenefits={setBenefits} prerequisites={prerequisites} setPrerequisites={setPrerequisites} active={active} setActive={setActive} />
                    )
                }
                {
                    active === 2 && (
                        <CourseContent handleSubmit={handleSubmit} courseContentData={courseContentData} setCourseContentData={setCourseContentData} active={active} setActive={setActive} />
                    )
                }
                {
                    active === 3 && (
                        <CoursePreview courseData={courseData} handleCreateCourse={handleCreateCourse} isEdit={false} active={active} setActive={setActive} />
                    )
                }
            </div>
            <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 left-0 ">
                <CourseOptions active={active} setActive={setActive}/>
            </div>
        </div>
    )
}

export default CreateCourse;