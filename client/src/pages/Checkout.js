import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import StripeForm from '../components/StripeForm';
// stripe promise
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Checkout = () => {
    const { cart } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const totalAmount = cart.reduce((prev, curr) => prev + curr.count * curr.price, 0);

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                <div className="offset-xl-1 col-xl-4 col-lg-6 col-md-7">
                    <h2 className="mb-0">Shipping Information</h2>
                    <hr />
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <input
                        type="email"
                        className="form-control mb-3"
                        placeholder="Email address"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Phone number"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                    />
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Billing address, street no, city"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                    />
                    <div className="mt-5">
                        <h2 className="mb-0">Cart Products</h2>
                        <hr />

                        <table className="table table-bordered">
                            <thead className="thead-light text-center">
                                <tr>
                                    <th scope="col">Image</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {cart.map((item) => (
                                    <tr key={item._id}>
                                        <td width="100">
                                            <img src={item.images[0].url} width="50" alt="" />
                                        </td>
                                        <td>{item.title}</td>
                                        <td width="100">${item.price}</td>
                                        <td width="100">{item.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="offset-xl-1 col-xl-3 col-lg-6 col-md-5">
                    <h2>Order Summery</h2>
                    <hr />
                    <h5 className="mb-0">Total Products: {cart.length}</h5>
                    <hr />
                    <h5 className="mb-0">Total Amount: ${totalAmount}</h5>
                    <hr />
                    <div className="bordered mt-5 pt-3">
                        <h3 className="mb-0 text-info">Payment Method</h3>
                        <hr className="my-1 mb-3" />
                        <Elements stripe={promise}>
                            <StripeForm shipping={{ name, email, phone, address }} />
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
