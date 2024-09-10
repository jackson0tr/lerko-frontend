import { useGetCourseContentQuery } from '@/redux/features/courses/coursesApi';
import React, { FC, useState } from 'react';
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import CourseContentMedia from './CourseContentMedia';
import Header from '../Header';
import Footer from '../Footer';
import CourseContentList from './CourseContentList';


type Props={
    id:string;
    user:any;
}

const CourseContentPaid:FC<Props> = ({id,user}) => {
    const {data:dataContent,isLoading,refetch} = useGetCourseContentQuery(id,{refetchOnMountOrArgChange:true});
    const data = dataContent?.content;
    const [activeVideo,setActiveVideo] = useState(0);
    const [open,setOpen] = useState(false);
    const [route,setRoute] = useState('Login');

    return(
        <>
            {
                isLoading ? (
                    <Loader/>
                ) : (
                    <>
                        <Header route={route} setRoute={setRoute} activeItem={1} setOpen={setOpen} open={open} />
                        <div className='w-full grid 800px:grid-cols-10'>
                        <Heading title={data[activeVideo]?.title + " - " + "ليركو"}
                        description="صفحة محتوى دورة ليركو المدفوعة" 
                        keywords={data[activeVideo]?.tags} />
                        <div className="col-span-7">
                            <CourseContentMedia 
                            user={user} 
                            data={data} 
                            refetch={refetch} 
                            id={id} 
                            activeVideo={activeVideo} 
                            setActiveVideo={setActiveVideo}
                            />
                            <br />
                            <br />
                        </div>
                        <div className="800px:pl-5 pr-5 hidden 800px:block pt-[50px] 800px:col-span-3">
                            <CourseContentList 
                            data={data}
                             activeVideo={activeVideo} 
                             setActiveVideo={setActiveVideo}
                             />
                        </div>
                        </div>
                        <br />
                        <br />
                        <Footer/>
                    </>
                )
            }
        </>
    )
}

export default CourseContentPaid;