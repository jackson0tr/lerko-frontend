import Link from 'next/link';
import React from 'react';

type Props={

}

const Footer = () => {
    const locale = 'ar';
    return(
        <footer>
            <div className="border border-[#000000e] dark:border-[#ffffff1e]"/>
            <br />
            <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8 ">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
                    <div className="space-y-3">
                        <h3 className="text-[20px] font-[600] text-[#333] dark:text-[#fff]">
                            عننا
                        </h3>
                        <ul className='space-y-4'>
                            <li>
                                <Link href={`/${locale}/about`} className='text-base text-[#333] dark:text-[#fff] dark:hover:text-[crimson] '>
                                    قصتنا
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/policy`} className='text-base text-[#333] dark:text-[#fff] dark:hover:text-[crimson] '>
                                    سياسة الخصوصية
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/faq`} className='text-base text-[#333] dark:text-[#fff] dark:hover:text-[crimson] '>
                                   التعليمات
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-[20px] font-[600] text-[#333] dark:text-[#fff]">
                            روابط سريعة
                        </h3>
                        <ul className='space-y-4'>
                            <li>
                                <Link href={`/${locale}/courses`} className='text-base text-[#333] dark:text-[#fff] dark:hover:text-[crimson] '>
                                    الدورات
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/profile`} className='text-base text-[#333] dark:text-[#fff] dark:hover:text-[crimson] '>
                                   حسابي
                                </Link>
                            </li>
                            <li>
                                <Link href={`/`} className='text-base text-[#333] dark:text-[#fff] dark:hover:text-[crimson] '>
                                   الرئيسية
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-[20px] font-[600] text-[#333] dark:text-[#fff]">
                           روابط اجتماعية
                        </h3>
                        <ul className='space-y-4'>
                            <li>
                                <Link href='https://www.facebook.com' className='text-base text-[#333] dark:text-[#fff] dark:hover:text-[crimson] '>
                                    فيسبوك
                                </Link>
                            </li>
                            <li>
                                <Link href='https://www.instagram.com' className='text-base text-[#333] dark:text-[#fff] dark:hover:text-[crimson] '>
                                    انستغرام
                                </Link>
                            </li>
                            <li>
                                <Link href='https://www.linkedin.com' className='text-base text-[#333] dark:text-[#fff] dark:hover:text-[crimson] '>
                                    لينكد ان
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-[20px] font-[600] text-[#333] dark:text-[#fff] pb-3">
                           معلومات الاتصال
                        </h3>
                        <p className='text-base text-[#333] dark:text-[#fff] dark:hover:text-[crimson] pb-2'>
                        اتصل بنا: 1-234-567-890 
                        </p>
                        <p className='text-base text-[#333] dark:text-[#fff] dark:hover:text-[crimson] pb-2'>
                        ارسل لنا:{' '}
                        <Link className="border-b border-[crimson] dark:border-[#23bd70] border-solid dark:text-[#23bd70] text-[crimson]" href={`mailto:dev.mahmoudmohamed@gmail.com`}>
                            lerko@gmail.com 
                        </Link>
                        </p>
                    </div>
                </div>
                <br />
                <p className='text-center text-[#333] dark:text-[#fff]'>
                    حقوق النشر &copy; ليركو | كل الحقوق محفوظة
                    <br />
                    مشغل بواسطة/ <Link className="border-b border-[crimson] dark:border-[#23bd70] border-solid dark:text-[#23bd70] text-[crimson]" href='https://dev-mahmoud.vercel.app'>محمود محمد</Link>
                </p>
            </div>
            <br />    
        </footer>
    )
}

export default Footer;