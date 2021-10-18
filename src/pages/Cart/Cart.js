import React, {useState} from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux'
import { getImageProducts } from '../../utils';
import { DELETE_CART_ITEM, UPDATE_CART } from '../../constants/action-type';
import {order} from '../../services/Api'

function Cart() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState({})
    const cartItems = useSelector(state => state.cart.items)

    const totalPrice = cartItems.reduce((total, item) =>
        total + item.qty * item.price
        , 0)

    const onDeleteItem = (e, id) => {
        e.preventDefault()
        // eslint-disable-next-line no-restricted-globals
        const isConfirm = confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng")
        return isConfirm ? (
            dispatch({
                type: DELETE_CART_ITEM,
                payload: { id: id }
            })
        ) : null
    }

    const onChangeInput = (e, id) => {
        e.preventDefault()
        const value = parseInt(e.target.value);
        if (value <= 0) {
            // eslint-disable-next-line no-restricted-globals
            const isConfirm = confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng')
            if (isConfirm) {
                dispatch({
                    type: DELETE_CART_ITEM,
                    payload: {
                        id: id
                    }
                })
                return
            } else {
                return null
            }
        }
        dispatch({
            type: UPDATE_CART,
            payload: {
                id: id,
                qty: value
            }
        })
    }
    
    const onChangeOrderInputs = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const onClickOrder = (e) => {
        e.preventDefault();
        const items = cartItems.map((item) => ({prd_id:item._id,qty:item.qty}))
    
        order({
            items,
            ...inputs
        }).then(res => {
            if(res.data.status ==='success'){
                history.push('/success',{isOrderSuccess: true})
            }
            setInputs({})
        }).catch(err => {
            alert('Đã có lỗi xảy ra, xin vui lòng thử lại sau')
        })
    }

    return (
        <>
            <div id="my-cart">
                <div className="row">
                    <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">Thông tin sản phẩm</div>
                    <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">Tùy chọn</div>
                    <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
                </div>
                <form method="post">
                    {
                        cartItems.map((item) => {
                            return (
                                <div key={item._id} className="cart-item row">
                                    <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                                        <img src={getImageProducts(item?.image)} />
                                        <h4>{item.name}</h4>
                                    </div>
                                    <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                                        <input type="number" id="quantity" className="form-control form-blue quantity" value={item?.qty} onChange={(e) => onChangeInput(e, item?._id)} />
                                    </div>
                                    <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item?.price * item?.qty)}</b><a href="#" onClick={(e) => {
                                        onDeleteItem(e, item?._id)
                                    }}>Xóa</a></div>
                                </div>
                            )
                        }
                        )
                    }
                    <div className="row">
                        <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                            <button id="update-cart" className="btn btn-success" type="submit" name="sbm">Cập nhật giỏ hàng</button>
                        </div>
                        <div className="cart-total col-lg-2 col-md-2 col-sm-12"><b>Tổng cộng:</b></div>
                        <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</b></div>
                    </div>
                </form>
            </div>
            <div id="customer">
                <form method="post">
                    <div className="row">
                        <div id="customer-name" className="col-lg-4 col-md-4 col-sm-12">
                            <input
                                placeholder="Họ và tên (bắt buộc)"
                                type="text"
                                name="name"
                                value={inputs?.name}
                                onChange ={onChangeOrderInputs}
                                className="form-control"
                                required />
                        </div>
                        <div id="customer-phone" className="col-lg-4 col-md-4 col-sm-12">
                            <input
                                placeholder="Số điện thoại (bắt buộc)"
                                type="number"
                                name="phone"
                               value={inputs?.phone}
                               onChange ={onChangeOrderInputs}
                                className="form-control"
                                required />
                        </div>
                        <div id="customer-mail" className="col-lg-4 col-md-4 col-sm-12">
                            <input
                                placeholder="Email (bắt buộc)"
                                type="text"
                                name="email"
                               value={inputs?.mail}
                               onChange ={onChangeOrderInputs}
                                className="form-control"
                                required />
                        </div>
                        <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
                            <input
                                placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                                type="text"
                                name="address"
                               value={inputs?.add}
                               onChange ={onChangeOrderInputs}
                                className="form-control"
                                required />
                        </div>
                    </div>
                </form>
                <div className="row">
                    <div className="by-now col-lg-6 col-md-6 col-sm-12">
                        <a href="#" onClick={onClickOrder} >
                            <b>Mua ngay</b>
                            <span>Giao hàng tận nơi siêu tốc</span>
                        </a>
                    </div>
                    <div className="by-now col-lg-6 col-md-6 col-sm-12">
                        <a href="#">
                            <b>Trả góp Online</b>
                            <span>Vui lòng call (+84) 0988 550 553</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart
