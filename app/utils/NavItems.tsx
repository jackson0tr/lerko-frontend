import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5';
import logo from '../../public/imgs/lerko-removebg.png';


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

    const locale = 'ar';

    const navItemsData = [
        {
            name: 'الرئيسية',
            url: "/"
        },
        {
            name: 'كورسات',
            url: `/${locale}/courses`
        },
        {
            name: 'عننا',
            url: `/${locale}/about`
        },
        {
            name: 'سياسة',
            url: `/${locale}/policy`
        },
        {
            name: 'تعليمات',
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
                        <IoClose id='screen' size={50} onClick={handleClose} className='cursor-pointer  pr-[20px] text-[crimson] top-[20px] left-[0]' />
                        <div className="w-full text-center py-6">
                            <Link href='/' passHref>
                                <Image src={logo} alt='logo' width={100} height={100} />
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