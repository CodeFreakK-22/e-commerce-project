import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'

const Orders = () => {

    const { backendUrl, token, currency } = useContext(ShopContext)
    const [orderData, setOrderData] = useState([])
    const [activeTab, setActiveTab] = useState('All')

    const loadOrderData = async () => {
        try {
            if (!token) return
            const response = await axios.post(
                backendUrl + '/api/order/userorders',
                {},
                { headers: { token } }
            )
            if (response.data.success) {
                let allOrdersItem = []
                response.data.orders.forEach((order) => {
                    order.items.forEach((item) => {
                        item['status'] = order.status
                        item['payment'] = order.payment
                        item['paymentMethod'] = order.paymentMethod
                        item['date'] = order.date
                        allOrdersItem.push(item)
                    })
                })
                setOrderData(allOrdersItem.reverse())
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { loadOrderData() }, [token])

    const statusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'out for delivery':
                return { badge: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300', dot: 'bg-green-500' }
            case 'delivered':
                return { badge: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300', dot: 'bg-green-500' }
            case 'shipped':
                return { badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300', dot: 'bg-purple-500' }
            case 'packing':
                return { badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300', dot: 'bg-amber-500' }
            case 'order placed':
                return { badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300', dot: 'bg-blue-500' }
            default:
                return { badge: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300', dot: 'bg-gray-400' }
        }
    }

    const tabs = ['All', 'Active', 'Delivered']

    const filteredOrders = orderData.filter((item) => {
        if (activeTab === 'All') return true
        if (activeTab === 'Delivered') return item.status?.toLowerCase() === 'delivered'
        if (activeTab === 'Active') return item.status?.toLowerCase() !== 'delivered'
        return true
    })

    return (
        <div className='border-t pt-12 pb-20 dark:border-gray-700 dark:bg-gray-900 min-h-screen'>

            {/* HEADER */}
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8'>
                <div>
                    <Title text1={'MY'} text2={'ORDERS'} />
                    <p className='text-xs text-gray-400 dark:text-gray-500 mt-1'>
                        {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {/* FILTER TABS */}
                <div className='flex gap-2'>
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-1.5 rounded-full text-xs border transition-all
                            ${activeTab === tab
                                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white'
                                    : 'bg-transparent text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-400'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* ORDER CARDS */}
            <div className='flex flex-col gap-3'>
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((item, index) => {
                        const { badge, dot } = statusStyle(item.status)
                        return (
                            <div
                                key={index}
                                className='flex flex-col sm:flex-row sm:items-center gap-4 
                                p-4 sm:p-5 rounded-2xl border 
                                border-gray-100 dark:border-gray-700 
                                bg-white dark:bg-gray-800 
                                hover:border-gray-300 dark:hover:border-gray-500 
                                hover:-translate-y-0.5 transition-all duration-200'
                            >
                                {/* IMAGE */}
                                <img
                                    src={item.image?.[0]}
                                    alt={item.name}
                                    className='w-16 h-16 rounded-xl object-cover flex-shrink-0'
                                />

                                {/* INFO */}
                                <div className='flex-1 min-w-0'>
                                    <p className='text-sm font-medium dark:text-white truncate mb-2'>
                                        {item.name}
                                    </p>
                                    <div className='flex flex-wrap gap-2 mb-2'>
                                        {[
                                            `${currency}${item.price}`,
                                            `Qty: ${item.quantity}`,
                                            `Size: ${item.size}`,
                                            item.paymentMethod
                                        ].map((tag, i) => (
                                            <span
                                                key={i}
                                                className='text-[11px] px-2 py-0.5 rounded-md 
                                                bg-gray-100 dark:bg-gray-700 
                                                text-gray-500 dark:text-gray-400'
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <p className='text-[11px] text-gray-400 dark:text-gray-500'>
                                        {new Date(item.date).toDateString()}
                                    </p>
                                </div>

                                {/* STATUS + BUTTON */}
                                <div className='flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3'>
                                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-full ${badge}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${dot}`}></span>
                                        {item.status}
                                    </span>
                                    <button
                                        onClick={loadOrderData}
                                        className='text-xs px-4 py-2 rounded-lg border 
                                        border-gray-200 dark:border-gray-600 
                                        text-gray-600 dark:text-gray-300 
                                        hover:bg-gray-50 dark:hover:bg-gray-700 
                                        transition-all whitespace-nowrap'
                                    >
                                        Track order
                                    </button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className='flex flex-col items-center justify-center py-24 gap-3'>
                        <p className='text-gray-400 dark:text-gray-500 text-sm'>No orders found</p>
                        <button
                            onClick={() => setActiveTab('All')}
                            className='text-xs px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition'
                        >
                            View all orders
                        </button>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Orders