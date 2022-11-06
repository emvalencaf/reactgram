// React
  // Router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Hooks
import { useAuth } from './hooks/useAuth.hooks';

// Components
import Navbar from './components/Navbar.component';
import Footer from './components/Footer.component';

// Pages
import Home from './pages/Home/Home.page';
import Login from './pages/Auth/Login.page';
import Register from './pages/Auth/Register.page';
import EditProfile from './pages/EditProfile/EditProfile.page';
import Profile from './pages/Profile/Profile.page';
import Photo from './pages/Photo/Photo.page';
import Search from './pages/Search/Search.page';


// Styles
import './App.css';

function App() {

  const { auth, loading } = useAuth();

  if(loading) return <p>Carregando...</p>;

  return (
    <div className="App">
      <BrowserRouter>
        < Navbar />
        <div className='container'>
          <Routes>
            <Route
              path='/'
              element={
                auth?
                  <Home />
                  : <Navigate to='/login' />
              }
              />
            <Route
              path='/users/:id'
              element={
                auth?
                  <Profile />
                  :<Navigate  to='/login'/>
              }
            />
            <Route
              path='/profile'
              element={
                auth?
                  <EditProfile />
                  : <Navigate to='/login' />
              }
            />
            <Route
              path='/login'
              element={
                !auth?
                  <Login />
                  : <Navigate to='/' />
              }
            />
            <Route
              path='/register'
              element={
                !auth?
                  <Register />:
                  <Navigate to="/" />}
            />
            <Route 
              path='/search'
              element={
                auth?
                  <Search />
                  : <Navigate to='/login' />
              }
            />
            <Route
              path='/photos/:id'
              element={
                auth?
                  <Photo />
                  :<Navigate to='/login' />
              }
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
