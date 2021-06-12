import { DeleteOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AdminDashboardNav from '../../components/AdminDashboardNav';
import config from '../../functions/httpConfig';
import useCreate from '../../hooks/useCreate';
import useDelete from '../../hooks/useDelete';

const Coupon = () => {
    const [name, setName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [discount, setDiscount] = useState('');
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((state) => ({ ...state }));
    // custom create hooks
    const createNewCoupon = useCreate();
    const deleteCoupon = useDelete();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const loadData = async () => {
        try {
            const { data } = await axios.get(
                `https://complete-ecommerce-web-app.herokuapp.com/coupon`,
                config(user.token)
            );
            setCoupons(data);
            setLoading(false);
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, expiryDate, discount };
        // argument is data, headers token, url route
        createNewCoupon({
            data,
            token: user.token,
            url: 'coupon',
            loadData,
        });
    };
    const handleDelete = (id) => {
        // argument is token, route
        deleteCoupon({
            token: user.token,
            url: `coupon/${id}`,
            loadData,
        });
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminDashboardNav />
                </div>
                <div className="col-lg-5">
                    <h1 className="mt-3">Create a new coupon</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Enter coupon name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                        <input
                            type="date"
                            className="form-control mb-3"
                            placeholder="Coupon expiry date"
                            onChange={(e) => setExpiryDate(e.target.value)}
                            value={expiryDate}
                            required
                        />
                        <input
                            type="number"
                            min="1"
                            className="form-control mb-3"
                            placeholder="Discount amount"
                            onChange={(e) => setDiscount(e.target.value)}
                            value={discount}
                            required
                        />
                        <button type="submit" className="btn btn-raised btn-primary mt-3">
                            Create
                        </button>
                    </form>

                    <h3>All Coupon List</h3>
                    <hr />

                    {loading ? (
                        <Spin tip="Loading..." size="large" />
                    ) : (
                        <table className="table table-bordered">
                            <thead className="thead-light text-center text-uppercase">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Expiry Date</th>
                                    <th scope="col">Discount</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {coupons.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.name}</td>
                                        <td>{item.expiryDate.substring(0, 10)}</td>
                                        <td>{item.discount}</td>
                                        <td>
                                            <DeleteOutlined
                                                className="text-danger pr-4"
                                                onClick={() => handleDelete(item._id)}
                                            />
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
export default Coupon;
