import { apiSlice } from "../api/apiSlice";


export const analyticsApi = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        getCoursesAnalytics: builder.query({
            query:()=>({
                url: "get-courses",
                method:"GET",
                credentials: "include" as const
            })
        }),        
        getOrdersAnalytics: builder.query({
            query:()=>({
                url: "get-orders",
                method:"GET",
                credentials: "include" as const
            })
        }),        
        getUsersAnalytics: builder.query({
            query:()=>({
                url: "get-users",
                method:"GET",
                credentials: "include" as const
            })
        }),        
    })
});

export const {useGetCoursesAnalyticsQuery,useGetOrdersAnalyticsQuery,useGetUsersAnalyticsQuery} = analyticsApi;

