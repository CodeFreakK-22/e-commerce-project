import React from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

    const [visible, setVisible] = React.useState(false);

    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems, theme, setTheme } = React.useContext(ShopContext);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    return (
        <div className='flex items-center justify-between py-5 font-medium'>

            <Link to='/'><img src={assets.logo} className='w-36 dark:invert' alt='logo' /></Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700 dark:text-white'>

                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>HOME</p>
                    <hr className='w-6 border-none h-[1.5px] bg-gray-700 dark:bg-white hidden' />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p>COLLECTION</p>
                    <hr className='w-6 border-none h-[1.5px] bg-gray-700 dark:bg-white hidden' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>ABOUT</p>
                    <hr className='w-6 border-none h-[1.5px] bg-gray-700 dark:bg-white hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>CONTACT</p>
                    <hr className='w-6 border-none h-[1.5px] bg-gray-700 dark:bg-white hidden' />
                </NavLink>

            </ul>

            <div className='flex items-center gap-6'>
                <div onClick={toggleTheme} className='cursor-pointer text-gray-700 dark:text-gray-300'>
                    {theme === 'light' ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    )}
                </div>

                <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer dark:invert' alt="" />

                <div className='group relative'>

                    <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer dark:invert' alt="" />
                    {/*-------------- Drop Down ------------ */}

                    {token && <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-10'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 dark:bg-gray-700 text-gray-500 dark:text-gray-200 rounded'>
                            <p onClick={() => navigate('/profile')} className='cursor-pointer hover:text-black dark:hover:text-white'>My Profile</p>
                            <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black dark:hover:text-white'>Orders</p>
                            <p onClick={logout} className='cursor-pointer hover:text-black dark:hover:text-white'>Logout</p>
                        </div>
                    </div>}
                </div>
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5 dark:invert' alt="" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white dark:bg-white dark:text-black aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden dark:invert' alt="" />
            </div>

            {/* Sidebar menu for small screens */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white dark:bg-gray-900 transition-all z-10 ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600 dark:text-gray-300'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img className='h-4 rotate-180 dark:invert' src={assets.dropdown_icon} alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
                </div>
            </div>

        </div >
    )
}

export default Navbar
