import React, { FC, useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { MdOutlineOndemandVideo } from 'react-icons/md';

type Props={
    data:any;
    activeVideo?:number;
    setActiveVideo?:any;
    isDemo?:boolean;
}

const CourseContentList:FC<Props> = ({data,isDemo,activeVideo,setActiveVideo}) => {

    const [visibleSections,setVisibleSections] = useState<Set<string>>(new Set<string>());

    const videoSections:string[] = [...new Set<string>(data?.map((item:any)=>item.videoSection))];

    let totalCount:number = 0;

    const toggleSection = (section:string)=>{
        const newVisibleSections = new Set(visibleSections);
        if(newVisibleSections.has(section)){
            newVisibleSections.delete(section);
        }else{
            newVisibleSections.add(section);
        }
        setVisibleSections(newVisibleSections);
    } 

    return(
        <div className={`mt-[15px] w-full ${!isDemo && 'mr-[-30px] sticky top-24 left-0 z-30'} `}>
            {
                videoSections.map((section:string,sectionIndex:number)=>{
                    const isSectionVisible = visibleSections.has(section);

                    const sectionVideos:any[]=data.filter(
                        (item:any)=>item.videoSection === section
                    );

                    const sectionVideoCount:number = sectionVideos.length;

                    const sectionVideoLength:number = sectionVideos.reduce(
                        (totalLength: number,item:any)=> totalLength + item.videoLength , 0);

                    const sectionStartIndex:number = totalCount;

                    totalCount += sectionVideoCount;

                    const sectionContentHours:number = sectionVideoLength / 60;

                    return(
                        <div key={section} className={`${!isDemo && 'border-b border-[#ffffffe] pb-2'}`}>
                            <div className="w-full flex">
                                <div className="w-full flex justify-between items-center">
                                    <h2 className='text-[22px] text-[#333] dark:text-[#fff] '>
                                        {section}
                                    </h2>
                                    <button className='mr-4 cursor-pointer text-[#333] dark:text-[#fff]'
                                    onClick={()=>toggleSection(section)} >
                                        {
                                            isSectionVisible ? (
                                                <BsChevronUp size={20}/>
                                            ) : (
                                                <BsChevronDown size={20}/>
                                            )
                                        }
                                    </button>
                                </div>
                            </div>
                            <h5 className='text-[#333] dark:text-[#fff]'>
                                {sectionVideoCount} دروس {' '}
                                {sectionVideoLength < 60 ? sectionVideoLength : sectionContentHours.toFixed(2)} {' '}
                                {sectionVideoLength > 60 ? 'عدد الساعات' : 'عدد الدقائق'}
                            </h5>
                            <br />
                            {
                                isSectionVisible && (
                                    <div className="w-full">
                                        {
                                            sectionVideos.map((item:any,index:number)=> {
                                                const videoIndex:number = sectionStartIndex + index;
                                                const contentLength:number = item.videoLength / 60;

                                                return(
                                                    <div 
                                                    onClick={()=>isDemo? null : setActiveVideo(videoIndex)} 
                                                    key={item._id} 
                                                    className={`w-full cursor-pointer transition-all p-2 ${videoIndex === activeVideo ? 'bg-[#ffffffe]' : ''}`}>
                                                        <div className="flex items-start">
                                                            <div>
                                                                <MdOutlineOndemandVideo size={25} className='m-2' color='#1cdada' />
                                                            </div>
                                                            <h1 className='text-[18px] inline-block break-words text-[#333] dark:text-[#fff] '>
                                                                {item.title}
                                                            </h1>
                                                        </div>
                                                        <h5 className='pr-8 text-[#333] dark:text-[#fff]'>
                                                            {item.videoLength > 60 ? contentLength.toFixed(2) : item.videoLength} {' '}
                                                            {item.videoLength > 60 ? 'عدد الساعات' : 'عدد الدقائق'} 
                                                        </h5>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CourseContentList;