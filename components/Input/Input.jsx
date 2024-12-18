import React from 'react'

const Input = ({text}) => {
  return (
    <input type="text" placeholder={text} className="input input-bordered border-quaternary text-quaternary w-full max-w-xs bg-white placeholder-quaternary" />
  )
}

export default Input