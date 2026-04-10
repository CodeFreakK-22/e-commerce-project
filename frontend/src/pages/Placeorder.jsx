import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Placeorder = () => {

    const [method, setMethod] = useState('cod');

    const {
        navigate,
        backendUrl,
        token,
        cartItems,
        setCartItems,
        getCartAmount,
        delivery_fee,
        products
    } = useContext(ShopContext);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',
    })

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(
                            products.find(product => product._id === items)
                        )
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
                        backendUrl + '/api/order/place',
                        orderData,
                        { headers: { token } }
                    )

                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                        toast.success("Order Placed")
                    } else {
                        toast.error(response.data.message)
                    }
                    break;

                case 'stripe':
                    const responseStripe = await axios.post(
                        backendUrl + '/api/order/stripe',
                        orderData,
                        { headers: { token } }
                    )

                    if (responseStripe.data.success) {
                        const { session_url } = responseStripe.data
                        window.location.replace(session_url)
                    } else {
                        toast.error("Stripe failed")
                    }
                    break;

                default:
                    break;
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <form
            onSubmit={onSubmitHandler}
            className='flex flex-col sm:flex-row justify-between gap-4 sm:pt-14 min-h-[80vh] border-t dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300'
        >

            {/* LEFT */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'DELIVERY'} text2={'DETAILS'} />
                </div>

                {/* INPUTS */}
                <div className='flex gap-3'>
                    <input required name='firstName' value={formData.firstName}
                        onChange={onChangeHandler}
                        className='input-style' placeholder='First name' />

                    <input required name='lastName' value={formData.lastName}
                        onChange={onChangeHandler}
                        className='input-style' placeholder='Last name' />
                </div>

                <input required name='email' value={formData.email}
                    onChange={onChangeHandler}
                    className='input-style' type="email" placeholder='Email address' />

                <input required name='street' value={formData.street}
                    onChange={onChangeHandler}
                    className='input-style' placeholder='Street address' />

                <div className='flex gap-3'>
                    <input required name='city' value={formData.city}
                        onChange={onChangeHandler}
                        className='input-style' placeholder='City' />

                    <input required name='state' value={formData.state}
                        onChange={onChangeHandler}
                        className='input-style' placeholder='State' />
                </div>

                <div className='flex gap-3'>
                    <input required name='zipcode' value={formData.zipcode}
                        onChange={onChangeHandler}
                        className='input-style' type="number" placeholder='Zipcode' />

                    <input required name='country' value={formData.country}
                        onChange={onChangeHandler}
                        className='input-style' placeholder='Country' />
                </div>

                <input required name='phone' value={formData.phone}
                    onChange={onChangeHandler}
                    className='input-style' type="number" placeholder='Phone' />
            </div>

            {/* RIGHT */}
            <div className='mt-8'>
                <div className='mt-8 min-w-80'>
                    <CartTotal />
                </div>

                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHODS'} />

                    <div className='flex gap-3 flex-col lg:flex-row'>

                        <div
                            onClick={() => setMethod('stripe')}
                            className='payment-box'
                        >
                            <p className={`radio ${method === 'stripe' && 'bg-green-400'}`}></p>
                            <img className='h-5 mx-4 dark:invert' src={assets.stripe_logo} alt="" />
                        </div>

                        <div
                            onClick={() => setMethod('razorpay')}
                            className='payment-box'
                        >
                            <p className={`radio ${method === 'razorpay' && 'bg-green-400'}`}></p>
                            <img className='h-5 mx-4 dark:invert' src={assets.razorpay_logo} alt="" />
                        </div>

                        <div
                            onClick={() => setMethod('cod')}
                            className='payment-box'
                        >
                            <p className={`radio ${method === 'cod' && 'bg-green-400'}`}></p>
                            <p className='text-gray-500 dark:text-gray-400 text-sm font-medium mx-4'>
                                CASH ON DELIVERY
                            </p>
                        </div>
                    </div>

                    <div className='w-full text-end mt-8'>
                        <button
                            type='submit'
                            className='bg-black text-white dark:bg-white dark:text-black px-16 py-3 text-sm transition-all'
                        >
                            PLACE ORDER
                        </button>
                    </div>
                </div>
            </div>

        </form>
    )
}

export default Placeorder