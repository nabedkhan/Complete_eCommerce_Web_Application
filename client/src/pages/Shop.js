import { Spin } from 'antd';
import React from 'react';
import HomeProductCard from '../components/cards/HomeProductCard';
import CartDrawer from '../components/cart/CartDrawer';
import CategoryBar from '../components/shop/CategoryBar';
import Heading from '../components/shop/Heading';
import useGetProducts from '../hooks/useGetProducts';

const Shop = () => {
    const [products, categories, loading] = useGetProducts();

    return (
        <div className="container-fluid">
            <div className="row">
                <Heading title="All Products" />
                <CartDrawer />

                {loading ? (
                    <div className="col-md-12 text-center">
                        <Spin tip="Loading..." size="large" />
                    </div>
                ) : (
                    <>
                        <CategoryBar categories={categories} link="category" />

                        <div className="col-lg-12 mt-3">
                            <div className="row">
                                {products.map((product) => (
                                    <HomeProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Shop;
