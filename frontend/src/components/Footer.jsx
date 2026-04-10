import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <div className='dark:bg-gray-900 dark:text-gray-300'>

            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

                {/* LEFT */}
                <div>
                    <img
                        src={assets.logo}
                        className='mb-5 w-32 dark:invert'
                        alt="logo"
                    />

                    <p className='w-full md:w-2/3 text-gray-600 dark:text-gray-400'>
                        Zivara is your trusted destination for modern and stylish shopping. We offer a wide range of quality products designed to meet everyday needs with ease and reliability. Our goal is to provide a smooth and enjoyable shopping experience, combining great design, secure transactions, and fast delivery. Built with a passion for simplicity and innovation, Zivara continues to evolve to serve customers better every day.
                    </p>
                </div>

                {/* COMPANY */}
                <div>
                    <p className='text-xl font-medium mb-5 dark:text-white'>
                        COMPANY
                    </p>

                    <ul className='flex flex-col gap-1 text-gray-600 dark:text-gray-400 cursor-pointer'>
                        <li onClick={() => navigate('/')} className='hover:text-black dark:hover:text-white'>Home</li>
                        <li onClick={() => navigate('/about')} className='hover:text-black dark:hover:text-white'>About Us</li>
                        <li onClick={() => navigate('/contact')} className='hover:text-black dark:hover:text-white'>Contact</li>
                        <li onClick={() => navigate('/policy')} className='hover:text-black dark:hover:text-white'>Privacy Policy</li>
                    </ul>
                </div>

                {/* CONTACT */}
                <div>
                    <p className='text-xl font-medium mb-5 dark:text-white'>
                        GET IN TOUCH
                    </p>

                    <ul className='flex flex-col gap-1 text-gray-600 dark:text-gray-400'>
                        <li>+91-6371961556</li>
                        <li>support@zivara.com</li>
                    </ul>
                </div>

            </div>

            {/* BOTTOM */}
            <div>
                <hr className='border-gray-300 dark:border-gray-700' />

                <p className='py-5 text-sm text-center text-gray-600 dark:text-gray-400'>
                    © 2025 zivara.com - All rights reserved.
                </p>
            </div>

        </div>
    )
}

export default Footer