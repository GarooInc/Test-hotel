'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { IoLanguage } from "react-icons/io5";
import i18nConfig from '@/i18nConfig'


const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = e => {
    const newLocale = e.target.value;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };


    return (
        <div className='fixed top-2 right-0 p-4 dropdown'>
          <div tabIndex={0} role="button" className="m-4 bg-transparent">
            {
              currentLocale === 'en' ? 
              <button onClick={handleChange} value={'es'}
                className="text-tertiary font-futura text-lg bg-secondary rounded-md px-2 w-10">
                ES</button> :
              <button onClick={handleChange}  value={'en'}
                className="text-tertiary font-futura text-lg bg-secondary rounded-md px-2 w-10">
                EN
              </button>
            }
          </div>
        </div>
    )
}

export default LanguageSwitcher;
