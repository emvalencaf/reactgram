import { api, requestConfig } from '../utils/config.utils';
import { createFetch } from '../utils/createFetch.utils';


export class UserService{
    
    // Get user profile details
    static async getUserProfile(data, token){
        const config = requestConfig("GET", data, token);

        try{
    
            const res = await createFetch(
                api + '/users/profile', 
                config
            );

    
            return res;
    
        } catch(err){
    
            console.log(err);
    
        };
    };

    // Update user's details
    static async updateProfile(data, token) {

        const config = requestConfig("PUT", data, token, true);

        try{
            
            const res = await fetch(
                api + '/users/', 
                config
            );
            
            
            return res;
    
        }catch (err) {
            console.log(err);
        };

    };

    // Get user's details by an id
    static async getUserDetails(id) {

        const config = requestConfig("GET");

        try{
    
            const res = await createFetch(
                api + '/users/' + id, 
                config
            );
    
            
            return res;
    
        } catch(err){
            console.log(err);
        };
    };
};
/* 
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

// Update user details
const updateProfile = async (data, token) => {

    const config = requestConfig("PUT", data, token, true);

    try{
        console.log("entramos no service update")
        const res = await fetch(api + '/users/', config)
            .then(res => res.json())
            .catch(err => err);
        console.log("saímos do servie update:", res);
        return res;

    }catch (err) {
        console.log(err);
    }
};

// Get user details by id
const getUserDetails = async (id) =>{

    const config = requestConfig("GET");

    try{

        const res = await fetch(api + '/users/' + id, config)
            .then(res=>res.json())
            .catch(err=>err);

        
        return res;

    } catch(err){
        console.log(err);
    };

};


const userService = {
    profile,
    updateProfile,
    getUserDetails
};

export default userService;
*/