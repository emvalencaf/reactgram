import { api, requestConfig } from '../utils/config.utils';


// Get user details
const profile = async (data, token) => {

    const config = requestConfig("GET", data, token);

    try{

        const res = await fetch(api + '/users/profile', config)
            .then(res => res.json())
            .catch(err => err);

        return res;

    } catch(err){

        console.log(err);

    };

};

const userService = {
    profile
};

export default userService;
