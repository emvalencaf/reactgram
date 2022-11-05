// Hooks
<<<<<<< Updated upstream
import { 
    useState, 
=======
import {
    useState,
>>>>>>> Stashed changes
    useEffect 
} from 'react';

import { 
<<<<<<< Updated upstream
    useSelector, 
=======
    useSelector,
>>>>>>> Stashed changes
    useDispatch 
} from 'react-redux';


// Redux
import { 
<<<<<<< Updated upstream
    profile, 
    resetMessage, 
=======
    profile,
    resetMessage,
>>>>>>> Stashed changes
    updateProfile 
} from '../../slices/user.slice';

// Uploads
import { uploads } from '../../utils/config.utils';


// Components
import Message from '../../components/Message.component';

// Styles
import './EditProfile.css';

const EditProfile = () => {

    const dispatch = useDispatch();

    const { 
        user, 
        message, 
        error, 
        loading
    } = useSelector((state) => state.user);

    // States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    // Load user data
    useEffect(() => {
        dispatch(profile());
    }, [dispatch]);

    console.log(user);

    // Fill form with user data
    useEffect(() => {

        if (user) {
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio);
        };

    }, [user]);

    // Event handlers
    const handleFile = (e) => {

        // image preview
        const image = e.target.files[0];

        setPreviewImage(image);


        // Update image state
        setProfileImage(image);

    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        // Get user data from states
        const userData = {
            name
        };

        if(profileImage) userData.profileImage
         = profileImage;

         if(password) userData.password = password;

         // build formdata
         const formData = new FormData();

         const userFormData = Object.keys(userData).forEach((key) => formData.append(key, userData));

        formData.append("user", userFormData);

<<<<<<< Updated upstream
        console.log('dados compactados em  um FormData', formData);

=======
>>>>>>> Stashed changes
        await dispatch(updateProfile(userFormData));
        console.log('perfil atualizado');
        setTimeout(() =>{
            dispatch(resetMessage())
        }, 2000);
    };

    return (
        <div id='edit-profile'>
            <h2>Edite seus dados</h2>
            <p className='subtitle'>Adicione uma imagem de perfil e conte mais sobre você...</p>
            {/* preview da image */}
            {(user.profileImage || previewImage) && (
                <img
                    className='profile-image'
                    src={
                        previewImage ?
                            URL.createObjectURL(previewImage)
                            : `${uploads}/users/${user.profileImage}`
                    }
                    alt={`foto de perfil de ${user.name}`}
                />
            )}
            {/* form */}
            <form
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholeder="Nome"
                    value={name || ""}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    name="email"
                    placeholder='email'
                    value={email || ""}
                    disabled
                />
                <label>
                    <span>Imagem do Perfil:</span>
                    <input
                        type="file"
                        onChange={handleFile}
                    />
                </label>
                <label>
                    <span>Bio:</span>
                    <input
                        type="text"
                        name="bio"
                        value={bio || ""}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </label>
                <label>
                    <span>Quer alterar sua senha?</span>
                    <input
                        type="password" name="password"
                        value={password || ""}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {!loading && <button type='submit'>Atualizar</button>}
                {loading && <button type='submit' disabled>Aguarde...</button>}
                {error && <Message msg={error} type="error" />}
                {message && <Message msg={message} />}
            </form>
        </div>
    )
}

export default EditProfile