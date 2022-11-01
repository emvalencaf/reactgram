// modules
import { api, requestConfig } from "../utils/config.utils";

// authService

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

const authService = {
    register
}

export default authService;

