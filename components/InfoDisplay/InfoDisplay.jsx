"use client";
import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import { useTranslation } from 'react-i18next';
import { IoIosArrowForward } from "react-icons/io";

const InfoDisplay = ({ collection, colorlines, coloricon }) => {
    const [data, setData] = useState([]);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const pb = new PocketBase(backendUrl);
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

    return (
        <div className="flex flex-col justify-center items-center gap-4 py-10 md:w-3/4 px-10">
            {
                data.map((item, index) => (
                    <div className={`collapse  border-b border-${colorlines} w-full rounded-none`} key={index}>
                        <input type="checkbox" className="peer" />
                        <div className={`collapse-title md:text-lg text-sm font-medium font-futura uppercase peer-checked:collapse-open text-${colorlines}`}>
                            <div className='flex justify-between items-center'>
                                <span className="flex-grow">{item[`title_${currentLocale}`]}</span>
                                <div className="icon-wrapper" style={{ width: '24px', display: 'flex', justifyContent: 'center' }}>
                                    <IoIosArrowForward className={`collapse-icon text-xl ${coloricon ? `text-${coloricon}` : ''}`} />
                                </div>
                            </div>
                        </div>
                        <div className="collapse-content peer-checked:collapse-open">
                            <p className={`font-futura infodisplay text-${colorlines}`}
                                dangerouslySetInnerHTML={{ __html: item[`desc_${currentLocale}`] }}>
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default InfoDisplay;