import { Modal, Rate } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import config from '../functions/httpConfig';

const RatingModal = ({ visible, slug }) => {
    const [isModalVisible, setIsModalVisible] = useState(visible);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const { user } = useSelector((state) => ({ ...state }));

    const handleOk = async () => {
        await axios
            .put(
                `https://complete-ecommerce-web-app.herokuapp.com/product/${slug}/rating`,
                { rating, comment },
                config(user.token)
            )
            .then(({ data }) => toast.success(data.message))
            .catch((err) => toast.error(err.response.data.error));
        setIsModalVisible(false);
    };

    const handleCancel = () => setIsModalVisible(false);

    return (
        <Modal
            title="Write comment about product"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Rate onChange={(value) => setRating(value)} value={rating} className="mb-2" />
            <TextArea rows={4} onChange={(e) => setComment(e.target.value)} value={comment} />
        </Modal>
    );
};

export default RatingModal;
