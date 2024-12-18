"use client";
import React, { useState, useEffect } from 'react'
import FooterItem from '@/components/FooterItem/FooterItem'
import TranslationsProvider from '@/components/TranslationsProvider'
import initTranslations from '@/app/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';
import ExperienceInnerItem from '@/components/ExperienceInnerItem/ExperienceInnerItem';
import HeaderItem from '@/components/HeaderItem/HeaderItem';
const namespaces = ['experience', 'header'];
export default function Experience({ params: { locale, experienceId }}) {
    const [translations, setTranslations] = useState({ t: () => '', resources: {} });

    // Carga las traducciones
    useEffect(() => {
      const loadTranslations = async () => {
        const { t, resources } = await initTranslations(locale, namespaces);
        setTranslations({ t, resources });
      };
      loadTranslations();
    }, [locale]);
  
    const { t, resources } = translations;


  return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
    <div className="page bg-white">
        <HeaderItem v={"v4"} transparent nav={"/amenities"} />
        <div className='flex flex-col justify-center items-center w-full'>
            <div className='flex flex-col justify-center items-center w-full'>
                <ExperienceInnerItem experienceId={experienceId} />
            </div>
        </div>
        <LanguageSwitcher />
        <FooterItem fixed logo={"v11"} />
    </div>
    </TranslationsProvider>
  )
}