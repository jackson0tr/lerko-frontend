import React, { FC } from 'react';
import { useGetOrdersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import Loader from '../../Loader/Loader';
import { style } from '@/app/style/style';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts';

type Props={
    isDashboard?:boolean;
}

const OrderAnalytics:FC<Props> = ({isDashboard}) => {
    const {data,isLoading} = useGetOrdersAnalyticsQuery({});

    //  static data
    const analyticsData=[
        {name: 'Page A', count: 3000},
        {name: 'Page B', count: 345},
        {name: 'Page C', count: 432},
        {name: 'Page D', count: 103},
        {name: 'Page E', count: 240},
        {name: 'Page F', count: 172},
        {name: 'Page G', count: 527},
        {name: 'Page H', count: 562},
    ]
    //  dynmic data
    // const analyticsData:any=[];

    // data && data?.orders?.last12Months?.forEach((item:any)=>{
    //     analyticsData.push({name: item.month, count: item.count})
    // })


    return(
       <>
            {
                isLoading ? (
                    <Loader/>
                ): (
                    <div className={isDashboard ? 'h-[30vh]' : 'h-screen'}>
                        <div className={isDashboard ? 'mt-0 pr-[40px] mb-2' : 'mt-[50px]'}>
                            <h1 className={`${style.title} ${isDashboard && '!text-[20px]'} px-7 !text-start`}>
                            تحليلات الطلبات
                            </h1>
                            {
                                !isDashboard && (
                                    <p className={`${style.label} px-7`}>
                                        بيانات تحليلية لآخر 12 شهرًا {' '}
                                    </p>
                                )
                            }
                        </div>
                        <div className={`${isDashboard ? 'h-[90%]' : 'h-full'} flex items-center justify-center w-full`}>
                            <ResponsiveContainer width={isDashboard ? '100%' : '90%'} height={isDashboard ? '100%' : '50%'} >
                                <LineChart width={500} height={300} data={analyticsData} margin={{top:5, right:30, left:20, bottom:5}}>
                                    <CartesianGrid strokeDasharray='3 3' />
                                    <YAxis/>
                                    <Tooltip/>
                                    {!isDashboard && <Legend/>}
                                    <Line type='monotone' dataKey='count' stroke='#82ca9d' />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )
            }
       </>
    )
}

export default OrderAnalytics;