import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'
import { toast } from 'react-toastify'

const Product = () => {

    const { productId } = useParams()
    const { products, currency, addToCart } = useContext(ShopContext)

    const [productData, setProductData] = useState(null)
    const [image, setImage] = useState('')
    const [size, setSize] = useState('')
    const [activeTab, setActiveTab] = useState('reviews')
    const [liked, setLiked] = useState(false)

    const [reviews, setReviews] = useState([
        { name: "Animesh Jena", rating: 5, text: "Amazing quality and super fast delivery. Totally worth it!", date: "Mar 28, 2025" },
        { name: "Satabdi Das", rating: 4, text: "Loved the design and comfort. Will definitely shop again!", date: "Apr 2, 2025" },
        { name: "Dhaneswar Hansdah", rating: 5, text: "Smooth experience and great pricing. Highly recommended!", date: "Apr 7, 2025" }
    ])

    const [userName, setUserName] = useState('')
    const [rating, setRating] = useState(0)
    const [reviewText, setReviewText] = useState('')

    useEffect(() => {
        const item = products.find(item => item._id === productId)
        if (item) { setProductData(item); setImage(item.image[0]) }
        window.scrollTo(0, 0)
    }, [productId, products])

    const handleAddToCart = () => {
        if (!size) { toast.error("Please select a size"); return }
        addToCart(productData._id, size)
        toast.success("Added to cart")
    }

    const handleReviewSubmit = () => {
        if (!userName || !rating || !reviewText) { toast.error("Fill all fields"); return }
        setReviews([{ name: userName, rating, text: reviewText, date: new Date().toDateString() }, ...reviews])
        setUserName(''); setRating(0); setReviewText('')
        toast.success("Review submitted!")
    }

    const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    const getPercent = (star) => Math.round((reviews.filter(r => r.rating === star).length / reviews.length) * 100)

    const avatarColors = [
        'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300',
        'bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300',
        'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300',
    ]

    const inputClass = `w-full px-4 py-2.5 text-sm rounded-xl border
        border-gray-200 dark:border-gray-600
        bg-gray-50 dark:bg-gray-700
        text-gray-900 dark:text-white
        placeholder-gray-400 dark:placeholder-gray-500
        focus:outline-none focus:border-gray-400 dark:focus:border-gray-400
        transition`

    return productData ? (
        <div className='border-t pt-10 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300'>

            {/* PRODUCT SECTION */}
            <div className='flex gap-10 flex-col sm:flex-row'>

                {/* IMAGES */}
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>

                    {/* THUMBNAILS */}
                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-2 sm:w-[18%]'>
                        {productData.image.map((item, index) => (
                            <img
                                key={index}
                                src={item}
                                onClick={() => setImage(item)}
                                className={`w-[22%] sm:w-full cursor-pointer rounded-xl border-2 transition-all flex-shrink-0
                                ${image === item
                                        ? 'border-gray-900 dark:border-white'
                                        : 'border-transparent hover:border-gray-300 dark:hover:border-gray-500'
                                    }`}
                                alt=""
                            />
                        ))}
                    </div>

                    {/* MAIN IMAGE */}
                    <div className='w-full sm:w-[80%] relative group'>
                        <img
                            src={image}
                            className='w-full rounded-2xl object-cover'
                            alt={productData.name}
                        />
                        {/* WISHLIST ON IMAGE */}
                        <button
                            onClick={() => { setLiked(!liked); toast.success(liked ? 'Removed from wishlist' : 'Added to wishlist') }}
                            className='absolute top-3 right-3 w-9 h-9 rounded-full
                            bg-white/90 dark:bg-gray-800/90
                            flex items-center justify-center
                            hover:scale-110 transition-all'
                        >
                            <svg viewBox="0 0 24 24" className={`w-4 h-4 transition-all ${liked ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-gray-500'}`} strokeWidth="1.8">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* INFO */}
                <div className='flex-1 flex flex-col gap-5'>

                    {/* BADGE */}
                    <span className='self-start text-xs font-medium px-3 py-1 rounded-full
                        bg-purple-100 dark:bg-purple-900/40
                        text-purple-800 dark:text-purple-300'>
                        {productData.category} · {productData.subCategory}
                    </span>

                    {/* NAME */}
                    <h1 className='text-2xl font-medium dark:text-white leading-snug'>
                        {productData.name}
                    </h1>

                    {/* RATING ROW */}
                    <div className='flex items-center gap-2'>
                        <div className='flex gap-0.5'>
                            {[...Array(5)].map((_, i) => (
                                <img key={i} src={assets.star_icon}
                                    className={`w-3.5 ${i < Math.round(averageRating) ? '' : 'opacity-25'}`} alt="" />
                            ))}
                        </div>
                        <span className='text-xs text-gray-400 dark:text-gray-500'>
                            {averageRating.toFixed(1)} ({reviews.length} reviews)
                        </span>
                    </div>

                    {/* PRICE */}
                    <div className='flex items-baseline gap-3'>
                        <p className='text-3xl font-medium dark:text-white'>
                            {currency}{productData.price}
                        </p>
                        <span className='text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'>
                            In stock
                        </span>
                    </div>

                    {/* DESCRIPTION */}
                    <p className='text-sm text-gray-500 dark:text-gray-400 leading-relaxed'>
                        {productData.description}
                    </p>

                    {/* SIZE */}
                    <div>
                        <p className='text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3'>
                            Select size
                        </p>
                        <div className='flex flex-wrap gap-2'>
                            {productData.sizes.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSize(item)}
                                    className={`px-4 py-2 rounded-xl text-sm border transition-all
                                    ${size === item
                                            ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white'
                                            : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-400'
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ADD TO CART */}
                    <div className='flex gap-3'>
                        <button
                            onClick={handleAddToCart}
                            className='flex-1 py-3 rounded-xl text-sm font-medium
                            bg-gray-900 dark:bg-white
                            text-white dark:text-gray-900
                            hover:opacity-90 transition'
                        >
                            Add to cart
                        </button>
                        <button
                            onClick={() => { setLiked(!liked); toast.success(liked ? 'Removed from wishlist' : 'Added to wishlist') }}
                            className='w-12 h-12 flex items-center justify-center rounded-xl border
                            border-gray-200 dark:border-gray-600
                            hover:border-red-300 dark:hover:border-red-700
                            hover:bg-red-50 dark:hover:bg-red-900/20
                            transition-all'
                        >
                            <svg viewBox="0 0 24 24" className={`w-4 h-4 transition-all ${liked ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-gray-500 dark:stroke-gray-400'}`} strokeWidth="1.8">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </button>
                    </div>

                    {/* POLICY PILLS */}
                    <div className='flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-gray-700'>
                        {[
                            { icon: 'M5 8h14M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4M5 8v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8M10 12h4', label: 'Free delivery' },
                            { icon: 'M3 10h10a8 8 0 0 1 8 8v2M3 10l6 6m-6-6 6-6', label: '7-day returns' },
                            { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: 'Secure payment' },
                        ].map((p, i) => (
                            <div key={i} className='flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400
                                px-3 py-1.5 rounded-full bg-gray-50 dark:bg-gray-800
                                border border-gray-100 dark:border-gray-700'>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d={p.icon} />
                                </svg>
                                {p.label}
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* TABS + REVIEWS */}
            <div className='mt-16'>

                {/* TABS */}
                <div className='flex gap-2 mb-6 overflow-x-auto'>
                    {[
                        { id: 'reviews', label: `Reviews (${reviews.length})` },
                        { id: 'description', label: 'Description' },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-5 py-2 text-sm rounded-full border whitespace-nowrap transition-all
                            ${activeTab === tab.id
                                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white'
                                    : 'text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-600 hover:border-gray-400'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* REVIEWS TAB */}
                {activeTab === 'reviews' && (
                    <div className='bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6'>

                        {/* RATING SUMMARY */}
                        <div className='flex flex-col sm:flex-row gap-8 pb-6 mb-6 border-b border-gray-100 dark:border-gray-700'>
                            <div className='text-center'>
                                <p className='text-5xl font-medium dark:text-white'>{averageRating.toFixed(1)}</p>
                                <div className='flex justify-center gap-1 my-2'>
                                    {[...Array(5)].map((_, i) => (
                                        <img key={i} src={assets.star_icon} className={`w-4 ${i < Math.round(averageRating) ? '' : 'opacity-25'}`} alt="" />
                                    ))}
                                </div>
                                <p className='text-xs text-gray-400 dark:text-gray-500'>{reviews.length} reviews</p>
                            </div>
                            <div className='flex-1 flex flex-col gap-2 justify-center'>
                                {[5, 4, 3, 2, 1].map(star => (
                                    <div key={star} className='flex items-center gap-3 text-xs'>
                                        <span className='text-gray-400 w-2'>{star}</span>
                                        <div className='flex-1 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden'>
                                            <div style={{ width: `${getPercent(star)}%` }}
                                                className='h-full bg-amber-400 rounded-full transition-all' />
                                        </div>
                                        <span className='text-gray-400 w-6 text-right'>{getPercent(star)}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* REVIEW LIST */}
                        <div className='flex flex-col divide-y divide-gray-100 dark:divide-gray-700 mb-8'>
                            {reviews.map((r, index) => (
                                <div key={index} className='py-5 flex gap-4'>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 ${avatarColors[index % 3]}`}>
                                        {r.name.slice(0, 2).toUpperCase()}
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                        <div className='flex items-center justify-between gap-2 mb-1'>
                                            <p className='text-sm font-medium dark:text-white'>{r.name}</p>
                                            <p className='text-xs text-gray-400 dark:text-gray-500 flex-shrink-0'>{r.date}</p>
                                        </div>
                                        <div className='flex gap-0.5 mb-2'>
                                            {[...Array(5)].map((_, i) => (
                                                <img key={i} src={assets.star_icon} className={`w-3 ${i < r.rating ? '' : 'opacity-20'}`} alt="" />
                                            ))}
                                        </div>
                                        <p className='text-sm text-gray-500 dark:text-gray-400 leading-relaxed'>"{r.text}"</p>
                                        <span className='inline-block mt-2 text-[10px] px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'>
                                            Verified buyer
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* WRITE REVIEW */}
                        <div className='border-t border-gray-100 dark:border-gray-700 pt-6'>
                            <p className='text-sm font-medium dark:text-white mb-4'>Write a review</p>
                            <div className='flex flex-col gap-3'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                                    <input
                                        value={userName}
                                        onChange={e => setUserName(e.target.value)}
                                        placeholder='Your name'
                                        className={inputClass}
                                    />
                                    <div className={`${inputClass} flex items-center gap-2`}>
                                        <span className='text-xs text-gray-400 flex-shrink-0'>Rating:</span>
                                        <div className='flex gap-1'>
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <img
                                                    key={star}
                                                    onClick={() => setRating(star)}
                                                    src={assets.star_icon}
                                                    className={`w-5 cursor-pointer transition-opacity ${rating >= star ? 'opacity-100' : 'opacity-25'}`}
                                                    alt=""
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <textarea
                                    value={reviewText}
                                    onChange={e => setReviewText(e.target.value)}
                                    placeholder='Share your experience...'
                                    rows={3}
                                    className={inputClass}
                                    style={{ resize: 'vertical' }}
                                />
                                <button
                                    onClick={handleReviewSubmit}
                                    className='self-start px-6 py-2.5 rounded-xl text-sm font-medium
                                    bg-gray-900 dark:bg-white
                                    text-white dark:text-gray-900
                                    hover:opacity-90 transition'
                                >
                                    Submit review
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* DESCRIPTION TAB */}
                {activeTab === 'description' && (
                    <div className='bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6'>
                        <p className='text-sm font-medium dark:text-white mb-2'>Product details</p>
                        <p className='text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6'>
                            This premium product is crafted with high-quality materials designed to last.
                            Whether you're using it daily or on special occasions, it delivers exceptional comfort,
                            durability, and style.
                        </p>
                        <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
                            {[
                                { label: 'Material', value: '100% Cotton' },
                                { label: 'Origin', value: 'Made in India' },
                                { label: 'Warranty', value: '6 months' },
                                { label: 'Care', value: 'Machine washable' },
                            ].map((d, i) => (
                                <div key={i} className='bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center
                                    hover:-translate-y-1 transition-all duration-300'>
                                    <p className='text-xs text-gray-400 dark:text-gray-500 mb-1'>{d.label}</p>
                                    <p className='text-sm font-medium dark:text-white'>{d.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

        </div>
    ) : null
}

export default Product