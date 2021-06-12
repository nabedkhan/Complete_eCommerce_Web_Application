import { CheckCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => (
    <div className="container-fluid mt-5">
        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <div className="payment">
                    <div className="payment_header bg-info p-3 text-center">
                        <CheckCircleOutlined style={{ fontSize: 40, color: '#fff' }} />
                    </div>
                    <div className="content p-4 text-center">
                        <h2>Payment Success !</h2>
                        <p>Your order has been successfully. Go to you order history page</p>
                        <Link to="/user/history" className="btn btn-info">
                            Go to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default PaymentSuccess;
