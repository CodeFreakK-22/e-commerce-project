import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {

    const policies = [
        {
            icon: assets.exchange_icon,
            title: 'Easy exchange policy',
            desc: 'Hassle-free exchange on all products within 15 days of purchase.',
            badge: '15 days',
            iconBg: 'bg-purple-100 dark:bg-purple-900/40',
        },
        {
            icon: assets.quality_icon,
            title: '7 days return policy',
            desc: 'Not satisfied? Return within 7 days for a full refund, no questions asked.',
            badge: 'Full refund',
            iconBg: 'bg-teal-100 dark:bg-teal-900/40',
        },
        {
            icon: assets.support_img,
            title: 'Best customer support',
            desc: '24/7 support to assist you with any questions or concerns you may have.',
            badge: '24/7',
            iconBg: 'bg-amber-100 dark:bg-amber-900/40',
        },
    ]

    return (
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 py-16'>
            {policies.map((policy, i) => (
                <div
                    key={i}
                    className='flex flex-col gap-4 p-6 rounded-2xl border
                    border-gray-100 dark:border-gray-700
                    bg-white dark:bg-gray-800
                    hover:border-gray-300 dark:hover:border-gray-500
                    hover:-translate-y-1 transition-all duration-300'
                >
                    <div className='flex items-center justify-between'>
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${policy.iconBg}`}>
                            <img src={policy.icon} className='w-5 dark:invert' alt="" />
                        </div>
                        <span className='text-xs font-medium px-3 py-1 rounded-full
                        bg-gray-100 dark:bg-gray-700
                        text-gray-500 dark:text-gray-400'>
                            {policy.badge}
                        </span>
                    </div>

                    <div>
                        <p className='text-sm font-medium text-gray-900 dark:text-white mb-1'>
                            {policy.title}
                        </p>
                        <p className='text-xs text-gray-500 dark:text-gray-400 leading-relaxed'>
                            {policy.desc}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default OurPolicy