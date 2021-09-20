import React, {useState, useEffect} from 'react';
import { getCategory, getCategoryProducts} from '../../services/Api'
import ProductItem from '../../shared/components/Product-item'

function Category(props) {

    const id = props.match.params.id;
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [totalProduct, setTotalProduct] = useState(0);

    useEffect(()=>{
        getCategory(id).then(res=> {
            setCategory(res.data.data)
           
        }).catch(err => console.log(err));
        getCategoryProducts(id).then(res => {
            setProducts(res.data.data.docs);
            setTotalProduct(res.data.data.docs.length)
        }).catch(err => console.log(err))
        
    }, [id])

    return (
        <>
            <div>
                <div className="products">
                    <h3>{`${category.name} hiện có ${totalProduct} sản phẩm`}</h3>
                    <div className="product-list card-deck">

                        {
                            products.map((product, index) => {
                               return  <ProductItem key={index} item={product} />
                            })
                        }
                        
                    </div>
                   
                    
                </div>
                {/*	End List Product	*/}
                <div id="pagination">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#">Trang trước</a></li>
                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">Trang sau</a></li>
                    </ul>
                </div>
            </div>

        </>
    )
}

export default Category
