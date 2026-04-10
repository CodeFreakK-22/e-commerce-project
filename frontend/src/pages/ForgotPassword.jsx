import React, { useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ForgotPassword = () => {

    const { backendUrl, navigate } = useContext(ShopContext)

    const [step, setStep] = useState(1)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const checkEmailHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)

            const res = await axios.post(
                backendUrl + '/api/user/check-email',
                { email }
            )

            if (res.data.success) {
                toast.success("Email found")
                setStep(2)
            } else {
                toast.error(res.data.message)
            }

        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    const resetPasswordHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)

            const res = await axios.post(
                backendUrl + '/api/user/direct-reset-password',
                { email, password }
            )

            if (res.data.success) {
                toast.success("Password updated")
                navigate('/login')
            } else {
                toast.error(res.data.message)
            }

        } catch (error) {
            toast.error("Error resetting password")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 dark:text-gray-300'>

            {/* TITLE */}
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='prata-regular text-3xl dark:text-white'>Forgot Password</p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800 dark:bg-white' />
            </div>

            {/* STEP 1 */}
            {step === 1 && (
                <>
                    <input
                        type="email"
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full px-2 py-2 border border-gray-800 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 outline-none'
                        required
                    />

                    <button
                        onClick={checkEmailHandler}
                        disabled={loading}
                        className='bg-black text-white dark:bg-white dark:text-black px-8 py-2 mt-4 transition-all'
                    >
                        {loading ? 'Checking...' : 'Next'}
                    </button>
                </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
                <>
                    <input
                        type="password"
                        placeholder='Enter new password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full px-2 py-2 border border-gray-800 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 outline-none'
                        required
                    />

                    <button
                        onClick={resetPasswordHandler}
                        disabled={loading}
                        className='bg-black text-white dark:bg-white dark:text-black px-8 py-2 mt-4 transition-all'
                    >
                        {loading ? 'Updating...' : 'Reset Password'}
                    </button>
                </>
            )}

            {/* BACK */}
            <p
                onClick={() => navigate('/login')}
                className='text-sm cursor-pointer hover:underline mt-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
            >
                Back to Login
            </p>

        </form>
    )
}

export default ForgotPassword