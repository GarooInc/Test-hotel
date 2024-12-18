import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import InfoDisplay from '@/components/InfoDisplay/InfoDisplay'
import PhoneItem from '@/components/PhoneItem/PhoneItem'
import FooterItem from '@/components/FooterItem/FooterItem'

const namespaces = ['emergency', 'header']

export default async function HouseKeeping({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

    return (
        <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-secondary relative">
            <div className='flex flex-col justify-center items-center'>
                <HeaderItem v={"v4"} transparent/>
                <h2 className='italictiempos_title text-quaternary'>{t('emergency:title')}</h2>
                <InfoDisplay collection="Emergency" colorlines="quaternary" coloricon="tertiary"/>
                <div className="flex flex-col justify-center items-center gap-4 md:w-3/4 px-10 w-full md:h-full md:pb-0 pb-28">
                    <div className='collapse-title md:text-lg text-sm font-medium font-futura uppercase peer-checked:collapse-open text-quaternary py-0'>
                        Emergency Contacts
                    </div>
                    <div className='flex md:flex-row flex-col md:justify-center justify-start items-center mx-auto border-black border-b w-full'>
                        <div className='flex justify-start items-center w-full '>
                            <PhoneItem name={t('emergency:phone1')} p1="+501 803-2038;" link1="tel:+501 803-2038" />
                            <PhoneItem name={t('emergency:phone2')} p1="+501 804-2022" link1="tel:+501 804-2022" />
                        </div>
                        <div className='flex  justify-start items-center w-full'>
                            <PhoneItem name={t('emergency:phone3')} p1="+501 824-2066" link1="tel:+501 824-2066" />
                            <PhoneItem name={t('emergency:phone4')} p1="+501 635-0678" link1="tel:+501 635-0678" />
                        </div>
                    </div>
                </div>
                
            </div>
            <FooterItem  transparent logo={"v11"}/>
        </div>
        <LanguageSwitcher />
        </TranslationsProvider>
    );
}