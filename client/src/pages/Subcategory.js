import { Spin } from 'antd';
import React from 'react';
import HomeProductCard from '../components/cards/HomeProductCard';
import Heading from '../components/shop/Heading';
import useSubCategoryProducts from '../hooks/useSubCategoryProducts';

const Subcategory = ({ match }) => {
    const [products, subcategory, loading] = useSubCategoryProducts(match);

    return (
        <div className="container-fluid">
            {loading ? (
                <div className="row justify-content-center">
                    <Spin tip="Loading..." size="large" />
                </div>
            ) : (
                <div className="row">
                    <Heading
                        title={`Get ${products.length} Products in "${subcategory.name}" Subcategory`}
                    />
                    {products.map((product) => (
                        <HomeProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Subcategory;
