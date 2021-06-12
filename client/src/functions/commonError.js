import { toast } from 'react-toastify';

// common error for all http request
const commonError = (error) => {
    const msg =
        error.response && error.response.data
            ? error.response.data.error
            : 'Error Occurred in server side';
    toast.error(msg);
};

export default commonError;
