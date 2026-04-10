import React, { useEffect, useState, useContext } from 'react'
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location]);

    return showSearch && visible ? (
        <div className='border-t border-b bg-gray-50 dark:bg-gray-900 text-center dark:border-gray-700'>

            <div className='inline-flex items-center justify-center border border-gray-400 dark:border-gray-600 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>

                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='flex-1 outline-none bg-inherit text-sm text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500'
                    type="text"
                    placeholder='Search'
                />

                <img
                    className='w-4 dark:invert'
                    src={assets.search_icon}
                    alt=""
                />
            </div>

            <img
                onClick={() => setShowSearch(false)}
                className='inline w-3 cursor-pointer dark:invert'
                src={assets.cross_icon}
                alt=""
            />

        </div>
    ) : null
}

export default SearchBar