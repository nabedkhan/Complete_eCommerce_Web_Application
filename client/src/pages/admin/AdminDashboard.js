import { Select, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from 'react-toastify';
import AdminDashboardNav from '../../components/AdminDashboardNav';
import config from '../../functions/httpConfig';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((state) => ({ ...state }));

    // get all products from database
    const loadAllOrders = async () => {
        try {
            const { data } = await axios.get(
                'https://complete-ecommerce-web-app.herokuapp.com/order/admin',
                config(user.token)
            );

            setOrders(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadAllOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const changeStatus = async (value, id) => {
        try {
            await axios.put(
                `https://complete-ecommerce-web-app.herokuapp.com/order/admin/${id}`,
                { value },
                config(user.token)
            );
            toast.success('Status updated successfully');
        } catch (error) {
            toast.error(error.response.data?.error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminDashboardNav />
                </div>
                <div className="col-md-9 mt-4">
                    <h2>All Orders Table List</h2>
                    <hr />
                    {loading ? (
                        <Spin size="large" />
                    ) : (
                        <table className="table table-bordered mb-0">
                            <thead className="thead-light text-center text-uppercase">
                                <tr>
                                    <th>Order ID</th>
                                    <th>Total Amount</th>
                                    <th>Order Date</th>
                                    <th>Order Status</th>
                                    <th>Order Details</th>
                                    <th>Payment Method</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {orders.map((item) => (
                                    <tr key={item._id}>
                                        <td>#{item._id}</td>
                                        <td>${item.totalAmount}</td>
                                        <td>{new Date(item.createdAt).toDateString()}</td>
                                        <td>
                                            <Select
                                                bordered={false}
                                                defaultValue={item.status}
                                                onChange={(value) => changeStatus(value, item._id)}
                                            >
                                                <Select.Option value="processing">
                                                    Processing
                                                </Select.Option>
                                                <Select.Option value="processed">
                                                    Processed
                                                </Select.Option>
                                                <Select.Option value="completed">
                                                    Completed
                                                </Select.Option>
                                            </Select>
                                        </td>
                                        <td>
                                            <Link to={`/user/order/${item._id}`}>View Order</Link>
                                        </td>
                                        <td>
                                            <ul className="list-group list-group-flush p-0">
                                                <li className="list-group-item p-1">
                                                    Payment ID: {item.paymentMethod.id}
                                                </li>
                                                <li className="list-group-item p-1">
                                                    Amount: ${item.paymentMethod.amount / 100}
                                                </li>
                                                <li className="list-group-item p-1">
                                                    Date:{' '}
                                                    {new Date(
                                                        item.paymentMethod.created
                                                    ).toDateString()}
                                                </li>
                                            </ul>
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
export default AdminDashboard;
