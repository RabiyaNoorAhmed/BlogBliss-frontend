import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
const Register = () => {
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  // State to toggle confirm password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    });
  };


  const registerUser = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, userData, { withCredentials: true });
      const newUser = await response.data;
      if (!newUser) {
        setError("Couldn't Register User. Please Try Again.")
      }
      navigate('/login')
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <section className='register'>
      <div className='container'>
        <h2>Sign Up</h2>
        <form className='form register__form' onSubmit={registerUser}>
          {error && <p className='form__error-message'>{error}</p>}
          <input
            type='text'
            placeholder='Enter Your Full Name'
            name='name'
            value={userData.name}
            onChange={changeInputHandler}
          />
          <input
            type='text'
            placeholder='Enter Your Email'
            name='email'
            value={userData.email}
            onChange={changeInputHandler}
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
          <div className='password-input-container'>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='Enter Your Confirm Password'
              name='confirmPassword'
              value={userData.confirmPassword}
              onChange={changeInputHandler}
            />
            <button
              type='button'
              onClick={() => setShowConfirmPassword(prevState => !prevState)}
              className='password-toggle-button'
            >
              {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
          <button type='submit' className='btn primary'>Sign Up</button>
        </form>
        <small>Already have an Account? <Link to='/login'>Sign in</Link></small>
      </div>
    </section>
  );
};

export default Register;
