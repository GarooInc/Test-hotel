import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import FooterItem from '@/components/FooterItem/FooterItem'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import dynamic from 'next/dynamic'

const Flipbook = dynamic(() => import('@/components/FlipBook/FlipBook'), { ssr: false })


const namespaces = ['spa', 'home']

export default async function Adventures({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-secondary relative">
            <HeaderItem v={"v3"} transparent/>
            <h1 className="italictiempos_title text-quaternary">Spa</h1>
            <LanguageSwitcher />
            <div className='futura_description md:w-2/3 text-justify px-10 flex flex-col justify-center items-center'>
                <p className=" text-quaternary">{t('spa:massage1')}</p>
                <p className=" text-tertiary text-xl">{t('spa:massage2')}</p>
                <p className=" text-quaternary">{t('spa:massage3')}</p>
            </div>
            <div className='px-10 info_container'>
                <Flipbook pdf={"/assets/pdf/spa.pdf"} />
                {
                locale === 'es' ? <p className="font-futura text-quaternary p-4 text-lg text-center">
                    Por favor contacte a la <a className='text-primary' href='https://api.whatsapp.com/send/?phone=5016144247&text&type=phone_number&app_absent=0'>Recepción</a> para reservar su masaje.
                </p> : <p className="font-futura text-quaternary p-4 text-lg text-center">
                    Please contact the <a className='text-primary' href='https://api.whatsapp.com/send/?phone=5016144247&text&type=phone_number&app_absent=0'>Front Desk</a> to book your massage.
                </p>
            }
            </div>
            <FooterItem transparent logo={"v11"}/>
        </div>
    </TranslationsProvider>
  )
}