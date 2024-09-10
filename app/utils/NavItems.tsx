import Link from 'next/link';
import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { useTranslations } from 'use-intl';



type Props = {
    activeItem: number;
    isMobile: boolean;
    // params: {
    //     locale: string;
    // }
}

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
    const [openSidebar, setOpenSidebar] = useState(false);

    const handleClose = (e: any) => {
        if (e.target.id === "screen") {
            {
                setOpenSidebar(false);
            }
        }
    }

    const t = useTranslations();
    const locale = 'ar';

    const navItemsData = [
        {
            name: `${t('الرئيسية')}`,
            url: "/"
        },
        {
            name: `${t('كورسات')}`,
            url: `/${locale}/courses`
        },
        {
            name: `${t('عننا')}`,
            url: `/${locale}/about`
        },
        {
            name: `${t('سياسة')}`,
            url: `/${locale}/policy`
        },
        {
            name: `${t('تعليمات')}`,
            url: `/${locale}/faq`
        },
    ];

    return (
        <>
            <div className="hidden 800px:flex">
                {
                    navItemsData && navItemsData.map((item, index) => (
                        <Link href={`${item.url}`} key={index} passHref>
                            <span className={`${activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : "dark:text-white text-black"} text-[18px] px-6 font-Poppins font-[400]`}>
                                {item.name}
                            </span>
                        </Link>
                    ))
                }
            </div>
            {
                isMobile && (
                    <div className="800px:hidden mt-5" >
                        <IoClose id='screen' size={50} onClick={handleClose} className='cursor-pointer  pl-[20px] text-[crimson] top-[20px] right-[-90px]' />
                        <div className="w-full text-center py-6">
                            <Link href='/' passHref>
                                <span className={`text-[25px] font-Poppins font-[500] text-black dark:text-white `}>{t('ليركو')}</span>
                            </Link>
                        </div>
                        {
                            navItemsData && navItemsData.map((item, index) => (
                                <Link href={`${item.url}`} key={index} passHref>
                                    <span className={`${activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : "dark:text-white text-black"} block py-5 text-[18px] px-6 font-Poppins font-[400]`}>
                                        {item.name}
                                    </span>
                                </Link>
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}

export default NavItems;