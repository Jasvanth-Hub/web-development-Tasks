import React from 'react'
import "./Login.css"
import {Typography,Button} from "@mui/material"
import {Link} from "react-router-dom"
import { useDispatch } from 'react-redux'
import { loginUser } from '../../Actions/User'
import { useAlert } from '../../AlertProvider'


const Login = () => {

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const dispatch = useDispatch()
  const showAlert = useAlert()

  const loginHandler = (e) => {
    e.preventDefault()
    dispatch(loginUser(email, password,showAlert))
  }

  return (
    <div className='login'>
      
      <form action="" className='loginForm' onSubmit={loginHandler}>
        <Typography variant='h4' style={{padding:"2vmax"}}>Login</Typography>

        <input type="email" placeholder='Email' required value={email}  onChange={(e) => setEmail(e.target.value)} />

        <input type="password" placeholder='Password' required value={password}  onChange={(e) => setPassword(e.target.value)} />

        <Link to="/forgotpassword">
          <Typography  >Forgot Password?</Typography>
        </Link>

        <Button type='submit' >Login</Button>

        <Link to="/register">
          <Typography>Don't have an account? Register</Typography>
        </Link>
      </form>
    </div>
  )
}

export default Login
