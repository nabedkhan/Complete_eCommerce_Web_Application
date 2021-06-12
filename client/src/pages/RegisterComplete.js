import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { auth } from '../firebase/firebase';
import config from '../functions/httpConfig';
import { userLoginAction } from '../redux/actions/userAction';

const RegisterComplete = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        setEmail(localStorage.getItem('emailForRegister'));
    }, []);

    // send data in server
    const postDataInServer = async (token) =>
        axios.post('https://complete-ecommerce-web-app.herokuapp.com/auth/user', {}, config(token));

    // fetch data from Firebase
    const fetchData = async () => {
        try {
            const { user } = await auth().signInWithEmailLink(email, window.location.href);
            if (user.emailVerified) {
                localStorage.removeItem('emailForRegister');
                // get current logged in user
                const userCurrent = auth().currentUser;
                // set password for login
                await userCurrent.updatePassword(password);
                // get token from firebase
                const { token } = await userCurrent.getIdTokenResult();
                // get user data from server
                const { data } = await postDataInServer(token);

                dispatch(userLoginAction(data, token));

                // redirect to homepage
                history.push('/');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // form submit handler
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Email or Password is required!');
            return;
        }
        if (password.length < 6) {
            toast.error('Password at least 6 characters required');
            return;
        }

        fetchData();
    };

    return (
        <div className="container p-5 my-5">
            <div className="row">
                <div className="col-md-8 col-sm-12 offset-md-2">
                    <div className="card p-5">
                        <h3 className="mb-4">Complete Registration</h3>
                        <form onSubmit={handleSubmit} className="mb-0">
                            <input
                                type="email"
                                className="form-control p-2 mb-3"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={email !== ''}
                            />
                            <input
                                type="password"
                                className="form-control p-2"
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit" className="btn btn-raised btn-primary mt-4">
                                Complete Registration
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterComplete;
