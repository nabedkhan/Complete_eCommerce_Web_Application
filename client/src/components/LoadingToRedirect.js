import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const LoadingToRedirect = () => {
    const [count, setCount] = useState(3);
    const history = useHistory();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currCount) => --currCount);
        }, 1000);

        // redirect
        if (count === 0) {
            history.push('/');
        }

        return () => clearInterval(interval);
    }, [count, history]);
    return <div />;
};

export default LoadingToRedirect;
