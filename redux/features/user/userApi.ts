import { apiSlice } from "../api/apiSlice";


export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        updateAvatar: builder.mutation({
            query:(avatar)=>({
                url:'pic',
                method:"PUT",
                body:{avatar},
                credentials: "include" as const
            })
        }),
        updateProfile: builder.mutation({
            query: ({name})=>({
                url:'update',
                method:"PUT",
                body:{name},
                credentials: "include" as const
            })
        }),
        updatePassword: builder.mutation({
            query: ({oldPassword,newPassword})=>({
                url:'updatePassword',
                method:"PUT",
                body:{oldPassword,newPassword},
                credentials: "include" as const
            })
        }),
        getAllUsers: builder.query({
            query: ()=>({
                url:'all',
                method:"GET",
                credentials: "include" as const
            })
        }),
        updatedUserRole: builder.mutation({
            query: ({id,role})=>({
                url:'update-role',
                method:"PUT",
                body: {id,role},
                credentials: "include" as const
            })
        }),
        deleteUser: builder.mutation({
            query: (id)=>({
                url:`delete-user/${id}`,
                method:"DELETE",
                credentials: "include" as const
            })
        }),
    })
});

export const {useUpdateAvatarMutation,useUpdateProfileMutation,useUpdatePasswordMutation,useGetAllUsersQuery,useUpdatedUserRoleMutation,useDeleteUserMutation} = userApi;