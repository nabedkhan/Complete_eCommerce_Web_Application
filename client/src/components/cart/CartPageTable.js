import { DeleteOutlined } from '@ant-design/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCartAction, updateCartQuantityAction } from '../../redux/actions/cartAction';

const CartPageTable = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => ({ ...state }));
    // remove a single product from cart
    const removeProduct = (id) => {
        const newCart = cart.filter((item) => item._id !== id);
        dispatch(removeFromCartAction(newCart));
    };
    // handle change quantity
    const handleChange = (value, id) => {
        const newCart = cart.map((item) =>
            item._id === id ? { ...item, count: Number(value) } : item
        );
        dispatch(updateCartQuantityAction(newCart));
    };

    return (
        <table className="table table-bordered">
            <thead className="thead-light text-center text-uppercase">
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Color</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Remove</th>
                </tr>
            </thead>
            <tbody className="text-center">
                {cart.map((item) => (
                    <tr key={item._id}>
                        <td>
                            <img src={item.images[0].url} width="100" alt="" />
                        </td>
                        <td>{item.title}</td>
                        <td>${item.price}</td>
                        <td>{item.brand}</td>
                        <td>{item.color}</td>
                        <td style={{ width: 100 }}>
                            <input
                                type="number"
                                min="1"
                                className="form-control"
                                onChange={(e) => handleChange(e.target.value, item._id)}
                                defaultValue={item.count}
                                style={{ textAlign: 'center' }}
                            />
                        </td>
                        <td style={{ width: 100 }}>
                            <button
                                type="button"
                                className="btn"
                                onClick={() => removeProduct(item._id)}
                            >
                                <DeleteOutlined className="text-danger" style={{ fontSize: 24 }} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CartPageTable;
