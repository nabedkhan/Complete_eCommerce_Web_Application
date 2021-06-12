import axios from 'axios';
import { useEffect, useState } from 'react';

const useSameCategoryProducts = (match) => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // get category
        axios
            .get(`https://complete-ecommerce-web-app.herokuapp.com/category/${match.params.slug}`)
            .then(({ data }) => {
                setCategory(data);
                setLoading(false);
            });
        if (category._id) {
            // get products
            axios
                .get(
                    `https://complete-ecommerce-web-app.herokuapp.com/product/category/${category._id}`
                )
                .then(({ data }) => {
                    setProducts(data);
                    setLoading(false);
                });
        }
    }, [category._id, match.params.slug]);

    return [products, category, loading];
};
export default useSameCategoryProducts;
