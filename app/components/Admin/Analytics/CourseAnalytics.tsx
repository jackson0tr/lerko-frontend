import React, { FC } from 'react';
import {
    BarChart,
    Bar,
    ResponsiveContainer,
    XAxis,
    Label,
    YAxis,
    LabelList
} from 'recharts'
import Loader from '../../Loader/Loader';
import { useGetCoursesAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import { style } from '@/app/style/style';

type Props ={

}

const CourseAnalytics:FC = () => {
    const {data,isLoading} = useGetCoursesAnalyticsQuery({});
    //  static data
    const analyticsData=[
        {name: 'January 2023', uv: 3000},
        {name: 'February 2023', uv: 345},
        {name: 'March 2023', uv: 432},
        {name: 'April 2023', uv: 1000},
        {name: 'May 2023', uv: 2040},
        {name: 'June 2023', uv: 300},
        {name: 'July 2023', uv: 2000},
        {name: 'August 2023', uv: 500},
        {name: 'Sept 2023', uv: 700},
        {name: 'October 2023', uv: 2000},
        {name: 'Nov 2023', uv: 500},
        {name: 'December 2023', uv: 700},
    ]
    const minValue = 0;
    // dynamic data
    // const analyticsData:any=[];

    // data && data?.courses?.last12Months?.forEach((item:any)=>{
    //     analyticsData.push({name: item.month, uv: item.count})
    // })


    return(
        <>
            {
                isLoading ? (
                    <Loader/>
                ) : (
                    <div className="h-screen">
                        <div className="800px:mt-[50px] mt-[70px]">
                            <h1 className={`${style.title} px-7 !text-start`}>
                            تحليلات الدورات
                            </h1>
                            <p className={`${style.label} px-7`}>
                            آخر 12 شهرًا
                            </p>
                        </div>
                        <div className="w-full h-[90%] flex items-center justify-center">
                            <ResponsiveContainer width='90%' height='50%'>
                                <BarChart data={analyticsData} width={150} height={300}>
                                    <XAxis dataKey='name'>
                                        <Label offset={0} position={'insideBottom'} />
                                    </XAxis>
                                    <YAxis domain={[minValue, 'auto']} />
                                        <Bar dataKey='uv' fill='#3faf82'>
                                            <LabelList dataKey='uv' position='top' />
                                        </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default CourseAnalytics;