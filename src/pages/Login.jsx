import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import Loader from '../components/loader/Loader';


import { UserContext } from '../context/userContext'


const Login = () => {
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContext)

  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    });
  };


  const loginUser = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData, { withCredentials: true });
      const user = await response.data;
      setCurrentUser(user)
      navigate('/')
    } catch (err) {
      setError(err.response.data.message)
    }finally {
      setTimeout(() => {
        setIsLoading(false); 
      }, 3000);
    }
  }
  if(isLoading){
    return <Loader/>
  }
  

  return (
    <section className='login'>
      <div className='container'>
        <h2>Sign In</h2>
        <form className='form login__form' onSubmit={loginUser}>
          {error && <p className='form__error-message'>{error}</p>}
          <input
            type='text'
            placeholder='Enter Your Email'
            name='email'
            value={userData.email}
            onChange={changeInputHandler}
            autoFocus
          />
          <div className='password-input-container'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter Your Password'
              name='password'
              value={userData.password}
              onChange={changeInputHandler}
            />
            <button
              type='button'
              onClick={() => setShowPassword(prevState => !prevState)}
              className='password-toggle-button'
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
          <button type='submit' className='btn primary'>LogIn</button>
        </form>
        <small>Don't have an Account? <Link to='/register'>Sign Up</Link></small>
      </div>
    </section>
  );
};

export default Login;