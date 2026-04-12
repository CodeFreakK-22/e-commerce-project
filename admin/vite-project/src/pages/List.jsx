import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {

    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    const fetchList = async () => {
        try {
            setLoading(true)
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setList(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const removeProduct = async (id) => {
        try {
            const response = await axios.post(
                backendUrl + '/api/product/remove', { id }, { headers: { token } }
            )
            if (response.data.success) {
                toast.success(response.data.message)
                await fetchList()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => { fetchList() }, [])

    const filtered = list.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className='flex flex-col gap-5 p-6 max-w-5xl'>

            {/* HEADER */}
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
                <div>
                    <p className='text-xs font-medium text-gray-400 uppercase tracking-wider mb-1'>
                        Inventory
                    </p>
                    <h2 className='text-lg font-medium text-gray-900'>
                        All products
                        <span className='ml-2 text-sm font-normal text-gray-400'>
                            ({list.length})
                        </span>
                    </h2>
                </div>

                {/* SEARCH */}
                <div className='relative'>
                    <svg className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder='Search products...'
                        className='pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 bg-gray-50
                        text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400 transition w-56'
                    />
                </div>
            </div>

            {/* TABLE */}
            <div className='bg-white border border-gray-100 rounded-2xl overflow-hidden'>

                {/* TABLE HEADER */}
                <div className='hidden md:grid grid-cols-[60px_1fr_120px_100px_80px] gap-4
                    px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-medium
                    text-gray-400 uppercase tracking-wider'>
                    <span>Image</span>
                    <span>Name</span>
                    <span>Category</span>
                    <span>Price</span>
                    <span className='text-center'>Action</span>
                </div>

                {/* ROWS */}
                {loading ? (
                    <div className='flex items-center justify-center py-16'>
                        <div className='w-6 h-6 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin' />
                    </div>
                ) : filtered.length > 0 ? (
                    <div className='divide-y divide-gray-100'>
                        {filtered.map((item, index) => (
                            <div
                                key={index}
                                className='grid grid-cols-[60px_1fr_80px] md:grid-cols-[60px_1fr_120px_100px_80px]
                                gap-4 px-5 py-4 items-center
                                hover:bg-gray-50 transition-colors'
                            >
                                {/* IMAGE */}
                                <img
                                    src={item.image[0]}
                                    alt={item.name}
                                    className='w-12 h-12 rounded-xl object-cover border border-gray-100'
                                />

                                {/* NAME */}
                                <div className='min-w-0'>
                                    <p className='text-sm font-medium text-gray-900 truncate'>
                                        {item.name}
                                    </p>
                                    <p className='text-xs text-gray-400 mt-0.5 md:hidden'>
                                        {item.category} · {currency}{item.price}
                                    </p>
                                </div>

                                {/* CATEGORY */}
                                <div className='hidden md:block'>
                                    <span className='text-xs px-2.5 py-1 rounded-full
                                        bg-purple-50 text-purple-700 font-medium'>
                                        {item.category}
                                    </span>
                                </div>

                                {/* PRICE */}
                                <p className='hidden md:block text-sm font-medium text-gray-900'>
                                    {currency}{item.price}
                                </p>

                                {/* DELETE */}
                                <div className='flex justify-end md:justify-center'>
                                    <button
                                        onClick={() => removeProduct(item._id)}
                                        className='w-8 h-8 flex items-center justify-center rounded-xl
                                        border border-transparent text-gray-400
                                        hover:border-red-200 hover:text-red-500 hover:bg-red-50
                                        transition-all'
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6" />
                                            <path d="M19 6l-1 14H6L5 6" />
                                            <path d="M10 11v6M14 11v6" />
                                            <path d="M9 6V4h6v2" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center py-16 gap-2'>
                        <p className='text-sm text-gray-400'>No products found</p>
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className='text-xs text-gray-400 hover:text-gray-600 underline'
                            >
                                Clear search
                            </button>
                        )}
                    </div>
                )}
            </div>

        </div>
    )
}

export default List