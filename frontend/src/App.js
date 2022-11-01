// react
  // router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// hooks
import { useAuth } from './hooks/useAuth.hooks';

// Components
import Navbar from './components/Navbar.component';
import Footer from './components/Footer.component';

// Pages
import Home from './pages/Home/Home.page';
import Login from './pages/Auth/Login.page';
import Register from './pages/Auth/Register.page';


// styles
import './App.css';

function App() {

  const { auth, loading } = useAuth();

  console.log(loading);

  if(loading) return <p>Carregando...</p>;



  return (
    <div className="App">
      <BrowserRouter>
        < Navbar />
        <div className='container'>
          <Routes>
            <Route
              path='/'
              element={auth? <Home />: <Navigate to='/login' />}
            />
            <Route
              path='/login'
              element={!auth? <Login />: <Navigate to='/home' />}
            />
            <Route
              path='/register'
              element={!auth? <Register />: <Navigate to="/home" />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
