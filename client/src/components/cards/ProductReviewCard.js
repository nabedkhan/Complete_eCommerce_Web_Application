import { Rate } from 'antd';
import React from 'react';

const ProductReviewCard = ({ review }) => {
    console.log(review);
    return (
        <div>
            <div>
                <Rate allowHalf disabled defaultValue={review.rating} />
            </div>
            <p className="my-2">{review.comment}</p>
            <hr />
        </div>
    );
};

export default ProductReviewCard;
