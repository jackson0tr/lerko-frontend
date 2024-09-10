import { apiSlice } from "../api/apiSlice";


export const coursesApi = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        createCourse: builder.mutation({
            query: (data)=> ({
                url: 'upload',
                method: "POST",
                body: data,
                credentials: "include" as const
            })
        }),
        getAllCourses: builder.query({
            query: ()=> ({
                url: 'get-all',
                method: "GET",
                credentials: "include" as const
            })
        }),
        editCourse: builder.mutation({
            query: ({id,data})=> ({
                url: `edit/${id}`,
                method: "PUT",
                body: {data},
                credentials: "include" as const
            })
        }),
        deleteCourse: builder.mutation({
            query: (id)=> ({
                url: `delete-course/${id}`,
                method: "DELETE",
                credentials: "include" as const
            })
        }),
        getUserAllCourses: builder.query({
            query: ()=> ({
                url: 'all-courses',
                method: "GET",
                credentials: "include" as const
            })
        }),
        getCourseDetails: builder.query({
            query: (id)=> ({
                url: `get-course/${id}`,
                method: "GET",
                credentials: "include" as const
            })
        }),
        getCourseContent: builder.query({
            query: (id)=> ({
                url: `paid/${id}`,
                method: "GET",
                credentials: "include" as const
            })
        }),
        addNewQuestion: builder.mutation({
            query: ({question, courseId, contentId})=> ({
                url: `question`,
                method: "PUT",
                body: {question, courseId, contentId},
                credentials: "include" as const
            })
        }),
        addAnswerInQuestion: builder.mutation({
            query: ({answer,questionId, courseId, contentId})=> ({
                url: `answer`,
                method: "PUT",
                body: {answer,questionId, courseId, contentId},
                credentials: "include" as const
            })
        }),
        addReview: builder.mutation({
            query: ({courseId,review,rating})=> ({
                url: `review/${courseId}`,
                method: "PUT",
                body: {review,rating},
                credentials: "include" as const
            })
        }),
        addReply: builder.mutation({
            query: ({comment,courseId,reviewId})=> ({
                url: `reply`,
                method: "PUT",
                body: {comment,courseId,reviewId},
                credentials: "include" as const
            })
        }),
        courseSearch: builder.query({
            query: ({key})=> ({
                url: `/search/${key}`,
                method: 'GET',
                credentials: "include" as const
            })
        })
    })
});


export const {
    useCreateCourseMutation,
    useGetAllCoursesQuery,
    useEditCourseMutation,
    useDeleteCourseMutation,
    useGetUserAllCoursesQuery,
    useGetCourseDetailsQuery,
    useGetCourseContentQuery,
    useAddNewQuestionMutation,
    useAddAnswerInQuestionMutation,
    useAddReviewMutation,
    useAddReplyMutation,
    useCourseSearchQuery} = coursesApi;