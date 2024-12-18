import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import FoodDrinksItem from '@/components/FoodDrinksItem/FoodDrinksItem'
import HeaderItem from '@/components/HeaderItem/HeaderItem'



const namespaces = ['food_drinks', 'header']

export default async function FoodDrinks({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-quinary">
            <HeaderItem v={"v12"} transparent/>
            <h1 className="italictiempos_title text-secondary">{t('food_drinks:title')}</h1>
            <FoodDrinksItem />
            <div className='flex justify-center items-center w-full p-4 bg-tertiary'>
                <img src="/assets/images/logo_v9.png" alt="logo" className="md:w-28 w-20" />
            </div>
        </div>
        <LanguageSwitcher />
    </TranslationsProvider>
  )
}