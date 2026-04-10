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

    const fetchProductData = () => {
        const item = products.find((item) => item._id === productId);
        if (item) {
            setProductData(item);
            setImage(item.image[0]);
        }
    }

    useEffect(() => {
        fetchProductData();
    }, [productId, products]);

    // ✅ FIXED ADD TO CART HANDLER
    const handleAddToCart = () => {
        if (!size) {
            toast.error("Please select a size");
            return;
        }
        addToCart(productData._id, size);
        toast.success("Added to cart");
    }

    return productData ? (
        <div className='border-t-2 pt-10 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 transition-opacity duration-500'>

            {/* PRODUCT DATA */}
            <div className='flex gap-12 flex-col sm:flex-row'>

                {/* IMAGES */}
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>

                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:w-[18.7%] w-full'>
                        {
                            productData.image.map((item, index) => (
                                <img
                                    onClick={() => setImage(item)}
                                    src={item}
                                    key={index}
                                    className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                                    alt=""
                                />
                            ))
                        }
                    </div>

                    <div className='w-full sm:w-[80%]'>
                        <img className='w-full h-auto' src={image} alt="" />
                    </div>
                </div>

                {/* INFO */}
                <div className='flex-1'>

                    <h1 className='font-medium text-2xl mt-2 dark:text-white'>
                        {productData.name}
                    </h1>

                    {/* RATING */}
                    <div className='flex items-center gap-1 mt-2'>
                        {[...Array(4)].map((_, i) => (
                            <img key={i} src={assets.star_icon} className="w-3" alt="" />
                        ))}
                        <img src={assets.star_dull_icon} className="w-3" alt="" />
                        <p className='pl-2 text-gray-600 dark:text-gray-400'>(122)</p>
                    </div>

                    {/* PRICE */}
                    <p className='mt-5 text-3xl font-medium dark:text-white'>
                        {currency}{productData.price}
                    </p>

                    {/* DESCRIPTION */}
                    <p className='mt-5 text-gray-500 dark:text-gray-400 md:w-4/5'>
                        {productData.description}
                    </p>

                    {/* SIZE */}
                    <div className='flex flex-col gap-4 my-8'>
                        <p className='dark:text-white'>Select Size</p>

                        <div className='flex gap-2'>
                            {
                                productData.sizes.map((item, index) => (
                                    <button
                                        onClick={() => setSize(item)}
                                        key={index}
                                        className={`border px-4 py-2 
                                        ${item === size
                                                ? 'border-orange-500 bg-orange-100 dark:bg-orange-900'
                                                : 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800'
                                            }`}
                                    >
                                        {item}
                                    </button>
                                ))
                            }
                        </div>
                    </div>

                    {/* BUTTON */}
                    <button
                        onClick={handleAddToCart}
                        className='bg-black text-white dark:bg-white dark:text-black py-3 px-8 text-sm transition-all'
                    >
                        ADD TO CART
                    </button>

                    <hr className='mt-8 sm:w-4/5 dark:border-gray-700' />

                    {/* EXTRA INFO */}
                    <div className='text-sm text-gray-500 dark:text-gray-400 mt-5 flex flex-col gap-1'>
                        <p>100% Original product.</p>
                        <p>Cash on delivery is available on this product.</p>
                        <p>Easy return and exchange policy within 7 days.</p>
                    </div>
                </div>
            </div>

            {/* DESCRIPTION + REVIEWS */}
            <div className='mt-20'>

                <div className='flex'>
                    <p className='border px-5 py-3 text-sm dark:border-gray-700'>Reviews (122)</p>
                    <p className='border px-5 py-3 text-sm dark:border-gray-700'>Description</p>
                </div>

                <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 dark:text-gray-400 dark:border-gray-700'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                </div>
            </div>

            {/* RELATED */}
            <RelatedProducts
                category={productData.category}
                subCategory={productData.subCategory}
            />

        </div>
    ) : <div className='opacity-0'></div>
}

export default Product