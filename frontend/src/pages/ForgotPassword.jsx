import React, { useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Forgotpassword = () => {

    const { backendUrl, navigate } = useContext(ShopContext)

    const [step, setStep] = useState(1)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const checkEmailHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post(
                backendUrl + '/api/user/check-email', { email }
            )
            if (res.data.success) {
                toast.success('Email found')
                setStep(2)
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const resetPasswordHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post(
                backendUrl + '/api/user/direct-reset-password', { email, password }
            )
            if (res.data.success) {
                toast.success('Password updated')
                navigate('/login')
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error('Error resetting password')
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
                        {step === 1 ? 'Forgot password' : 'Reset password'}
                    </h1>
                    <p className='text-xs text-gray-400 dark:text-gray-500 mt-2'>
                        {step === 1
                            ? 'Enter your email address to verify your account'
                            : 'Choose a new password for your account'
                        }
                    </p>
                </div>

                {/* STEP INDICATOR */}
                <div className='flex items-center gap-2 mb-6'>
                    {[1, 2].map((s) => (
                        <React.Fragment key={s}>
                            <div className={`flex items-center gap-2`}>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-medium transition-all
                                    ${step >= s
                                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                                    }`}>
                                    {step > s ? (
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    ) : s}
                                </div>
                                <span className={`text-xs ${step >= s ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}>
                                    {s === 1 ? 'Verify email' : 'New password'}
                                </span>
                            </div>
                            {s < 2 && (
                                <div className={`flex-1 h-px transition-all ${step > s ? 'bg-gray-400 dark:bg-gray-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* CARD */}
                <form
                    onSubmit={step === 1 ? checkEmailHandler : resetPasswordHandler}
                    className='bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700
                    rounded-2xl p-7 flex flex-col gap-4'
                >
                    {/* STEP 1 — EMAIL */}
                    {step === 1 && (
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
                    )}

                    {/* STEP 2 — NEW PASSWORD */}
                    {step === 2 && (
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
                                    required
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPassword(p => !p)}
                                    className='absolute right-3 top-1/2 -translate-y-1/2
                                    text-gray-400 dark:text-gray-500
                                    hover:text-gray-600 dark:hover:text-gray-300 transition'
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
                    )}

                    {/* SUBMIT */}
                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full py-3 rounded-xl text-sm font-medium
                        bg-gray-900 dark:bg-white
                        text-white dark:text-gray-900
                        hover:opacity-90 disabled:opacity-50 transition'
                    >
                        {loading
                            ? (step === 1 ? 'Checking...' : 'Updating...')
                            : (step === 1 ? 'Continue' : 'Reset password')
                        }
                    </button>

                    {/* BACK */}
                    <button
                        type='button'
                        onClick={() => step === 2 ? setStep(1) : navigate('/login')}
                        className='text-center text-xs text-gray-400 dark:text-gray-500
                        hover:text-gray-700 dark:hover:text-gray-300 transition'
                    >
                        ← {step === 2 ? 'Back to email' : 'Back to login'}
                    </button>

                </form>

            </div>
        </div>
    )
}

export default Forgotpassword