import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {

    const inputClass = `w-full px-3 py-2.5 text-sm rounded-xl border
        border-gray-200 dark:border-gray-600
        bg-gray-50 dark:bg-gray-700
        text-gray-900 dark:text-white
        placeholder-gray-400 dark:placeholder-gray-500
        focus:outline-none focus:border-gray-400 dark:focus:border-gray-400
        transition`

    return (
        <div className='dark:bg-gray-900 dark:text-gray-300'>

            {/* TITLE */}
            <div className='text-center pt-10 border-t dark:border-gray-700 mb-10'>
                <Title text1={'CONTACT'} text2={'US'} />
                <p className='text-sm text-gray-400 dark:text-gray-500 mt-2 max-w-md mx-auto'>
                    We'd love to hear from you. Reach out for support, careers, or just to say hello.
                </p>
            </div>

            {/* MAIN SECTION */}
            <div className='flex flex-col md:flex-row gap-10 mb-16'>

                {/* IMAGE */}
                <img
                    className='w-full md:max-w-[460px] rounded-2xl object-cover dark:brightness-90'
                    src={assets.contact_img}
                    alt=""
                />

                {/* RIGHT SIDE */}
                <div className='flex flex-col gap-4 flex-1'>

                    {/* STORE */}
                    <div className='flex flex-col gap-3 p-5 rounded-2xl border
                        border-gray-100 dark:border-gray-700
                        bg-white dark:bg-gray-800
                        hover:border-gray-300 dark:hover:border-gray-500
                        hover:-translate-y-1 transition-all duration-300'>
                        <div className='w-10 h-10 rounded-xl flex items-center justify-center bg-purple-100 dark:bg-purple-900/40'>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#534AB7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                            </svg>
                        </div>
                        <p className='text-sm font-medium dark:text-white'>Our store</p>
                        <p className='text-xs text-gray-500 dark:text-gray-400 leading-relaxed'>
                            EB-32 Badagada Brit colony<br />
                            Bhubaneswar, Odisha, 751018
                        </p>
                    </div>

                    {/* PHONE + EMAIL */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div className='flex flex-col gap-3 p-5 rounded-2xl border
                            border-gray-100 dark:border-gray-700
                            bg-white dark:bg-gray-800
                            hover:border-gray-300 dark:hover:border-gray-500
                            hover:-translate-y-1 transition-all duration-300'>
                            <div className='w-10 h-10 rounded-xl flex items-center justify-center bg-teal-100 dark:bg-teal-900/40'>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.08 6.08l1.72-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                            </div>
                            <p className='text-sm font-medium dark:text-white'>Phone</p>
                            <p className='text-xs text-gray-500 dark:text-gray-400 leading-relaxed'>
                                +91-6371961556<br />Mon–Sat, 9am–6pm IST
                            </p>
                        </div>

                        <div className='flex flex-col gap-3 p-5 rounded-2xl border
                            border-gray-100 dark:border-gray-700
                            bg-white dark:bg-gray-800
                            hover:border-gray-300 dark:hover:border-gray-500
                            hover:-translate-y-1 transition-all duration-300'>
                            <div className='w-10 h-10 rounded-xl flex items-center justify-center bg-orange-100 dark:bg-orange-900/40'>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#993C1D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                            </div>
                            <p className='text-sm font-medium dark:text-white'>Email</p>
                            <p className='text-xs text-gray-500 dark:text-gray-400 leading-relaxed'>
                                admin@zivara.com<br />We reply within 24 hours
                            </p>
                        </div>
                    </div>

                    {/* CAREERS */}
                    <div className='flex flex-col gap-3 p-5 rounded-2xl border
                        border-gray-100 dark:border-gray-700
                        bg-white dark:bg-gray-800
                        hover:border-gray-300 dark:hover:border-gray-500
                        hover:-translate-y-1 transition-all duration-300'>
                        <div className='w-10 h-10 rounded-xl flex items-center justify-center bg-amber-100 dark:bg-amber-900/40'>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#854F0B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="7" width="20" height="14" rx="2" />
                                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                                <line x1="12" y1="12" x2="12" y2="16" />
                                <line x1="10" y1="14" x2="14" y2="14" />
                            </svg>
                        </div>
                        <p className='text-sm font-medium dark:text-white'>Careers at Zivara</p>
                        <p className='text-xs text-gray-500 dark:text-gray-400 leading-relaxed'>
                            Learn more about our teams and job openings.
                        </p>
                        <button className='self-start text-xs px-4 py-2 rounded-lg border
                            border-gray-200 dark:border-gray-600
                            text-gray-600 dark:text-gray-300
                            hover:bg-gray-50 dark:hover:bg-gray-700
                            transition'>
                            Explore jobs →
                        </button>
                    </div>

                </div>
            </div>

            {/* CONTACT FORM */}
            <div className='bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-7 mb-20'>
                <p className='text-sm font-medium dark:text-white mb-5'>Send us a message</p>
                <div className='flex flex-col gap-3'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                        <input className={inputClass} type='text' placeholder='Your name' />
                        <input className={inputClass} type='email' placeholder='Email address' />
                    </div>
                    <input className={inputClass} type='text' placeholder='Subject' />
                    <textarea
                        className={inputClass}
                        rows={4}
                        placeholder='Your message...'
                        style={{ resize: 'vertical' }}
                    />
                    <button className='w-full py-3 rounded-xl text-sm font-medium
                        bg-gray-900 dark:bg-white
                        text-white dark:text-gray-900
                        hover:opacity-90 transition'>
                        Send message
                    </button>
                </div>
            </div>

            <NewsletterBox />

        </div>
    )
}

export default Contact