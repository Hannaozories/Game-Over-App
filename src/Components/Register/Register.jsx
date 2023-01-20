import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gamingImg from '../../Images/gaming.jpg';
import axios from 'axios';
import joi from 'joi';


export default function Register() {
  const navigate = useNavigate();
  const [errorList, seterrorList] = useState([])
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({

    first_name: '',
    last_name: '',
    email: '',
    age: 0,
    password: '',
  });

  function getUserData(event) {
    let myUser = { ...user };
    myUser[event.target.name] = event.target.value;
    setUser(myUser);
    console.log(myUser);
  }

  async function sendRegisterDataToApi() {

    let { data } = await axios.post('https://route-movies-api.vercel.app/signup', user);
    console.log(data)
    if (data.message === 'success') {
      //To Login
      navigate('/login');
      setIsLoading(false);

    } else {
      setError(data.message);
      setIsLoading(false);

    }

  }

  function validateRegisterForm() {
   let scheme =joi.object({
      first_name: joi.string().min(3).max(15).required(),
      last_name: joi.string().min(3).max(15).required(),
      age: joi.number().min(16).max(80).required(),
      email:joi.string().email({tlds : { allow:['com','net']}}).required(),
      password:joi.string().required()
    });
     return scheme.validate(user,{abortEarly:false})
  };

  function submitRegisterForm(e) {
    e.preventDefault();
    setIsLoading(true)
    let validation= validateRegisterForm();

    if(validation.error){
      setIsLoading(false);
      seterrorList(validation.error.details)
    }else{
      sendRegisterDataToApi();
    };
  };
  return <>
    <div className="container">
      <div className="register ">
        <div className="row register-form rounded-2  ">
          <div className="col-md-6 p-0">
              <img src={gamingImg} className="w-100 image-height rounded-2" alt="" />
          </div>
          <div className="col-md-6 ">
            <div className="form">

              <h2 className='text-center cl-h2 my-3 '>Create My Account</h2>
              {error.length > 0 ? <div className="text-danger my-2">{error}</div> : ''}
              {errorList.map((err,index)=> <div key={index} className="text-danger my-2">{err.message}</div>)}
              <form onSubmit={submitRegisterForm}>

                <div className='row g-2'>
                  <div className="col-md-6">
                    <input type="text" onChange={getUserData} className='form-control bg-transparent text-white' id='first_name' name='first_name' placeholder='First Name' />
                  </div>
                  <div className="col-md-6">
                    <input type="text" onChange={getUserData} className='form-control  bg-transparent text-white' id='last_name' name='last_name' placeholder='Last Name' />
                  </div>
                </div>
                <input type="email" onChange={getUserData} className='form-control my-3 bg-transparent text-white' id='email' name='email' placeholder='Email Address' />
                <input type="text" onChange={getUserData} className='form-control my-3 bg-transparent text-white' id='age' name='age' placeholder='Age' />
                <input type="password" onChange={getUserData} className='form-control my-3 bg-transparent text-white' id='password' name='password' placeholder='Password' />
                <button type='submit' className='btn btn-dark w-100 my-3'>
                  {isLoading === true ? <i className='fa-solid fa-spinner fa-spin'></i> : " Create Account"}</button>
              </form>
              <p className='text-muted text-center brdr p-2'>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </>

}