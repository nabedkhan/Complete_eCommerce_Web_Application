import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Alert } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import config from '../functions/httpConfig';
import { clearCartAction } from '../redux/actions/cartAction';

const StripeForm = ({ shipping }) => {
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    // stripe hooks
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();

    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    const totalAmount = cart.reduce((prev, curr) => prev + curr.price * curr.count, 0);

    useEffect(() => {
        axios
            .post(
                'https://complete-ecommerce-web-app.herokuapp.com/order/create-payment',
                { totalAmount },
                config(user.token)
            )
            .then(({ data }) => setClientSecret(data.clientSecret))
            .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = async (event) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : '');
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: shipping,
            },
        });

        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            // eslint-disable-next-line camelcase
            const { amount, created, id, payment_method, status } = payload.paymentIntent;
            const paymentMethod = { amount, created, id, payment_method, status };
            const products = cart.map((item) => ({
                product: item._id,
                quantity: item.count,
                price: item.price,
                color: item.color,
            }));

            await axios
                .post(
                    'https://complete-ecommerce-web-app.herokuapp.com/order/',
                    {
                        products,
                        paymentMethod,
                        totalAmount,
                        shippingAddress: shipping,
                    },
                    config(user.token)
                )
                .then(() => {
                    dispatch(clearCartAction());
                    history.push('/payment-success');
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const cardStyle = {
        style: {
            base: {
                color: '#32325d',
                fontFamily: 'Roboto, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#32325d',
                },
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
            },
        },
    };

    return (
        <div className="stripe-from">
            <form id="payment-form" onSubmit={handleSubmit}>
                <CardElement id="card-element" options={cardStyle} onChange={handleChange} />

                <button
                    type="submit"
                    className="btn-info mt-2"
                    disabled={processing || disabled}
                    id="submit"
                >
                    <span id="button-text">
                        {processing ? <div className="spinner" id="spinner" /> : 'Pay now'}
                    </span>
                </button>

                {error && <Alert message={error} type="error" className="mt-2 text-center" />}
            </form>
        </div>
    );
};

export default StripeForm;
