export const createFetch = async (url, configObj) => {

    return await fetch(url, configObj)
        .then(res=>res.json())
        .catch(err=>err);

}