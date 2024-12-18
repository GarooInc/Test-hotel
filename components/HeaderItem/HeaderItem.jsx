import React from 'react'
import ArrowBack from '@/components/ArrowBack/ArrowBack'

const HeaderItem = ({v, nav, principal,transparent, whiteArrow}) => {
  return (
    <div className={`w-full flex justify-center items-center  relative py-10 ${transparent ? 'bg-transparent' : 'bg-white'}`}>
        {
          !principal && <ArrowBack absolute nav={nav ? nav : '/'} white={whiteArrow} />
        }
        <div className='flex flex-col justify-center items-center'>
          <img src={`/assets/images/logo_${v}.png`} alt="logo" className="h-24 max-w-36 object-contain" />
        </div>
    </div>
  )
}

export default HeaderItem