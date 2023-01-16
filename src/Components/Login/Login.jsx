import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gamingImg from '../../Images/gaming.jpg';
import axios from 'axios';
import joi from 'joi';


export default function Login({saveUserData}) {
  const navigate = useNavigate();
  const [errorList, seterrorList] = useState([])
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({

  
    email: '',
    password: '',
  });

  function getUserData(event) {
    let myUser = { ...user };
    myUser[event.target.name] = event.target.value;
    setUser(myUser);
    console.log(myUser);
  }

  async function sendLoginDataToApi() {

    let { data } = await axios.post('https://route-movies-api.vercel.app/signin', user);
    console.log(data)
    if (data.message === 'success') {
      localStorage.setItem('userToken',data.token);
      saveUserData()
      navigate('/home');
      setIsLoading(false);

    } else {
      setError(data.message);
      setIsLoading(false);

    }

  }

  function validateLoginForm() {
   let scheme =joi.object({
   
      email:joi.string().email({tlds : { allow:['com','net']}}).required(),
      password:joi.string().required()
    });
     return scheme.validate(user,{abortEarly:false})
  };

  function submitLoginForm(e) {
    e.preventDefault();
    setIsLoading(true)
    let validation= validateLoginForm();

    if(validation.error){
      setIsLoading(false);
      seterrorList(validation.error.details)

    }else{

      sendLoginDataToApi();

    }
  }

  return <>

    <div className="container">
      <div className="register ">
        <div className="row register-form rounded-2  ">
          <div className="col-md-6">
            <div className="image">
              <img src={gamingImg} className="w-100 image-height" alt="" />
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="form">

              <h2 className='text-center cl-h2 my-3 '>Sign in</h2>
              {error.length > 0 ? <div className="text-danger my-2">{error}</div> : ''}
              
              {errorList.map((err,index)=> <div key={index} className="text-danger my-2">{err.message}</div>)}

              <form onSubmit={submitLoginForm}>
                <input type="email" onChange={getUserData} className='form-control my-3 bg-transparent text-white' id='email' name='email' placeholder='Email Address' />
                <input type="password" onChange={getUserData} className='form-control my-3 bg-transparent text-white' id='password' name='password' placeholder='Password' />
                <button type='submit' className='btn btn-dark w-100 my-3'>
                  {isLoading === true ? <i className='fa-solid fa-spinner fa-spin'></i> : " SignIn"}</button>
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