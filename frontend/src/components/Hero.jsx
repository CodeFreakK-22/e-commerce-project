import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Hero = () => {

    const navigate = useNavigate()

    return (
        <div className='flex flex-col sm:flex-row rounded-2xl overflow-hidden border 
        border-gray-100 dark:border-gray-700'>

            {/* LEFT */}
            <div className='w-full sm:w-1/2 flex items-center justify-center 
            py-16 px-10 sm:py-0 bg-white dark:bg-gray-800'>
                <div className='flex flex-col gap-5 max-w-sm'>

                    {/* BADGE */}
                    <span className='self-start text-xs font-medium px-3 py-1 rounded-full
                        bg-purple-100 dark:bg-purple-900/40
                        text-purple-800 dark:text-purple-300'>
                        New season 2026
                    </span>

                    {/* EYEBROW */}
                    <div className='flex items-center gap-2'>
                        <span className='w-8 h-px bg-gray-400 dark:bg-gray-500'></span>
                        <span className='text-xs font-medium text-gray-400 dark:text-gray-500 tracking-widest uppercase'>
                            Our bestsellers
                        </span>
                    </div>

                    {/* HEADING */}
                    <h1 className='prata-regular text-4xl sm:text-5xl leading-tight 
                    text-gray-900 dark:text-white'>
                        Latest<br />Arrivals
                    </h1>

                    {/* DESC */}
                    <p className='text-sm text-gray-500 dark:text-gray-400 leading-relaxed'>
                        Discover pieces that blend comfort, style, and quality — curated for every occasion.
                    </p>

                    {/* ACTIONS */}
                    <div className='flex items-center gap-3 mt-1'>
                        <button
                            onClick={() => navigate('/collection')}
                            className='px-6 py-2.5 rounded-xl text-sm font-medium
                            bg-gray-900 dark:bg-white
                            text-white dark:text-gray-900
                            hover:opacity-90 transition'
                        >
                            Shop now
                        </button>
                        <button
                            onClick={() => navigate('/collection')}
                            className='px-6 py-2.5 rounded-xl text-sm font-medium border
                            border-gray-200 dark:border-gray-600
                            text-gray-600 dark:text-gray-300
                            hover:bg-gray-50 dark:hover:bg-gray-700
                            transition'
                        >
                            View all
                        </button>
                    </div>

                    {/* STATS */}
                    <div className='flex gap-6 mt-2 pt-4 border-t border-gray-100 dark:border-gray-700'>
                        {[
                            { value: '500+', label: 'Products' },
                            { value: '10k+', label: 'Customers' },
                            { value: '4.8★', label: 'Rating' },
                        ].map((stat, i) => (
                            <div key={i}>
                                <p className='text-base font-medium text-gray-900 dark:text-white'>
                                    {stat.value}
                                </p>
                                <p className='text-xs text-gray-400 dark:text-gray-500'>
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* RIGHT — IMAGE */}
            <div className='w-full sm:w-1/2 overflow-hidden'>
                <img
                    className='w-full h-full object-cover'
                    src={assets.hero_img}
                    alt="Latest arrivals"
                />
            </div>

        </div>
    )
}

export default Hero