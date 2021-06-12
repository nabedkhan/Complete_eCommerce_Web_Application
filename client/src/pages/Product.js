import { Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import ProductDetails from '../components/productDetails/ProductDetails';

const Product = ({ match }) => {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`https://complete-ecommerce-web-app.herokuapp.com/product/${match.params.slug}`)
            .then(({ data }) => {
                setProduct(data);
                setLoading(false);
            });
    }, [match.params.slug]);

    return (
        <div className="container-fluid mt-5">
            {loading ? (
                <div className="row justify-content-center">
                    <Spin tip="Loading..." size="large" />
                </div>
            ) : (
                <ProductDetails product={product} />
            )}
            <Footer />
        </div>
    );
};

export default Product;
