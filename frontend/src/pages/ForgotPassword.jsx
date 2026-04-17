import React, { useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
    const { backendUrl, navigate } = useContext(ShopContext)

    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await axios.post(backendUrl + '/api/user/forgot-password', { email })
            // Always show success — never reveal if email exists or not
            setSubmitted(true)
        } catch (error) {
            // Even on error, show same message to prevent enumeration
            setSubmitted(true)
        } finally {
            setLoading(false)
        }
    }

    const inputClass = `w-full px-4 py-2.5 text-sm rounded-xl border
        border-gray-200 dark:border-gray-600
        bg-gray-50 dark:bg-gray-700
        text-gray-900 dark:text-white
        placeholder-gray-400 dark:placeholder-gray-500
        focus:outline-none focus:border-gray-400 dark:focus:border-gray-400
        transition`

    return (
        <div className='min-h-[60vh] flex items-center justify-center px-4 py-16'>
            <div className='w-full max-w-sm'>

                {/* HEADER */}
                <div className='text-center mb-8'>
                    <span className='inline-block text-xs font-medium px-3 py-1 rounded-full
                        bg-purple-100 dark:bg-purple-900/40
                        text-purple-800 dark:text-purple-300 mb-3'>
                        Account recovery
                    </span>
                    <h1 className='prata-regular text-3xl dark:text-white'>
                        {submitted ? 'Check your inbox' : 'Forgot password'}
                    </h1>
                    <p className='text-xs text-gray-400 dark:text-gray-500 mt-2'>
                        {submitted
                            ? `If ${email} is registered, you'll receive a reset link shortly.`
                            : 'Enter your email address to receive a reset link'
                        }
                    </p>
                </div>

                {/* FORM or SUCCESS STATE */}
                {!submitted ? (
                    <form
                        onSubmit={handleSubmit}
                        className='bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700
                        rounded-2xl p-7 flex flex-col gap-4'
                    >
                        <div>
                            <label className='text-[11px] text-gray-400 dark:text-gray-500 mb-1.5 block'>
                                Email address
                            </label>
                            <input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={inputClass}
                                placeholder='you@example.com'
                                required
                            />
                        </div>

                        <button
                            type='submit'
                            disabled={loading}
                            className='w-full py-3 rounded-xl text-sm font-medium
                            bg-gray-900 dark:bg-white
                            text-white dark:text-gray-900
                            hover:opacity-90 disabled:opacity-50 transition'
                        >
                            {loading ? 'Sending...' : 'Send reset link'}
                        </button>

                        <button
                            type='button'
                            onClick={() => navigate('/login')}
                            className='text-center text-xs text-gray-400 dark:text-gray-500
                            hover:text-gray-700 dark:hover:text-gray-300 transition'
                        >
                            ← Back to login
                        </button>
                    </form>
                ) : (
                    <div className='bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700
                        rounded-2xl p-7 flex flex-col gap-4 text-center'>

                        {/* Email icon */}
                        <div className='w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/40
                            flex items-center justify-center mx-auto'>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round" className='text-purple-600 dark:text-purple-300'>
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </div>

                        <p className='text-xs text-gray-400 dark:text-gray-500'>
                            The link will expire in <strong>15 minutes</strong>.
                            Check your spam folder if you don't see it.
                        </p>

                        <button
                            type='button'
                            onClick={() => navigate('/login')}
                            className='w-full py-3 rounded-xl text-sm font-medium
                            bg-gray-900 dark:bg-white
                            text-white dark:text-gray-900
                            hover:opacity-90 transition'
                        >
                            Back to login
                        </button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default ForgotPassword