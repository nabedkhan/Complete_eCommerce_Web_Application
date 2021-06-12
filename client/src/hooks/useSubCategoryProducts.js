import axios from 'axios';
import { useEffect, useState } from 'react';

const useSubCategoryProducts = (match) => {
    const [products, setProducts] = useState([]);
    const [subcategory, setSubcategory] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // get subcategory
        axios
            .get(
                `https://complete-ecommerce-web-app.herokuapp.com/subcategory/${match.params.slug}`
            )
            .then(({ data }) => {
                setSubcategory(data);
                setLoading(false);
            });
        if (subcategory._id) {
            // get products
            axios
                .get(
                    `https://complete-ecommerce-web-app.herokuapp.com/product/subcategory/${subcategory._id}`
                )
                .then(({ data }) => {
                    setProducts(data);
                    setLoading(false);
                });
        }
    }, [match.params.slug, subcategory._id]);

    return [products, subcategory, loading];
};
export default useSubCategoryProducts;
