"use client";
import React from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";

const ButtonNav = ({ title, link, className }) => {
    const router = useRouter();
    
    const handleClick = () => {
        router.push(link);
    };

    const renderTitle = () => {
        return title.split(/(<br>|<\/br>)/).map((part, index) => {
            if (part === "<br>" || part === "</br>") {
                return null; 
            }
            const isStyled = title.includes(`<br>${part}</br>`);
            return (
                <span key={index} className={isStyled ? 'font-playfair italic md:text-lg text-sm' : 'uppercase tracking-wider'}>
                    {part}
                </span>
            );
        });
    };

    return (
        <div className="button_nav_container">
            <div className={`button_nav ${className}`} onClick={handleClick}>
                <span className="flex justify-between w-full">
                    <div className="flex items-center gap-2">
                    {renderTitle()} 
                    </div>
                    <IoIosArrowForward className="button_nav_icon" />
                </span>
            </div>
        </div>
    );
};

export default ButtonNav;
