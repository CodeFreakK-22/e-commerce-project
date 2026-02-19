import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

                <div>
                    <img src={assets.logo} className='mb-5 w-32' />
                    <p className='w-full md:w-2/3 text-gray-600'>
                        lorem ipsum is simply dummy text of the printing and typesetting industry.since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    </p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>
                        COMPANY
                    </p>
                    <ul className='flex flex-col gap-1 text-gray-600 cursor-pointer'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Contact</li>
                        <li>Privacy Policy</li>
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
