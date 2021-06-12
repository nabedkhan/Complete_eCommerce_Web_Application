import { ShoppingCartOutlined } from '@ant-design/icons';
import { Card, Carousel, Tabs } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { addToCartAction } from '../../redux/actions/cartAction';
import ProductReviewCard from '../cards/ProductReviewCard';
import RatingModal from '../RatingModal';
import RelatedProducts from './RelatedProducts';

const ProductDetails = ({ product }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [relatedProduct, setRelatedProduct] = useState([]);
    const {
        _id,
        title,
        description,
        price,
        images,
        category,
        subcategory,
        brand,
        quantity,
        color,
        reviews,
    } = product;

    useEffect(() => {
        // get related product by help of category id
        axios
            .get(
                `https://complete-ecommerce-web-app.herokuapp.com/product/related/${product.category._id}`
            )
            .then(({ data }) => {
                setRelatedProduct(data.filter((item) => item._id !== _id));
            });
    }, [_id, product.category._id]);

    // handle add to cart
    const handleClick = () => dispatch(addToCartAction(product));

    return (
        <div className="row">
            <div className="col-md-6">
                <RatingModal visible={!!location.state} slug={product.slug} />
                <Card>
                    <Carousel autoPlay>
                        {images.map((image) => (
                            <img src={image.url} alt="slide-1" key={image.public_id} />
                        ))}
                    </Carousel>
                </Card>
                <Tabs type="card" className="mt-4">
                    <Tabs.TabPane tab="About This Product" key="1">
                        <ul>
                            {description.split(',').map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="More" key="2">
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis
                            laboriosam saepe molestias excepturi esse ipsum distinctio commodi
                            consequuntur repellendus hic
                        </p>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Reviews" key="3">
                        <h4>Product Reviews</h4>
                        <hr />
                        {reviews.map((review) => (
                            <ProductReviewCard key={review._id} review={review} />
                        ))}
                    </Tabs.TabPane>
                </Tabs>
            </div>
            <div className="col-lg-5 col-md-6">
                <Card
                    actions={[
                        <div onClick={handleClick}>
                            <ShoppingCartOutlined style={{ fontSize: 20 }} />
                            <h6 className="d-inline ml-2">Add To Cart</h6>
                        </div>,
                    ]}
                >
                    <Card.Meta
                        title={<h2 className="mb-0 text-info">{title}</h2>}
                        description={<h5 className="font-weight-light">{description}</h5>}
                    />
                    <ul className="list-group">
                        <li className="list-group-item px-0">
                            <h5 className="mb-0 text-secondary">Price: ${price}</h5>
                        </li>
                        <li className="list-group-item px-0">
                            <h5 className="mb-0 text-secondary">Color: {color}</h5>
                        </li>
                        <li className="list-group-item px-0">
                            <h5 className="mb-0 text-secondary">Brand: {brand.toUpperCase()}</h5>
                        </li>
                        <li className="list-group-item px-0">
                            <h5 className="mb-0 text-secondary">
                                Category:{' '}
                                <Link to={`/category/${category.slug}`}>{category.name}</Link>
                            </h5>
                        </li>
                        <li className="list-group-item px-0">
                            <h5 className="mb-0 text-secondary">
                                Sub-Category:{' '}
                                <Link to={`/subcategory/${subcategory.slug}`}>
                                    {subcategory.name}
                                </Link>
                            </h5>
                        </li>
                        <li className="list-group-item px-0">
                            <h5 className="mb-0 text-secondary">
                                Available: {quantity > 0 ? 'Stock Available' : 'Out Of Stock'}
                            </h5>
                        </li>
                    </ul>
                </Card>
            </div>

            {relatedProduct.length > 0 && <RelatedProducts products={relatedProduct} />}
        </div>
    );
};

export default ProductDetails;
