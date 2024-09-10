import { useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import React, { FC } from 'react';
import Loader from '../../Loader/Loader';
import { style } from '@/app/style/style';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type Props={
    isDashboard?:boolean;
}

const UserAnalytics:FC<Props> = ({isDashboard}) => {
    const {isLoading,data} = useGetUsersAnalyticsQuery({});

    //  static data
    const analyticsData=[
        {name: 'January 2023', count: 3000},
        {name: 'February 2023', count: 345},
        {name: 'March 2023', count: 432},
        {name: 'April 2023', count: 103},
        {name: 'May 2023', count: 240},
        {name: 'June 2023', count: 172},
        {name: 'July 2023', count: 527},
        {name: 'August 2023', count: 562},
        {name: 'Sept 2023', count: 637},
        {name: 'October 2023', count: 200},
        {name: 'Nov 2023', count: 599},
        {name: 'December 2023', count: 740},
    ]
    
    //  dynmic data
    // const analyticsData:any=[];

    // data && data?.users?.last12Months?.forEach((item:any)=>{
    //     analyticsData.push({name: item.month, count: item.count})
    // })
    

    return(
        <>
            {
            isLoading ? (
                <Loader/>
            ) : (
                <div className={`${!isDashboard ? 'pt-[50px]' : 'pt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm'}`}>
                    <div className={`${isDashboard ? '!mr-8 mb-5': ''}`}>
                        <h1 className={`${style.title} ${isDashboard && '!text-[20px]'} px-7 !text-start`} >
                        تحليلات المستخدم
                        </h1>
                        {
                            !isDashboard && (
                                <p className={`${style.label} px-7`}> 
                                    بيانات تحليلية لآخر 12 شهرًا {' '}
                                </p>
                            ) 
                        }
                    </div>
                    <div className={`w-full ${isDashboard ? 'h-[30vh]' : 'h-screen'} flex items-center justify-center`}>
                        <ResponsiveContainer width={isDashboard ? '100%' : '90%'} height={isDashboard ? '50%' : '100%'}>
                            <AreaChart data={analyticsData} margin={{top: 20, right: 30, left: 0, bottom: 0}}>
                                <XAxis dataKey='name'/>
                                <YAxis/>
                                <Tooltip/>
                                <Area type='monotone' dataKey='count' stroke='#4d62d9' fill='#4d62d9' />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default UserAnalytics;