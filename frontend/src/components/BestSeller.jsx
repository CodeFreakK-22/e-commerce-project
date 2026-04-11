import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import Productitem from './Productitem'

const BestSeller = () => {

    const { products } = useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState([])

    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestseller)
        setBestSeller(bestProduct.slice(0, 5))
    }, [products])

    return (
        <div className='my-10'>

            {/* HEADER */}
            <div className='text-center py-8'>
                <span className='inline-block text-xs font-medium px-3 py-1 rounded-full
                    bg-amber-100 dark:bg-amber-900/40
                    text-amber-800 dark:text-amber-300 mb-3'>
                    Most loved
                </span>
                <div className='text-3xl mb-3'>
                    <Title text1={'BEST'} text2={'SELLERS'} />
                </div>
                <p className='w-3/4 m-auto text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed'>
                    Top picks loved by customers for their quality, style, and performance — trusted choices for everyday needs.
                </p>
            </div>

            {/* PRODUCT GRID */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {bestSeller.length > 0 ? (
                    bestSeller.map((item, index) => (
                        <Productitem
                            key={index}
                            id={item._id}
                            name={item.name}
                            image={item.image}
                            price={item.price}
                        />
                    ))
                ) : (
                    <p className='col-span-full text-center text-sm text-gray-400 dark:text-gray-500 py-10'>
                        No best sellers found.
                    </p>
                )}
            </div>

        </div>
    )
}

export default BestSeller