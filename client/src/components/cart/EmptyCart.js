import React from 'react';
import { Link } from 'react-router-dom';

const EmptyCart = () => (
    <div className="container-fluid mt-3">
        <div className="row">
            <div className="col-md-4">
                <div className="card card-body ">
                    <h4 className="text-warning">Your cart is empty</h4>
                    <p>
                        You want to shopping? <Link to="/shop">Go to Shop</Link>
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export default EmptyCart;
