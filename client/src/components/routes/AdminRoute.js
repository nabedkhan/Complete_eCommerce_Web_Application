import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import LoadingToRedirect from '../LoadingToRedirect';

const AdminRoute = ({ children, ...rest }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (user && user.token) {
            const config = {
                headers: { token: user.token },
            };
            axios
                .get('https://complete-ecommerce-web-app.herokuapp.com/auth/current_admin', config)
                .then(() => {
                    setSuccess(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [user]);

    return success ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
