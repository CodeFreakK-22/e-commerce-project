import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'

const Cart = () => {

    const { cartItems, products, currency, updateQuantity, navigate } = useContext(ShopContext)
    const [cartData, setCartData] = useState([])

    useEffect(() => {
        if (products.length > 0) {
            const tempData = []
            for (const itemId in cartItems) {
                for (const item in cartItems[itemId]) {
                    if (cartItems[itemId][item] > 0) {
                        tempData.push({
                            _id: itemId,
                            size: item,
                            quantity: cartItems[itemId][item],
                        })
                    }
                }
            }
            setCartData(tempData)
        }
    }, [cartItems, products])

    return (
        <div className='w-full max-w-none border-t pt-6 sm:pt-12 pb-16 sm:pb-20 px-4 dark:border-gray-700 dark:bg-gray-900 min-h-screen'>

            {/* HEADER */}
            <div className='flex items-baseline gap-3 mb-6 sm:mb-8'>
                <Title text1={'YOUR'} text2={'CART'} />
                <span className='text-xs text-gray-400 dark:text-gray-500'>
                    {cartData.length} item{cartData.length !== 1 ? 's' : ''}
                </span>
            </div>

            <div className='flex flex-col lg:flex-row gap-6 items-stretch w-full'>

                {/* CART ITEMS */}
                <div className='flex-1 flex flex-col gap-3'>
                    {cartData.length > 0 ? cartData.map((item, index) => {

                        const productData = products.find(p => p._id === item._id)
                        if (!productData) return null

                        return (
                            <div
                                key={index}
                                className='flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl border 
                                border-gray-100 dark:border-gray-700 
                                bg-white dark:bg-gray-800 
                                hover:border-gray-300 dark:hover:border-gray-500 
                                hover:-translate-y-0.5 transition-all duration-200'
                            >

                                {/* IMAGE + INFO */}
                                <div className='flex gap-4 w-full'>
                                    <img
                                        src={productData.image[0]}
                                        alt={productData.name}
                                        className='w-16 h-16 rounded-xl object-cover flex-shrink-0'
                                    />

                                    <div className='flex-1 min-w-0'>
                                        <p className='text-sm font-medium dark:text-white truncate sm:whitespace-normal mb-2'>
                                            {productData.name}
                                        </p>

                                        <div className='flex items-center gap-2 mb-2'>
                                            <span className='text-xs px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'>
                                                Size: {item.size}
                                            </span>
                                            <span className='text-sm font-medium dark:text-white'>
                                                {currency}{productData.price}
                                            </span>
                                        </div>

                                        {/* QTY + PRICE */}
                                        <div className='flex items-center justify-between w-full gap-4 mt-2'>
                                            <div className='flex items-center gap-2'>
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.size, Math.max(1, item.quantity - 1))}
                                                    className='w-7 h-7 rounded-lg border border-gray-200 dark:border-gray-600 
                                                    text-gray-700 dark:text-gray-300 
                                                    hover:bg-gray-50 dark:hover:bg-gray-700 
                                                    flex items-center justify-center text-base transition'
                                                >
                                                    −
                                                </button>

                                                <span className='text-sm font-medium dark:text-white min-w-[20px] text-center'>
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                                                    className='w-7 h-7 rounded-lg border border-gray-200 dark:border-gray-600 
                                                    text-gray-700 dark:text-gray-300 
                                                    hover:bg-gray-50 dark:hover:bg-gray-700 
                                                    flex items-center justify-center text-base transition'
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <p className='text-sm font-medium dark:text-white'>
                                                {currency}{(productData.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* DELETE */}
                                <button
                                    onClick={() => updateQuantity(item._id, item.size, 0)}
                                    className='w-8 h-8 self-end sm:self-auto rounded-lg 
                                    text-gray-400 dark:text-gray-500 
                                    hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 
                                    flex items-center justify-center transition-all'
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6l-1 14H6L5 6" />
                                        <path d="M10 11v6M14 11v6" />
                                        <path d="M9 6V4h6v2" />
                                    </svg>
                                </button>
                            </div>
                        )
                    }) : (
                        <div className='flex flex-col items-center justify-center py-24 gap-3'>
                            <p className='text-gray-400 dark:text-gray-500 text-sm'>Your cart is empty</p>
                            <button
                                onClick={() => navigate('/collection')}
                                className='text-xs px-5 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition'
                            >
                                Browse collection
                            </button>
                        </div>
                    )}
                </div>

                {/* ORDER SUMMARY */}
                {cartData.length > 0 && (
                    <div className='w-full lg:max-w-[320px] flex-shrink-0 flex flex-col gap-3'>

                        <div className='bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5'>
                            <p className='text-sm font-medium dark:text-white mb-4'>Order summary</p>

                            <CartTotal />

                            <button
                                onClick={() => navigate('/place-order')}
                                className='w-full mt-5 py-3 rounded-xl text-sm font-medium
                                bg-gray-900 dark:bg-white 
                                text-white dark:text-gray-900 
                                hover:opacity-90 transition'
                            >
                                Proceed to checkout
                            </button>
                        </div>

                        <div className='bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-4'>
                            <p className='text-xs text-gray-500 dark:text-gray-400'>
                                Free shipping on orders above {currency}999. Add more items to qualify!
                            </p>
                        </div>

                        <button
                            onClick={() => navigate('/collection')}
                            className='text-xs text-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition py-1'
                        >
                            ← Continue shopping
                        </button>

                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart