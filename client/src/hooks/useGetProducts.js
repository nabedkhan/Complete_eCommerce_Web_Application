import axios from 'axios';
import { useEffect, useState } from 'react';

const useGetProducts = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get('https://complete-ecommerce-web-app.herokuapp.com/product/')
            .then(({ data }) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
        // get all categories
        axios
            .get('https://complete-ecommerce-web-app.herokuapp.com/category')
            .then(({ data }) => {
                setCategories(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }, []);

    return [products, categories, loading];
};

export default useGetProducts;
