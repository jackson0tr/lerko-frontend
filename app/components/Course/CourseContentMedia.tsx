import { style } from "@/app/style/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar } from "react-icons/ai";
import defaultAvatar from '../../../public/imgs/user.png';
import { toast } from "react-hot-toast";
import { useAddAnswerInQuestionMutation, useAddNewQuestionMutation, useAddReplyMutation, useAddReviewMutation, useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import { format } from "timeago.js";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import Ratings from "@/app/utils/Ratings";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.PUBLIC_SOCKET_SERVER || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
    data: any;
    id: string;
    activeVideo: number;
    setActiveVideo: (activeVideo: number) => void;
    user: any;
    refetch: any;
}

const CommentItem = ({ data, activeVideo, answerIsLoading, user, item, answer, setAnswer, questionId, setQuestionId, handleAnswerSubmit }: any) => {
    const [replyActive, setReplyActive] = useState(false);
    return (
        <>
            <div className="w-full p-5 my-5">
                <div className="flex mb-2">
                    <div>
                        <Image className="w-[50px] h-[50px] object-cover rounded-full" width={50} height={50} src={item.user.avatar ? item.user.avatar.url : defaultAvatar} alt="userAvatar" />
                    </div>
                    <div className="pr-3">
                        <h5 className="text-[20px] text-[#333] dark:text-[#fff]">
                            {item?.user.name}
                        </h5>
                        <p className="text-[#333] dark:text-[#fff]">
                            {item?.question}
                        </p>
                        <small className="dark:text-[#fff] text-[#333]">
                            {!item.createdAt ? "" : format(item?.createdAt)}
                        </small>
                    </div>
                </div>
                <div className="flex w-full">
                    <span
                        className="800px:pr-16 my-5 text-[#333] dark:text-[#fff] cursor-pointer mr-2 "
                        onClick={() =>  {setReplyActive(!replyActive), setQuestionId(item._id)} }>
                        {!replyActive ? item.questionReplies.length !== 0 ? "جميع الردود" : "اضف رد" : "اخفاء الردود"}
                    </span>
                    <BiMessage size={20} className="text-[#333] dark:text-[#fff] cursor-pointer" />
                    <span className="pr-1 mt-[-4px] text-[#333] dark:text-[#fff] cursor-pointer">
                        {item.questionReplies.length}
                    </span>
                </div>
                {
                    replyActive  && (
                        // && questionId === item._id 
                        <>
                            {item.questionReplies.map((item: any) => (
                                <div className="w-full flex 800px:mr-16  text-[#333] dark:text-[#fff] p-5 my-5" key={item._id}>
                                    <div>
                                        <Image className="w-[50px] h-[50px] object-cover rounded-full" width={50} height={50} src={item.user.avatar ? item.user.avatar.url : defaultAvatar} alt="userAvatar" />
                                    </div>
                                    <div className="pr-3">
                                        <div className="flex items-center">
                                            <h5 className="text-[20px] text-[#333] dark:text-[#fff]">
                                                {item.user.name}
                                            </h5>{" "}{item.user.role === 'admin' && <VscVerifiedFilled className="text-[#00ceff] mr-2 text-[20px]" />}
                                        </div>
                                        <p className="dark:text-[#fff] text-[#333]">{item.answer}</p>
                                        <small className="dark:text-[#fff] text-[#333]">
                                            {!item.createdAt ? "" : format(item?.createdAt)}
                                        </small>
                                    </div>
                                    
                                </div>
                            ))}
                            <>
                                <div className="flex w-full relative dark:text-[#fff] text-[#333]">
                                    <input type="text" placeholder="...ادخل ردك" value={answer} onChange={(e) => setAnswer(e.target.value)} className={`block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#333] text-[#333] dark:text-[#fff] dark:border-[#fff] p-[5px] w-[95%] ${answer === "" || answerIsLoading && 'cursor-not-allowed'} `} />
                                    <button type="submit" disabled={answer === "" || answerIsLoading} className="bg-[#00ceff] rounded p-2 text-center text-[#fff] left-0 bottom-1" onClick={handleAnswerSubmit}>
                                        تأكيد
                                    </button>
                                </div>
                            </>
                        </>
                    )
                }
            </div>
        </>
    )
}

const CommentReply = ({ data, activeVideo, answerIsLoading, setActiveVideo, user, setQuestionId, answer, setAnswer, handleAnswerSubmit }: any) => {
    return (
        <div>
            <>
                <div className="w-full my-5">
                    {
                        data[activeVideo].questions.map((item: any, index: number) => (
                            <CommentItem key={index} data={data} setQuestionId={setQuestionId} activeVideo={activeVideo} answer={answer} answerIsLoading={answerIsLoading} item={item} setAnswer={setAnswer} handleAnswerSubmit={handleAnswerSubmit} />
                        ))
                    }
                </div>
            </>
        </div>
    )
}

const CourseContentMedia: FC<Props> = ({
    data, id,
    activeVideo,
    setActiveVideo,
    user,
    refetch
}) => {
    const [activeBar, setActiveBar] = useState(0);
    const [question, setQuestion] = useState('');
    const [rating, setRating] = useState(1);
    const [review, setReview] = useState('');
    const [answer, setAnswer] = useState('');
    const [questionId, setQuestionId] = useState('');
    const [isReviewReply, setIsReviewReply] = useState(false);
    const [reply, setReply] = useState('');
    const [reviewId, setReviewId] = useState('');

    // ADD REVIEW ANSWER
    const [addAnswerInQuestion, { isSuccess: answerSuccess, isLoading: answerIsLoading, error: answerError }] = useAddAnswerInQuestionMutation();
    // ADD REVIEW QUESTION
    const [addNewQuestion, { isSuccess: questionSuccess, isLoading: questionIsLoading, error: questionError }] = useAddNewQuestionMutation();
    // ADD REVIEW MUTATION
    const [addReview, { isLoading: reviewIsLoading, isSuccess: reviewSuccess, error: reviewError }] = useAddReviewMutation();
    // GET COURSE DETAILS
    const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(id, { refetchOnMountOrArgChange: true });
    // ADD  REPLY MUTATION
    const [addReply, { isSuccess: replySuccess, error: replyError, isLoading: replyIsLoading }] = useAddReplyMutation();
    // create it to declare the data
    const course = courseData?.course;

    const isReviewExists = course?.reviews?.find((item: any) => item.user._id === user._id);

    const handleQuestionSubmit = () => {
        if (question.length === 0) {
            toast.error("لا يمكن أن يكون السؤال فارغًا")
        } else {
            addNewQuestion({ question, courseId: id, contentId: data[activeVideo]._id });
        }
    }

    const handleAnswerSubmit = () => {
        addAnswerInQuestion({ answer, questionId: questionId, courseId: id, contentId: data[activeVideo]._id });
    }

    const handleReviewSubmit = async () => {
        if (review.length === 0) {
            toast.error("لا يمكن أن تكون المراجعة فارغة");
        } else {
            addReview({ review, rating, courseId: id });
        }
    }

    const handleReplySubmit = async () => {
        if (!replyIsLoading) {
            if (reply === '') {
                toast.error("الرد لا يمكن أن يكون فارغا");
            } else {
                addReply({ comment: reply, courseId: id, reviewId });
            }
        }
    }

    useEffect(() => {
        if (questionSuccess) {
            setQuestion('');
            refetch();
            toast.success('تم إنشاء السؤال بنجاح!');
            socketId.emit("notification", {
                title: "تم استلام سؤال جديد",
                message: `لديك سؤال جديد في  ${data[activeVideo].title}`,
                userId: user._id,
            });
        }
        if (answerSuccess) {
            setAnswer("");
            refetch();
            toast.success("تمت إضافة الإجابة بنجاح");
            if (user.role !== "admin") {
                socketId.emit("notification", {
                    title: "تم تلقي الرد على سؤال جديد",
                    message: `لديك سؤال جديد الرد في  ${data[activeVideo].title}`,
                    userId: user._id,
                });
            }
        }
        if (reviewSuccess) {
            setReview("");
            setRating(1);
            courseRefetch();
            toast.success("تمت إضافة المراجعة بنجاح");
        }
        if (replySuccess) {
            setReply("");
            courseRefetch();
            toast.success("تمت إضافة الرد بنجاح");
        }
        if (questionError) {
            if ("data" in questionError) {
                const errMessage = questionError.data as any;
                toast.error(errMessage.data.message);
            }
        }
        if (answerError) {
            if ("data" in answerError) {
                const errMessage = answerError.data as any;
                toast.error(errMessage.data.message);
                // toast.error('Somting Wrong!!!!!!');
            }
        }
        if (reviewError) {
            if ("data" in reviewError) {
                const errMessage = reviewError.data as any;
                toast.error(errMessage.data.message);
            }
        }
        if (replyError) {
            if ("data" in replyError) {
                const errMessage = replyError.data as any;
                toast.error(errMessage.data.message);
            }
        }
    }, [questionSuccess, answerSuccess, reviewSuccess, replySuccess, questionError, answerError, reviewError, replyError]);

    return (
        <div className="w-[95%] 800px:w-[85%] py-4 m-auto ">
            <CoursePlayer videoUrl={data[activeVideo]?.videoUrl} title={data[activeVideo]?.title} />
            <div className="w-full flex items-center justify-between my-3">
                <div onClick={() => setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)}
                    className={`${style.button} !min-h-[40px] !w-[unset] !py-[unset] ${activeVideo === 0 && "!cursor-no-drop opacity-[.8]"}`} >
                    <AiOutlineArrowRight className="ml-2" />
                    الدرس السابق
                </div>
                <div onClick={() => setActiveVideo(data && data.length - 1 === activeVideo ? activeVideo : activeVideo + 1)}
                    className={`${style.button} !min-h-[40px] !w-[unset] !py-[unset] ${data?.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"}`} >
                    الدرس التالي
                    <AiOutlineArrowLeft className="mr-2" />
                </div>
            </div>
            <h1 className="pt-2 text-[25px] text-[#333] dark:text-[#fff] font-[600] ">
                {data?.title}
                {data[activeVideo]?.title}
            </h1>
            <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
                {
                    ["ملخص", "موارد", "سؤال وجواب", "التعليقات"].map((text, index) => (
                        <h5
                            onClick={() => setActiveBar(index)}
                            key={index}
                            className={`800px:text-[20px] text-[#333] dark:text-[#fff] cursor-pointer ${activeBar === index && "text-red-500"}`}>
                            {text}
                        </h5>
                    ))
                }
            </div>
            {
                activeBar === 0 && (
                    <p className="text-[28px] text-[#333] dark:text-[#fff] whitespace-pre-line mb-3">
                        {data[activeVideo]?.descriptionDetails}
                    </p>
                )
            }
            {
                activeBar === 1 && (
                    <div className="w-full">
                        {
                            data[activeVideo]?.links?.map((item: any, index: number) => (
                                <div className="mb-5" key={index}>
                                    <h2 className="800px:text-[20px] text-[#333] dark:text-[#fff] 800px:inline-block ">
                                        {item.title && item.title + " :"}
                                    </h2>
                                    <a className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2 " href={item.url}>
                                        {item.url}
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                )
            }
            {
                activeBar === 2 && (
                    <div className="w-full">
                        <div className="w-full flex">
                            <Image className="w-[50px] h-[50px] object-cover rounded-full" width={50} height={50} src={user.avatar ? user.avatar.url : defaultAvatar} alt="userAvatar" />
                            <textarea
                                name=""
                                id=""
                                cols={40}
                                rows={5}
                                placeholder="أكتب سؤالك..."
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                className="outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins "
                            ></textarea>
                        </div>
                        <div className="w-full flex justify-end">
                            <div
                                onClick={questionIsLoading ? () => { } : handleQuestionSubmit}
                                className={`${style.button} !w-[120px] !h-[40px] text-[18px] mt-5 ${questionIsLoading && "cursor-no-allowed"}`}>
                                تأكيد
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className="w-full p-4 h-[1px] bg-[#ffffff3b]"></div>
                            <div className="w-full">
                                <CommentReply data={data} activeVideo={activeVideo} answer={answer} user={user} setQuestionId={setQuestionId} handleAnswerSubmit={handleAnswerSubmit} setAnswer={setAnswer} answerIsLoading={answerIsLoading} />
                            </div>
                        <div>
                        </div>
                    </div>
                )
            }
            {
                activeBar === 3 && (
                    <div className="w-full">
                        <>
                            {
                                !isReviewExists && (
                                    <>
                                        <div className="flex w-full">
                                            <Image className="w-[50px] h-[50px] object-cover rounded-full" width={50} height={50} src={user.avatar ? user.avatar.url : defaultAvatar} alt="userAvatar" />
                                            <div className="w-full">
                                                <h5 className="pr-3 text-[20px] font-[500] dark:text-[#fff] text-[#333]">
                                                    إعطاء تقييم <span className="text-red-500">*</span>
                                                </h5>
                                                <div className="flex w-full ml-2 pb-3">
                                                    {
                                                        [1, 2, 3, 4, 5].map((i) => rating >= i ? (
                                                            <AiFillStar
                                                                key={i}
                                                                size={25}
                                                                color="rgb(246,186,0)"
                                                                className="mr-1 cursor-pointer"
                                                                onClick={() => setRating(i)} />
                                                        ) : (
                                                            <AiOutlineStar
                                                                key={i}
                                                                size={25}
                                                                color="rgb(246,186,0)"
                                                                className="mr-1 cursor-pointer"
                                                                onClick={() => setRating(i)} />
                                                        )
                                                        )}
                                                </div>
                                                <textarea
                                                    name=""
                                                    id=""
                                                    cols={40}
                                                    rows={5}
                                                    placeholder="أكتب تعليقك..."
                                                    value={review}
                                                    onChange={(e) => setReview(e.target.value)}
                                                    className="outline-none bg-transparent mr-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins "
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-end">
                                            <div
                                                onClick={reviewIsLoading ? () => {} : handleReviewSubmit}
                                                className={`${style.button} !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2 ${reviewIsLoading && 'cursor-no-drop'}`}>
                                                تأكيد
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                            <div className="w-full h-[1px] bg-[#ffffff57]"></div>
                            <div className="w-full">
                                {
                                    (course?.reviews && [...course.reviews].reverse())?.map((item: any, index: number) => (
                                        <div className="w-full p-5 my-5" key={index}>
                                            <div className="w-full flex">
                                                <div>
                                                    <Image className="w-[50px] h-[50px] object-cover rounded-full" width={50} height={50} src={item.user.avatar ? item.user.avatar.url : defaultAvatar} alt="userAvatar" />
                                                </div>
                                                <div className="mr-2">
                                                    <h1 className="text-[18px] text-[#333] dark:text-[#fff]">
                                                        {item.user.name}
                                                    </h1>
                                                    <Ratings rating={item.rating} />
                                                    <p className="text-[#333] dark:text-[#fff]">
                                                        {item.comment}
                                                    </p>
                                                    <small className="text-[#333] dark:text-[#fff]">
                                                        {format(item.createdAt)}
                                                    </small>
                                                </div>
                                            </div>
                                            {
                                                user.role === 'admin'  && item.commentReplies?.length === 0  && (
                                                    <span
                                                        onClick={() => {
                                                            setIsReviewReply(true);
                                                            setReviewId(item._id);
                                                        }}
                                                        className={`${style.label} !mr-10 text-[#333] dark:text-[#fff] cursor-pointer`}>
                                                        إضافة رد
                                                    </span>
                                                 )
                                            } 
                                            {
                                                isReviewReply && reviewId === item._id && (
                                                    <>
                                                        <input type="text" onChange={(e: any) => setReply(e.target.value)} value={reply} name="" placeholder="ادخل ردك..." id=""
                                                            className={`block 800px:mr-12 mt-2 dark:border-[#fff] border-[#333] border-b bg-transparent outline-none p-[5px] w-[95%]`}
                                                        />
                                                        <button type="submit" onClick={handleReplySubmit} className="bg-[#00ceff] rounded p-2 text-center text-[#fff] left-0 bottom-1" >
                                                            تأكيد
                                                        </button>
                                                    </>
                                                )
                                            }
                                            {
                                                item.commentReplies?.map((i: any, index: number) => (
                                                    <div className="flex w-full 800px:mr-16 my-5" key={index}>
                                                        <div className="w-[50px] h-[50px]">
                                                            <Image className="w-[50px] h-[50px] object-cover rounded-full" width={50} height={50} src={i.user.avatar ? i.user.avatar.url : defaultAvatar} alt="userAvatar" />
                                                        </div>
                                                        <div className="pr-2">
                                                            <h5 className="text-[20px] text-[#333] dark:text-[#fff]">
                                                                {i.user.name}
                                                            </h5>{" "}{i.user.role === 'admin' && <VscVerifiedFilled className="text-[#00ceff] mr-2 text-[20px]" />}
                                                            <p className="text-[#333] dark:text-[#fff]">
                                                                {i.comment}
                                                            </p>
                                                            <small className="text-[#ffffff83] dark:text-[#fff]">
                                                                {format(i.createdAt)}
                                                            </small>
                                                        </div>
                                                    </div>
                                                 ))
                                            } 
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    </div>
                )
            }
        <br />
        <br />
        <br />
        </div>
    )
}

export default CourseContentMedia;