import { Avatar, Button,Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from'react-redux'
import { registerUser } from '../../Actions/User'
import "./Register.css"
import { useAlert } from '../../AlertProvider'


const Register = () => {
    
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [avatar,setAvatar] = useState("")
    
    const dispatch = useDispatch()
    const showAlert = useAlert()

    const handleImageChange = (e)=>{
        const file = e.target.files[0]
        
        const Reader = new FileReader()
        Reader.readAsDataURL(file)
        
        Reader.onloadend = ()=>{
            if(Reader.readyState === 2){
                setAvatar(Reader.result)
            }
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(registerUser(name, email,password,avatar,showAlert));
    }
    

  return (
    <div className='register'>
        <form action="" className='registerForm' onSubmit={submitHandler} >
            <Typography variant='h4' style={{padding:"2vmax"}}>Register</Typography>

            <Avatar src={avatar} alt='user' sx={{height:"10vmax",width:"10vmax"}} />

            <input type="file" accept='image/*' required  onChange={handleImageChange} />

            <input type="text" placeholder='Name'className='registerInputs'  required value={name}  onChange={(e) => setName(e.target.value)} />

            <input type="email" placeholder='Email'className='registerInputs'  required value={email}  onChange={(e) => setEmail(e.target.value)} />

            <input type="password" placeholder='Password'className='registerInputs'  required value={password}  onChange={(e) => setPassword(e.target.value)} />

            <Link to="/">
                <Typography>Already Registered? Login Now </Typography>
            </Link>

            <Button type='submit' >Register</Button>
        </form>
    </div>
  )
}

export default Register
