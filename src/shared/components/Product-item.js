import React from 'react';
import { getImageProducts } from '../../utils/index';
import { Link } from 'react-router-dom';

const ProductItem = ({ item }) => {
   const price = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)
  
    return (
        <div className='product-item text-center card'>
             <Link to={`/product-details/${item._id}`}><img src={getImageProducts(item.image)} /></Link>
            <h4><Link to={`/product-details/${item._id}`}> {item.name} </Link> </h4>
            <p> Giá bán: <span> {price} </span></p>
          </div>
          )
}

export default ProductItem