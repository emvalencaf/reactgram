// react
    // react-router-dom
import { NavLink, Link } from 'react-router-dom';
    // react-icon
import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill} from 'react-icons/bs';

//styles
import './Navbar.css';


const Navbar = () => {
  return (
    <nav id='nav'>
        <Link
            to='/'
        >ReactGram</Link>
        <form
            id='search-form'
        >
            <BsSearch />
            <input
                type="text"
                placeholder='Pesquisar'
            />
        </form>

        <ul id="nav-links">
            <li>
                <NavLink
                    to='/'
                ><BsHouseDoorFill /></NavLink>
            </li>
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
        </ul>
    </nav>
  )
}

export default Navbar