"use client";
import React, {useState, useEffect} from 'react'
import PocketBase from 'pocketbase'
import { useRouter } from "next/navigation"
import { useTranslation } from 'react-i18next';


const AmenitiesItem = () => {
    const router = useRouter()
    const [experiences, setExperiences] = useState([]);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const pb = new PocketBase(backendUrl);
    pb.autoCancellation(false);
    const { i18n } = useTranslation();
    const currentLocale = i18n.language;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const records = await pb.collection('Amenities').getFullList({
                    sort: '-created',
                });
                console.log(records)
                setExperiences(records);
            } catch (error) {
                console.error("Error fetching data: ", error)
            }
        }

        fetchData()
    }, [])

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 grid-flow-row-dense auto-rows-auto p-10 w-full">
        {
            experiences.map((item, index) => (
                <div key={index} className={`md:pb-12 pb-8 gap-2 flex flex-col relative cursor-pointer`}
                    onClick={() => router.push(`/experience/${item.id}`)} style={{backgroundColor: item.background_color}}>
                    <img className="w-full md:h-60 h-40  object-cover" src={`${backendUrl}/api/files/${item.collectionId}/${item.id}/${item.image}?token=`} alt={item.name} />
                    <div className='flex justify-center items-center'>
                        <h3 className={`text-base leading-tight font-futura mt-2 uppercase text-center`} style={{color: item.text_color}}>{item[`title_${currentLocale}`]}</h3>
                    </div>
                </div>
            ))
        }
    </div>

  )
}

export default AmenitiesItem