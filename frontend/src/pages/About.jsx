import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
    return (
        <div>

            <div className='text-2xl text-center pt-8 border-t'>
                <Title text1={'ABOUT'} text2={'US'} />
            </div>

            <div className='my-10 flex flex-col md:flex-row gap-16'>
                <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
                    <p>Our company is dedicated to providing high-quality products and exceptional customer service. We believe in sustainability and ethical business practices.</p>
                    <p>Since 2026, we have been committed to delivering excellence in everything we do.</p>
                    <b className='text-gray-800'>Our Mission</b>
                    <p>To create value for our customers through innovation, quality, and integrity.</p>
                </div>
            </div>

            <div className='text-xl py-4 '>
                <Title text1={'WHY'} text2={'CHOOSE US'} />
            </div>

            <div className='flex flex-col md:flex-row text-sm mb-20'>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Quality Assurance</b>
                    <p>All our products undergo rigorous testing to ensure they meet the highest standards of quality and safety.</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Convenience</b>
                    <p>We make shopping easy and accessible with our user-friendly interface and fast delivery options.</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Exceptional Customer Service</b>
                    <p>We are committed to providing outstanding customer service and support for all our customers.</p>
                </div>
            </div>

            <NewsletterBox />
        </div>
    )
}

export default About
