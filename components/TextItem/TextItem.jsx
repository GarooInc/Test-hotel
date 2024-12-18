import React from 'react'
import useFormattedText from '@/hooks/useFormattedText'

const TextItem = ({text, color}) => {
    const formattedText = useFormattedText(text)
  return (
    <span className={`text-${color} xl:text-xl text-lg font-futuralight text-justify leading-6 tracking-wide my-4 font-tiempos`}>
        {formattedText}
    </span>
  )
}

export default TextItem