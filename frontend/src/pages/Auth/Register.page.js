// react
// react-router-dom
import { Link } from 'react-router-dom';


// Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

// Redux
import { register, reset } from '../../slices/auth.slice';


// components
import Message from '../../components/Message.component';


// styles
import './Auth.css';


const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const {loading, error} = useSelector((state) => state.auth);



  const handleSubmit = (e) => {

    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword
    };

    console.log(user);

    dispatch(register(user));

  };

  // Clean all auth states
  useEffect(() => {

    dispatch(reset());

  }, [dispatch]);

  return (
    <div id='register'>
      <h2>ReactGram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder='E-mail'
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder='Senha'
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          name="confirmpassword"
          placeholder='Confirme a senha'
          value={confirmPassword || ""}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {!loading && <button type='submit'>Cadastrar</button>}
        {loading && <button type='submit' disabled>Aguarde...</button>}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Já tem conta? <Link
          to='/login'
        >Clique aqui</Link>
      </p>
    </div>
  );
};

export default Register;