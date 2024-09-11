'use client'
import React,{useState,useEffect} from 'react'
import { useTheme } from 'next-themes'
import { BiMoon, BiSun } from 'react-icons/bi'

export const ThemeSwitcher= () =>{
    const [mounted,setMounted] = useState(false);
    const {theme,setTheme,systemTheme} = useTheme();

    useEffect(() => {
        setMounted(true);
        // Set the default theme to dark when mounted
        if (theme === 'system') {
            setTheme(systemTheme === 'dark' ? 'dark' : 'light');
        } else if (!theme) {
            setTheme('dark');
        }
    }, [theme, setTheme, systemTheme]);

    useEffect(()=>setMounted(true),[]);

    if(!mounted){
        return null;
    }

    return(
        <div className='flex items-center justify-center mx-4'>
            {
                theme === 'light' ? (
                    <BiMoon className='cursor-pointer' fill='black' size={25} onClick={()=>setTheme("dark")}/>
                ) : (
                    <BiSun className='cursor-pointer dark:text-white' size={25} onClick={()=>setTheme("light")}/>
                )
            }
        </div>
    )
}

