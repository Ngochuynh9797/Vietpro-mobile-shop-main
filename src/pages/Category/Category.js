import React, { useState, useEffect } from 'react'
import { getCategory, getCategoryProducts } from '../../services/Api'
import ProductItem from '../../shared/components/Product-item'
import Pagination from '../../shared/components/Pagination'

function Category(props) {
    const querry = new URLSearchParams(props.location.search);
    const page = querry.get('page') || 1
    const id = props.match.params.id;
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [totalProduct, setTotalProduct] = useState(0);
    const [pages, setPages] = useState({
        limit: 12
    })

    useEffect(() => {
        getCategory(id).then(res => {
            setCategory(res.data.data)

        }).catch(err => console.log(err));
        getCategoryProducts(id, {
            params: {
                limit: 12,
                page: page
            }
        }).then(res => {
            setProducts(res.data.data.docs);
            setTotalProduct(res.data.data.items.total)
            setPages({ ...pages, ...res.data.data.pages })
        }).catch(err => console.log(err))

    }, [id, page])

    return (
        <>
            <div>
                <div className="products">
                    <h3>{`${category.name} hiện có ${totalProduct} sản phẩm`}</h3>
                    <div className="product-list card-deck">
                        {
                            products.map((product, index) => {
                                return <ProductItem key={index} item={product} />
                            })
                        }
                    </div>
                </div>
                {/*	End List Product	*/}
                <div id="pagination">
                    <ul className="pagination">
                        <Pagination pages={pages} />
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Category
