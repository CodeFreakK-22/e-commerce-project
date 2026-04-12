import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = () => {

    const token = localStorage.getItem('token')
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('All')

    const fetchAllOrders = async () => {
        if (!token) return
        try {
            setLoading(true)
            const response = await axios.post(
                backendUrl + '/api/order/list', {}, { headers: { token } }
            )
            if (response.data.success) {
                setOrders(response.data.orders.reverse())
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const statusHandler = async (event, orderId) => {
        try {
            const response = await axios.post(
                backendUrl + '/api/order/status',
                { orderId, status: event.target.value },
                { headers: { token } }
            )
            if (response.data.success) await fetchAllOrders()
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => { fetchAllOrders() }, [token])

    const statusConfig = {
        'Order Placed': { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
        'Packing': { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
        'Shipped': { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
        'Out for delivery': { bg: 'bg-teal-50', text: 'text-teal-700', dot: 'bg-teal-500' },
        'Delivered': { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    }

    const statuses = ['All', 'Order Placed', 'Packing', 'Shipped', 'Out for delivery', 'Delivered']

    const filtered = filter === 'All'
        ? orders
        : orders.filter(o => o.status === filter)

    return (
        <div className='flex flex-col gap-5 p-6 max-w-5xl'>

            {/* HEADER */}
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
                <div>
                    <p className='text-xs font-medium text-gray-400 uppercase tracking-wider mb-1'>
                        Management
                    </p>
                    <h2 className='text-lg font-medium text-gray-900'>
                        Orders
                        <span className='ml-2 text-sm font-normal text-gray-400'>
                            ({filtered.length})
                        </span>
                    </h2>
                </div>

                {/* STATUS FILTER */}
                <select
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    className='text-sm px-3 py-2 rounded-xl border border-gray-200 bg-gray-50
                    text-gray-700 outline-none focus:border-gray-400 transition cursor-pointer'
                >
                    {statuses.map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>

            {/* ORDER CARDS */}
            {loading ? (
                <div className='flex items-center justify-center py-20'>
                    <div className='w-6 h-6 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin' />
                </div>
            ) : filtered.length > 0 ? (
                <div className='flex flex-col gap-3'>
                    {filtered.map((order, index) => {
                        const sc = statusConfig[order.status] || statusConfig['Order Placed']
                        return (
                            <div
                                key={index}
                                className='bg-white border border-gray-100 rounded-2xl p-5
                                hover:border-gray-200 transition-colors'
                            >
                                <div className='flex flex-col lg:flex-row lg:items-start gap-5'>

                                    {/* PARCEL ICON + STATUS */}
                                    <div className='flex items-center gap-3 lg:flex-col lg:items-center lg:w-24 flex-shrink-0'>
                                        <div className='w-10 h-10 rounded-xl bg-gray-50 border border-gray-100
                                            flex items-center justify-center'>
                                            <img src={assets.parcel_icon} className='w-5' alt="" />
                                        </div>
                                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-medium
                                            px-2.5 py-1 rounded-full ${sc.bg} ${sc.text}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                                            {order.status}
                                        </span>
                                    </div>

                                    {/* ITEMS + ADDRESS */}
                                    <div className='flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4'>

                                        {/* ITEMS */}
                                        <div>
                                            <p className='text-[11px] text-gray-400 uppercase tracking-wider mb-2'>
                                                Items
                                            </p>
                                            <div className='flex flex-col gap-1'>
                                                {order.items.map((item, i) => (
                                                    <p key={i} className='text-sm text-gray-700'>
                                                        {item.name}
                                                        <span className='text-gray-400'> × {item.quantity}</span>
                                                        <span className='text-xs ml-1 px-1.5 py-0.5 rounded bg-gray-100 text-gray-500'>
                                                            {item.size}
                                                        </span>
                                                    </p>
                                                ))}
                                            </div>
                                        </div>

                                        {/* ADDRESS */}
                                        <div>
                                            <p className='text-[11px] text-gray-400 uppercase tracking-wider mb-2'>
                                                Delivery address
                                            </p>
                                            <p className='text-sm font-medium text-gray-900'>
                                                {order.address.firstName} {order.address.lastName}
                                            </p>
                                            <p className='text-xs text-gray-500 mt-0.5 leading-relaxed'>
                                                {order.address.street},<br />
                                                {order.address.city}, {order.address.state}, {order.address.country} — {order.address.zipcode}
                                            </p>
                                            <p className='text-xs text-gray-400 mt-1'>{order.address.phone}</p>
                                        </div>
                                    </div>

                                    {/* META + STATUS SELECTOR */}
                                    <div className='flex flex-col gap-3 lg:items-end lg:w-44 flex-shrink-0'>

                                        {/* META PILLS */}
                                        <div className='flex flex-wrap lg:flex-col gap-2'>
                                            <span className='text-xs px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100 text-gray-600'>
                                                {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                            </span>
                                            <span className='text-xs px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100 text-gray-600'>
                                                {order.paymentMethod}
                                            </span>
                                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium
                                                ${order.payment
                                                    ? 'bg-green-50 text-green-700'
                                                    : 'bg-amber-50 text-amber-700'
                                                }`}>
                                                {order.payment ? 'Paid' : 'Pending'}
                                            </span>
                                            <span className='text-xs text-gray-400'>
                                                {new Date(order.date).toLocaleDateString()}
                                            </span>
                                        </div>

                                        {/* AMOUNT */}
                                        <p className='text-base font-medium text-gray-900'>
                                            {currency}{order.amount}
                                        </p>

                                        {/* STATUS SELECTOR */}
                                        <select
                                            onChange={e => statusHandler(e, order._id)}
                                            value={order.status}
                                            className='w-full text-xs px-3 py-2 rounded-xl border border-gray-200
                                            bg-gray-50 text-gray-700 outline-none
                                            focus:border-gray-400 transition cursor-pointer'
                                        >
                                            <option value='Order Placed'>Order placed</option>
                                            <option value='Packing'>Packing</option>
                                            <option value='Shipped'>Shipped</option>
                                            <option value='Out for delivery'>Out for delivery</option>
                                            <option value='Delivered'>Delivered</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center py-20 gap-2'>
                    <p className='text-sm text-gray-400'>No orders found</p>
                    {filter !== 'All' && (
                        <button
                            onClick={() => setFilter('All')}
                            className='text-xs text-gray-400 hover:text-gray-600 underline'
                        >
                            View all orders
                        </button>
                    )}
                </div>
            )}

        </div>
    )
}

export default Orders