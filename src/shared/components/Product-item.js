import React from 'react';
import { getImageProducts } from '../../utils/index';
import { Link } from 'react-router-dom';

const ProductItem = ({ item }) => {
  
    return (

        <div className='product-item text-center card'>
             <Link to={`/`}><img src={getImageProducts(item.image)} /></Link>
            <h4><Link to={`/`}> {item.name} </Link> </h4>
            <p> Giá bán: <span> {item.price} đ</span></p>
          </div>
          )

}

export default ProductItem