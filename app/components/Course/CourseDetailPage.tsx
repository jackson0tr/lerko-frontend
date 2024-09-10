import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi';
import React, { FC, useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import Header from '../Header';
import Footer from '../Footer';
import CourseDetails from './CourseDetails';
import { useCreatePaymentIntentMutation, useGetStripePublishableKeyQuery } from '@/redux/features/orders/ordersApi';
import { loadStripe } from '@stripe/stripe-js';

type Props = {
    id: string;
}

const CourseDetailPage: FC<Props> = ({ id }) => {
    const [route, setRoute] = useState('Login');
    const [open, setOpen] = useState(false);
    const { data, isLoading } = useGetCourseDetailsQuery(id);
    const { data: config } = useGetStripePublishableKeyQuery({});
    const [createPaymentIntent, { data: paymentData }] = useCreatePaymentIntentMutation();
    const [stripePromise, setStripePromise] = useState<any>(null);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        if (config) {
            const Publishablekey = config?.publishablekey;
            setStripePromise(loadStripe(Publishablekey));
        }
        if (data) {
            const amount = Math.round(data?.course?.price * 100);
            createPaymentIntent(amount);
        }
        if (paymentData) {
            setClientSecret(paymentData?.client_secret);
        }
        // console.log("paymentData: ", paymentData);
        // console.log("client_secret: ", paymentData?.client_secret);
    }, [config, data,paymentData]);

    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div>
                        <Heading
                            title={data?.course?.name}
                            description="تفاصيل دورة ليركو"
                            keywords={data?.course?.tags} />
                        <Header route={route} setRoute={setRoute} open={open} setOpen={setOpen} activeItem={1} />
                        {
                            stripePromise && (
                                <CourseDetails data={data?.course} setRoute={setRoute} setOpen={setOpen} stripePromise={stripePromise} clientSecret={clientSecret} />
                            )
                        }
                        <Footer />
                    </div>
                )
            }

        </>
    )
}

export default CourseDetailPage;