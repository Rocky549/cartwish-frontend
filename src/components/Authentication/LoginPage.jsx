import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import userService, { getUser, login } from "../../services/userServices";


import './LoginPage.css'
import { Navigate, useLocation } from 'react-router-dom';
//import { Navigate, useNavigate } from 'react-router-dom';
// import apiClient from '../../utils/api-client';


const LoginPage = () => {
   
  
  const schema = z.object({
    email: z.string().email().min(3),
    password: z.string().min(8),
  });

  const {register,handleSubmit,formState:{errors}} = useForm({resolver:zodResolver(schema)}); 
  const [formError,setFormError] = useState('');

  const location=useLocation();
  // const onSubmit = async (formData) => {
  //   console.log(formData);
  //   const body=new FormData();
  //   body.email=formData.email;
  //   body.password=formData.password;
  //   await apiClient.post('/user/login',body).catch(err=>setFormError(err.response.data.message));
  // };

  //const navigate=useNavigate();


  const onSubmit=async (formData) => {
    await login(formData)
    .then(res=>{
     // localStorage.setItem("token",res.data.token);
     const {state} = location;

      window.location=state ? state.form : "/";
      //navigate("/");
    })
    .catch(err=>setFormError(err.response.data.message));
  }

  if(getUser()){
    return <Navigate to="/" />
  }
  return (
    <section className="align_center form_page">
        <form className='authentication_form' onSubmit={handleSubmit(onSubmit)}>
        <h2>Login Form</h2>
        <div className="form_inputs">
            <div>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' className='form_text_input' placeholder='Enter Your Email Address'
                {...register("email")}
                />
                {errors.email && (<em className='form_error'>{errors.email.message}</em>)}
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' className='form_text_input' placeholder='Enter Your password'
                {...register('password')}
                />
                {errors.password && (<em className='form_error'>{errors.password.message}</em>)}
            </div>
            {formError && <em className="form_error">{formError}</em>}
            <button type='submit' className="search_button form_submit">Submit</button>
        </div>
        </form>
    </section>
  )
}

export default LoginPage