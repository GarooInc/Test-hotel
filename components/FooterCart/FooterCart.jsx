"use client";
import React, {useContext, useState} from 'react'
import { useRouter } from "next/navigation"
import FooterItem from '@/components/FooterItem/FooterItem'
import CartItem from '@/components/CartItem/CartItem'
import { useCart } from '@/contexts/CartContext';



const FooterCart = ({transparent}) => {
    const router = useRouter()
    const [showCart, setShowCart] = useState(false)
    const { state } = useCart()
    const itemCount = state.items.reduce((acc, item) => acc + item.quantity, 0)

    const handleShowCart = () => {
        setShowCart(!showCart)
    }

  return (
    <div className='fixed bottom-0 w-full'>
        <div className="absolute bottom-24 right-10 flex justify-evenly pt-4" >
            <img src="/assets/images/room_service/home.png" alt="logo" className="w-[50px] cursor-pointer" onClick={() => router.push('/')} />
            <div className="relative">
                    <img src="/assets/images/room_service/cart.png" alt="logo" className="w-[50px] cursor-pointer" onClick={handleShowCart} />
                    {itemCount > 0 && (
                        <span className="cart_bubble">
                            {itemCount}
                        </span>
                    )}
            </div>
        </div>
        <FooterItem transparent={transparent}/>
        {showCart && <div className="absolute bottom-0 right-0 z-10">
            <CartItem showCart= {handleShowCart} />
        </div>}
    </div>

  )
}

export default FooterCart