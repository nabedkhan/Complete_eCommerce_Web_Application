import React from 'react';
import HomeProductCard from '../cards/HomeProductCard';

const RelatedProducts = ({ products }) => (
    <div className="col-md-12 mt-5">
        <hr />
        <h1 className="text-center">Related Products</h1>
        <hr />
        <div className="row my-5">
            {products.map((product) => (
                <HomeProductCard product={product} key={product._id} />
            ))}
        </div>
    </div>
);

export default RelatedProducts;
