import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../functions/httpConfig';

const useDelete = () =>
    // eslint-disable-next-line func-names
    async function ({ token, url, loadData }) {
        try {
            await axios.delete(
                `https://complete-ecommerce-web-app.herokuapp.com/${url}`,
                config(token)
            );
            toast.success('Deleted Successfully');
            if (loadData) loadData();
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };
export default useDelete;
