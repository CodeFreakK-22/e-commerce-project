import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
    return (
        <div className='dark:bg-gray-900 dark:text-gray-300'>

            {/* TITLE */}
            <div className='text-center text-2xl pt-10 border-t dark:border-gray-700'>
                <Title text1={'CONTACT'} text2={'US'} />
            </div>

            {/* MAIN SECTION */}
            <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>

                <img
                    className='w-full md:max-w-[480px] dark:brightness-90'
                    src={assets.contact_img}
                    alt=""
                />

                <div className='flex flex-col justify-center items-start gap-6'>

                    <p className='font-semibold text-xl text-gray-600 dark:text-white'>
                        Our Store
                    </p>

                    <p className='text-gray-500 dark:text-gray-400'>
                        EB-32 Badagada Brit colony <br />
                        Bhubaneswar, Odisha, 751018
                    </p>

                    <p className='text-gray-500 dark:text-gray-400'>
                        Tel: +91-6371961556 <br />
                        Email: admin@zivara.com
                    </p>

                    <p className='font-semibold text-xl text-gray-600 dark:text-white'>
                        Careers at Zivara
                    </p>

                    <p className='text-gray-500 dark:text-gray-400'>
                        Learn more about our teams and job openings.
                    </p>

                    <button className='border border-black dark:border-white px-8 py-4 text-sm 
                        hover:bg-black hover:text-white 
                        dark:hover:bg-white dark:hover:text-black 
                        transition-all duration-500'>
                        Explore Jobs
                    </button>

                </div>
            </div>

            <NewsletterBox />
        </div>
    )
}

export default Contact