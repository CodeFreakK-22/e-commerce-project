import React, { useContext, useState } from 'react'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Placeorder = () => {

    const [method, setMethod] = useState('cod')

    const {
        navigate,
        backendUrl,
        token,
        cartItems,
        setCartItems,
        getCartAmount,
        delivery_fee,
        products
    } = useContext(ShopContext)

    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '',
        street: '', city: '', state: '',
        zipcode: '', country: '', phone: '',
    })

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setFormData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            let orderItems = []
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(p => p._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }

            switch (method) {
                case 'cod':
                    const response = await axios.post(
                        backendUrl + '/api/order/place', orderData, { headers: { token } }
                    )
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                        toast.success("Order placed!")
                    } else {
                        toast.error(response.data.message)
                    }
                    break

                case 'stripe':
                    const responseStripe = await axios.post(
                        backendUrl + '/api/order/stripe', orderData, { headers: { token } }
                    )
                    if (responseStripe.data.success) {
                        window.location.replace(responseStripe.data.session_url)
                    } else {
                        toast.error("Stripe payment failed")
                    }
                    break

                default:
                    break
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    const inputClass = `w-full px-3 py-2.5 text-sm rounded-xl border
        border-gray-200 dark:border-gray-600
        bg-gray-50 dark:bg-gray-700
        text-gray-900 dark:text-white
        placeholder-gray-400 dark:placeholder-gray-500
        focus:outline-none focus:border-gray-400 dark:focus:border-gray-400
        transition`

    const paymentMethods = [
        {
            id: 'stripe',
            label: 'Stripe',
            dot: '#635BFF',
            logo: assets.stripe_logo
        },
        {
            id: 'razorpay',
            label: 'Razorpay',
            dot: '#2D68F0',
            logo: assets.razorpay_logo
        },
        {
            id: 'cod',
            label: 'Cash on delivery',
            dot: null,
            logo: null
        },
    ]

    return (
        <form
            onSubmit={onSubmitHandler}
            className='border-t dark:border-gray-700 dark:bg-gray-900 pt-12 pb-20 min-h-screen'
        >
            <div className='flex flex-col lg:flex-row gap-6 items-start'>

                {/* LEFT — DELIVERY + PAYMENT */}
                <div className='flex-1 flex flex-col gap-4'>

                    {/* STEP 1 — DELIVERY */}
                    <div className='bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6'>
                        <div className='flex items-center gap-3 mb-5'>
                            <div className='w-6 h-6 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center text-[11px] font-medium text-white dark:text-gray-900 flex-shrink-0'>
                                1
                            </div>
                            <p className='text-sm font-medium dark:text-white'>Delivery details</p>
                        </div>

                        <div className='flex flex-col gap-3'>
                            <div className='grid grid-cols-2 gap-3'>
                                <input required name='firstName' value={formData.firstName}
                                    onChange={onChangeHandler} className={inputClass} placeholder='First name' />
                                <input required name='lastName' value={formData.lastName}
                                    onChange={onChangeHandler} className={inputClass} placeholder='Last name' />
                            </div>
                            <input required name='email' value={formData.email}
                                onChange={onChangeHandler} className={inputClass} type='email' placeholder='Email address' />
                            <input required name='street' value={formData.street}
                                onChange={onChangeHandler} className={inputClass} placeholder='Street address' />
                            <div className='grid grid-cols-2 gap-3'>
                                <input required name='city' value={formData.city}
                                    onChange={onChangeHandler} className={inputClass} placeholder='City' />
                                <input required name='state' value={formData.state}
                                    onChange={onChangeHandler} className={inputClass} placeholder='State' />
                            </div>
                            <div className='grid grid-cols-2 gap-3'>
                                <input required name='zipcode' value={formData.zipcode}
                                    onChange={onChangeHandler} className={inputClass} type='number' placeholder='Zipcode' />
                                <input required name='country' value={formData.country}
                                    onChange={onChangeHandler} className={inputClass} placeholder='Country' />
                            </div>
                            <input required name='phone' value={formData.phone}
                                onChange={onChangeHandler} className={inputClass} type='number' placeholder='Phone number' />
                        </div>
                    </div>

                    {/* STEP 2 — PAYMENT */}
                    <div className='bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6'>
                        <div className='flex items-center gap-3 mb-5'>
                            <div className='w-6 h-6 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center text-[11px] font-medium text-white dark:text-gray-900 flex-shrink-0'>
                                2
                            </div>
                            <p className='text-sm font-medium dark:text-white'>Payment method</p>
                        </div>

                        <div className='flex flex-col sm:flex-row gap-3'>
                            {paymentMethods.map(({ id, label, dot, logo }) => (
                                <div
                                    key={id}
                                    onClick={() => setMethod(id)}
                                    className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all
                                    ${method === id
                                            ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-700'
                                            : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-500'
                                        }`}
                                >
                                    {/* RADIO */}
                                    <div className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 transition-all
                                        ${method === id
                                            ? 'border-gray-900 dark:border-white bg-gray-900 dark:bg-white shadow-[inset_0_0_0_2px_white] dark:shadow-[inset_0_0_0_2px_#1f2937]'
                                            : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                    />
                                    {logo ? (
                                        <img src={logo} alt={label} className='h-4 dark:invert' />
                                    ) : (
                                        <div className='flex items-center gap-2'>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className='text-gray-500 dark:text-gray-400'>
                                                <rect x="2" y="6" width="20" height="12" rx="2" />
                                                <path d="M2 10h20" />
                                            </svg>
                                            <span className='text-xs font-medium text-gray-600 dark:text-gray-300'>{label}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT — ORDER SUMMARY */}
                <div className='w-full lg:w-[300px] flex-shrink-0 flex flex-col gap-3'>

                    <div className='bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6'>
                        <div className='flex items-center gap-3 mb-5'>
                            <div className='w-6 h-6 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center text-[11px] font-medium text-white dark:text-gray-900 flex-shrink-0'>
                                3
                            </div>
                            <p className='text-sm font-medium dark:text-white'>Order summary</p>
                        </div>

                        <CartTotal />

                        <button
                            type='submit'
                            className='w-full mt-5 py-3 rounded-xl text-sm font-medium
                            bg-gray-900 dark:bg-white
                            text-white dark:text-gray-900
                            hover:opacity-90 transition'
                        >
                            Place order
                        </button>
                    </div>

                    {/* SECURITY BADGE */}
                    <div className='bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 flex items-start gap-3'>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className='text-gray-400 flex-shrink-0 mt-0.5'>
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        <p className='text-xs text-gray-400 dark:text-gray-500 leading-relaxed'>
                            Your payment is secured with 256-bit encryption. We never store your card details.
                        </p>
                    </div>

                </div>
            </div>
        </form>
    )
}

export default Placeorder