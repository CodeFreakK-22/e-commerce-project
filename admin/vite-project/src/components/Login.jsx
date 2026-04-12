import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
            if (response.data.success) {
                toast.dismiss()
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const inputClass = `w-full px-4 py-2.5 text-sm rounded-xl border
        border-gray-200 bg-gray-50
        text-gray-900 placeholder-gray-400
        focus:outline-none focus:border-gray-400
        transition`

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
            <div className='w-full max-w-sm'>

                {/* HEADER */}
                <div className='text-center mb-8'>
                    <div className='w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center mx-auto mb-4'>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                    </div>
                    <h1 className='text-xl font-medium text-gray-900 mb-1'>Admin panel</h1>
                    <p className='text-xs text-gray-400'>Sign in to access your dashboard</p>
                </div>

                {/* CARD */}
                <form
                    onSubmit={onSubmitHandler}
                    className='bg-white border border-gray-100 rounded-2xl p-7 flex flex-col gap-4 shadow-sm'
                >
                    {/* EMAIL */}
                    <div>
                        <label className='text-[11px] text-gray-400 mb-1.5 block'>
                            Email address
                        </label>
                        <input
                            type='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className={inputClass}
                            placeholder='admin@zivara.com'
                            required
                        />
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className='text-[11px] text-gray-400 mb-1.5 block'>
                            Password
                        </label>
                        <div className='relative'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className={inputClass + ' pr-10'}
                                placeholder='••••••••'
                                required
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword(p => !p)}
                                className='absolute right-3 top-1/2 -translate-y-1/2
                                text-gray-400 hover:text-gray-600 transition'
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

                    {/* SUBMIT */}
                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full py-3 rounded-xl text-sm font-medium mt-1
                        bg-gray-900 text-white
                        hover:opacity-90 disabled:opacity-50 transition'
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>

                </form>

                {/* FOOTER */}
                <p className='text-center text-xs text-gray-400 mt-6'>
                    Zivara Admin · Restricted access
                </p>

            </div>
        </div>
    )
}

export default Login