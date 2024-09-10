import { style } from '@/app/style/style';
import React, { FC, useState } from 'react';
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { BiSolidPencil } from 'react-icons/bi';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { BsLink45Deg } from 'react-icons/bs';
import { toast } from 'react-hot-toast';

type Props = {
    courseContentData: any;
    setCourseContentData: (courseContentData: any) => void;
    active: number;
    setActive: (active: number) => void;
    handleSubmit: any;
}

const CourseContent: FC<Props> = ({ active, setActive, courseContentData, setCourseContentData, handleSubmit: handleCourse }) => {

    const [isCollapsed, setIsCollapsed] = useState(
        Array(courseContentData?.length).fill(false)
    )

    const [activeSection, setActiveSection] = useState(1);

    const handleSubmit = (e: any) => {
        e.preventDefault();
    }

    const handleCollapseToggle = (index: number) => {
        const updatedCollapsed = [...isCollapsed];
        updatedCollapsed[index] = !updatedCollapsed[index];
        setIsCollapsed(updatedCollapsed);
    }

    const handleRemoveLink = (index: number, linkIndex: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].links.splice(linkIndex, 1);
        setCourseContentData(updatedData);
    }

    const handleAddLink = (index: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].links.push({ title: '', url: '' });
        setCourseContentData(updatedData);
    }

    const handleAddNewContent = (item: any) => {
        if (item.title === '' || item.description === '' || item.videoUrl === '' || item.links[0].title === '' || item.links[0].url === '') {
            toast.error('يرجي ملئ الحقول اولا')
        } else {
            let newVideoSection = '';
            if (courseContentData?.length > 0) {
                const lastVideoSection = courseContentData[courseContentData?.length - 1].videoSection;

                if (lastVideoSection) {
                    newVideoSection = lastVideoSection;
                }
            }

            const newContent = {
                videoUrl: '',
                title: '',
                description: '',
                videoSection: newVideoSection,
                links: [{ title: '', url: '' }]
            }

            setCourseContentData([...courseContentData, newContent]);
        }
    }

    const handleAddNewSection = () => {
        if (
            courseContentData[courseContentData?.length - 1].title === '' ||
            courseContentData[courseContentData?.length - 1].description === '' ||
            courseContentData[courseContentData?.length - 1].videoUrl === '' ||
            courseContentData[courseContentData?.length - 1].links[0].title === '' ||
            courseContentData[courseContentData?.length - 1].links[0].title === ''
        ) {
            toast.error('يرجي ملئ الحقول اولا');
        } else {
            setActiveSection(active + 1);

            const newContent = {
                videoUrl: '',
                title: '',
                description: '',
                videoSection: `دون عنوان ${activeSection}`,
                links: [{ title: '', url: '' }]
            }

            setCourseContentData([...courseContentData, newContent]);
        }
    }

    const prevButton = () => {
        setActive(active - 1);
    }

    const nextButton = () => {
        if (
            courseContentData[courseContentData?.length - 1].title === '' ||
            courseContentData[courseContentData?.length - 1].description === '' ||
            courseContentData[courseContentData?.length - 1].videoUrl === '' ||
            courseContentData[courseContentData?.length - 1].links[0].title === '' ||
            courseContentData[courseContentData?.length - 1].links[0].title === ''
        ) {
            toast.error('يرجي املاء الحقل الفارغ')
        } else {
            setActive(active + 1);
            handleCourse();
        }
    }

    console.log("courseContentData:__ ", courseContentData);

    return (
        <div className="w-[80%] m-auto mt-24 p-3 ">
            <form onSubmit={handleSubmit}>
                {
                    courseContentData?.map((item: any, index: number) => {

                        const showSectionInput = index === 0 || item.videoSection !== courseContentData[index - 1].videoSection;

                        return (
                            <>
                                <div className={`w-full bg-[#cdc8c817] p-4 
                                    ${showSectionInput ? 'mt-10' : 'mb-0 mt-10'}
                                `} key={index}>
                                    {
                                        showSectionInput && (
                                            <>
                                                <div className="flex w-full items-center">
                                                    <input
                                                        type="text"
                                                        className={`text-[20px] font-Poppins cursor-pointer dark:text-[#fff] text-[#333] bg-transparent outline-none ${item.videoSection === 'Untitled Section' ? 'w-[170px]' : 'w-min'
                                                            } `} value={item.videoSection}
                                                        onChange={(e) => {
                                                            const updatedData = [...courseContentData];
                                                            updatedData[index].videoSection = e.target.value;
                                                            setCourseContentData(updatedData);
                                                        }} />
                                                    <BiSolidPencil className='cursor-pointer text-[#333] dark:text-[#fff]' />
                                                </div>
                                                <br />
                                            </>
                                        )
                                    }
                                    <div className="flex w-full items-center justify-between my-0">
                                        {
                                            isCollapsed[index] ? (
                                                <>
                                                    {
                                                        item.title ? (
                                                            <p className='font-Poppins text-[#333] dark:text-[#fff]'>
                                                                {index + 1}.{item.title}
                                                            </p>
                                                        ) : <></>
                                                    }
                                                </>
                                            ) : (
                                                <div></div>
                                            )
                                        }
                                        {/* collaps video content */}
                                        <div className="flex items-center">
                                            <AiOutlineDelete className={`dark:text-[#fff] text-[20px] mr-2 text-[#333] ${index > 0 ? 'cursor-pointer' : 'cursor-no-drop'
                                                } `} onClick={() => {
                                                    if (index > 0) {
                                                        const updatedData = [...courseContentData];
                                                        updatedData.splice(index, 1);
                                                        setCourseContentData(updatedData);
                                                    }
                                                }} />
                                            <MdOutlineKeyboardArrowDown
                                                fontSize='large'
                                                className='text-[#333] cursor-pointer dark:text-[#fff]'
                                                style={{
                                                    transform: isCollapsed[index] ? 'rotate(180deg)' : 'rotate(0deg)'
                                                }}
                                                onClick={() => handleCollapseToggle(index)} />
                                        </div>
                                    </div>
                                    {
                                        !isCollapsed[index] && (
                                            <>
                                                <div className="my-3">
                                                    <label className={style.label}>عنوان الفديو</label>
                                                    <input
                                                        type="text"
                                                        placeholder='ادخل عنوان الفديو'
                                                        className={style.input} value={item.title}
                                                        onChange={(e) => {
                                                            const updatedData = [...courseContentData];
                                                            updatedData[index].title = e.target.value;
                                                            setCourseContentData(updatedData);
                                                        }} />
                                                </div>
                                                <div className="my-3">
                                                    <label className={style.label}>لينك الفديو</label>
                                                    <input
                                                        type="text"
                                                        placeholder='ادخل لينك الفديو'
                                                        className={style.input} value={item.videoUrl}
                                                        onChange={(e) => {
                                                            const updatedData = [...courseContentData];
                                                            updatedData[index].videoUrl = e.target.value;
                                                            setCourseContentData(updatedData);
                                                        }} />
                                                </div>
                                                <div className="my-3">
                                                    <label className={style.label}>طول الفديو</label>
                                                    <input
                                                        type="number"
                                                        placeholder='ادخل طول الفديو'
                                                        className={style.input} value={item.videoLength}
                                                        onChange={(e) => {
                                                            const updatedData = [...courseContentData];
                                                            updatedData[index].videoLength = e.target.value;
                                                            setCourseContentData(updatedData);
                                                        }} />
                                                </div>
                                                <div className="my-3">
                                                    <label className={style.label}>وصف الفديو</label>
                                                    <textarea
                                                        rows={8}
                                                        cols={30}
                                                        placeholder='ادخل وصف الفديو'
                                                        className={`${style.input} !h-min py-2`}
                                                        value={item.descriptionDetails}
                                                        onChange={(e) => {
                                                            const updatedData = [...courseContentData];
                                                            const newContent = {
                                                                ...updatedData[index],  // Create a new object based on the existing one
                                                                descriptionDetails: e.target.value  // Update the description property
                                                            };
                                                            updatedData[index] = newContent;  // Replace the old object with the new one
                                                            setCourseContentData(updatedData);  // Update the state with the new array
                                                        }}
                                                    // onChange={(e)=>{
                                                    //     const updatedData = [...courseContentData];
                                                    //     updatedData[index].description = e.target.value;
                                                    //     setCourseContentData(updatedData);
                                                    // }} 
                                                    />
                                                    <br />
                                                </div>
                                                {
                                                    item?.links.map((link: any, linkIndex: number) => (
                                                        <div className="mb-3 block" key={linkIndex}>
                                                            <div className="w-full flex items-center justify-between">
                                                                <label className={style.label}>رابط {linkIndex + 1}</label>
                                                                <AiOutlineDelete className={`text-[20px] text-[#333] dark:text-[#fff] ${linkIndex === 0 ? 'cursor-no-drop' : 'cursor-pointer'
                                                                    } `}
                                                                    onClick={() => linkIndex === 0 ? null : handleRemoveLink(index, linkIndex)} />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className={style.input}
                                                                value={link.title}
                                                                placeholder='ادخل عنوان الرابط'
                                                                onChange={(e) => {
                                                                    const updatedData = [...courseContentData];
                                                                    updatedData[index].links[linkIndex].title = e.target.value;
                                                                    setCourseContentData(updatedData);
                                                                }} />
                                                            <input
                                                                type="url"
                                                                className={`${style.input} mt-6`}
                                                                value={link.url}
                                                                placeholder='ادخل الرابط'
                                                                onChange={(e) => {
                                                                    const updatedData = [...courseContentData];
                                                                    updatedData[index].links[linkIndex].url = e.target.value;
                                                                    setCourseContentData(updatedData);
                                                                }} />
                                                        </div>
                                                    ))
                                                }
                                                <br />
                                                <div className="mb-4 inline-block">
                                                    <p className="flex items-center text-[18px] dark:text-[#fff] text-[#333] cursor-pointer"
                                                        onClick={() => handleAddLink(index)}>
                                                        <BsLink45Deg className='mr-2 text-[#333] dark:text-[#fff]' /> اضف رابط
                                                    </p>
                                                </div>
                                            </>
                                        )
                                    }
                                    <br />
                                    {
                                        index === courseContentData.length - 1 && (
                                            <div>
                                                <p className="flex items-center text-[18px] dark:text-[#fff] text-[#333] cursor-pointer"
                                                    onClick={() => handleAddNewContent(item)}>
                                                    <AiOutlinePlusCircle className='mr-2 text-[#333] dark:text-[#fff]' /> اضافة محتوي جديد
                                                </p>
                                            </div>
                                        )
                                    }
                                </div>
                            </>
                        )
                    })
                }
                <br />
                <div
                    onClick={() => handleAddNewSection()}
                    className="flex items-center text-20px dark:text-[#fff] text-[#333] cursor-pointer">
                    <AiOutlinePlusCircle className='mr-2 text-[#333] dark:text-[#fff]' /> اضافة سكشن جديدة
                </div>
            </form>
            <br />
            <div className="w-full flex items-center justify-between">
                <div className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#46e256] text-center text-[#fff] rounded mt-8 cursor-pointer" onClick={() => prevButton()}>
                    السابق
                </div>
                <div className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#46e256] text-center text-[#fff] rounded mt-8 cursor-pointer" onClick={() => nextButton()}>
                    التالي
                </div>
            </div>
            <br />
            <br />
            <br />
        </div>
    )
}

export default CourseContent;