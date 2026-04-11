import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

const Productitem = ({ id, image, name, price }) => {

    const { currency, addToCart } = useContext(ShopContext)
    const [liked, setLiked] = useState(false)

    const handleAddToCart = (e) => {
        e.preventDefault()
        e.stopPropagation()
        addToCart(id, 'M')
        toast.success('Added to cart')
    }

    const handleWishlist = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setLiked(prev => !prev)
        toast.success(liked ? 'Removed from wishlist' : 'Added to wishlist')
    }

    return (
        <div className='group relative rounded-2xl overflow-hidden
            bg-gray-50 dark:bg-gray-800
            border border-transparent
            hover:border-gray-200 dark:hover:border-gray-600
            hover:-translate-y-1 transition-all duration-300'>

            <Link to={`/product/${id}`}>

                {/* IMAGE WRAP */}
                <div className='relative overflow-hidden aspect-[3/4]'>
                    <img
                        src={image[0]}
                        alt={name}
                        className='w-full h-full object-cover
                        transition-transform duration-500 group-hover:scale-105'
                    />

                    {/* WISHLIST — always visible on mobile, hover on desktop */}
                    <button
                        onClick={handleWishlist}
                        className='absolute top-2.5 right-2.5 z-10
                        w-8 h-8 rounded-full flex items-center justify-center
                        bg-white/90 dark:bg-gray-700/90
                        sm:opacity-0 sm:group-hover:opacity-100
                        hover:scale-110 transition-all duration-200'
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className={`w-4 h-4 transition-all ${liked
                                ? 'fill-red-500 stroke-red-500'
                                : 'fill-none stroke-gray-500 dark:stroke-gray-300'
                                }`}
                            strokeWidth="1.8"
                        >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </button>

                    {/* QUICK ADD — slides up on desktop hover */}
                    <div className='absolute bottom-0 left-0 right-0 p-2.5
                        hidden sm:block
                        translate-y-full group-hover:translate-y-0
                        transition-transform duration-300'>
                        <button
                            onClick={handleAddToCart}
                            className='w-full py-2 rounded-xl text-xs font-medium
                            bg-white dark:bg-gray-900
                            text-gray-900 dark:text-white
                            hover:bg-gray-100 dark:hover:bg-gray-800
                            transition'
                        >
                            Quick add
                        </button>
                    </div>
                </div>

                {/* INFO */}
                {/* INFO */}
                <div className='p-3'>
                    <p className='text-sm font-medium dark:text-white line-clamp-1 mb-1'>
                        {name}
                    </p>

                    {/* MOBILE: price + cart only */}
                    <div className='flex items-center justify-between gap-2 sm:hidden'>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                            {currency}{price}
                        </p>
                        <button
                            onClick={handleAddToCart}
                            className='w-7 h-7 rounded-lg flex items-center justify-center
            bg-gray-900 dark:bg-white
            text-white dark:text-gray-900
            hover:opacity-85 transition'
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                        </button>
                    </div>

                    {/* DESKTOP: just price */}
                    <p className='hidden sm:block text-sm text-gray-500 dark:text-gray-400'>
                        {currency}{price}
                    </p>
                </div>

            </Link>
        </div>
    )
}

export default Productitem