import { toast } from 'react-toastify';
import { auth } from '../firebase/firebase';

const useRegister = async (email) => {
    // auth config
    const config = {
        url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
        handleCodeInApp: true,
    };

    await auth().sendSignInLinkToEmail(email, config);
    // save email in localStorage
    localStorage.setItem('emailForRegister', email);
    // notify
    toast.success(`Email sent to ${email}. Please check your inbox and complete the registration`);
};
export default useRegister;
