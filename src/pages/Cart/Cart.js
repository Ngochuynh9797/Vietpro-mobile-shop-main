import React from 'react'

function Cart() {
    return (
        <div id="my-cart">
            <div className="row">
                <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">Thông tin sản phẩm</div>
                <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">Tùy chọn</div>
                <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
            </div>
            <form method="post">
                <div className="cart-item row">
                    <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                        <img src="images/product-1.png" />
                        <h4>iPhone Xs Max 2 Sim - 256GB Gold</h4>
                    </div>
                    <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                        <input type="number" id="quantity" className="form-control form-blue quantity" defaultValue={1} min={1} />
                    </div>
                    <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>32.990.000đ</b><a href="#">Xóa</a></div>
                </div>
                <div className="cart-item row">
                    <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                        <img src="images/product-2.png" />
                        <h4>iPhone Xs Max 2 Sim - 256GB Gold</h4>
                    </div>
                    <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                        <input type="number" id="quantity" className="form-control form-blue quantity" defaultValue={1} min={1} />
                    </div>
                    <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>32.990.000đ</b><a href="#">Xóa</a></div>
                </div>
                <div className="cart-item row">
                    <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                        <img src="images/product-3.png" />
                        <h4>iPhone Xs Max 2 Sim - 256GB Gold</h4>
                    </div>
                    <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                        <input type="number" id="quantity" className="form-control form-blue quantity" defaultValue={1} min={1} />
                    </div>
                    <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>32.990.000đ</b><a href="#">Xóa</a></div>
                </div>
                <div className="cart-item row">
                    <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                        <img src="images/product-4.png" />
                        <h4>iPhone Xs Max 2 Sim - 256GB Gold</h4>
                    </div>
                    <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                        <input type="number" id="quantity" className="form-control form-blue quantity" defaultValue={1} min={1} />
                    </div>
                    <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>32.990.000đ</b><a href="#">Xóa</a></div>
                </div>
                <div className="cart-item row">
                    <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                        <img src="images/product-5.png" />
                        <h4>iPhone Xs Max 2 Sim - 256GB Gold</h4>
                    </div>
                    <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                        <input type="number" id="quantity" className="form-control form-blue quantity" defaultValue={1} min={1} />
                    </div>
                    <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>32.990.000đ</b><a href="#">Xóa</a></div>
                </div>
                <div className="row">
                    <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                        <button id="update-cart" className="btn btn-success" type="submit" name="sbm">Cập nhật giỏ hàng</button>
                    </div>
                    <div className="cart-total col-lg-2 col-md-2 col-sm-12"><b>Tổng cộng:</b></div>
                    <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>88.970.000đ</b></div>
                </div>
            </form>
        </div>

    )
}

export default Cart
