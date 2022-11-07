// Utils
import { api, requestConfig } from "../utils/config.utils";
import { createFetch } from "../utils/createFetch.utils";

// AuthService class

export class AuthService{
    // Sign an user in
    static async login(data){
        const config = requestConfig('POST', data);

        try{
    
            const res = await createFetch(
                api + '/users/login',
                config
            );
    
    
            if(res._id){
    
                localStorage.setItem("user", JSON.stringify(res));
            };
    
            return res;
    
        } catch(err){
    
            console.log(err);
        };
    };
    // Register an user and sign him in
    static async register(data){
        const config = requestConfig("POST", data);

        try {
    
            const res = await createFetch(
                api + '/users/register',
                config
            );
    
            if (res._id) {
    
                localStorage.setItem('user', JSON.stringify(res));
    
            };
    
            return res;
    
        } catch (err) {
    
            console.log(err);
    
        };
    };
    // Logout an user
    static logout(){

        localStorage.removeItem("user");

    };
};