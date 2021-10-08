import React, { useEffect, useState } from 'react';
import ProductItem from '../../shared/components/Product-item'
import { getProducts} from '../../services/Api';
import Pagination from '../../shared/components/Pagination';


function Search(props) {
  const querry= new  URLSearchParams(props.location.search);
  const keyword= querry.get('q')
  const page= querry.get('page') ||1
  const [products, setProducts] = useState(null);
  const [pages, setPages] = useState({
   total: 0,
    limit: 12,
    currentPage: page
    
  })
  useEffect(()=> {
      getProducts({
        params: {
          name: keyword,
          limit: 12,
          page: page
        }
      }).then(res => {
        setProducts(res.data.data.docs)
        setPages({...pages, ...res.data.data.pages})
      })
  }, [keyword, page])

    return (
       <>
  <div className="products">
    <div id="search-result">Kết quả tìm kiếm với sản phẩm <span>{keyword}</span></div>
    <div className="product-list card-deck">

      {
        products?.length > 0 ? products?.map((product,index) => {
          return <ProductItem key={index} item={product} />
        }) :<h2>Không tim thấy sản phẩm nào</h2>
      }
      
    </div>
  
  </div>
  {/*	End List Product	*/}
  <div id="pagination">
      <Pagination pages={pages} />
  </div>
</>

    
    )
}

export default Search
