import { Pagination } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import commonError from '../../functions/commonError';
import HomeProductCard from '../cards/HomeProductCard';
import LoadingCard from '../cards/LoadingCard';

const NewAndBestProduct = ({ url, title }) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`https://complete-ecommerce-web-app.herokuapp.com/product/${url}`)
            .then(({ data }) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                commonError(error.message);
                setLoading(false);
            });
    }, [url]);

    const handlePageChange = (page) => setCurrentPage(page);

    const indexOfLastItem = currentPage * 3;
    const indexOfFirstItem = indexOfLastItem - 3;
    const perPageProducts = products.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="row">
            <div className="col-12">
                <div className="jumbotron my-4 py-4">
                    <h1 className="text-center mb-0 text-secondary">
                        <span className=" font-weight-light">{title}</span> Products
                    </h1>
                </div>
            </div>
            {loading ? (
                <LoadingCard count={3} />
            ) : (
                perPageProducts.map((product) => (
                    <HomeProductCard key={product._id} product={product} />
                ))
            )}
            <div className="col-12">
                <div className="text-center">
                    <Pagination
                        defaultCurrent={1}
                        total={products.length}
                        defaultPageSize={3}
                        onChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewAndBestProduct;
