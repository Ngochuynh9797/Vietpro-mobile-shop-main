import React, {useState, useEffect} from 'react';
import ProductItem from '../../shared/components/Product-item';
import {getProducts} from '../../services/Api';

function Home() {
    const [latestProduct, setLatestProduct] = useState([]);
    const [featuredProduct, setFeaturedProduct] = useState([]);

    useEffect(() => {
        getProducts({
            params: {
                limit: 6     
            }
        }).then((res) => {
            setLatestProduct(res?.data?.data?.docs);    
        })
        getProducts({
            params: {
                limit: 6,
                "filter[is_featured]": true,     
            }
        }).then((res)=> {
            setFeaturedProduct(res?.data?.data?.docs)
        })
    }, [])
   
    return (
        <>
            <div>
                <div className="products">
                    <h3>Sản phẩm nổi bật</h3>
                    <div className="product-list card-deck">
                        {
                            featuredProduct && featuredProduct.map((product)=> 
                            <ProductItem key={product._id} item={product} />
                           )
                        } 
                    </div>
                </div>
                {/*	End Feature Product	*/}
                {/*	Latest Product	*/}
                <div className="products">
                    <h3>Sản phẩm mới</h3>
                    <div className="product-list card-deck">
                    {
                           latestProduct && latestProduct.map((product)=> 
                            <ProductItem key={product._id} item={product} />
                           )
                        }
                    </div>  
                </div>
            </div>

        </>
    )
}

export default Home
