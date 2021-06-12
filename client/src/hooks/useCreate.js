import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../functions/httpConfig';

const useCreate = () =>
    // eslint-disable-next-line func-names
    async function ({ data, token, url, loadData }) {
        try {
            await axios.post(
                `https://complete-ecommerce-web-app.herokuapp.com/${url}`,
                data,
                config(token)
            );
            toast.success('Created Successfully');
            if (loadData) loadData();
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };
export default useCreate;
