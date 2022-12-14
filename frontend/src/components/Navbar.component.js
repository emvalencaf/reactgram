// react
// react-router-dom
import { NavLink, Link } from 'react-router-dom';
// react-icon
import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill } from 'react-icons/bs';

// Redux
import { logout, reset } from '../slices/auth.slice';

// Hooks
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


//styles
import './Navbar.css';


const Navbar = () => {

    const { auth } = useAuth();
    const { user } = useSelector((state) => state.auth);

    const [ query, setQuery ] = useState('');

    const navigate = useNavigate();

    const dispatch = useDispatch();

    // Handles

    const handleLogout = () => {

        dispatch(logout());
        dispatch(reset());

        navigate('/login');
    };

    const handleSearch = (e) => {
        e.preventDefault();

        if(query) return navigate(`/search?q=${query}`);

    };

    return (
        <nav id='nav'>
            <Link
                to='/'
            >ReactGram</Link>
            <form
                id='search-form'
                onSubmit={handleSearch}
            >
                <BsSearch />
                <input
                    type="text"
                    placeholder='Pesquisar'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </form>

            <ul id="nav-links">
                {auth ? (
                    <>
                        <li>
                            <NavLink
                                to='/'
                            ><BsHouseDoorFill /></NavLink>
                        </li>
                        {user && (
                            <li>
                                <NavLink
                                    to={`/users/${user._id}`}
                                ><BsFillCameraFill /></NavLink>
                                    
                            </li>
                        )}
                        <li>
                            <NavLink
                                to="/profile"
                            ><BsFillPersonFill /></NavLink>
                        </li>
                        <li>
                            <span
                                onClick={handleLogout}
                            >Sair</span>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink
                                to='/login'
                            >Entrar</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/register'
                            >Cadastrar</NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;