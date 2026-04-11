import React, { useEffect, useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import Productitem from '../components/Productitem';

const Collection = () => {

    const { products, search, showSearch } = useContext(ShopContext);

    const [showFilter, setShowFilter] = useState(false);
    const [FilterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relevant');

    const toggleCategory = (value) => {
        setCategory(prev =>
            prev.includes(value) ? prev.filter(i => i !== value) : [...prev, value]
        )
    }

    const toggleSubCategory = (value) => {
        setSubCategory(prev =>
            prev.includes(value) ? prev.filter(i => i !== value) : [...prev, value]
        )
    }

    const applyFilter = () => {
        let productsCopy = products.slice();

        if (showSearch && search) {
            productsCopy = productsCopy.filter(item =>
                item.name.toLowerCase().includes(search.toLowerCase())
            )
        }
        if (category.length > 0) {
            productsCopy = productsCopy.filter(item =>
                category.includes(item.category)
            )
        }
        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter(item =>
                subCategory.includes(item.subCategory)
            )
        }

        setFilterProducts(productsCopy);
    }

    const sortProduct = () => {
        let fpCopy = FilterProducts.slice();
        switch (sortType) {
            case 'low-high':
                setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
                break;
            case 'high-low':
                setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
                break;
            default:
                applyFilter();
                break;
        }
    }

    useEffect(() => { applyFilter() }, [category, subCategory, search, showSearch, products])
    useEffect(() => { sortProduct() }, [sortType])

    const chipClass = (active) =>
        `px-4 py-1.5 rounded-full text-xs border transition-all cursor-pointer select-none
        ${active
            ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white'
            : 'bg-transparent text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
        }`

    const categories = ['Men', 'Women', 'Kids']
    const subCategories = ['Topwear', 'Bottomwear', 'Winterwear']

    return (
        <div className='pt-10 border-t dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300'>

            {/* TOP BAR */}
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
                <div>
                    <Title text1={'ALL'} text2={'COLLECTIONS'} />
                    <p className='text-xs text-gray-400 dark:text-gray-500 mt-1'>
                        {FilterProducts.length} products
                    </p>
                </div>

                <select
                    onChange={(e) => setSortType(e.target.value)}
                    className='self-start sm:self-auto text-sm px-3 py-2 rounded-xl border 
                    border-gray-200 dark:border-gray-600 
                    bg-white dark:bg-gray-800 
                    text-gray-700 dark:text-white 
                    outline-none cursor-pointer'
                >
                    <option value="relevant">Sort by: Relevant</option>
                    <option value="low-high">Sort by: Low to High</option>
                    <option value="high-low">Sort by: High to Low</option>
                </select>
            </div>

            {/* FILTER CHIPS */}
            <div className='mb-8'>

                {/* MOBILE TOGGLE */}
                <button
                    onClick={() => setShowFilter(!showFilter)}
                    className='flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 sm:hidden'
                >
                    <img
                        src={assets.dropdown_icon}
                        className={`h-3 transition-transform dark:invert ${showFilter ? 'rotate-90' : ''}`}
                        alt=""
                    />
                    {showFilter ? 'Hide filters' : 'Show filters'}
                </button>

                <div className={`flex flex-col gap-3 ${showFilter ? 'flex' : 'hidden'} sm:flex`}>

                    {/* CATEGORY ROW */}
                    <div className='flex flex-wrap items-center gap-2'>
                        <span className='text-xs text-gray-400 dark:text-gray-500 w-16 flex-shrink-0'>
                            Category
                        </span>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => toggleCategory(cat)}
                                className={chipClass(category.includes(cat))}
                            >
                                {cat}
                            </button>
                        ))}
                        {category.length > 0 && (
                            <button
                                onClick={() => setCategory([])}
                                className='text-xs text-gray-400 dark:text-gray-500 hover:text-red-400 transition ml-1'
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    {/* TYPE ROW */}
                    <div className='flex flex-wrap items-center gap-2'>
                        <span className='text-xs text-gray-400 dark:text-gray-500 w-16 flex-shrink-0'>
                            Type
                        </span>
                        {subCategories.map(sub => (
                            <button
                                key={sub}
                                onClick={() => toggleSubCategory(sub)}
                                className={chipClass(subCategory.includes(sub))}
                            >
                                {sub}
                            </button>
                        ))}
                        {subCategory.length > 0 && (
                            <button
                                onClick={() => setSubCategory([])}
                                className='text-xs text-gray-400 dark:text-gray-500 hover:text-red-400 transition ml-1'
                            >
                                Clear
                            </button>
                        )}
                    </div>

                </div>

                {/* ACTIVE FILTER SUMMARY */}
                {(category.length > 0 || subCategory.length > 0) && (
                    <div className='flex items-center gap-2 mt-3 flex-wrap'>
                        <span className='text-xs text-gray-400 dark:text-gray-500'>Active:</span>
                        {[...category, ...subCategory].map(tag => (
                            <span
                                key={tag}
                                className='text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                            >
                                {tag}
                            </span>
                        ))}
                        <button
                            onClick={() => { setCategory([]); setSubCategory([]) }}
                            className='text-xs text-red-400 hover:text-red-500 transition ml-1'
                        >
                            Clear all
                        </button>
                    </div>
                )}
            </div>

            {/* PRODUCTS GRID */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                {FilterProducts.length > 0 ? (
                    FilterProducts.map((item, index) => (
                        <Productitem
                            key={index}
                            name={item.name}
                            id={item._id}
                            price={item.price}
                            image={item.image}
                        />
                    ))
                ) : (
                    <div className='col-span-full flex flex-col items-center justify-center py-20 gap-3'>
                        <p className='text-gray-400 dark:text-gray-500 text-sm'>
                            No products found
                        </p>
                        <button
                            onClick={() => { setCategory([]); setSubCategory([]) }}
                            className='text-xs px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition'
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Collection