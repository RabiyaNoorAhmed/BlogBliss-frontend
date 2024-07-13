import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { UserContext } from '../context/userContext'
import axios from 'axios';
const UserProfile = () => {
  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  // State to toggle password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [isAvatarTouched, setIsAvatarTouched] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  //redirect to Login Page for any user who isn't logged In
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])


  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${currentUser.id}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      const { name, email, avatar } = response.data;
      setName(name);
      setEmail(email);
      setAvatar(avatar)
    }
    getUser();
  }, [])



  const changeAvatarHandler = async () => {
    setIsAvatarTouched(false);
    try {
      const postData = new FormData();
      postData.set('avatar', avatar);
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/change-avatar`, postData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
      setAvatar(response?.data.avatar)
    } catch (error) {
      console.log(error);
    }
  }


  const updateUserDetails = async (e) => {
e.preventDefault();
try {
  const userData = new FormData();
userData.set('name',name);
userData.set('email',email);
userData.set('currentPassword',currentPassword);
userData.set('newPassword',newPassword);
userData.set('confirmNewPassword',confirmNewPassword);

const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/users/edit-user`,userData,
  { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
)
if(response.status==200){
  //Log User Out
  navigate('/logout')
}
} catch (error) {
  setError(error.response.data.message);
}
}



  return (
    <section className='profile'>
      <div className='container profile__container'>
        <Link to={`/myposts/${currentUser.id}`} className='myposts-btn'>
          My Posts
        </Link>
        <div className='profile__details'>
          <div className='avatar__wrapper'>
            <div className='profile__avatar'>
              <img src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${avatar}`} />
            </div>
            {/* Form to update Avatar */}
            <form className='avatar__form'>
              <input type='file' name='avatar' id='avatar'
                onChange={e => [setAvatar(e.target.files[0])]}
                accept='png,jpg,jpeg' />
              <label htmlFor='avatar' onClick={() => setIsAvatarTouched(true)}><FaEdit /></label>
            </form>
            {isAvatarTouched && <button className='profile__avatar-btn' onClick={changeAvatarHandler} ><FaCheck /></button>}
          </div>
          <h1>{currentUser.name}</h1>
          {/* Form to update user details */}

        </div>
      </div>
      <form className='form profile__form' onSubmit={updateUserDetails}>
        {error && <p className='form__error-message'>
          {error}
        </p>}
        <input type='text' placeholder='Enter Your Full Name'
          value={name} onChange={e => setName(e.target.value)}
        />
        <input type='email' placeholder='Enter Your Email'
          value={email} onChange={e => setEmail(e.target.value)}
        />
        <div className='password-input-container'>
          <input
            type={showCurrentPassword ? 'text' : 'password'}
            placeholder='Enter Your Current Password'
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
          />
          <button
            type='button'
            onClick={() => setShowCurrentPassword(prevState => !prevState)}
            className='password-toggle-button'
          >
            {showCurrentPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>
        <div className='password-input-container'>
          <input
            type={showNewPassword ? 'text' : 'password'}
            placeholder='Enter Your New Password'
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          <button
            type='button'
            onClick={() => setShowNewPassword(prevState => !prevState)}
            className='password-toggle-button'
          >
            {showNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>
        <div className='password-input-container'>
          <input
            type={showConfirmNewPassword ? 'text' : 'password'}
            placeholder='Confirm Your New Password'
            value={confirmNewPassword}
            onChange={e => setConfirmNewPassword(e.target.value)}
          />
          <button
            type='button'
            onClick={() => setShowConfirmNewPassword(prevState => !prevState)}
            className='password-toggle-button'
          >
            {showConfirmNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>
        <button type='submit' className='btn primary'>Update Details</button>
      </form>
    </section>
  )
}

export default UserProfile
