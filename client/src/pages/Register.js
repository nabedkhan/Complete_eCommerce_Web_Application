import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useRegister from '../hooks/useRegister';

const Register = ({ history }) => {
    const [email, setEmail] = useState(null);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user && user.token) {
            history.push('/');
        }
    }, [history, user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useRegister(email);
        // empty the state
        setEmail(null);
    };

    return (
        <div className="container p-5 my-5">
            <div className="row">
                <div className="col-md-8 col-sm-12 offset-md-2">
                    <div className="card p-5">
                        <h3 className="mb-4">Register with a Email Address</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className="btn btn-raised btn-primary mt-3">
                                Register
                            </button>
                        </form>
                        <Link to="/login" className="text-primary">
                            Already have an account? Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
