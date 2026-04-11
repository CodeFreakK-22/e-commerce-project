import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext.jsx'

const NewsletterBox = () => {

    const { theme } = useContext(ThemeContext)

    const onSubmitHandler = (event) => {
        event.preventDefault()
    }

    return (
        <div className='bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl px-6 py-12 text-center'>

            {/* BADGE */}
            <span className='inline-block text-xs font-medium px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 mb-4'>
                Limited offer
            </span>

            {/* TITLE */}
            <p className='text-xl font-medium text-gray-900 dark:text-white mb-2'>
                Subscribe & get 20% off
            </p>

            {/* SUBTITLE */}
            <p className='text-sm text-gray-400 dark:text-gray-500 max-w-sm mx-auto leading-relaxed mb-8'>
                Join our newsletter for new arrivals, exclusive deals, and style tips — straight to your inbox.
            </p>

            {/* FORM */}
            <form
                onSubmit={onSubmitHandler}
                className='flex items-center gap-3 max-w-md mx-auto mb-6'
            >
                <input
                    type='email'
                    placeholder='Enter your email address'
                    required
                    className='flex-1 min-w-0 px-4 py-3 text-sm rounded-xl border
                    border-gray-200 dark:border-gray-600
                    bg-white dark:bg-gray-700
                    text-gray-900 dark:text-white
                    placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none focus:border-gray-400 dark:focus:border-gray-400
                    transition'
                />
                <button
                    type='submit'
                    className='px-6 py-3 text-sm font-medium rounded-xl flex-shrink-0
                    bg-gray-900 dark:bg-white
                    text-white dark:text-gray-900
                    hover:opacity-90 transition'
                >
                    Subscribe
                </button>
            </form>

            {/* PERKS */}
            <div className='flex justify-center gap-6 flex-wrap'>
                {['No spam, ever', 'Unsubscribe anytime', 'Exclusive member deals'].map((perk, i) => (
                    <div key={i} className='flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500'>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {perk}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default NewsletterBox