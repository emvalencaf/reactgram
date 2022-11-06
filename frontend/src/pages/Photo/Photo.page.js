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
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage.hook';

// Redux
import {
    commentPhoto,
    getPhotoById,
    likePhoto
} from '../../slices/photo.slice';

// Styles
import './Photo.css';

const Photo = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const resetMessage = useResetComponentMessage(dispatch);

    const {
        photo,
        loading,
        error,
        message
    } = useSelector((state) => state.photo);

    // Comments states
    const [commentText, setCommentText] = useState('');

    // Load photo daa
    useEffect(() => {
        dispatch(getPhotoById(id));
    }, [dispatch, id]);

    // Insert a like to a photo
    const handleLike = () => {

        dispatch(likePhoto(photo._id));

        resetMessage();
    };


    // Insert a comment to a photo
    const handleComment = (e) => {
        e.preventDefault();

        const commentData = {
            comment: commentText,
            id: photo._id
        };

        dispatch(commentPhoto(commentData));

        setCommentText('');

        resetMessage();
    };

    if (loading) return <p>Carregando... </p>


    return (
        <div id='photo'>
            <PhotoItem photo={photo} />
            <LikeContainer
                photo={photo}
                user={user}
                handleLike={handleLike}
            />
            <div className="message-container">
                {error && <Message msg={error} type='error' />}
                {message && <Message msg={message} type='success' />}
            </div>
            <div className="comments">
                {photo.comments && (
                    <>
                        <h3>Comentários: ({photo.comments.length})</h3>
                        <form onSubmit={handleComment}>
                            <input
                                type="text"
                                name="comment"
                                placeholder='Faça um comentário...'
                                value={commentText || ''}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                            <button type="submit">Enviar</button>
                        </form>
                        {photo.comments.length === 0 && <p>Não há comentários!</p>}
                        {photo.comments.map(comment => (
                            <div className="comment" key={comment._id}>
                                <div className="author">
                                    {comment.userImage && (
                                        <img
                                            src={`${uploads}/users/${comment.userImage}`}
                                            alt={`Foto de perfil de ${comment.userName}`}
                                        />
                                    )}
                                    <Link to={`/users/${comment.userId}`}>
                                        <p>{comment.userName}</p>
                                    </Link>
                                </div>
                                <p>{comment.comment}</p>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default Photo