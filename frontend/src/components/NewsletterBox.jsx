import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext.jsx' // adjust path if needed

const NewsletterBox = () => {

    const { theme } = useContext(ThemeContext);

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

    return (
        <div className={`text-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'text-gray-800'}`}>

            <p className={`text-2xl font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                Subscribe & Get 20% Off
            </p>

            <p className={`mt-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`}>
                Join our newsletter for updates, new arrivals, and exclusive offers.
            </p>

            <form
                onSubmit={onSubmitHandler}
                className={`w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 
                ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}
            >
                <input
                    type="email"
                    placeholder='Enter your email'
                    className={`w-full sm:flex-1 outline-none bg-transparent 
                    ${theme === 'dark' ? 'text-white placeholder-gray-500' : ''}`}
                    required
                />

                <button
                    type='submit'
                    className={`text-xs px-10 py-4 
                    ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}
                >
                    SUBSCRIBE
                </button>
            </form>
        </div>
    )
}

export default NewsletterBox