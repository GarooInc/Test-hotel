import React from 'react'
import PocketBase from 'pocketbase'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

const ExperienceInnerItem = ({experienceId}) => {
    const [experience, setExperience] = useState('')
    const [loading, setLoading] = useState(true)
    const { i18n } = useTranslation();
    const currentLocale = i18n.language;
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const pb = new PocketBase(backendUrl)
    pb.autoCancellation(false)

    const current = experienceId

    useEffect(() => {
        const fetchData = async () => {
            try {
                const record = await pb.collection('Amenities').getOne(current)
                setExperience(record);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData()
    }, [current]);

  return (
    <div className="w-full">
        {
            loading ? <span className="loading loading-spinner loading-sm"></span>            : (
                <div className='flex flex-col justify-center md:flex-row w-full items-stretch pb-20'>
                    <div className='w-full relative flex flex-col justify-center items-center md:w-1/2'>
                        <img className="w-full object-contain md:h-[600px]" src={`${backendUrl}/api/files/${experience.collectionId}/${experience.id}/${experience.image_inner}?token=`} alt={experience.name} />
                        <h3 className="w-60 absolute -bottom-4  text-white bg-primary p-2 font-futura text-lg flex justify-center items-center">{experience[`title_${currentLocale}`]}</h3>
                    </div>
                    <div className='p-10 bg-cream md:min-h-full md:w-1/2 flex flex-col justify-center'>
                        <h1 className="text-2xl md:text-4xl text-start text-primary font-futura font-bold">{experience.title}</h1>
                        <div className="text-black md:px-0 gap-4 flex flex-col experiences futura_description" dangerouslySetInnerHTML={{ __html: experience[`description_${currentLocale}`] }}></div>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default ExperienceInnerItem