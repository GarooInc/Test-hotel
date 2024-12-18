import React from 'react'

const FooterItem = ({transparent, logo, fixed}) => {
  return (
    <div className={`w-full flex justify-center items-center p-8 ${fixed ? 'fixed' : 'absolute'} bottom-0 ${transparent ? 'bg-transparent' : 'bg-white'}`}>
        {
          logo? <img src={`/assets/images/logo_${logo}.png`} alt="logo" className="w-[80px]" /> : null
        }
    </div>
  )
}

export default FooterItem