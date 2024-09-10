import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegistration, userActivation, userResetPassword } from "./authSlice";

type RegistrationResponse={
    message:string;
    activationToken:string;
}
type RegistrationDate={

}

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        register: builder.mutation<RegistrationResponse,RegistrationDate>({
            query: (data)=>({
                url:"register",
                method:"POST",
                body: data,
                credentials: "include" as const,
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try{
                    const result = await queryFulfilled;
                    dispatch(
                        userRegistration({
                            token: result.data.activationToken
                        })
                    )
                }catch(err:any){
                    console.log(err.message);
                }
            }
        }),
        activation: builder.mutation({
            query: ({activation_token,activation_code}) => ({
                url: "activeUser",
                method: "POST",
                body: {
                    activation_token,
                    activation_code
                },
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try{
                    const result = await queryFulfilled;
                    dispatch(
                        userActivation({
                            activateToken: result.data.activateToken
                        })
                    )
                }catch(err:any){
                    console.log(err.message);
                }
            }
        }),
        login: builder.mutation({
            query:({email,password})=>({
                url:"login",
                method:"POST",
                body:{
                    email,
                    password
                },
                credentials: "include" as const
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try{
                    const result = await queryFulfilled;
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user
                        })
                    )
                }catch(err:any){
                    console.log(err,err.message);
                }
            }
        }),
        socialAuth: builder.mutation({
            query:({email,name,avatar})=>({
                url:"socialAuth",
                method:"POST",
                body:{
                    email,
                    name,
                    avatar
                },
                credentials: "include" as const
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try{
                    const result = await queryFulfilled;
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user
                        })
                    )
                }catch(err:any){
                    console.log(err.message);
                }
            }
        }),
        logout: builder.query({
            query:()=>({
                url:"logout",
                method:"GET",
                credentials: "include" as const
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try{
                    dispatch(
                        userLoggedOut()
                    )
                }catch(err:any){
                    console.log(err.message);
                }
            }
        }),
        forgetPassword: builder.mutation({
            query:({email})=>({
                url:"forget-password",
                method:"POST",
                body: {email},
                credentials: "include" as const
            }),
        }),
        resetPassword: builder.mutation({
            query:({password,id,token})=>({
                url:`reset-password/${id}/${token}`,
                method:"POST",
                body: {password},
                credentials: "include" as const
            })
        })
    }),
});

export const {
    useRegisterMutation,
    useActivationMutation,
    useLoginMutation,
    useSocialAuthMutation,
    useLogoutQuery,
    useForgetPasswordMutation,
    useResetPasswordMutation
} = authApi;   

