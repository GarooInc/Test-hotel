"use client";
import React, { useState, useEffect, useRef } from 'react';
import PocketBase from 'pocketbase';
import { useTranslation } from 'react-i18next';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const TabCartItem = ({ collection, noTags }) => {
    const [selected, setSelected] = useState(0);
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState(null);
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const pb = new PocketBase(`${backendUrl}`);
    pb.autoCancellation(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const records = await pb.collection(collection).getFullList({
                    sort: '-created',
                });
                setItems(records);
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
            Variant: item.variant || "",
            Price: item.price,
        };
    
        const message = currentLocale === 'es' 
            ? `Hola, me gustaría solicitar información sobre ${updatedItem.Title} - ${updatedItem.Variant} ($${updatedItem.Price}) por favor.`
            : `Hello, I would like to request information about ${updatedItem.Title} - ${updatedItem.Variant} ($${updatedItem.Price}) please.`;
    
        const encodedMessage = encodeURIComponent(message);
    
        const phoneNumber = "5016144247";
    
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
        window.open(whatsappUrl, "_blank");
    };
    

    const uniqueTags_es = [...new Set(items?.map(item => item.tag_es))].sort((a, b) => b.localeCompare(a));
    const uniqueTags_en = [...new Set(items?.map(item => item.tag_en))].sort((a, b) => b.localeCompare(a));
    const filteredItems = filter !== null ? items.filter(item => item.tag_es === filter || item.tag_en === filter) : items;
    const scrollContainerRef = useRef(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <div className='flex flex-col gap-10 w-full'>
            {!noTags && 
            <div className="relative w-full flex p-4 justify-center items-center">
                <div className="menu_arrow_left" onClick={scrollLeft}>
                    <IoIosArrowBack className="text-gray-500" />
                </div>
                <div className="w-full overflow-x-auto" ref={scrollContainerRef}>
                    <div className='items_container'>
                        {
                            currentLocale === 'es' ? uniqueTags_es.map((tag, index) => (
                                <button key={index} className={`button_line ${filter === tag ? 'bg-secondary text-white' : 'text-secondary'}`} onClick={() => setFilter(tag)}>
                                    {tag}
                                </button>
                            )) : uniqueTags_en.map((tag, index) => (
                                <button key={index} className={`button_line ${filter === tag ? 'bg-secondary text-white' : 'text-secondary'}`} onClick={() => setFilter(tag)}>
                                    {tag}
                                </button>
                            ))
                        }
                    </div>
                </div>
                <div className="menu_arrow_right" onClick={scrollRight}>
                    <IoIosArrowForward className="text-gray-500" />
                </div>
            </div>
            }
            <div className="adventure_container">
                {filteredItems.map((item, index) => (
                    <div key={index} className={`pb-16 gap-2 flex flex-col relative ${(index + 1) % 5 !== 0 ? 'xl:border-r xl:border-black' : ''} ${(index + 1) % 5 !== 0 ? 'xl:border-r xl:border-black' : ''}`}>
                        <img className="adventure_img" src={`${backendUrl}/api/files/${item.collectionId}/${item.id}/${item.image}?token=`} alt={item.name} />
                        <div className='flex flex-col gap-4  w-full px-4'>
                            <h3 className="adventure_title">{item[`title_${currentLocale}`]}</h3>
                            <p className="text-black text-md font-futura leading-6 tracking-tight" dangerouslySetInnerHTML={{ __html: item[`desc_${currentLocale}`] }}></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TabCartItem;