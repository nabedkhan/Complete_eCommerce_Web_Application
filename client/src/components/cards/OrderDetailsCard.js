import React from 'react';
import { Link } from 'react-router-dom';

const OrderDetailsCard = ({ order }) => (
    <table className="table table-bordered mb-0">
        <thead className="thead-light text-center text-uppercase">
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Brand</th>
                <th scope="col">Color</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">View Product</th>
            </tr>
        </thead>
        <tbody className="text-center">
            {order &&
                order.products.map((product) => (
                    <tr key={product._id}>
                        <td>
                            <h5>{product.product.title}</h5>
                        </td>
                        <td>
                            <h5>{product.product.brand}</h5>
                        </td>
                        <td>
                            <h5>{product.color}</h5>
                        </td>
                        <td>
                            <h4>${product.price}</h4>
                        </td>
                        <td>
                            <h4>{product.quantity}</h4>
                        </td>
                        <td>
                            <Link
                                to={{
                                    pathname: `/products/${product.product.slug}`,
                                    state: 'order',
                                }}
                            >
                                View
                            </Link>
                        </td>
                    </tr>
                ))}
        </tbody>
    </table>
);

export default OrderDetailsCard;
