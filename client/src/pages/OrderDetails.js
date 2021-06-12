import { Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import OrderDetailsCard from '../components/cards/OrderDetailsCard';
import SideBarNav from '../components/SideBarNav';
import config from '../functions/httpConfig';

const OrderDetails = ({ match }) => {
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((state) => ({ ...state }));
    useEffect(() => {
        axios
            .get(
                `https://complete-ecommerce-web-app.herokuapp.com/order/${match.params.id}`,
                config(user.token)
            )
            .then(({ data }) => {
                setOrder(data);
                setLoading(false);
            });
    }, [match.params.id, user.token]);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2 col-md-3">
                    <SideBarNav />
                </div>
                <div className="col-lg-8 mt-3">
                    <h2 className="text-info mb-0">Order No: #{match.params.id}</h2>
                    <hr />
                    {loading ? <Spin size="large" /> : <OrderDetailsCard order={order} />}
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
