import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from './Components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './Actions/User';
import { useEffect } from 'react';
import Register from './Components/Register/Register';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Account from './Components/Account/Account';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';
import UpdateUserPassword from './Components/UpdatePassword/UpdatePassword';
import { useAlert } from './AlertProvider';


function App() {

  const dispatch = useDispatch()
  const showAlert = useAlert()

  useEffect(() => {
    dispatch(loadUser(showAlert))
  }, [])

  const {isAuthenticated} = useSelector((state)=>state.user)
  
  return (
    <Router>
      {isAuthenticated && <Header/>}
        <Routes>
          <Route path="/" element={isAuthenticated? <Home/>: <Login/>} />
          <Route path="/login" element={isAuthenticated? <Home/>: <Login/>} />
          <Route path="/register" element={isAuthenticated? <Home/>: <Register/>} />
          <Route path="/account" element={isAuthenticated? <Account/>: <Login/>} />
          <Route path="/update/profile" element={isAuthenticated? <UpdateProfile/>: <Login/>} />
          <Route path="/update/password" element={isAuthenticated? <UpdateUserPassword/>: <Login/>} />
        </Routes>
    </Router>
  )
}

export default App;
