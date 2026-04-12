import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {
    return (
        <div className='flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100'>

            {/* LOGO */}
            <img className='w-24' src={assets.logo} alt="logo" />

            {/* RIGHT */}
            <div className='flex items-center gap-3'>

                {/* ADMIN BADGE */}
                <div className='hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-100'>
                    <div className='w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center'>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </div>
                    <span className='text-xs text-gray-500 font-medium'>Admin</span>
                </div>

                {/* LOGOUT */}
                <button
                    onClick={() => setToken('')}
                    className='flex items-center gap-2 px-4 py-2 rounded-xl text-sm
                    border border-gray-200 text-gray-600
                    hover:bg-red-50 hover:border-red-200 hover:text-red-500
                    transition-all duration-200'
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    <span className='hidden sm:inline'>Logout</span>
                </button>

            </div>
        </div>
    )
}

export default Navbar