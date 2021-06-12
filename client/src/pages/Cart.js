import { CreditCardOutlined } from '@ant-design/icons';
import { List } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartPageTable from '../components/cart/CartPageTable';
import EmptyCart from '../components/cart/EmptyCart';

const Cart = ({ history }) => {
    const { cart, user } = useSelector((state) => ({ ...state }));
    const totalPrice = cart.reduce((prev, curr) => prev + curr.price * curr.count, 0);

    if (cart.length === 0) {
        return <EmptyCart />;
    }

    const handleCheckout = () => {
        history.push('/checkout');
    };

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                <div className="col-xl-9 col-lg-8 col-md-12">
                    <h3 className="text-primary">Your Cart List</h3>
                    <hr />
                    <CartPageTable cart={cart} />
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6">
                    <div className="px-2">
                        <h3 className="mb-0 text-warning">Order Summery</h3>
                        <hr />
                        <List
                            size="large"
                            bordered={false}
                            dataSource={cart}
                            renderItem={(item) => (
                                <List.Item className="text-dark px-0">
                                    <p className="mb-0">
                                        {item.title} x {item.count}
                                    </p>
                                    <h6 className="text-info mb-0">${item.price * item.count}</h6>
                                </List.Item>
                            )}
                        />
                        <hr />
                        <h5>
                            Total Amount:
                            <span className="float-right">${totalPrice}</span>
                        </h5>
                        <div className="mt-5 pt-4">
                            {user && user.email ? (
                                <button
                                    type="button"
                                    className="btn btn-primary w-100 bg-light py-3"
                                    onClick={handleCheckout}
                                >
                                    <div className="d-flex justify-content-center align-items-center">
                                        <CreditCardOutlined style={{ fontSize: 18 }} />
                                        <p className="mb-0 ml-2">Proceed To Checkout</p>
                                    </div>
                                </button>
                            ) : (
                                <Link
                                    to={{ pathname: '/login', state: { from: 'cart' } }}
                                    className="btn btn-secondary w-100 bg-light py-3"
                                >
                                    Login To Checkout
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
