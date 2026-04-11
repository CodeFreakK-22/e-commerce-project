import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {

    const features = [
        {
            title: 'Quality assurance',
            desc: 'All our products undergo rigorous testing to ensure they meet the highest standards of quality and safety.',
            iconBg: 'bg-purple-100 dark:bg-purple-900/40',
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#534AB7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
            )
        },
        {
            title: 'Convenience',
            desc: 'We make shopping easy and accessible with our user-friendly interface and fast delivery options.',
            iconBg: 'bg-teal-100 dark:bg-teal-900/40',
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
            )
        },
        {
            title: 'Exceptional customer service',
            desc: 'We are committed to providing outstanding customer service and support for all our customers.',
            iconBg: 'bg-orange-100 dark:bg-orange-900/40',
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#993C1D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
            )
        }
    ]

    return (
        <div className='dark:bg-gray-900 dark:text-gray-300'>

            {/* TITLE */}
            <div className='text-2xl text-center pt-8 border-t dark:border-gray-700'>
                <Title text1={'ABOUT'} text2={'US'} />
            </div>

            {/* MAIN SECTION */}
            <div className='my-10 flex flex-col md:flex-row gap-16'>
                <img
                    className='w-full md:max-w-[450px] rounded-2xl object-cover dark:brightness-90'
                    src={assets.about_img}
                    alt=""
                />
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 dark:text-gray-400'>
                    <p>
                        Our company is dedicated to providing high-quality products and exceptional customer service.
                        We believe in sustainability and ethical business practices.
                    </p>
                    <p>
                        Since 2026, we have been committed to delivering excellence in everything we do.
                    </p>
                    <b className='text-gray-800 dark:text-white'>Our Mission</b>
                    <p>
                        To create value for our customers through innovation, quality, and integrity.
                    </p>
                </div>
            </div>

            {/* WHY CHOOSE US */}
            <div className='text-xl py-4'>
                <Title text1={'WHY'} text2={'CHOOSE US'} />
            </div>

            {/* FEATURE CARDS */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mb-20'>
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className='flex flex-col gap-4 p-8 rounded-2xl border 
                        border-gray-200 dark:border-gray-700 
                        bg-white dark:bg-gray-800 
                        hover:-translate-y-1 hover:border-gray-300 dark:hover:border-gray-500
                        transition-all duration-300'
                    >
                        {/* ICON */}
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${feature.iconBg}`}>
                            {feature.icon}
                        </div>

                        {/* TEXT */}
                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-gray-800 dark:text-white text-sm'>
                                {feature.title}
                            </p>
                            <p className='text-gray-500 dark:text-gray-400 text-sm leading-relaxed'>
                                {feature.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <NewsletterBox />

        </div>
    )
}

export default About