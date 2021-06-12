import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../firebase/firebase';
import config from '../functions/httpConfig';
import { userLoginAction } from '../redux/actions/userAction';

const Login = ({ history, location }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user && user.email) {
            history.push('/');
        }
    }, [history, user]);

    // send data in server
    const postDataInServer = async (token) =>
        axios.post('https://complete-ecommerce-web-app.herokuapp.com/auth/user', {}, config(token));

    const redirectPage = (data) => {
        const { from } = location.state || {
            from: { pathname: data.role === 'admin' ? '/admin/dashboard' : '/' },
        };
        history.replace(from);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await auth().signInWithEmailAndPassword(email, password);
            const { token } = await response.user.getIdTokenResult();
            const { data } = await postDataInServer(token);
            dispatch(userLoginAction(data, token));

            // redirect
            redirectPage(data);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="container p-5 my-5">
            <div className="row">
                <div className="col-md-8 col-sm-12 offset-md-2">
                    <div className="card p-5">
                        <h3 className="mb-4">Login with a Email</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                className="form-control p-2 mb-3"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                className="form-control p-2 mb-3"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className="btn btn-raised btn-primary mt-3 w-100"
                                disabled={!email || password.length < 6}
                            >
                                Login
                            </button>
                        </form>
                        <Link to="/register" className="text-primary">
                            Don&lsquo;t have an account? Register now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
