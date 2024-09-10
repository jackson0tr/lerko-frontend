import { style } from "@/app/style/style";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { redirect } from "next/navigation";
import React, {FC, useEffect, useState} from "react";
import { toast } from "react-hot-toast";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.PUBLIC_SOCKET_SERVER || "";
const socketId = socketIO(ENDPOINT, {transports: ["websocket"]});

type Props={
    setOpen:any;
    data:any;
    user:any;
}

const CheckoutForm:FC<Props> = ({setOpen,data,user}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message,setMessage] = useState<any>('');
    const [createOrder,{data:orderData,error}] = useCreateOrderMutation();
    const [loadUser,setLoadUser] = useState(false);
    const {} = useLoadUserQuery({skip:loadUser ? false : true});
    const [isLoading,setIsLoading] = useState(false);
    const handleSubmit= async (e:any)=>{
        e.preventDefault();
        if(!stripe || !elements){
            return;
        }
        setIsLoading(true);
        const {error,paymentIntent} = await stripe.confirmPayment({
            elements,
            redirect: 'if_required'
        });
        if(error){
            setMessage(error.message);
            setIsLoading(false);
        }else if(
            paymentIntent && paymentIntent.status === 'succeeded'
        ){
            setIsLoading(false);
            createOrder({courseId:data._id,paymentInfo:paymentIntent});
        }
    }
    const locale = 'ar';
    useEffect(()=>{
        if(orderData){
            setLoadUser(true);
            socketId.emit("notification", {
                title: "New Order",
                message: `You have a new order from ${data.name}`,
                userId: user._id,
            });
            redirect(`/${locale}/course-access/${data._id}`);
        }
        if(error){
            if("data" in error){
                const errMessage = error as any;
                toast.error(errMessage.data.message);
            }
        }
    },[orderData,error]);

    return(
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element"/>
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span className={`${style.button} mt-2 !h-[35px]`} id="button-text">
          {isLoading ? "...يتم الدفع" : "ادفع الان"}
        </span>
      </button>
      {message && <div id="payment-message" className="text-red-600 font-Poppins pt-2" >{message}</div>}
    </form>
    )
}

export default CheckoutForm;