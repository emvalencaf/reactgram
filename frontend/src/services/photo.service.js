// modules
import { api, requestConfig } from "../utils/config.utils";

// functions
    // Publish an user photo
const publishPhoto = async (data, token) => {

    const config = requestConfig("POST", data, token, true);

    try{

        const res = await fetch(api + '/photos/', config)
            .then(res => res.json())
            .catch(err => err);
        
        return res;

    } catch(err){

        console.log(err);

    };

};

// Get user photos
const getUserPhotos = async (id, token) => {

    const config = requestConfig("GET", null, token);

    try{

        const res = await fetch(api + "/photos/user/" + id, config)
            .then(res => res.json())
            .catch(err => err)

        return res;

    } catch(err){
        console.log(err);
    }

};

// Delete a photo
const deletePhoto = async (id, token) => {

    const config = requestConfig("DELETE", null, token);

    try {
        
        const res = await fetch(api + '/photos/' + id, config)
            .then(res => res.json())
            .catch(err => err);

        return res;

    } catch (err) {
        console.log(err);
    }

}

// Update a photo
const updatePhoto = async (data, id, token) => {

    const config = requestConfig('PUT', data, token);

    try{

        const res = await fetch(api + '/photos/' + id, config)
            .then(res => res.json())
            .catch(err => err);

        return res;
    } catch(err){
        console.log(err);
    };


};

// Get a photo by id
const getPhotoById = async (id, token) => {

    const config = requestConfig('GET', null, token);

    try{

        const res = await fetch(api + '/photos/' + id, config)
            .then(res => res.json())
            .catch(err => err);
        
        return res;
    } catch(err){
        console.log(err);
    };

};
 
// Like a photo
const likePhoto = async (id, token) => {

    const config = requestConfig('PUT', null, token);

    try {
        
        const res = await fetch(api + '/photos/like/' + id, config)
            .then(res => res.json())
            .catch(err=> err);

        return res;
    } catch (err) {
        console.log(err);
    }

};

// Add a comment to a photo
const commentPhoto = async (data, id, token) => {
    console.log('entrou no commentPhoto service');
    console.log('recebeu os dados do commentPhoto slice', data);
    console.log('recebeu a ip da photo do commentPhoto slice', id);
    console.log('recebeu o token por meio do commentPhoto slice', token);
    const config = requestConfig('PUT', data, token);
    console.log('fez a configuração para a requisição ao servidor', config);
    try {
        console.log('entrou no bloco do try');
        const res = await fetch(api + '/photos/comment/' + id, config)
            .then(res => res.json())
            .catch(err => err);
        console.log('recebeu os dados do backend', res);
        return res;
    } catch (err){
        console.log('entrou no bloco de erros do try and catch do commentPhoto service');
        console.log(err);
    }

};

// photoService
const photoService = {
    publishPhoto,
    getUserPhotos,
    deletePhoto,
    updatePhoto,
    getPhotoById,
    likePhoto,
    commentPhoto
};

export default photoService