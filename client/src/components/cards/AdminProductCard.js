import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemoveProduct }) => {
    const { _id, title, description, images, slug } = product;

    return (
        <div className="col-lg-4 col-md-6">
            <Card
                cover={
                    <img
                        alt="example"
                        src={images.length > 0 ? images[0].url : ''}
                        className="p-4"
                    />
                }
                actions={[
                    <DeleteOutlined
                        style={{ fontSize: '18px' }}
                        onClick={() => handleRemoveProduct(_id)}
                    />,
                    <Link to={`/admin/products/${slug}`}>
                        <EditOutlined style={{ fontSize: '18px' }} />
                    </Link>,
                ]}
            >
                <Meta title={title} description={`${description.substring(0, 100)}...`} />
            </Card>
        </div>
    );
};

export default AdminProductCard;
