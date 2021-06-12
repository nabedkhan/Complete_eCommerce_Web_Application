import axios from 'axios';

// get current user
export default async (token) =>
    axios.get('https://complete-ecommerce-web-app.herokuapp.com/auth/current_user', {
        headers: { token },
    });
