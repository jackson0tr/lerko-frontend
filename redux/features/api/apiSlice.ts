import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        // baseUrl: process.env.URI || 'http://localhost:8000/api/'
        baseUrl: process.env.URI || 'https://lerko-backend.vercel.app/api/'
    }),
    endpoints: (builder)=>({
        refreshToken: builder.query({
            query: (data)=> ({
                url: "refresh",
                method: "GET",
                credentials: "include" as const
            })
        }),
        loadUser: builder.query({
            query: (data)=> ({
                url: "userInfo",
                method: "GET",
                credentials: "include" as const
            }),
            async onQueryStarted(arg, {queryFulfilled,dispatch}){
                try{
                    const result = await queryFulfilled;
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user
                        })
                    )
                }catch(err:any){
                    console.log(err.message,err);
                }
            }
        }),
    })
});

export const {useRefreshTokenQuery,useLoadUserQuery} = apiSlice;

