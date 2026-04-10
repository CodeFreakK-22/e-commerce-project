import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
    return (
        <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300'>

            <div>
                <img
                    src={assets.exchange_icon}
                    className='w-12 m-auto mb-5 dark:invert'
                    alt=""
                />
                <p className='font-semibold dark:text-white'>Easy Exchange Policy</p>
                <p className='text-gray-400 dark:text-gray-400'>
                    We offer a hassle-free exchange process for all our products within 15 days of purchase.
                </p>
            </div>

            <div>
                <img
                    src={assets.quality_icon}
                    className='w-12 m-auto mb-5 dark:invert'
                    alt=""
                />
                <p className='font-semibold dark:text-white'>7 Days Return Policy</p>
                <p className='text-gray-400 dark:text-gray-400'>
                    We offer a 7 day returns on all products. Not satisfied? Return within 7 days for a full refund.
                </p>
            </div>

            <div>
                <img
                    src={assets.support_img}
                    className='w-12 m-auto mb-5 dark:invert'
                    alt=""
                />
                <p className='font-semibold dark:text-white'>Best customer support</p>
                <p className='text-gray-400 dark:text-gray-400'>
                    We offer 24/7 customer support to assist you with any questions or concerns you may have.
                </p>
            </div>

        </div>
    )
}

export default OurPolicy