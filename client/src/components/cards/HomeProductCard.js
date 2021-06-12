import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card, Rate } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCartAction } from '../../redux/actions/cartAction';
import { showDrawerAction } from '../../redux/actions/drawerAction';

const HomeProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const { title, price, description, images, slug, reviews } = product;
    const totalRating = reviews.reduce((prev, next) => prev + next.rating, 0);
    const avgRating = totalRating / reviews.length;
    // const {user, cart} = useSelector(state => ({ ...state }));
    // handle add to cart
    const handleClick = () => {
        dispatch(addToCartAction(product));
        dispatch(showDrawerAction());
    };

    return (
        <div className="col-lg-4 col-md-6 mb-5">
            <Card
                cover={
                    <img
                        alt="example"
                        src={images.length > 0 ? images[0].url : ''}
                        className="p-4"
                        style={{ height: '300px', objectFit: 'cover' }}
                    />
                }
                actions={[
                    <Link to={`/products/${slug}`}>
                        <EyeOutlined style={{ fontSize: '18px' }} />
                        <h6>View Product</h6>
                    </Link>,
                    <div onClick={handleClick}>
                        <ShoppingCartOutlined style={{ fontSize: '18px' }} />
                        <h6>Add To Cart</h6>
                    </div>,
                ]}
            >
                <Card.Meta
                    style={{ padding: '10px' }}
                    title={
                        <div className="d-flex justify-content-between flex-wrap">
                            <h3 className="mb-0">{title}</h3>
                            <h3 className="mb-0">${price}</h3>
                        </div>
                    }
                    description={
                        <>
                            <h6 className="font-weight-light">
                                {`${description.substring(0, 100)}...`}
                            </h6>
                            <Rate allowHalf disabled defaultValue={avgRating} />
                            <h6 className="mb-0 d-inline ml-2">({reviews.length})</h6>
                        </>
                    }
                />
            </Card>
        </div>
    );
};

export default HomeProductCard;
