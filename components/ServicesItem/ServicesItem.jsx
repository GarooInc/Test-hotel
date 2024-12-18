"use client";
import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import { useTranslation } from 'react-i18next';

const ServicesItem = ({ room, collection}) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const [data, setData] = useState([]);
    const [actualProduct, setActualProduct] = useState({});
    const pb = new PocketBase(`${backendUrl}`);
    pb.autoCancellation(false);

    const { i18n } = useTranslation();
    const currentLocale = i18n.language;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const records = await pb.collection(collection).getFullList({
                    sort: 'id_number',
                });
                setData(records);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }, []);

    const addToCart = (item) => {
        const updatedItem = {
            ...item,
            Title: item[`title_${currentLocale}`],
            Variant: "",
            Price: item.price || 0,
        };
        
        const message = currentLocale === 'es' 
            ? `Hola, quiero solicitar ${updatedItem.Title} por favor.`
            : `Hello, I would like to request ${updatedItem.Title} please.`;

        const encodedMessage = encodeURIComponent(message);

        const phoneNumber = "5016144247";

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, "_blank");

        setActualProduct(updatedItem);
    };

    return (
        <div className="grid md:grid-cols-3 md:gap-10 grid-cols-2 gap-4 md:w-3/4 w-full pt-10 pb-20 px-10">
            {room ? (
                data.map((item, index) => (
                    <div key={index} className="pb-16 gap-2 flex flex-col relative" >
                        <img className="object-contain h-24" src={`${backendUrl}/api/files/${item.collectionId}/${item.id}/${item.image}?token=`} alt={item.name} />
                        <h3 className="text-primary font-futura tracking-wider uppercase">{item[`title_${currentLocale}`]}</h3>
                        <p className="text-primary text-xs  leading-none font-futura font-bold">${item.price}</p>
                        <button className='green_button absolute bottom-4 uppercase' onClick={() => addToCart(item)}>{currentLocale === 'es' ? 'Solicitar' : 'Request'}</button>
                    </div>
                ))
            ) : (
                data.map((item, index) => (
                    <div className='flex' key={index}>
                        <a href={item.link_service ? item.link_service : ""} className='flex gap-4 justify-start items-center'>
                            <img className="md:w-20 md:h-20 w-16 rounded-full object-cover" src={`${backendUrl}/api/files/${item.collectionId}/${item.id}/${item.image}?token=`} alt={item.name} />
                            <span className='text-green font-futura infodisplay' dangerouslySetInnerHTML={{ __html: item[`title_${currentLocale}`] }}></span>
                        </a>
                    </div>
                ))
            )}
        </div>
    );
}

export default ServicesItem;