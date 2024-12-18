import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import InfoDisplay from '@/components/InfoDisplay/InfoDisplay'
import FooterItem from '@/components/FooterItem/FooterItem'
import ServicesItem from '@/components/ServicesItem/ServicesItem'

const namespaces = ['home', 'header']

export default async function HouseKeeping({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

    return (
        <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-secondary">
            <HeaderItem v={"v3"} transparent/>
            <div className='info_container'>
                <h2 className='italictiempos_title text-quaternary'>{t('home:nav3')}</h2>
                <InfoDisplay collection="Housekeeping" colorlines="quaternary" coloricon="tertiary" />
                <ServicesItem room={true} collection={"room_services"}/>
                <FooterItem  transparent logo={"v11"}/>
            </div>
        </div>
        <LanguageSwitcher />
        </TranslationsProvider>
    );
}