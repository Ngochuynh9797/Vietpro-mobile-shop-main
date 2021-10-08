import React, {useState, useEffect} from 'react';
import {getProduct, getProductComments, createProductComment} from '../../services/Api'
import {getImageProducts} from '../../utils/index'
import moment from 'moment'
import { ADD_TO_CART } from '../../constants/action-type';
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'

function ProductDetails(props) {
    const id = props.match.params.id;
    const [product, setProduct] = useState(null);
    const [comments, setComments] = useState(null);
    const [com_input, setCom_input] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory()
    
    useEffect(() => {
        getProduct({}, id)
        .then( res => setProduct(res.data.data)
       )
        .catch( err => console.log(err))

        getProductComments({}, id)
        .then(res => {
            setComments(res.data.data.docs)
        
        })
        .catch(err => console.log(err))
    }, [id])

    const handleInputs = (e) => {
        const {name, value} = e.target
        setCom_input({...com_input, [name]: value})
    }

    const hanldeSubmits = ( e) => {
        e.preventDefault()
        if(com_input.content.length < 15){
            alert("Bình luận phải dài ít nhất 15 ký tự")
            return
        }
        createProductComment(id, com_input,{})
        .then(res => {
            if(res.data.status ==='success'){
                setCom_input({})
            getProductComments({}, id)
            .then(res => {
                setComments(res.data.data.docs)
            })       
            } 
        })
        .catch(res => {
            alert('đã có lỗi xảy ra, xin vui lòng thử lại sau')
        })
    }

    const addToCart = (type) => {
        if(product) {
            const {_id, name, image, price} = product;
            dispatch({
                type: ADD_TO_CART,
                payload: {
                    _id,
                    name, 
                    image, 
                    price, 
                    qty:1
                }
            })
        }
        if(type==='buy-now') history.push('/cart')
    }
    return (
        <div>
            <div id="product">
                <div id="product-head" className="row">
                    <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
                        <img src={product?.image && getImageProducts(product?.image)} />
                    </div>
                    <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
                        <h1>{product?.name}</h1>
                        <ul>
                            <li><span>Bảo hành:</span> 12 Tháng</li>
                            <li><span>Đi kèm:</span> {product?.accessories}</li>
                            <li><span>Tình trạng:</span> {product?.status}</li>
                            <li id='product_promotion'><span>Khuyến Mại:</span> {product?.promotion}</li>
                            <li id="price">Giá Bán (chưa bao gồm VAT)</li>
                            <li id="price-number">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product?.price)}</li>
                            <li id="status">{product?.is_stock?'Còn hàng':'Hết hàng'}</li>
                        </ul>

                        {
                            product?.is_stock?(
                                <div id="add-cart">
                                <button 
                                className='btn btn-warning mr-2'
                                onClick={()=>addToCart('buy-now')}
                                >Mua ngay</button>
                                <button className='btn btn-info' onClick={() => addToCart('')}>Thêm vào giỏ hàng</button>
                            </div>
                            ):null
                        }
                       
                    </div>
                </div>
                <div id="product-body" className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <h3>Đánh giá về {product?.name}</h3>
                       <p>{product?.details} </p>
                      
                    </div>
                </div>
                {/*	Comment	*/}
                <div id="comment" className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <h3>Bình luận sản phẩm</h3>
                        <form method='post'  >
                            <div className="form-group">
                                <label>Tên:</label>
                                <input name="name" required type="text" className="form-control"  onChange={handleInputs} value={com_input?.name||''}/>
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input name="email" required type="email" className="form-control" id="pwd"  onChange={handleInputs} value={com_input?.email||''}/>
                            </div>
                            <div className="form-group">
                                <label>Nội dung:</label>
                                <textarea name="content" required rows={8} className="form-control"  onChange={handleInputs} value={com_input?.content||''}/>
                            </div>
                            <button type="submit" name="sbm" className="btn btn-primary" onClick={hanldeSubmits}>Gửi</button>
                        </form>
                    </div>
                </div>
                {/*	End Comment	*/}
                {/*	Comments List	*/}
                {

               comments?.length && (
                <div id="comments-list" className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        {
                            comments.map((comment)=>{
                                const m = moment(comment.createdAt)
                                return  <div key={comment._id} className="comment-item">
                                <ul>
                                    <li><b>{comment.name}</b></li>
                                    <li>{m.fromNow()}</li>
                                    <li>
                                        <p>{comment.content}</p>
                                    </li>
                                </ul>
                            </div>
                            })
                        }
                        
                    </div>
                </div> )
                 }
                {/*	End Comments List	*/}
            </div>
            {/*	End Product	*/}
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

    )
}

export default ProductDetails
