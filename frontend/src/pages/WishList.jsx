import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import Productitem from '../components/Productitem'

const WishList = () => {

    const { wishlist, products, addToWishlist, navigate } = useContext(ShopContext)

    const wishlistProducts = products.filter(p => wishlist.includes(p._id))

    return (
        <div className='border-t pt-12 pb-20 dark:border-gray-700 dark:bg-gray-900 min-h-screen'>

            {/* HEADER */}
            <div className='flex items-center justify-between mb-8'>
                <div>
                    <div className='flex items-center gap-2 mb-1'>
                        <button
                            onClick={() => navigate(-1)}
                            className='text-gray-400 dark:text-gray-500
                            hover:text-gray-700 dark:hover:text-gray-300 transition'
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <span className='text-xs text-gray-400 dark:text-gray-500'>Back</span>
                    </div>
                    <h1 className='text-2xl font-medium dark:text-white'>
                        My wishlist
                    </h1>
                    <p className='text-xs text-gray-400 dark:text-gray-500 mt-1'>
                        {wishlistProducts.length} saved item{wishlistProducts.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {/* CLEAR ALL */}
                {wishlistProducts.length > 0 && (
                    <button
                        onClick={() => wishlistProducts.forEach(p => addToWishlist(p._id))}
                        className='text-xs text-red-400 hover:text-red-500 transition'
                    >
                        Clear all
                    </button>
                )}
            </div>

            {/* GRID */}
            {wishlistProducts.length > 0 ? (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                    {wishlistProducts.map((item, index) => (
                        <div key={index} className='relative'>
                            <Productitem
                                id={item._id}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                            />
                            {/* REMOVE BUTTON */}
                            <button
                                onClick={() => addToWishlist(item._id)}
                                className='absolute top-2.5 right-2.5 z-20
                                w-8 h-8 rounded-full flex items-center justify-center
                                bg-white/90 dark:bg-gray-700/90
                                hover:bg-red-50 dark:hover:bg-red-900/20
                                hover:text-red-500 text-gray-500
                                transition-all'
                            >
                                <svg viewBox="0 0 24 24" className='w-4 h-4 fill-red-500 stroke-red-500' strokeWidth="1.8">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                /* EMPTY STATE */
                <div className='flex flex-col items-center justify-center py-28 gap-5'>
                    <div className='w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-900/20
                        flex items-center justify-center'>
                        <svg viewBox="0 0 24 24" className='w-8 h-8 fill-none stroke-red-300' strokeWidth="1.5">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </div>
                    <div className='text-center'>
                        <p className='text-base font-medium dark:text-white mb-1'>
                            Your wishlist is empty
                        </p>
                        <p className='text-sm text-gray-400 dark:text-gray-500'>
                            Save items you love by clicking the heart icon
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/collection')}
                        className='px-6 py-2.5 rounded-xl text-sm font-medium
                        bg-gray-900 dark:bg-white
                        text-white dark:text-gray-900
                        hover:opacity-90 transition'
                    >
                        Browse collection
                    </button>
                </div>
            )}

        </div>
    )
}

export default WishList