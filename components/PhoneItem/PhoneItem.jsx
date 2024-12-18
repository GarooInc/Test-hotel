import React from 'react'
import {FaPhone } from "react-icons/fa"

const PhoneItem = ({name, p1, p2, link1, link2}) => {
  return (
    <div className='flex items-center md:w-1/2 w-full gap-2 pb-4'>
        <FaPhone className='mr-2 text-primary text-2xl' />
        <div className='flex flex-col gap-2'>
          <span className='phone_text w-28'>{name}</span>
          { p1 && <a className='phone_text ' href={link1}>{p1}</a> } 
          { p2 && <a className='phone_text'  href={link2}>{p2}</a> }
        </div>
    </div>

  )
}

export default PhoneItem