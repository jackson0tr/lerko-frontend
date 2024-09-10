import React from 'react';
import { style } from '../../style/style';
import { useTranslations } from 'next-intl';

type Props={

}

const Policy = () => {
    const t = useTranslations()
    return(
        <div className='mt-[60px]'>
            <br />
            <h1 className={`${style.title} text-[#333] dark:text-[#fff] 800px:text-[45px] `}>
                {t("شروط وأحكام المنصة")}
            </h1>
            <br />
            <div className=' w-[95%] 800px:w-[85%] m-auto !mr-[15px]'>
                <p className='py-2 text-[#333] dark:text-[#fff] text-[16px] font-Poppins leading-8 whitespace-pre-line'>
                    {t("صباح الخير/بعد الظهر/المساء، سيداتي وسادتي. اليوم، يسعدنا أن نقدم لكم ليركو المنصة الإلكترونية الرائدة التي تقدم دورات شاملة حول سياسات الخصوصية. في هذا العرض التقديمي، سوف نتعمق في أهمية سياسات الخصوصية، والميزات الفريدة  ليركو وكيف يمكن لدوراتنا أن تفيد الأفراد والمنظمات على حدٍ سواء.")}
                </p>
                <br />
                <p className='py-2 text-[#333] dark:text-[#fff] text-[16px] font-Poppins leading-8 whitespace-pre-line'>
                    {t("تُعد سياسات الخصوصية وثائق أساسية توضح كيفية جمع المؤسسات للبيانات الشخصية واستخدامها وحمايتها. في العصر الرقمي الحالي، حيث تتفشى انتهاكات البيانات والمخاوف المتعلقة بالخصوصية، يعد وجود سياسة خصوصية قوية أمرًا ضروريًا للحفاظ على الثقة مع العملاء والامتثال للوائح القانونية مثل القانون العام لحماية البيانات (GDPR) وقانون خصوصية المستهلك في كاليفورنيا (CCPA).")}
                </p>
                <br />
                <p className='py-2 text-[#333] dark:text-[#fff] text-[16px] font-Poppins leading-8 whitespace-pre-line'>
                    {t("في Lerko، نتفهم أهمية سياسات الخصوصية، ولهذا السبب قمنا بتطوير منصة متطورة مخصصة خصيصًا لتعليم المحترفين حول هذا الموضوع. يتم تنظيم دوراتنا بدقة من قبل خبراء الصناعة لتقديم رؤى شاملة حول لوائح الخصوصية وأفضل الممارسات واستراتيجيات الامتثال.")}
                </p>
                <br />
                <p className='py-2 text-[#333] dark:text-[#fff] text-[16px] font-Poppins leading-8 whitespace-pre-line'>
                    {t("المحتوى الذي يقوده الخبراء: يتم تدريس دوراتنا من قبل محترفين متمرسين يتمتعون بسنوات من الخبرة في مجال خصوصية البيانات والامتثال.")}
                </p>
                <br />
                <p className='py-2 text-[#333] dark:text-[#fff] text-[16px] font-Poppins leading-8 whitespace-pre-line'>
                    {t("التعلم التفاعلي: نحن نؤمن بتجارب التعلم الجذابة والتفاعلية. تتضمن دوراتنا مجموعة متنوعة من عناصر الوسائط المتعددة والاختبارات ودراسات الحالة لتعزيز المفاهيم الأساسية.")}
                </p>
                <br />
                <p className='py-2 text-[#333] dark:text-[#fff] text-[16px] font-Poppins leading-8 whitespace-pre-line'>
                    {t("التعلم المرن: سواء كنت محترفًا مشغولًا أو طالبًا، توفر منصتنا خيارات تعليمية مرنة، مما يسمح لك بالتعلم بالسرعة التي تناسبك وراحتك.")}
                </p>
                <br />
                <p className='py-2 text-[#333] dark:text-[#fff] text-[16px] font-Poppins leading-8 whitespace-pre-line'>
                    {t("رؤى عملية: دوراتنا تتجاوز المعرفة النظرية. نحن نقدم رؤى عملية وأمثلة واقعية لمساعدتك على فهم كيفية تطبيق مبادئ الخصوصية في بيئتك المهنية.")}
                </p>
                <br />
                <br />
                <br />
            </div>
        </div>
    )
}

export default Policy;