"use client";
import React, {useState, useEffect} from 'react'
import PocketBase from 'pocketbase'
import { FaLocationDot } from "react-icons/fa6"
import { FaRegCalendar } from "react-icons/fa6"
import { BsClock } from "react-icons/bs";
import { useTranslation } from 'react-i18next'


const ActivitiesItem = () => {
    const [activities, setActivities] = useState([])
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const pb = new PocketBase(backendUrl);
    pb.autoCancellation(false);

    const { i18n } = useTranslation();
    const currentLocale = i18n.language;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const records = await pb.collection('Activities_Calendar').getFullList({
                    sort: '-created',
                });
                console.log(records)
                setActivities(records);
            } catch (error) {
                console.error("Error fetching data: ", error)
            }
        }

        fetchData()
    }, [])


  return (
    <div className="activities_container">
        { 
            activities.map((item, index) => (
                <div 
                key={index} 
                className={`bg-secondary px-2 py-4 gap-2 flex md:flex-col relative cursor-pointer 
                ${(index + 1) % 4 !== 0 ? 'md:border-r md:border-black border-b border-black' : ''} 
                ${(index + 1) % 2 !== 0 ? 'md:border-r md:border-black' : ''}`}>
                    <div className='flex justify-center w-full items-center'>
                        <img className="md:h-60 h-28 object-cover md:object-contain" src={`${backendUrl}/api/files/${item.collectionId}/${item.id}/${item.Image}?token=`} alt={item.name} />
                    </div>
                    {/* añadir un separador de imagen */}
                    <div className="separator"></div>
                    <div className='flex flex-col gap-4  w-full'>
                        <h3 className="font-futura uppercase text-black">{item[`title_${currentLocale}`]}</h3>
                        <div className="activities_inner_container">
                            <FaLocationDot className="icon_activities text-md " />
                            <p className='activities_inner_text'>{item[`location_${currentLocale}`]}</p>
                        </div>
                        <div className="activities_inner_container">
                            <FaRegCalendar className="icon_activities text-md" />
                            <p className='activities_inner_text'>{item[`day_${currentLocale}`]}</p>
                        </div>
                        <div className="activities_inner_container">
                            <BsClock className="icon_activities text-md" />
                            <p className='activities_inner_text'>{item[`date_${currentLocale}`]}</p>
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default ActivitiesItem