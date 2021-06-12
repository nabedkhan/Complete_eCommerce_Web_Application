import { Spin } from 'antd';
import React from 'react';
import HomeProductCard from '../components/cards/HomeProductCard';
import Heading from '../components/shop/Heading';
import useSameCategoryProducts from '../hooks/useSameCategoryProducts';

const Category = ({ match }) => {
    const [products, category, loading] = useSameCategoryProducts(match);

    return (
        <div className="container-fluid">
            {loading ? (
                <div className="row justify-content-center">
                    <Spin tip="Loading..." size="large" />
                </div>
            ) : (
                <div className="row">
                    <Heading
                        title={`Get ${products.length} Products in "${category.name}" Category`}
                    />
                    {products.map((product) => (
                        <HomeProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Category;
