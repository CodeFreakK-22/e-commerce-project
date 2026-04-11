import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {

    const navigate = useNavigate()

    const companyLinks = [
        { label: 'Home', path: '/' },
        { label: 'About us', path: '/about' },
        { label: 'Contact', path: '/contact' },
        { label: 'Privacy policy', path: '/policy' },
    ]

    return (
        <div className='dark:bg-gray-900 dark:text-gray-300 mt-20'>

            <div className='bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-8 sm:p-10'>

                <div className='flex flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-10'>

                    {/* LEFT */}
                    <div className='flex flex-col gap-4'>
                        <img src={assets.logo} className='w-28 dark:invert' alt="logo" />
                        <p className='text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs'>
                            Zivara is your trusted destination for modern and stylish shopping — quality products, smooth experience, and fast delivery, every day.
                        </p>

                        {/* SOCIAL ICONS */}
                        <div className='flex gap-3 mt-1'>
                            {[
                                { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                                { label: 'Twitter', path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
                                { label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                            ].map(({ label, path }) => (
                                <button
                                    key={label}
                                    className='w-8 h-8 rounded-xl flex items-center justify-center
                                    bg-gray-100 dark:bg-gray-700
                                    text-gray-500 dark:text-gray-400
                                    hover:bg-gray-200 dark:hover:bg-gray-600 transition'
                                    aria-label={label}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                        <path d={path} />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* COMPANY */}
                    <div>
                        <p className='text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4'>
                            Company
                        </p>
                        <ul className='flex flex-col gap-2'>
                            {companyLinks.map(({ label, path }) => (
                                <li key={label}>
                                    <button
                                        onClick={() => navigate(path)}
                                        className='text-sm text-gray-600 dark:text-gray-400
                                        hover:text-gray-900 dark:hover:text-white transition'
                                    >
                                        {label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CONTACT */}
                    <div>
                        <p className='text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4'>
                            Get in touch
                        </p>
                        <ul className='flex flex-col gap-3'>
                            <li className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className='flex-shrink-0'>
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.08 6.08l1.72-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                +91-6371961556
                            </li>
                            <li className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className='flex-shrink-0'>
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                                support@zivara.com
                            </li>
                        </ul>
                    </div>

                </div>

                {/* BOTTOM */}
                <div className='border-t border-gray-100 dark:border-gray-700 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3'>
                    <p className='text-xs text-gray-400 dark:text-gray-500'>
                        © 2025 zivara.com — All rights reserved.
                    </p>
                    <div className='flex gap-4'>
                        {['Terms', 'Privacy', 'Cookies'].map(item => (
                            <button
                                key={item}
                                className='text-xs text-gray-400 dark:text-gray-500
                                hover:text-gray-700 dark:hover:text-gray-300 transition'
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Footer