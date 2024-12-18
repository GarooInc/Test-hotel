"use client"
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM':
            //si ya existe el item en el carrito, se incrementa la cantidad
            if (state.items.find(item => item.id === action.payload.id && item.Variant === action.payload.Variant)) {
                return { ...state, items: state.items.map(item => item.id === action.payload.id  ? { ...item, quantity: item.quantity + 1 } : item) };
            }
            return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
        case 'INCREASE_ITEM':
            return { ...state, items: state.items.map(item => item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item) };
        case 'DECREASE_ITEM':
            return { ...state, items: state.items.map(item => item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item).filter(item => item.quantity > 0)
            };
        case 'REMOVE_ITEM':
            return { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
        case 'LOAD_ITEMS':
            return { ...state, items: Array.isArray(action.payload) ? action.payload : [] };
        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });

    useEffect(() => {
        const localData = localStorage.getItem('cart');
        if (localData) {
            const parsedData = JSON.parse(localData);
            dispatch({ type: 'LOAD_ITEMS', payload: parsedData.items || [] });
        }
    }, []);

    useEffect(() => {
        if (state.items.length > 0) {
            localStorage.setItem('cart', JSON.stringify({ items: state.items }));
        }
    }, [state.items]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}