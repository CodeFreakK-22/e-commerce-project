import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';

const Product = () => {

    const { productId } = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);

    const [productData, setProductData] = useState(null);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');

    // 🔥 TAB STATE
    const [activeTab, setActiveTab] = useState('reviews');

    // 🔥 REVIEW STATES
    const [reviews, setReviews] = useState([
        {
            name: "Animesh Rao",
            rating: 5,
            text: "Amazing quality and super fast delivery. Totally worth it!",
            date: "Mar 28, 2025"
        },
        {
            name: "Satabdi Das",
            rating: 4,
            text: "Loved the design and comfort. Will definitely shop again!",
            date: "Apr 2, 2025"
        },
        {
            name: "Sonali Mishra",
            rating: 5,
            text: "Smooth experience and great pricing. Highly recommended!",
            date: "Apr 7, 2025"
        }
    ]);

    const [userName, setUserName] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    // FETCH PRODUCT
    useEffect(() => {
        const item = products.find((item) => item._id === productId);
        if (item) {
            setProductData(item);
            setImage(item.image[0]);
        }
    }, [productId, products]);

    // ADD TO CART
    const handleAddToCart = () => {
        if (!size) {
            toast.error("Please select a size");
            return;
        }
        addToCart(productData._id, size);
        toast.success("Added to cart");
    };

    // ADD REVIEW
    const handleReviewSubmit = () => {
        if (!userName || !rating || !reviewText) {
            toast.error("Fill all fields");
            return;
        }

        const newReview = {
            name: userName,
            rating,
            text: reviewText,
            date: new Date().toDateString()
        };

        setReviews([newReview, ...reviews]);
        setUserName('');
        setRating(0);
        setReviewText('');

        toast.success("Review added");
    };

    // CALCULATIONS
    const averageRating =
        reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    const getPercent = (star) => {
        const count = reviews.filter(r => r.rating === star).length;
        return Math.round((count / reviews.length) * 100);
    };

    return productData ? (
        <div className='border-t-2 pt-10 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300'>

            {/* PRODUCT */}
            <div className='flex gap-12 flex-col sm:flex-row'>

                {/* IMAGES */}
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:w-[18%]'>
                        {productData.image.map((item, index) => (
                            <img
                                key={index}
                                src={item}
                                onClick={() => setImage(item)}
                                className='w-[24%] sm:w-full cursor-pointer'
                                alt=""
                            />
                        ))}
                    </div>

                    <div className='w-full sm:w-[80%]'>
                        <img src={image} className='w-full' />
                    </div>
                </div>

                {/* INFO */}
                <div className='flex-1'>
                    <h1 className='text-2xl font-medium dark:text-white'>
                        {productData.name}
                    </h1>

                    <p className='mt-5 text-3xl font-medium dark:text-white'>
                        {currency}{productData.price}
                    </p>

                    <p className='mt-5 text-gray-500 dark:text-gray-400'>
                        {productData.description}
                    </p>

                    {/* SIZE */}
                    <div className='my-6'>
                        <p className='mb-2'>Select Size</p>
                        <div className='flex gap-2'>
                            {productData.sizes.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSize(item)}
                                    className={`px-4 py-2 border 
                                    ${size === item ? 'border-orange-500' : 'border-gray-300 dark:border-gray-600'}`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className='bg-black text-white dark:bg-white dark:text-black px-8 py-3'
                    >
                        ADD TO CART
                    </button>
                </div>
            </div>

            <div className='mt-20 px-4 sm:px-0'>

                {/* TABS */}
                <div className='flex gap-2 mb-6 overflow-x-auto'>
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`px-4 sm:px-5 py-2 text-xs sm:text-sm border rounded-full whitespace-nowrap
            ${activeTab === 'reviews'
                                ? 'bg-black text-white dark:bg-white dark:text-black'
                                : 'text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600'}`}
                    >
                        Reviews ({reviews.length})
                    </button>

                    <button
                        onClick={() => setActiveTab('description')}
                        className={`px-4 sm:px-5 py-2 text-xs sm:text-sm border rounded-full whitespace-nowrap
            ${activeTab === 'description'
                                ? 'bg-black text-white dark:bg-white dark:text-black'
                                : 'text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600'}`}
                    >
                        Description
                    </button>
                </div>

                {/* ================= REVIEWS ================= */}
                {activeTab === 'reviews' && (
                    <div className='border p-4 sm:p-6 rounded-xl dark:border-gray-700'>

                        {/* TOP */}
                        <div className='flex flex-col gap-6 sm:flex-row sm:gap-10'>

                            {/* AVG */}
                            <div className='text-center sm:text-left'>
                                <p className='text-3xl sm:text-4xl font-semibold dark:text-white'>
                                    {averageRating.toFixed(1)}
                                </p>

                                <div className='flex justify-center sm:justify-start gap-1 my-2'>
                                    {[...Array(5)].map((_, i) => (
                                        <img key={i} src={assets.star_icon} className='w-4' />
                                    ))}
                                </div>

                                <p className='text-gray-400 text-sm'>
                                    {reviews.length} reviews
                                </p>
                            </div>

                            {/* BARS */}
                            <div className='flex-1 flex flex-col gap-2'>
                                {[5, 4, 3, 2, 1].map((star) => (
                                    <div key={star} className='flex items-center gap-2 text-xs sm:text-sm'>

                                        <p className='w-3'>{star}</p>

                                        <div className='flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded'>
                                            <div
                                                style={{ width: `${getPercent(star)}%` }}
                                                className='h-2 bg-orange-500 rounded'
                                            />
                                        </div>

                                        <p className='text-gray-400 w-8 text-right'>
                                            {getPercent(star)}%
                                        </p>
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* LIST */}
                        <div className='mt-8 flex flex-col gap-6'>
                            {reviews.map((r, index) => (
                                <div key={index} className='border-t pt-4 dark:border-gray-700'>

                                    <div className='flex flex-col sm:flex-row sm:justify-between gap-3'>

                                        <div className='flex gap-3 sm:gap-4'>

                                            {/* AVATAR */}
                                            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center 
text-xs sm:text-sm font-semibold
${index % 3 === 0 && 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'}
${index % 3 === 1 && 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300'}
${index % 3 === 2 && 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'}
`}>
                                                {r.name.slice(0, 2).toUpperCase()}
                                            </div>

                                            <div>

                                                <p className='font-medium dark:text-white text-sm sm:text-base'>
                                                    {r.name}
                                                </p>

                                                {/* STARS */}
                                                <div className='flex gap-1'>
                                                    {[...Array(r.rating)].map((_, i) => (
                                                        <img key={i} src={assets.star_icon} className='w-3 sm:w-4' />
                                                    ))}
                                                </div>

                                                <p className='text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1'>
                                                    "{r.text}"
                                                </p>

                                                <span className='text-[10px] sm:text-xs bg-green-100 text-green-700 px-2 py-1 rounded mt-2 inline-block'>
                                                    Verified Buyer
                                                </span>
                                            </div>
                                        </div>

                                        {/* DATE */}
                                        <p className='text-[10px] sm:text-xs text-gray-400'>
                                            {r.date}
                                        </p>

                                    </div>

                                </div>
                            ))}
                        </div>

                        {/* ADD REVIEW */}
                        <div className='mt-8'>
                            <h3 className='mb-3 font-medium text-sm sm:text-base'>
                                Write a review
                            </h3>

                            <input
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder='Your name'
                                className='border px-3 py-2 w-full mb-3 text-sm dark:bg-gray-800 dark:border-gray-600'
                            />

                            <div className='flex gap-2 mb-3'>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <img
                                        key={star}
                                        onClick={() => setRating(star)}
                                        src={assets.star_icon}
                                        className={`w-5 cursor-pointer ${rating >= star ? '' : 'opacity-30'}`}
                                    />
                                ))}
                            </div>

                            <textarea
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                placeholder='Write your review...'
                                className='border px-3 py-2 w-full mb-3 text-sm dark:bg-gray-800 dark:border-gray-600'
                            />

                            <button
                                onClick={handleReviewSubmit}
                                className='bg-black text-white dark:bg-white dark:text-black px-6 py-2 text-sm'
                            >
                                Submit Review
                            </button>
                        </div>

                    </div>
                )}

                {/* ================= DESCRIPTION ================= */}
                {activeTab === 'description' && (
                    <div className='border p-4 sm:p-6 rounded-xl dark:border-gray-700'>

                        <h3 className='text-base sm:text-lg font-medium mb-4 dark:text-white'>
                            Product details
                        </h3>

                        <p className='text-gray-500 dark:text-gray-400 mb-6 text-sm sm:text-base'>
                            This premium product is crafted with high-quality materials designed to last.
                            Whether you're using it daily or on special occasions, it delivers exceptional comfort,
                            durability, and style.
                        </p>

                        <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4'>

                            {/* CARD */}
                            <div className='bg-gray-100 dark:bg-gray-800 p-3 sm:p-4 rounded-lg text-center
            transition-all duration-300 cursor-pointer
            hover:scale-105 hover:-translate-y-1 hover:shadow-lg
            dark:hover:bg-gray-700'>
                                <p className='text-xs text-gray-400'>Material</p>
                                <p className='font-medium text-sm sm:text-base dark:text-white'>100% Cotton</p>
                            </div>

                            <div className='bg-gray-100 dark:bg-gray-800 p-3 sm:p-4 rounded-lg text-center
            transition-all duration-300 cursor-pointer
            hover:scale-105 hover:-translate-y-1 hover:shadow-lg
            dark:hover:bg-gray-700'>
                                <p className='text-xs text-gray-400'>Origin</p>
                                <p className='font-medium text-sm sm:text-base dark:text-white'>Made in India</p>
                            </div>

                            <div className='bg-gray-100 dark:bg-gray-800 p-3 sm:p-4 rounded-lg text-center
            transition-all duration-300 cursor-pointer
            hover:scale-105 hover:-translate-y-1 hover:shadow-lg
            dark:hover:bg-gray-700'>
                                <p className='text-xs text-gray-400'>Warranty</p>
                                <p className='font-medium text-sm sm:text-base dark:text-white'>6 months</p>
                            </div>

                            <div className='bg-gray-100 dark:bg-gray-800 p-3 sm:p-4 rounded-lg text-center
            transition-all duration-300 cursor-pointer
            hover:scale-105 hover:-translate-y-1 hover:shadow-lg
            dark:hover:bg-gray-700'>
                                <p className='text-xs text-gray-400'>Care</p>
                                <p className='font-medium text-sm sm:text-base dark:text-white'>Machine washable</p>
                            </div>

                        </div>

                    </div>
                )}

            </div>

            <RelatedProducts
                category={productData.category}
                subCategory={productData.subCategory}
            />

        </div>
    ) : null
}

export default Product