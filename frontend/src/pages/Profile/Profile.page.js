// uploads
import { uploads } from '../../utils/config.utils';

// Components
import Message from '../../components/Message.component';
import { Link } from 'react-router-dom';
import { 
    BsFillEyeFill, 
    BsPencilFill, 
    BsXLg 
} from 'react-icons/bs';

// Hooks
import { 
    useState, 
    useEffect, 
    useRef 
} from 'react';
import { 
    useSelector, 
    useDispatch 
} from 'react-redux';
import { useParams } from 'react-router-dom';

// Redux
import { getUserDetails } from '../../slices/user.slice';
import { 
    publishPhoto, 
    resetMessage, 
    getUserPhotos, 
    deletePhoto 
} from '../../slices/photo.slice';


// Styles
import './Profile.css';

const Profile = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const { user, loading } = useSelector((state) => state.user);
    const { user: userAuth } = useSelector((state) => state.auth);
    
    const {
        photos,
        loading: loadingPhoto,
        message: messagePhoto,
        error: errorPhoto
    } = useSelector((state) => state.photo);

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');

    // New form and edit form refs
    const newPhotoForm = useRef();
    const editPhotoForm = useRef();

    // Load user data
    useEffect(() => {

        dispatch(getUserDetails(id));
        dispatch(getUserPhotos(id));

    }, [dispatch, id]);

    // utils

    const resetComponentMessage = () => {
        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    }

    // Event handlers
    const handleFile = (e) => {

        // image preview
        const image = e.target.files[0];


        // Update image state
        setImage(image);

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const photoData = {
            title,
            image
        };

        // build form data
        const formData = new FormData();

        const photoFormData = Object.keys(photoData).forEach(
            (key) => formData.append(key, photoData[key])
        );

        formData.append('photo', photoFormData);

        dispatch(publishPhoto(formData));

        setTitle("");

        resetComponentMessage();
    };

    // Delete a photo
    const handleDelete = (id) => {

        dispatch(deletePhoto(id));
        resetComponentMessage();

    };

    if (loading) return <p>Caregando...</p>;

    return (
        <div id='profile'>

            <div className="profile-header">
                {user.profileImage && (
                    <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
                )}
            </div>

            <div className="profile-description">
                <h2>{user.name}</h2>
                <p>{user.bio}</p>
            </div>
            {id === userAuth._id && (
                <>
                    <div className="new-photo" ref={newPhotoForm}>
                        <p>Compartilhe algum momento seu:</p>
                        <form
                            onSubmit={handleSubmit}
                        >
                            <label>
                                <span>Título para a foto</span>
                                <input
                                    type="text"
                                    placeholder='Insira um título'
                                    value={title || ""}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </label>
                            <label>
                                <span>Imagem</span>
                                <input
                                    type="file"
                                    onChange={handleFile}
                                />
                            </label>
                            {!loading && <button type='submit'>Postar</button>}
                            {loading && <button type='submit' disabled>Aguarde...</button>}
                        </form>
                        {errorPhoto && <Message msg={errorPhoto} type="error" />}
                        {!errorPhoto && <Message msg={messagePhoto} type="success"/>}
                    </div>
                </>
            )}
            <div className="user-photos">
                <h2>Fotos publicadas:</h2>
                <div className="photos-container">
                    {photos && photos.map((photo) =>(
                        <div className="photo" key={photo._id}>
                            {photo.image && (
                                <img
                                    src={`${uploads}/photos/${photo.image}`}
                                    alt={photo.title}
                                />
                            )}
                            {id === userAuth._id ?
                                (
                                    <div>
                                        <Link
                                            to={`/photos/${photo._id}`}
                                        ><BsFillEyeFill /></Link>
                                        <BsPencilFill />
                                        <BsXLg 
                                            onClick={() => handleDelete(photo._id)}
                                        />
                                    </div>
                                )
                                :(<Link
                                    className="btn"
                                    to={`/photos/${photo._id}`}
                                >Ver</Link>)
                            }
                            {photos.length === 0 && <p>Ainda não há fotos publicadas.</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile