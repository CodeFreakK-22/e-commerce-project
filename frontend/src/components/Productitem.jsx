import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Productitem = ({ id, image, name, price }) => {

    const { currency, addToCart } = useContext(ShopContext)
    const [liked, setLiked] = useState(false)

    return (
        <div className='group relative p-2 rounded-2xl hover:shadow-lg transition bg-white dark:bg-gray-800'>

            {/* WISHLIST */}
            <button
                onClick={() => setLiked(!liked)}
                className='absolute top-3 right-3 z-10 w-9 h-9 rounded-full 
                bg-white/80 dark:bg-gray-700/80 backdrop-blur 
                flex items-center justify-center 
                hover:scale-110 transition'
            >
                <svg
                    viewBox="0 0 24 24"
                    className={`w-5 h-5 transition ${liked
                            ? 'fill-red-500 stroke-red-500'
                            : 'fill-none stroke-gray-500 dark:stroke-gray-300'
                        }`}
                    strokeWidth="1.6"
                >
                    <path d="M12 20.5c-.3 0-.6-.1-.8-.3C9.3 18.7 4 14.2 4 9.8 4 7 6 5 8.8 5c1.6 0 2.9.8 3.2 1.3.3-.5 1.6-1.3 3.2-1.3C18 5 20 7 20 9.8c0 4.4-5.3 8.9-7.2 10.4-.2.2-.5.3-.8.3z" />
                </svg>
            </button>

            <Link to={`/product/${id}`}>

                {/* IMAGE */}
                <div className='overflow-hidden rounded-2xl relative'>
                    <img
                        src={image[0]}
                        alt={name}
                        className='w-full h-full object-cover 
                        transition duration-300 group-hover:scale-110'
                    />

                    {/* OVERLAY */}
                    <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300' />

                    {/* QUICK ADD */}
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            addToCart(id, "M", 1)
                        }}
                        className='absolute bottom-3 left-1/2 -translate-x-1/2 
                        opacity-0 group-hover:opacity-100 
                        bg-white text-gray-900 text-xs font-medium 
                        px-4 py-2 rounded-full shadow 
                        transition duration-300'
                    >
                        Add to Cart
                    </button>
                </div>

                {/* INFO */}
                <div className='pt-3'>
                    <p className='text-sm dark:text-white line-clamp-2'>
                        {name}
                    </p>

                    <p className='text-sm font-medium text-gray-700 dark:text-gray-400 mt-1'>
                        {currency}{price}
                    </p>
                </div>

            </Link>
        </div>
    )
}

export default Productitem