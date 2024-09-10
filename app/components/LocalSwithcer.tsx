'use client'
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ChangeEvent, useTransition } from "react";

export default function LocalSwithcer (){
    const [isPending,startTransition] = useTransition();
    const router = useRouter();
    const localeActive = useLocale();
    const t = useTranslations('LocalSwithcer');

    const onSelect = (e: ChangeEvent<HTMLSelectElement>)=>{
        const nextLocale = e.target.value;
        startTransition(()=>{
            router.replace(`/${nextLocale}`)
        })
    }


    
    return(
        <label className="border-2 rounded">
            <p className="sr-only">{t('اللغة')}</p>
            <select 
            defaultValue={localeActive}
             className="bg-transparent py-2" 
             disabled={isPending} 
             onChange={onSelect}>
                <option className="text-[#333] dark:bg-[#333] dark:text-[#fff]" value="ar">{t('اللغة')}</option>
                <option className="text-[#333] dark:bg-[#333] dark:text-[#fff]" value="en">{t('الانجليزية')}</option>
                <option className="text-[#333] dark:bg-[#333] dark:text-[#fff]" value="fr">{t('الفرنسية')}</option>
            </select>
        </label>
    )
}