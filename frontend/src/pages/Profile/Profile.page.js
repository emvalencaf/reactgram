// uploads
import { uploads } from '../../utils/config.utils';

// Components
import Message from '../../components/Message.component';
import { Link } from 'react-router-dom';
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs';

// Hooks
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Redux
import { getUserDetails } from '../../slices/user.slice';

// Styles
import './Profile.css';

const Profile = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const { user, loading } = useSelector((state) => state.user);

    const { user: userAuth } = useSelector((state) => state.auth);

    // New form and edit form refs
    const newPhotoForm = useRef();


    // Load user data
    useEffect(() => {

        dispatch(getUserDetails(id));

    }, [dispatch, id]);

    const handleSubmit = (e) => {
        e.preventDefault();
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
                                />
                            </label>
                            <label>
                                <span>Imagem</span>
                                <input
                                    type="file"
                                />
                            </label>

                            <button type="submit">Postar</button>
                        </form>
                    </div>
                </>
            )

            }

        </div>
    )
}

export default Profile