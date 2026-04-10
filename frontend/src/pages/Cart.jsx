import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {

    const { cartItems, products, currency, updateQuantity, navigate } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            const tempData = [];
            for (const itemId in cartItems) {
                for (const item in cartItems[itemId]) {
                    if (cartItems[itemId][item] > 0) {
                        tempData.push({
                            _id: itemId,
                            size: item,
                            quantity: cartItems[itemId][item],
                            data: products.find((product) => product._id === itemId)
                        })
                    }
                }
            }
            setCartData(tempData);
        }
    }, [cartItems, products])

    return (
        <div className='border-t pt-14 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300'>

            {/* TITLE */}
            <div className='text-2xl mb-3'>
                <Title text1={'YOUR'} text2={'CART'} />
            </div>

            {/* CART ITEMS */}
            <div>
                {
                    cartData.map((item, index) => {

                        const productData = products.find((product) => product._id === item._id);

                        return (
                            <div
                                key={index}
                                className='py-4 border-t border-b text-gray-700 dark:text-gray-300 dark:border-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
                            >

                                {/* PRODUCT INFO */}
                                <div className='flex items-start gap-6'>
                                    <img
                                        className='w-16 sm:w-20'
                                        src={productData.image[0]}
                                        alt=''
                                    />

                                    <div>
                                        <p className='text-xs sm:text-lg font-medium dark:text-white'>
                                            {productData.name}
                                        </p>

                                        <div className='flex items-center gap-5 mt-2'>
                                            <p className='dark:text-gray-400'>
                                                {currency}{productData.price}
                                            </p>

                                            <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50 dark:bg-gray-800 dark:border-gray-600'>
                                                {item.size}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* QUANTITY INPUT */}
                                <input
                                    onChange={(e) =>
                                        e.target.value === '' || e.target.value === '0'
                                            ? null
                                            : updateQuantity(item._id, item.size, parseInt(e.target.value))
                                    }
                                    className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white'
                                    type="number"
                                    min={1}
                                    defaultValue={item.quantity}
                                />

                                {/* DELETE ICON */}
                                <img
                                    onClick={() => updateQuantity(item._id, item.size, 0)}
                                    src={assets.bin_icon}
                                    className='w-4 mr-4 sm:w-5 cursor-pointer dark:invert'
                                    alt=""
                                />
                            </div>
                        )
                    })
                }
            </div>

            {/* TOTAL + BUTTON */}
            <div className='flex justify-end my-20'>
                <div className='w-full sm:w-[450px]'>
                    <CartTotal />

                    <div className='w-full text-end'>
                        <button
                            onClick={() => navigate('/place-order')}
                            className='bg-black text-white dark:bg-white dark:text-black text-sm my-8 px-8 py-2'
                        >
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Cart