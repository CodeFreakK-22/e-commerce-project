import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

    const [currentState, setCurrentState] = useState('Login')
    const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            if (currentState === 'Sign Up') {
                const response = await axios.post(
                    backendUrl + '/api/user/register',
                    { name, email, password }
                )
                if (response.data.success) {
                    setToken(response.data.token)
                    localStorage.setItem('token', response.data.token)
                    toast.success('Account created')
                } else {
                    toast.error(response.data.message)
                }
            } else {
                const response = await axios.post(
                    backendUrl + '/api/user/login',
                    { email, password }
                )
                if (response.data.success) {
                    setToken(response.data.token)
                    localStorage.setItem('token', response.data.token)
                    toast.success('Login successful')
                } else {
                    toast.error(response.data.message)
                }
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }

    useEffect(() => {
        if (token) navigate('/')
    }, [token])

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
                        Welcome to Zivara
                    </span>
                    <h1 className='prata-regular text-3xl dark:text-white'>
                        {currentState === 'Login' ? 'Sign in' : 'Create account'}
                    </h1>
                    <p className='text-xs text-gray-400 dark:text-gray-500 mt-2'>
                        {currentState === 'Login'
                            ? 'Enter your credentials to access your account'
                            : 'Fill in your details to get started'
                        }
                    </p>
                </div>

                {/* CARD */}
                <form
                    onSubmit={onSubmitHandler}
                    className='bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700
                    rounded-2xl p-7 flex flex-col gap-4'
                >
                    {/* NAME */}
                    {currentState !== 'Login' && (
                        <div>
                            <label className='text-[11px] text-gray-400 dark:text-gray-500 mb-1.5 block'>
                                Full name
                            </label>
                            <input
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={inputClass}
                                placeholder='Your full name'
                                required
                            />
                        </div>
                    )}

                    {/* EMAIL */}
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

                    {/* PASSWORD */}
                    <div>
                        <label className='text-[11px] text-gray-400 dark:text-gray-500 mb-1.5 block'>
                            Password
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

                    {/* FORGOT */}
                    {currentState === 'Login' && (
                        <button
                            type='button'
                            onClick={() => navigate('/forgot-password')}
                            className='self-start text-xs text-gray-400 dark:text-gray-500
                            hover:text-gray-700 dark:hover:text-gray-300 transition -mt-1'
                        >
                            Forgot your password?
                        </button>
                    )}

                    {/* SUBMIT */}
                    <button
                        type='submit'
                        className='w-full py-3 rounded-xl text-sm font-medium mt-1
                        bg-gray-900 dark:bg-white
                        text-white dark:text-gray-900
                        hover:opacity-90 transition'
                    >
                        {currentState === 'Login' ? 'Sign in' : 'Create account'}
                    </button>

                    {/* SWITCH */}
                    <p className='text-center text-xs text-gray-400 dark:text-gray-500'>
                        {currentState === 'Login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                        <button
                            type='button'
                            onClick={() => setCurrentState(
                                currentState === 'Login' ? 'Sign Up' : 'Login'
                            )}
                            className='text-gray-700 dark:text-gray-300
                            hover:text-gray-900 dark:hover:text-white font-medium transition'
                        >
                            {currentState === 'Login' ? 'Sign up' : 'Sign in'}
                        </button>
                    </p>

                </form>

            </div>
        </div>
    )
}

export default Login