import { style } from '@/app/style/style';
import Image from 'next/image';
import React, { FC } from 'react';
import ReviewCard from '../Reviews/ReviewCard';
import { useTranslations } from 'next-intl';

type Props={

}


const Reviews:FC<Props> = () => {
    const t = useTranslations();

    const reviews = [
        {
            name: `${t("محمود محمد")}`,
            avatar: require('../../../public/imgs/client-1.png'),
            profession: `${t("طالب")}`,
            comment: `${t("يقدم موقع الدورة التدريبية هذا مجموعة شاملة من الدورات التي تلبي مختلف الاهتمامات ومستويات المهارات. الواجهة سهلة الاستخدام، مما يجعل التنقل سلسًا. جودة المحتوى عالية الجودة، مع مقاطع فيديو جذابة واختبارات تفاعلية ومهام عملية.")}`
        },
        {
            name: `${t("محمود محمد")}`,
            avatar: require('../../../public/imgs/client-1.png'),
            profession: `${t("طالب")}`,
            comment: `${t("كان التسجيل في الدورات التدريبية على هذا الموقع أحد أفضل القرارات التي اتخذتها. الدورات بأسعار معقولة، لا سيما بالنظر إلى ثروة المعرفة التي تقدمها.")}`
        },
        {
            name: `${t("محمود محمد")}`,
            avatar: require('../../../public/imgs/client-1.png'),
            profession: `${t("طالب")}`,
            comment: `${t("سواء كنت مهتمًا بالبرمجة، أو التصميم، أو الأعمال، أو التطوير الشخصي، فإن موقع الدورة هذا يحتوي على ما يناسب الجميع. أنا أقدر تنوع المواضيع المتاحة، مما يسمح لي باستكشاف مجالات الاهتمام المختلفة وتوسيع مجموعة مهاراتي.")}`
        },
        {
            name: `${t("محمود محمد")}`,
            avatar: require('../../../public/imgs/client-1.png'),
            profession: `${t("طالب")}`,
            comment: "على عكس الدورات التدريبية التقليدية عبر الإنترنت التي تبدو ثابتة وغير ملهمة، يقدم هذا الموقع تجربة تعليمية تفاعلية تبقيك منخرطًا من البداية إلى النهاية. توفر منتديات المناقشة منصة للطلاب للتفاعل مع المعلمين والأقران، وتعزيز الشعور بالمجتمع والتعاون."
        },
        {
            name: `${t("محمود محمد")}`,
            avatar: require('../../../public/imgs/client-1.png'),
            profession: `${t("طالب")}`,
            comment: `${t("باعتباري عاملًا محترفًا وجدول أعمالي مزدحمًا، فإنني أقدر المرونة التي يوفرها موقع الدورة التدريبية هذا. الدورات ذاتية السرعة، مما يسمح لي بالتعلم في الوقت الذي يناسبني. سواء كان لدي عشر دقائق أو ساعة إضافية، يمكنني بسهولة التكيف مع في درس أو مواد مراجعة.")}`
        },
        {
            name: `${t("محمود محمد")}`,
            avatar: require('../../../public/imgs/client-1.png'),
            profession: `${t("طالب")}`,
            comment: `${t("أحد الأشياء التي أحبها في موقع الدورة التدريبية هذا هو التزامه بالحفاظ على المحتوى جديدًا ومحدثًا. يقوم المعلمون بتحديث مواد الدورة التدريبية بانتظام لتعكس أحدث اتجاهات وتطورات الصناعة، مما يضمن تزويد الطلاب بالمعرفة الأكثر صلة والمهارات.")}`
        },
        {
            name: `${t("محمود محمد")}`,
            avatar: require('../../../public/imgs/client-1.png'),
            profession: `${t("طالب")}`,
            comment: `${t("كلما كانت لدي أسئلة أو واجهت مشكلات فنية، كان فريق دعم العملاء مستجيبًا ومفيدًا بشكل لا يصدق. فهم يبذلون قصارى جهدهم لمساعدة الطلاب، سواء كان ذلك في استكشاف المشكلات الفنية وإصلاحها أو تقديم التوجيه بشأن اختيار الدورة التدريبية.")}`
        },
    ]

    return(
        <div className="w-[90%] m-auto 800px:w-[85%]">
            <div className="w-full 800px:flex items-center">
                <div className="800px:w-[50%] pb-2 w-full">
                    <Image src={require('../../../public/imgs/review.jpg')} alt='review-img' width={700} height={700} />
                </div>
                <div className="800px:w-[50%] w-full">
                    <h3 className={`${style.title} 800px:!text-[40px]`}>
                        {t("طلابنا هم")} <span className='text-gradient'>{t("قوتنا")}</span>{' '}
                        <br /> {t("انظر ماذا جلسوا عنا")}
                    </h3>
                    <br />
                    <p className={`${style.label} !m-3`}>
                        {t("تعتبر التقييمات بمثابة نوافذ تطل على التجارب، حيث تقدم لمحات عما ينتظرك في الداخل. فهي بمثابة بوصلة للمستهلكين، حيث توجههم عبر مجموعة واسعة من الخيارات.")}
                    </p>
                </div>
                <br />
                <br />
            </div>
            <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0">
                {
                    reviews && reviews.map((i:any,index:number)=>(
                        <ReviewCard item={i} key={index} />
                    ))
                }
            </div>
        </div>
    )
}   

export default Reviews;


