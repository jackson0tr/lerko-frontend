import { apiSlice } from "../api/apiSlice";


export const notificationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        getAllNotifications: builder.query({
            query:()=>({
                url: `get-notification`,
                method:"GET",
                credentials: "include" as const
            })
        }),        
        updateNotifications: builder.mutation({
            query:(id)=>({
                url: `update/${id}`,
                method:"PUT",
                credentials: "include" as const
            })
        }),        
    })
});

export const {useGetAllNotificationsQuery,useUpdateNotificationsMutation} = notificationsApi;

