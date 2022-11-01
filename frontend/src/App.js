// react
  // router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


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
  return (
    <div className="App">
      <BrowserRouter>
        < Navbar />
        <div className='container'>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/register'
              element={<Register />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
