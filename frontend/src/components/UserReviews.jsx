import React from 'react'
import { assets } from '../assets/assets'

const UserReviews = () => {

    const reviews = [
        {
            name: "Animesh",
            role: "Verified Buyer",
            text: "Amazing quality and super fast delivery. Totally worth it!"
        },
        {
            name: "Satabdi",
            role: "Verified Buyer",
            text: "Loved the design and comfort. Will definitely shop again!"
        },
        {
            name: "Sonali",
            role: "Verified Buyer",
            text: "Smooth experience and great pricing. Highly recommended!"
        }
    ]

    const getInitials = (name) => name.slice(0, 2).toUpperCase()

    const avatarColors = [
        { bg: 'bg-purple-100 dark:bg-purple-900', text: 'text-purple-700 dark:text-purple-300' },
        { bg: 'bg-teal-100 dark:bg-teal-900', text: 'text-teal-700 dark:text-teal-300' },
        { bg: 'bg-orange-100 dark:bg-orange-900', text: 'text-orange-700 dark:text-orange-300' },
    ]

    return (
        <div className='py-20 text-center relative overflow-hidden isolate'>

            {/* GLOW */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            w-[300px] h-[300px] bg-blue-400/10 blur-3xl rounded-full pointer-events-none' />

            {/* TITLE */}
            <h2 className='text-2xl font-medium mb-16 dark:text-white relative z-10'>
                What Our Customers Say
            </h2>

            {/* CARDS */}
            <div className='relative z-10 flex sm:flex-wrap gap-4 sm:gap-6 
            overflow-x-auto sm:overflow-visible snap-x 
            justify-start sm:justify-center 
            pl-4 pr-2 sm:px-0'>

                {reviews.map((review, index) => {
                    const color = avatarColors[index % avatarColors.length]
                    return (
                        <div
                            key={index}
                            className='min-w-[85%] sm:min-w-0 max-w-[280px] snap-center hover:scale-105 transition duration-300'
                        >
                            <div
                                className='review-card w-[280px] p-6 rounded-xl border 
                                backdrop-blur-md bg-white/70 dark:bg-gray-800/70 
                                dark:border-gray-700 shadow-lg hover:shadow-2xl
                                flex flex-col items-center'
                            >

                                {/* AVATAR */}
                                <div className={`w-14 h-14 rounded-full flex items-center 
                                justify-center text-lg font-semibold mb-4 
                                ${color.bg} ${color.text}`}>
                                    {getInitials(review.name)}
                                </div>

                                {/* QUOTE */}
                                <p className='text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed'>
                                    "{review.text}"
                                </p>

                                {/* STARS */}
                                <div className='flex justify-center gap-1 mb-3'>
                                    {[...Array(5)].map((_, i) => (
                                        <img
                                            key={i}
                                            src={assets.star_icon}
                                            className='w-4 dark:invert'
                                            alt=""
                                        />
                                    ))}
                                </div>

                                {/* NAME & ROLE */}
                                <p className='font-semibold dark:text-white text-sm'>{review.name}</p>
                                <p className='text-xs text-gray-400 dark:text-gray-500 mt-0.5'>
                                    {review.role}
                                </p>

                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}



export default UserReviews