import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import FooterItem from '@/components/FooterItem/FooterItem'
import InfoDisplay from '@/components/InfoDisplay/InfoDisplay'

const namespaces = ['faqs', 'header']

export default async function Faqs({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-secondary relative">
            <div className="flex flex-col w-full items-center">
                <HeaderItem v={"v3"} transparent/>
                <h2 className='italictiempos_title text-quaternary'>{t('faqs:title')}</h2>
                <div className='flex flex-col justify-center items-center gap-4 md:w-3/4 pb-10'>
                    <InfoDisplay collection={"faqs"} colorlines="quaternary" coloricon="tertiary"/>
                </div>
            </div>
            <FooterItem transparent logo={"v11"}/>
        </div>
        <LanguageSwitcher />
    </TranslationsProvider>
  )
}