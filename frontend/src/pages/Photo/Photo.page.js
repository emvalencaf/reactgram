// Image directories url
import { uploads } from '../../utils/config.utils';

// components
import Message from '../../components/Message.component';
import { Link } from 'react-router-dom';
import PhotoItem from '../../components/PhotoItem.component';
import LikeContainer from '../../components/LikeContainer.component';

// hooks
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Redux
import { 
    getPhotoById,
    like
 } from '../../slices/photo.slice';


const Photo = () => {

    const { id } = useParams();

    const dispatch = useDispatch();
    
    const { user } = useSelector((state) => state.auth);

    const {
        photo,
        loading,
        error,
        message
    } = useSelector((state) => state.photo);

    // Comments

    // Load photo daa
    useEffect(() => {
        dispatch(getPhotoById(id));
    }, [dispatch, id]);

    // Likes and comments
    const handleLike = () => {

        dispatch(like(photo._id));

    };


    if(loading) return <p>Carregando... </p>


    return (
        <div id='photo'>
            <PhotoItem photo={photo} />
            <LikeContainer
                photo={photo}
                user={user}
                handleLike={handleLike}
            />
        </div>
    )
}

export default Photo