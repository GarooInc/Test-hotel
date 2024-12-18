import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import AmenitiesItem from '@/components/AmenitiesItem/AmenitiesItem'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import FooterItem from '@/components/FooterItem/FooterItem'


const namespaces = ['amenities', 'header']

export default async function Amenities({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="bg-tertiary page md:justify-start justify-between">
            <HeaderItem v={"v12"} transparent whiteArrow/>
            <h1 className="principal_title italic">{t('amenities:title')}</h1>
            <AmenitiesItem/>
            <div className='w-full justify-center flex items-center py-10 md:absolute md:bottom-0'>
                <img src="/assets/images/logo_v9.png" alt="logo" className="w-[80px]" />
            </div>
        </div>
        <LanguageSwitcher />
    </TranslationsProvider>
  )
}