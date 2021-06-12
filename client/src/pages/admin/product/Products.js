import { Spin } from 'antd';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AdminDashboardNav from '../../../components/AdminDashboardNav';
import AdminProductCard from '../../../components/cards/AdminProductCard';
import useDelete from '../../../hooks/useDelete';

const Products = () => {
    const [products, setProducts] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));
    const deleteProduct = useDelete();

    // get all products from database
    const loadAllProducts = useCallback(async () => {
        try {
            const { data } = await axios.get(
                'https://complete-ecommerce-web-app.herokuapp.com/product'
            );
            setProducts(data);
        } catch (error) {
            toast.error(error.message);
        }
    }, []);

    // handle remove product
    const handleRemoveProduct = (id) => {
        if (window.confirm('Are you sure you want to remove this product?')) {
            deleteProduct({
                token: user.token,
                url: `product/${id}`,
                loadData: loadAllProducts,
            });
        }
    };

    useEffect(() => {
        loadAllProducts();
    }, [loadAllProducts]);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2 col-md-3">
                    <AdminDashboardNav />
                </div>
                <div className="col-lg-10 col-md-9">
                    <h1 className="mt-3">All Products</h1>
                    <hr className="mb-4" />
                    <div className="row">
                        {products && products.length > 0 ? (
                            products.map((product) => (
                                <AdminProductCard
                                    key={product._id}
                                    product={product}
                                    handleRemoveProduct={handleRemoveProduct}
                                />
                            ))
                        ) : (
                            <div className="col-md-12">
                                <Spin tip="Loading..." size="large" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
