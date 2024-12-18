import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import FooterItem from '@/components/FooterItem/FooterItem'
import TabCartItem from '@/components/TabCartItem/TabCartItem'
import dynamic from 'next/dynamic'

const Flipbook = dynamic(() => import('@/components/FlipBook/FlipBook'), { ssr: false })


const namespaces = ['adventures', 'header']

export default async function Adventures({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-secondary relative">
            <HeaderItem v={"v3"} transparent/>
            <h1 className="italictiempos_title text-quaternary">{t('adventures:title')}</h1>
            <p className="futura_description text-quaternary p-4">{t('adventures:top')}</p>
            <TabCartItem collection={"adventures"} noTags={true} />
            {
                locale === 'es' ? <p className="font-futura text-quaternary p-4 text-lg text-center">
                    Para obtener más información sobre nuestros Tours y Aventuras, por favor contacte a la <a className='text-primary' href='https://api.whatsapp.com/send/?phone=5016144247&text&type=phone_number&app_absent=0'>Recepción</a>
                </p> : <p className="font-futura text-quaternary p-4 text-lg text-center">
                    Please contact the <a className='text-primary' href='https://api.whatsapp.com/send/?phone=5016144247&text&type=phone_number&app_absent=0'>Front Desk</a> to learn more about our Tours and Adventures
                </p>
            }
            <div className='px-10 info_container'>
                <Flipbook pdf={"/assets/pdf/adventures.pdf"} />
            </div>
            <FooterItem transparent logo={"v11"}/>
        </div>
        <LanguageSwitcher />
    </TranslationsProvider>
  )
}