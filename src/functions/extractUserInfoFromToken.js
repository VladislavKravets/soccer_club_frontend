import { jwtDecode } from 'jwt-decode';

const extractUserInfoFromToken = (token) => {
    try {
        const decodedToken = token ? jwtDecode(token) : null;
        if (decodedToken) {
            const userInfo = {
                username: decodedToken.sub,
                roles: decodedToken.roles,
                exp: decodedToken.exp,
            };
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            // localStorage.setItem("userInfo", userInfo);
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

export default extractUserInfoFromToken;
