import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {

    const [visible, setVisible] = React.useState(false)

    const {
        setShowSearch,
        getCartCount,
        navigate,
        token,
        setToken,
        setCartItems,
        theme,
        setTheme
    } = useContext(ShopContext)

    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    const handleSearchClick = () => {
        setShowSearch(true)
        navigate('/collection')
    }

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/collection', label: 'Collection' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
    ]

    return (
        <>
            <div className='flex items-center justify-between py-4 px-1 font-medium'>

                {/* LOGO */}
                <Link to='/'>
                    <img src={assets.logo} className='w-28 sm:w-36 dark:invert' alt='logo' />
                </Link>

                {/* DESKTOP NAV */}
                <ul className='hidden sm:flex gap-1 text-sm'>
                    {navLinks.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-xl text-sm transition-all
                            ${isActive
                                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </ul>

                {/* RIGHT ICONS */}
                <div className='flex items-center gap-3 sm:gap-4'>

                    {/* THEME TOGGLE */}
                    <button
                        onClick={toggleTheme}
                        className='w-8 h-8 flex items-center justify-center rounded-xl
                    text-gray-600 dark:text-gray-300
                    hover:bg-gray-100 dark:hover:bg-gray-700 transition'
                    >
                        {theme === 'light' ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        )}
                    </button>

                    {/* SEARCH */}
                    <button
                        onClick={handleSearchClick}
                        className='w-8 h-8 flex items-center justify-center rounded-xl
                    text-gray-600 dark:text-gray-300
                    hover:bg-gray-100 dark:hover:bg-gray-700 transition'
                    >
                        <img src={assets.search_icon} className='w-4 dark:invert' alt="search" />
                    </button>

                    {/* PROFILE */}
                    <div className='group relative'>
                        <button
                            onClick={() => token ? null : navigate('/login')}
                            className='w-8 h-8 flex items-center justify-center rounded-xl
                        text-gray-600 dark:text-gray-300
                        hover:bg-gray-100 dark:hover:bg-gray-700 transition'
                        >
                            <img src={assets.profile_icon} className='w-4 dark:invert' alt="" />
                        </button>

                        {token && (
                            <div className='group-hover:block hidden absolute right-0 pt-2 z-20'>
                                <div className='flex flex-col w-44 py-2 rounded-2xl border
                            border-gray-100 dark:border-gray-700
                            bg-white dark:bg-gray-800
                            shadow-sm overflow-hidden'>
                                    {[
                                        { label: 'My profile', action: () => navigate('/profile') },
                                        { label: 'My orders', action: () => navigate('/orders') },
                                    ].map(({ label, action }) => (
                                        <button
                                            key={label}
                                            onClick={action}
                                            className='text-left px-4 py-2.5 text-sm
                                        text-gray-600 dark:text-gray-300
                                        hover:bg-gray-50 dark:hover:bg-gray-700
                                        transition'
                                        >
                                            {label}
                                        </button>
                                    ))}
                                    <div className='border-t border-gray-100 dark:border-gray-700 mt-1 pt-1'>
                                        <button
                                            onClick={logout}
                                            className='w-full text-left px-4 py-2.5 text-sm
                                        text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20
                                        transition'
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* CART */}
                    <Link to='/cart' className='relative w-8 h-8 flex items-center justify-center rounded-xl
                    hover:bg-gray-100 dark:hover:bg-gray-700 transition'>
                        <img src={assets.cart_icon} className='w-4 dark:invert' alt="" />
                        {getCartCount() > 0 && (
                            <span className='absolute -top-0.5 -right-0.5 w-4 h-4 text-center
                        bg-gray-900 dark:bg-white
                        text-white dark:text-gray-900
                        text-[9px] font-medium rounded-full flex items-center justify-center'>
                                {getCartCount()}
                            </span>
                        )}
                    </Link>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        onClick={() => setVisible(true)}
                        className='sm:hidden w-8 h-8 flex items-center justify-center rounded-xl
                    hover:bg-gray-100 dark:hover:bg-gray-700 transition'
                    >
                        <img src={assets.menu_icon} className='w-4 dark:invert' alt="" />
                    </button>

                </div>
            </div>

            {/* MOBILE DRAWER */}
            <div className={`fixed inset-0 z-30 sm:hidden transition-all duration-300
            ${visible ? 'visible' : 'invisible'}`}>

                {/* BACKDROP */}
                <div
                    onClick={() => setVisible(false)}
                    className={`absolute inset-0 bg-black transition-opacity duration-300
                ${visible ? 'opacity-40' : 'opacity-0'}`}
                />

                {/* PANEL */}
                <div className={`absolute top-0 right-0 h-full w-72 
            bg-white dark:bg-gray-900 
            transition-transform duration-300 ease-in-out flex flex-col
            ${visible ? 'translate-x-0' : 'translate-x-full'}`}>

                    {/* DRAWER HEADER */}
                    <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700'>
                        <img src={assets.logo} className='w-24 dark:invert' alt='logo' />
                        <button
                            onClick={() => setVisible(false)}
                            className='w-8 h-8 flex items-center justify-center rounded-xl
                        hover:bg-gray-100 dark:hover:bg-gray-700 transition'
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='text-gray-500 dark:text-gray-400'>
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {/* NAV LINKS */}
                    <div className='flex flex-col gap-1 px-4 py-4 flex-1'>
                        {navLinks.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                onClick={() => setVisible(false)}
                                className={({ isActive }) =>
                                    `px-4 py-3 rounded-xl text-sm transition-all
                                ${isActive
                                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium'
                                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                    </div>

                    {/* DRAWER FOOTER */}
                    <div className='px-4 py-5 border-t border-gray-100 dark:border-gray-700 flex flex-col gap-2'>
                        {token ? (
                            <>
                                <button
                                    onClick={() => { navigate('/profile'); setVisible(false) }}
                                    className='w-full text-left px-4 py-3 rounded-xl text-sm
                                text-gray-600 dark:text-gray-300
                                hover:bg-gray-50 dark:hover:bg-gray-800 transition'
                                >
                                    My profile
                                </button>
                                <button
                                    onClick={() => { navigate('/orders'); setVisible(false) }}
                                    className='w-full text-left px-4 py-3 rounded-xl text-sm
                                text-gray-600 dark:text-gray-300
                                hover:bg-gray-50 dark:hover:bg-gray-800 transition'
                                >
                                    My orders
                                </button>
                                <button
                                    onClick={() => { logout(); setVisible(false) }}
                                    className='w-full text-left px-4 py-3 rounded-xl text-sm
                                text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition'
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => { navigate('/login'); setVisible(false) }}
                                className='w-full py-3 rounded-xl text-sm font-medium
                            bg-gray-900 dark:bg-white
                            text-white dark:text-gray-900
                            hover:opacity-90 transition'
                            >
                                Sign in
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Navbar