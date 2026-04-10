import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Productitem = ({ id, image, name, price }) => {

    const { currency } = useContext(ShopContext);

    return (
        <Link
            className='cursor-pointer text-gray-700 dark:text-gray-300'
            to={`/product/${id}`}
        >
            <div className='overflow-hidden'>
                <img
                    className='hover:scale-110 transition ease-in-out'
                    src={image[0]}
                    alt=""
                />
            </div>

            <p className='pt-3 pb-1 text-sm dark:text-white'>
                {name}
            </p>

            <p className='text-sm font-medium text-gray-700 dark:text-gray-400'>
                {currency}{price}
            </p>
        </Link>
    )
}

export default Productitem