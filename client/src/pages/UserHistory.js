import { Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SideBarNav from '../components/SideBarNav';
import config from '../functions/httpConfig';

const UserHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        axios
            .get('https://complete-ecommerce-web-app.herokuapp.com/order', config(user.token))
            .then(({ data }) => {
                setOrders(data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, [user.token]);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2 col-md-3">
                    <SideBarNav />
                </div>
                <div className="col-lg-8 mt-3">
                    <h1 className="text-info mb-0">Your Orders History</h1>
                    <hr />
                    {loading ? (
                        <Spin size="large" />
                    ) : (
                        <table className="table table-bordered mb-0">
                            <thead className="thead-light text-center text-uppercase">
                                <tr>
                                    <th scope="col">Order ID</th>
                                    <th scope="col">Total Amount</th>
                                    <th scope="col">Order Date</th>
                                    <th scope="col">Order Status</th>
                                    <th scope="col">Order Details</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>
                                            <h5>#{order._id}</h5>
                                        </td>
                                        <td>
                                            <h5>${order.totalAmount}</h5>
                                        </td>
                                        <td>
                                            <h5>{new Date(order.createdAt).toDateString()}</h5>
                                        </td>
                                        <td>
                                            <h4 className=" badge badge-primary p-2 mb-0">
                                                {order.status}
                                            </h4>
                                        </td>
                                        <td>
                                            <Link to={`/user/order/${order._id}`}>View Order</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserHistory;
