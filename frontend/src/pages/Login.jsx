import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

    const [currentState, setCurrentState] = useState('Login');
    const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (currentState === 'Sign Up') {

                const response = await axios.post(
                    backendUrl + '/api/user/register',
                    { name, email, password }
                );

                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem('token', response.data.token);
                    toast.success('Account created');
                } else {
                    toast.error(response.data.message);
                }

            } else {

                const response = await axios.post(
                    backendUrl + '/api/user/login',
                    { email, password }
                );

                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem('token', response.data.token);
                    toast.success('Login successful');
                } else {
                    toast.error(response.data.message);
                }
            }

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token]);

    return (
        <form
            onSubmit={onSubmitHandler}
            className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 dark:text-gray-300'
        >

            {/* TITLE */}
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='prata-regular text-3xl dark:text-white'>
                    {currentState}
                </p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800 dark:bg-white' />
            </div>

            {/* NAME */}
            {currentState !== 'Login' && (
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className='w-full px-2 py-2 border border-gray-800 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white outline-none'
                    placeholder='Name'
                    required
                />
            )}

            {/* EMAIL */}
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className='w-full px-2 py-2 border border-gray-800 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white outline-none'
                placeholder='Email'
                required
            />

            {/* PASSWORD */}
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className='w-full px-2 py-2 border border-gray-800 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white outline-none'
                placeholder='Password'
                required
            />

            {/* LINKS */}
            <div className='w-full flex justify-between text-sm mt-[-8px]'>

                <p
                    onClick={() => navigate('/forgot-password')}
                    className='cursor-pointer hover:underline text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                >
                    Forgot your Password?
                </p>

                {
                    currentState === 'Login'
                        ? (
                            <p
                                onClick={() => setCurrentState('Sign Up')}
                                className='cursor-pointer text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                            >
                                Create account
                            </p>
                        )
                        : (
                            <p
                                onClick={() => setCurrentState('Login')}
                                className='cursor-pointer text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                            >
                                Login Here
                            </p>
                        )
                }
            </div>

            {/* BUTTON */}
            <button className='bg-black text-white dark:bg-white dark:text-black font-light px-8 py-2 mt-4 transition-all'>
                {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
            </button>

        </form>
    )
}

export default Login