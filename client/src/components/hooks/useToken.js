import { useState } from 'react';
import { useHistory } from "react-router-dom";

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
    let history = useHistory()

    const saveUserToken = (token) => {
        if (token==''){
            localStorage.removeItem('token');
            setToken('');
            console.log('token deleted')
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