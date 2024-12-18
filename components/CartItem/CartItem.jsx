"use client"
import React, { useState, useEffect, useRef } from 'react'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from "next/navigation"
import { CgArrowLongRight, CgShoppingCart } from 'react-icons/cg'
import { TfiClose } from "react-icons/tfi"
import { motion } from "framer-motion"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


const CartItem = ({ showCart }) => {
    const { state, dispatch } = useCart()
    const router = useRouter()
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const ordersUrl = process.env.NEXT_PUBLIC_API_URL

    const [showForm, setShowForm] = useState(false)
    const [isOpen, setIsOpen] = useState(true)
    const [removingItem, setRemovingItem] = useState(null)
    const cartRef = useRef(null) 

    const [form, setForm] = useState({
        phone: '',
        family: '',
        room: '',
    })
    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onHandleSubmit = async (event) => {
        event.preventDefault()
        const items = state.items.map(item => ({
            "itemName": item.Title || item.title,
            "variant": item.Variant,
            "price": parseFloat(item.Price),
            "quantity": item.quantity
        }))
        
        const response = await fetch(`${ordersUrl}/api/v1/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contact: form.phone,
                family: form.family,
                room: parseInt(form.room, 10),
                items: items
            })
        })

        if (response.ok) {
            setMessage('Order created successfully')
            dispatch({ type: 'LOAD_ITEMS', payload: [] })
            setShowForm(false)
        } else {
            setMessage('Error creating order')
        }
    }

    const onHandleClose = () => {
        setShowForm(false)
        setMessage('')
    }

    const onHandleCloseCart = () => {
        setIsOpen(!isOpen)
        showCart(false)
    }

    const handleCheckout = () => {
        setShowForm(true)
    }

    const handleRemoveItem = (item) => {
        setRemovingItem(item.id)
        setTimeout(() => {
            dispatch({ type: 'REMOVE_ITEM', payload: item })
            setRemovingItem(null)
        }, 300)
    }

    const handlePhoneChange = (value) => {
        setForm({
            ...form,
            phone: value
        })
    }

    const handleClickOutside = (event) => {
        if (!showForm && cartRef.current && !cartRef.current.contains(event.target)) {
            setIsOpen(false)
            showCart(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [showForm])

    const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "-100%", transition: { duration: 0.3 } },
        removing: { opacity: 0, x: "100%", transition: { duration: 0.3 } },
        formOpen: { opacity: 1, y: 0 },
        formClosed: { opacity: 0, y: "-100%", transition: { duration: 0.3 } }
    }

    return (
        <>
        <motion.div ref={cartRef} className="cart_container" animate={isOpen ? "open" : "closed"} variants={variants} initial="closed">
            <div className="flex justify-between items-center">
            <button onClick={onHandleCloseCart} className="close_button">
                <TfiClose className="text-black text-2xl" />
            </button>
            </div>
            {state.items.length > 0 ? (
                <ul className='cart_items'>
                    {state.items.map((item, index) => (
                        <motion.li
                            key={index}
                            className='px-2 pb-4 gap-2 flex relative'
                            animate={removingItem === item.id ? "removing" : "open"}
                            variants={variants}
                        >
                            <button className="remove_button" onClick={() => handleRemoveItem(item)}>X</button>
                            {
                                item.image && (
                                    <img className="cart_image" src={`${backendUrl}/api/files/${item.collectionId}/${item.id}/${item.image}?token=`} alt={item.name} />
                                )
                            }
                            <div className='flex flex-col justify-between w-full'>
                                <h3 className="item_title">{item.title || item.Title} <span className='text-secondary'>₡{item.Price}</span></h3>
                                {item.variant && (
                                    <p className='text-gray text-xs font-futura leading-none'>Variant: {item.Variant}</p>
                                )}
                                <div className="quantity_button">
                                    <button className="quantity_button_inner" onClick={() => dispatch({ type: 'DECREASE_ITEM', payload: item })}>-</button>
                                    <p className="quantity_text">{item.quantity}</p>
                                    <button className="quantity_button_inner" onClick={() => dispatch({ type: 'INCREASE_ITEM', payload: item })}>+</button>
                                </div>
                            </div>
                        </motion.li>
                    ))}
                </ul>
            ) : (
                <p className='text-center font-futura'>Your cart is empty</p>
            )}
            {state.items.length > 0 && (
                <button className="checkout_button" onClick={handleCheckout}>Checkout <CgArrowLongRight className="text-light-brown text-2xl" /></button>
            )}
        </motion.div>
            {showForm && (
                <div className="checkout_form">
                    <motion.div className="bg-tertiary p-6 w-80" animate={showForm ? "formOpen" : "formClosed"} variants={variants} initial="formClosed">
                        <div className="flex justify-end">
                            <button onClick={() => setShowForm(false)}><TfiClose className="text-black text-2xl" /></button>
                        </div>
                        <form className="form_container">
                            <PhoneInput
                                country={'us'} 
                                placeholder='Phone'
                                value={form.phone}
                                onChange={handlePhoneChange}
                                inputClass="input_cart"
                            />
                            <input type="text" placeholder="Family" className="input_cart" onChange={handleChange} name="family" />
                            <input type="text" placeholder="Room" className="input_cart" onChange={handleChange} name="room" />
                            <button className="text-secondary uppercase p-2 font-futura" onClick={(e) => onHandleSubmit(e)}>Submit</button>
                        </form>
                    </motion.div>
                </div>
            )}
            {message && (
                <div className="msg_container">
                    <div className="cst_message">
                        <button onClick={() => onHandleClose()}><TfiClose className="close_btn" /></button>
                        <p className="text-black text-base font-futura leading-tight">{message}</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default CartItem