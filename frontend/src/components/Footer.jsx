import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

                <div>
                    <img src={assets.logo} className='mb-5 w-32' />
                    <p className='w-full md:w-2/3 text-gray-600'>
                        Zivara is your trusted destination for modern and stylish shopping. We offer a wide range of quality products designed to meet everyday needs with ease and reliability. Our goal is to provide a smooth and enjoyable shopping experience, combining great design, secure transactions, and fast delivery. Built with a passion for simplicity and innovation, Zivara continues to evolve to serve customers better every day.
                    </p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>
                        COMPANY
                    </p>
                    <ul className='flex flex-col gap-1 text-gray-600 cursor-pointer'>
                        <li onClick={() => navigate('/')}>Home</li>
                        <li onClick={() => navigate('/about')}>About Us</li>
                        <li onClick={() => navigate('/contact')}>Contact</li>
                        <li onClick={() => navigate('/policy')}>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600 cursor-pointer'>
                        <li>+91-6371961556</li>
                        <li>support@zivara.com</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>© 2025 zivara.com - All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer
