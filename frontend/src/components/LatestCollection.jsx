import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import Productitem from './Productitem'

const LatestCollection = () => {

    const { products } = useContext(ShopContext)
    const [latestProducts, setLatestProducts] = useState([])
    const [activeFilter, setActiveFilter] = useState('All')

    useEffect(() => {
        setLatestProducts(products.slice(0, 10))
    }, [products])

    const filters = ['All', 'Men', 'Women', 'Kids']

    const filteredProducts = activeFilter === 'All'
        ? latestProducts
        : latestProducts.filter(p => p.category === activeFilter)

    return (
        <div className='my-10'>

            {/* HEADER */}
            <div className='text-center py-8'>
                <span className='inline-block text-xs font-medium px-3 py-1 rounded-full
                    bg-purple-100 dark:bg-purple-900/40
                    text-purple-800 dark:text-purple-300 mb-3'>
                    New arrivals
                </span>
                <div className='text-3xl mb-3'>
                    <Title text1={'LATEST'} text2={'COLLECTION'} />
                </div>
                <p className='w-3/4 m-auto text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed'>
                    Carefully curated to bring you the newest trends and timeless styles — quality, comfort, and elegance for every occasion.
                </p>
            </div>

            {/* FILTER CHIPS */}
            <div className='flex justify-center gap-2 flex-wrap mb-8'>
                {filters.map(filter => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-4 py-1.5 rounded-full text-xs border transition-all
                        ${activeFilter === filter
                                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white'
                                : 'bg-transparent text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-400'
                            }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* PRODUCT GRID */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item, index) => (
                        <Productitem
                            key={index}
                            id={item._id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                        />
                    ))
                ) : (
                    <p className='col-span-full text-center text-sm text-gray-400 dark:text-gray-500 py-10'>
                        No products found in this category.
                    </p>
                )}
            </div>

            {/* VIEW ALL BUTTON */}
            <div className='text-center mt-10'>
                <button
                    onClick={() => window.location.href = '/collection'}
                    className='text-sm px-7 py-2.5 rounded-xl border
                    border-gray-200 dark:border-gray-600
                    text-gray-600 dark:text-gray-300
                    hover:bg-gray-50 dark:hover:bg-gray-800
                    transition'
                >
                    View all products →
                </button>
            </div>

        </div>
    )
}

export default LatestCollection