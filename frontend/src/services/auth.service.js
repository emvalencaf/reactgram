// modules
import { api, requestConfig } from "../utils/config.utils";

// authService

// register an user
const register = async (data) => {

    const config = requestConfig("POST", data);

    try {

        const res = await fetch(api + '/users/register', config)
            .then(res => res.json())
            .catch(err => err);

        if (res) {

            localStorage.setItem('user', JSON.stringify(res));

        };

        return res;

    } catch (err) {

        console.log(err);

    };

};

// log out an user;
const logout = () => {

    localStorage.removeItem("user");

};

const authService = {
    register,
    logout
}

export default authService;

