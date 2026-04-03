import React, { useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Forgotpassword = () => {

    const { backendUrl, navigate } = useContext(ShopContext)

    const [step, setStep] = useState(1)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    // Step 1: Check Email
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

    // Step 2: Reset Password
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
        <form className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>

            {/* Title */}
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='prata-regular text-3xl'>Forgot Password</p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
            </div>

            {/* Step 1 */}
            {step === 1 && (
                <>
                    <input
                        type="email"
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full px-2 py-2 border border-gray-800'
                        required
                    />

                    <button
                        onClick={checkEmailHandler}
                        disabled={loading}
                        className='bg-black text-white px-8 py-2 mt-4'
                    >
                        {loading ? 'Checking...' : 'Next'}
                    </button>
                </>
            )}

            {/* Step 2 */}
            {step === 2 && (
                <>
                    <input
                        type="password"
                        placeholder='Enter new password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full px-2 py-2 border border-gray-800'
                        required
                    />

                    <button
                        onClick={resetPasswordHandler}
                        disabled={loading}
                        className='bg-black text-white px-8 py-2 mt-4'
                    >
                        {loading ? 'Updating...' : 'Reset Password'}
                    </button>
                </>
            )}

            {/* Back to login */}
            <p
                onClick={() => navigate('/login')}
                className='text-sm cursor-pointer hover:underline mt-2'
            >
                Back to Login
            </p>

        </form>
    )
}

export default Forgotpassword