"use client";
import React, { useState, useEffect, useRef } from 'react';
import PocketBase from 'pocketbase';
import { useCart } from '@/contexts/CartContext';
import CartNotification from '@/components/CartNotification/CartNotification';
import { useTranslation } from 'react-i18next';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Menu = () => {
    const [food, setFood] = useState([]);
    const [notification, setNotification] = useState(false);
    const [actualProduct, setActualProduct] = useState({});
    const [prices, setPrices] = useState({}); 
    const [selectedVariants, setSelectedVariants] = useState({});
    const [filter, setFilter] = useState(null);
    const { dispatch } = useCart();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const pb = new PocketBase(`${backendUrl}`);    
    pb.autoCancellation(false);

    const { i18n } = useTranslation();
    const currentLocale = i18n.language;

    const selectVariant = (e, itemId) => {
        const selectedValue = e.target.value;
        setPrices(prevPrices => ({
            ...prevPrices,
            [itemId]: selectedValue,
        }));
        setSelectedVariants(prevVariants => ({
            ...prevVariants,
            [itemId]: e.target.selectedOptions[0].text,
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const records = await pb.collection('Room_Service').getFullList({
                    sort: '-created',
                });
                console.log(records);
                setFood(records);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    const addToCart = (item) => {
        const updatedItem = {
            ...item,
            Title : item[`Title_${currentLocale}`],
            Variant: selectedVariants[item.id],
            Price: prices[item.id] || item.Price,
            Type: 'Información',
        };
        dispatch({ type: 'ADD_ITEM', payload: updatedItem });
        setNotification(true);
        setActualProduct(updatedItem);
        setTimeout(() => {
            setNotification(false);
        }, 3000);
    };

    const uniqueTags_es = [...new Set(food?.map(item => item.tag_es))];
    const uniqueTags_en = [...new Set(food?.map(item => item.tag_en))];
    const filteredItems = filter !== null ? food.filter(item => item.tag_es === filter || item.tag_en === filter) : food;

    const scrollContainerRef = useRef(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };


    return (
        <div className='menu_container'>
            <div className="relative w-full flex justify-center items-center">
                <div className="menu_arrow_left" onClick={scrollLeft}>
                    <IoIosArrowBack className="text-gray-500" />
                </div>
                <div className="w-full overflow-x-auto" ref={scrollContainerRef}>
                    <div className='menu_items_container'>
                        {
                            currentLocale === 'es' ? uniqueTags_es.map((tag, index) => (
                                <button key={index} className={`button_line ${filter === tag ? 'bg-light-brown text-white' : 'text-green'}`} onClick={() => setFilter(tag)}>
                                    {tag}
                                </button>
                            )) : uniqueTags_en.map((tag, index) => (
                                <button key={index} className={`button_line ${filter === tag ? 'bg-light-brown text-white' : 'text-green'}`} onClick={() => setFilter(tag)}>
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
            <div className="menu_grid">
            {filteredItems.map((item, index) => (
                <div key={index} className="bg-white flex flex-col justify-between h-60 p-2">
                <h3 className="text-black text-base leading-tight font-futura mt-2">{item[`Title_${currentLocale}`]}</h3>
                <p className="text-black text-xs font-[futura light] leading-none h-20">{item[`Description_${currentLocale}`]}</p>
                <div className="flex-1 flex flex-col justify-between">
                    {item.Variants ? (
                    <div className='flex flex-col mt-2'>
                        <label className="text-sm font-futura text-black">Variants</label>
                        <select className="bg-white font-futura text-xs" onChange={(e) => selectVariant(e, item.id)}>
                        {Object.entries(item.Variants).map(([key, value]) => (
                            <option key={key} value={value}>{`${key} - $${value}`}</option>
                        ))}
                        </select>
                    </div>
                    ) : <div className="h-10"></div>}
                    <div className='w-full h-[1px] bg-black mt-2'></div>
                    <div className='flex gap-2 justify-between items-center'>
                    <p className="text-lightgray text-xs font-light leading-none font-futura">${prices[item.id] || item.Price}</p>
                    <button className="green_button" onClick={() => addToCart(item)}>Add to cart</button>
                    </div>
                </div>
                </div>
            ))}
  {notification && <CartNotification productName={actualProduct.Title} productImage={`${backendUrl}/api/files/${actualProduct.collectionId}/${actualProduct.id}/${actualProduct.image}?token=`} productVariant={actualProduct.Variant} />}
</div>
</div>

    );
};

export default Menu;