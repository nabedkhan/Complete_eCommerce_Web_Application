import { Drawer } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { hideDrawerAction } from '../../redux/actions/drawerAction';

const CartDrawer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { drawer, cart } = useSelector((state) => ({ ...state }));

    const handleClose = () => dispatch(hideDrawerAction());

    const handleViewCart = () => {
        history.push('/cart');
        handleClose();
    };

    return (
        drawer && (
            <Drawer title={<h4>Your Cart List</h4>} closable onClose={handleClose} visible={drawer}>
                {cart.map((item) => (
                    <div key={item._id} style={{ marginBottom: 10, border: '1px solid black' }}>
                        <img
                            src={item.images[0].url}
                            alt=""
                            width="100%"
                            height="100"
                            style={{ objectFit: 'cover' }}
                        />
                        <p className="text-center mb-0 bg-dark text-light p-1">{item.title}</p>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleViewCart}
                    className="btn btn-light bg-primary w-100"
                >
                    View Cart
                </button>
            </Drawer>
        )
    );
};

export default CartDrawer;
