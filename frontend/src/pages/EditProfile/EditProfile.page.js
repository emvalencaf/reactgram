// Hooks
import { useState } from 'react';

// Styles
import './EditProfile.css';

const EditProfile = () => {

    const [name, setName] = useState('');
    const [email] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');

    const handleSubmit = (e) => {

        e.preventDefault();

    };

    return (
        <div id='edit-profile'>
            <h2>Edite sesus dados</h2>
            <p className='subtitle'>Adicione uma imagem de perfil e conte mais sobre você...</p>
            {/* preview da image */}
            {/* form */}
            <form
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholeder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    name="email"
                    placeholder='email'
                    disabled
                />
                <label>
                    <span>Imagem do Perfil:</span>
                    <input
                        type="file"
                    />
                </label>
                <label>
                    <span>Bio:</span>
                    <input
                        type="text"
                        name="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </label>
                <label>
                    <span>Quer alterar sua senha?</span>
                    <input
                        type="password" name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.file)}
                    />
                </label>
            </form>
        </div>
    )
}

export default EditProfile