import React, { FC } from 'react'
import { style } from '../../style/style';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

type Props = {
    
}

const About:FC<Props> = () => {
    const t = useTranslations();
    return(
        <div className='mt-[60px]'>
            <br />
            <h1 className={`${style.title} text-[#333] dark:text-[#fff] 800px:text-[45px] `}>
                {t("من")} <span className='text-gradient'>{t("ليركو؟")}</span>
            </h1>
            <br />
            <div className="w-[95%] 800px:w-[85%] m-auto !mr-[15px]">
                <p className="text-[18px] text-[#333] dark:text-[#fff] font-Poppins">
                    {t("نقدم لكم ليركو الحل الشامل لتجارب التعلم الفعالة والممتعة عبر الإنترنت.")}
                </p>
                <br />
                <p className="text-[18px] text-[#333] dark:text-[#fff] font-Poppins">
                    {t("سواء كنت معلمًا، أو مدربًا للشركات، أو متعلمًا مدى الحياة، فإن ليركو يقدم الأدوات التي تحتاجها للنجاح في بيئة التعلم الرقمية الحالية.")}
                </p>
                <br />
                <p className="text-[18px] text-[#333] dark:text-[#fff] font-Poppins">
                    {t("مع ليركو أصبح إنشاء الدورات التدريبية وتقديمها وإدارتها أسهل من أي وقت مضى. دعنا نستكشف بعض ميزاته الرئيسية.")}
                </p>
                <br />
                <p className="text-[18px] text-[#333] dark:text-[#fff] font-Poppins">
                    {t("أولاً وقبل كل شيء، يوفر ليركو واجهة سهلة الاستخدام مصممة للتنقل السلس. سواء كنت مدرسًا ماهرًا في التكنولوجيا أو مستخدمًا لأول مرة، ستجد ليركو بديهيًا وسهل الاستخدام.")}
                </p>
                <br />
                <p className="text-[18px] text-[#333] dark:text-[#fff] font-Poppins">
                    {t("تعمل أدوات إنشاء الدورة التدريبية القوية من ليركو على تمكين المعلمين من تصميم محتوى ديناميكي وجذاب دون عناء. من محاضرات الوسائط المتعددة إلى الاختبارات التفاعلية، فإن الاحتمالات لا حصر لها.")}
                </p>
                <br />
                <p className="text-[18px] text-[#333] dark:text-[#fff] font-Poppins">
                    {t("يضمن تصميمنا المستجيب للجوال أن يتمكن المتعلمون من الوصول إلى دوراتهم في أي وقت وفي أي مكان ومن أي جهاز. سواء كانوا على هاتف ذكي أو جهاز لوحي أو كمبيوتر محمول، تظل تجربة ليركو متسقة ومحسنة.")}
                </p>
                <br />
                <p className="text-[18px] text-[#333] dark:text-[#fff] font-Poppins">
                    {t("سيقدر المسؤولون ميزات الإدارة القوية التي يتمتع بها ليركو. بدءًا من تسجيل المستخدم وإدارة الأذونات وحتى تتبع التقدم وإعداد التقارير، يعمل ليركو على تبسيط المهام الإدارية المرتبطة بالتعلم عبر الإنترنت.")}
                </p>
                <br />
                <p className="text-[18px] text-[#333] dark:text-[#fff] font-Poppins">
                    {t("لقد غيّر ليركو الطريقة التي نقدم بها التدريب في مؤسستنا. إنها بديهية وقابلة للتخصيص، ويحبها موظفونا!")}
                </p>
                <br />
                <p className="text-[18px] text-[#333] dark:text-[#fff] font-Poppins">
                    {t("ولكن لا تأخذ كلمتنا فقط. انضم إلى الآلاف من المستخدمين الراضين الذين اختاروا ليركو كنظام إدارة التعلم المفضل لديهم.")}
                </p>
                <br />
                <p className="text-[18px] text-[#333] dark:text-[#fff] font-Poppins">
                    {t("هل أنت مستعد لإحداث ثورة في تجربة التعلم عبر الإنترنت؟ تفضل بزيارة Lerko.com اليوم وابدأ رحلتك نحو التمكين المعرفي مع ليركو.")}
                </p>
                <br />
                <br />
                <br />
                <span className="text-[22px]">
                    <Link className="border-b border-[crimson] dark:border-[#23bd70] border-solid dark:text-[#23bd70] text-[crimson]" href="https://my-portfolio0tr.vercel.app">
                        {t("محمود محمد")}
                    </Link>
                </span>
                <br />
                <br />
                <br />
            </div>
        </div>
    )
}

export default About;