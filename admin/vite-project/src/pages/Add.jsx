import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App.jsx'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('Men')
    const [subCategory, setSubCategory] = useState('Topwear')
    const [bestseller, setBestseller] = useState(false)
    const [sizes, setSizes] = useState([])
    const [loading, setLoading] = useState(false)

    const toggleSize = (s) =>
        setSizes(prev => prev.includes(s) ? prev.filter(i => i !== s) : [...prev, s])

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('name', name)
            formData.append('description', description)
            formData.append('price', price)
            formData.append('category', category)
            formData.append('subCategory', subCategory)
            formData.append('bestseller', bestseller)
            formData.append('sizes', JSON.stringify(sizes))
            image1 && formData.append('image1', image1)
            image2 && formData.append('image2', image2)
            image3 && formData.append('image3', image3)
            image4 && formData.append('image4', image4)

            const response = await axios.post(
                backendUrl + '/api/product/add', formData, { headers: { token } }
            )

            if (response.data.success) {
                toast.success(response.data.message)
                setName(''); setDescription(''); setPrice('')
                setImage1(false); setImage2(false)
                setImage3(false); setImage4(false)
                setSizes([]); setBestseller(false)
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

    const inputClass = `w-full px-4 py-2.5 text-sm rounded-xl border
        border-gray-200 bg-gray-50 text-gray-900
        placeholder-gray-400 outline-none
        focus:border-gray-400 transition`

    const images = [
        { state: image1, setter: setImage1, id: 'image1' },
        { state: image2, setter: setImage2, id: 'image2' },
        { state: image3, setter: setImage3, id: 'image3' },
        { state: image4, setter: setImage4, id: 'image4' },
    ]

    return (
        <form
            onSubmit={onSubmitHandler}
            className='flex flex-col gap-6 p-6 max-w-2xl'
        >
            <div>
                <p className='text-xs font-medium text-gray-400 uppercase tracking-wider mb-1'>
                    Add new product
                </p>
                <h2 className='text-lg font-medium text-gray-900'>Product details</h2>
            </div>

            {/* IMAGE UPLOAD */}
            <div className='bg-white border border-gray-100 rounded-2xl p-5'>
                <p className='text-xs font-medium text-gray-400 uppercase tracking-wider mb-4'>
                    Product images
                </p>
                <div className='flex gap-3 flex-wrap'>
                    {images.map(({ state, setter, id }, i) => (
                        <label
                            key={id}
                            htmlFor={id}
                            className='relative cursor-pointer group'
                        >
                            <div className={`w-20 h-20 rounded-xl border-2 border-dashed overflow-hidden
                                flex items-center justify-center transition-all
                                ${state
                                    ? 'border-gray-300'
                                    : 'border-gray-200 hover:border-gray-400 bg-gray-50'
                                }`}
                            >
                                {state ? (
                                    <img
                                        src={URL.createObjectURL(state)}
                                        className='w-full h-full object-cover'
                                        alt=""
                                    />
                                ) : (
                                    <div className='flex flex-col items-center gap-1'>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="17 8 12 3 7 8" />
                                            <line x1="12" y1="3" x2="12" y2="15" />
                                        </svg>
                                        <span className='text-[9px] text-gray-400'>Image {i + 1}</span>
                                    </div>
                                )}

                                {/* REMOVE OVERLAY */}
                                {state && (
                                    <div
                                        onClick={(e) => { e.preventDefault(); setter(false) }}
                                        className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100
                                        flex items-center justify-center rounded-xl transition'
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <input
                                onChange={e => setter(e.target.files[0])}
                                type='file'
                                id={id}
                                hidden
                                accept='image/*'
                            />
                        </label>
                    ))}
                </div>
                <p className='text-xs text-gray-400 mt-3'>Upload up to 4 product images. Hover to remove.</p>
            </div>

            {/* PRODUCT INFO */}
            <div className='bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-4'>
                <p className='text-xs font-medium text-gray-400 uppercase tracking-wider'>
                    Basic info
                </p>

                <div>
                    <label className='text-[11px] text-gray-400 mb-1.5 block'>Product name</label>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className={inputClass}
                        type='text'
                        placeholder='e.g. Men round neck cotton T-shirt'
                        required
                    />
                </div>

                <div>
                    <label className='text-[11px] text-gray-400 mb-1.5 block'>Description</label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className={inputClass}
                        rows={3}
                        placeholder='Describe the product...'
                        style={{ resize: 'vertical' }}
                        required
                    />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    <div>
                        <label className='text-[11px] text-gray-400 mb-1.5 block'>Category</label>
                        <select
                            onChange={e => setCategory(e.target.value)}
                            className={inputClass}
                        >
                            <option value='Men'>Men</option>
                            <option value='Women'>Women</option>
                            <option value='Kids'>Kids</option>
                        </select>
                    </div>
                    <div>
                        <label className='text-[11px] text-gray-400 mb-1.5 block'>Sub category</label>
                        <select
                            onChange={e => setSubCategory(e.target.value)}
                            className={inputClass}
                        >
                            <option value='Topwear'>Topwear</option>
                            <option value='Bottomwear'>Bottomwear</option>
                            <option value='Winterwear'>Winterwear</option>
                        </select>
                    </div>
                    <div>
                        <label className='text-[11px] text-gray-400 mb-1.5 block'>Price (₹)</label>
                        <input
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            className={inputClass}
                            type='number'
                            placeholder='0'
                            required
                        />
                    </div>
                </div>
            </div>

            {/* SIZES */}
            <div className='bg-white border border-gray-100 rounded-2xl p-5'>
                <p className='text-xs font-medium text-gray-400 uppercase tracking-wider mb-4'>
                    Available sizes
                </p>
                <div className='flex gap-2 flex-wrap'>
                    {['S', 'M', 'L', 'XL', 'XXL'].map(s => (
                        <button
                            key={s}
                            type='button'
                            onClick={() => toggleSize(s)}
                            className={`px-4 py-2 rounded-xl text-sm border transition-all
                            ${sizes.includes(s)
                                    ? 'bg-gray-900 text-white border-gray-900'
                                    : 'border-gray-200 text-gray-500 hover:border-gray-400'
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* BESTSELLER */}
            <div className='bg-white border border-gray-100 rounded-2xl p-5'>
                <label className='flex items-center gap-3 cursor-pointer'>
                    <div
                        onClick={() => setBestseller(p => !p)}
                        className={`w-10 h-6 rounded-full transition-all flex items-center px-0.5
                        ${bestseller ? 'bg-gray-900' : 'bg-gray-200'}`}
                    >
                        <div className={`w-5 h-5 rounded-full bg-white transition-all
                            ${bestseller ? 'translate-x-4' : 'translate-x-0'}`}
                        />
                    </div>
                    <div>
                        <p className='text-sm font-medium text-gray-700'>Mark as bestseller</p>
                        <p className='text-xs text-gray-400'>Featured in the bestsellers section on the homepage</p>
                    </div>
                </label>
            </div>

            {/* SUBMIT */}
            <button
                type='submit'
                disabled={loading}
                className='self-start px-8 py-3 rounded-xl text-sm font-medium
                bg-gray-900 text-white
                hover:opacity-90 disabled:opacity-50 transition'
            >
                {loading ? 'Adding product...' : 'Add product'}
            </button>

        </form>
    )
}

export default Add