import React, { useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetPassword = () => {
    const { backendUrl, navigate } = useContext(ShopContext)

    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(false)

    // Extract token from URL: /reset-password?token=xxx
    const token = new URLSearchParams(window.location.search).get('token')

    const handleReset = async (e) => {
        e.preventDefault()

        if (!token) {
            toast.error('Invalid reset link. Please request a new one.')
            return
        }

        try {
            setLoading(true)
            const res = await axios.post(backendUrl + '/api/user/reset-password', {
                token,
                password
            })

            if (res.data.success) {
                setDone(true)
                toast.success('Password updated successfully')
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.')
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

    // No token in URL at all
    if (!token) {
        return (
            <div className='min-h-[60vh] flex items-center justify-center px-4 py-16'>
                <div className='text-center'>
                    <p className='text-gray-500 dark:text-gray-400 mb-4'>
                        Invalid or missing reset link.
                    </p>
                    <button
                        onClick={() => navigate('/forgot-password')}
                        className='text-sm text-purple-600 hover:underline'
                    >
                        Request a new one
                    </button>
                </div>
            </div>
        )
    }

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
                        {done ? 'All done!' : 'Reset password'}
                    </h1>
                    <p className='text-xs text-gray-400 dark:text-gray-500 mt-2'>
                        {done
                            ? 'Your password has been updated successfully.'
                            : 'Enter your new password below'
                        }
                    </p>
                </div>

                {!done ? (
                    <form
                        onSubmit={handleReset}
                        className='bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700
                        rounded-2xl p-7 flex flex-col gap-4'
                    >
                        <div>
                            <label className='text-[11px] text-gray-400 dark:text-gray-500 mb-1.5 block'>
                                New password
                            </label>
                            <div className='relative'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={inputClass + ' pr-10'}
                                    placeholder='••••••••'
                                    minLength={6}
                                    required
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPassword(p => !p)}
                                    className='absolute right-3 top-1/2 -translate-y-1/2
                                    text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition'
                                >
                                    {showPassword ? (
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    ) : (
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type='submit'
                            disabled={loading}
                            className='w-full py-3 rounded-xl text-sm font-medium
                            bg-gray-900 dark:bg-white
                            text-white dark:text-gray-900
                            hover:opacity-90 disabled:opacity-50 transition'
                        >
                            {loading ? 'Updating...' : 'Reset password'}
                        </button>

                        <button
                            type='button'
                            onClick={() => navigate('/forgot-password')}
                            className='text-center text-xs text-gray-400 dark:text-gray-500
                            hover:text-gray-700 dark:hover:text-gray-300 transition'
                        >
                            ← Request a new link
                        </button>
                    </form>
                ) : (
                    <div className='bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700
                        rounded-2xl p-7 flex flex-col gap-4 text-center'>
                        <div className='w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/40
                            flex items-center justify-center mx-auto'>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                                strokeLinejoin="round" className='text-green-600 dark:text-green-400'>
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <button
                            onClick={() => navigate('/login')}
                            className='w-full py-3 rounded-xl text-sm font-medium
                            bg-gray-900 dark:bg-white
                            text-white dark:text-gray-900
                            hover:opacity-90 transition'
                        >
                            Go to login
                        </button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default ResetPassword