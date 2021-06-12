import { Skeleton } from 'antd';
import React from 'react';

const LoadingCard = ({ count }) => {
    const totalCards = () => {
        const cards = [];
        for (let i = 0; i < count; i++) {
            cards.push(
                <div className="col-lg-4 col-md-6" key={i}>
                    <Skeleton active />
                </div>
            );
        }
        return cards;
    };

    return totalCards();
};

export default LoadingCard;
