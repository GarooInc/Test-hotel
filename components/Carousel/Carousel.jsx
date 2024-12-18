"use client"
import React from 'react'
import { CgArrowLongRight } from "react-icons/cg"
import { CgArrowLongLeft } from "react-icons/cg"
import { useState, useEffect } from 'react'
import PocketBase from 'pocketbase'
const Carousel = () => {

    const [data, setData] = useState([]);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const pb = new PocketBase(backendUrl)

    pb.autoCancellation(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const records = await pb.collection("welcome").getFullList({
                });
                setData(records);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }, []);

  return (
<div className="carousel w-full h-full">
    {data.map((image, index) => (
        <div id={`slide-${index}`} key={index} className="carousel-item relative w-full">
            <img src={`${backendUrl}/api/files/${image.collectionId}/${image.id}/${image.carousel_img}?token=`} alt={`slide-${index}`} className="w-full object-cover" />
            <div className="absolute top-1/2 flex -translate-y-1/2 transform justify-between">
                {
                    index !== 0 && 
                    <button 
                        className="absolute bg-primary text-white p-2 rounded-full left-5"
                        onClick={() => document.getElementById(`slide-${index - 1}`).scrollIntoView(false)}
                    >
                        <CgArrowLongLeft className='text-2xl text-black' />
                    </button>
                }
                {
                    index !== data.length &&
                    <button 
                        className="absolute bg-primary text-white p-2 rounded-full right-5"
                        onClick={() => document.getElementById(`slide-${index}`).scrollIntoView(false)}
                    >
                        <CgArrowLongRight className='text-2xl text-black' />
                    </button>
                }
            </div>
        </div> 
    ))}
</div>
  )
}

export default Carousel