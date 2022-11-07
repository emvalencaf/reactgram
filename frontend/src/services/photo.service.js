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

// Get all user photos
const getAllUserPhotos = async (id, token) => {

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

// Get all photos
const getAllPhotos = async (token) => {
    
    const config = requestConfig("GET", null, token);
    
    try {

        const res = await fetch(api + '/photos', config)
            .then(res=>res.json())
            .catch(err=>err);
        

        return res;

    } catch (err){
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

    const config = requestConfig('PUT', data, token);

    try {

        const res = await fetch(api + '/photos/comment/' + id, config)
            .then(res => res.json())
            .catch(err => err);

        return res;
    } catch (err){

        console.log(err);
    }

};

// Search photos by title
const searchPhotosByTitle = async (queryString, token) => {

    const config = requestConfig('GET', null, token);

    try {

        const res = await fetch(api + '/photos/search?q=' + queryString, config)
            .then(res => res.json())
            .catch(err=>err);

        return res;

    } catch (err){

        console.log(err);
        
    }

}


// photoService
const photoService = {
    publishPhoto,
    getAllUserPhotos,
    getAllPhotos,
    deletePhoto,
    updatePhoto,
    getPhotoById,
    likePhoto,
    commentPhoto,
    searchPhotosByTitle
};

export default photoService;