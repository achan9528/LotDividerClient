import { useState } from 'react';

export const useToken = () => {
    const getToken = () => {
        const userTokenString = localStorage.getItem('token');
        const userToken = JSON.parse(userTokenString);
        if (userToken) {
            return userToken.key;
        }
        return;
    };
    const [token, setToken] = useState(getToken());

    const saveUserToken = (token) => {
        if (token===''){
            localStorage.removeItem('token');
            setToken('');
        } else{
            localStorage.setItem('token', JSON.stringify(token));
            setToken(token.key)
        }
    }

    return {
        setToken: saveUserToken,
        token
    }
}
export default useToken;