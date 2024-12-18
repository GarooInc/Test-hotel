import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import ServicesItem from '@/components/ServicesItem/ServicesItem'
import FooterCart from '@/components/FooterCart/FooterCart'

const namespaces = ['room-services', 'header']

export default async function RoomServices({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-quaternary relative pb-10">
            <div className="flex flex-col w-full items-center">
                <HeaderItem v={"v5"} transparent whiteArrow/>
                <h2 className='italictiempos_title text-white'>{t('room-services:title')}</h2>
                <span className='font-futura px-10 text-center text-secondary'>
                    {t('room-services:text1')}
                </span>

                <ServicesItem room={true} collection={"room_services"}/>
            </div>
            <FooterCart transparent/>
        </div>
        <LanguageSwitcher />
    </TranslationsProvider>
  )
}