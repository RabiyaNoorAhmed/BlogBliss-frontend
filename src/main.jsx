import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Error from './pages/Error'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import Register from './pages/Register'
import Login from './pages/Login'
import UserProfile from './pages/UserProfile'
import Authors from './pages/Authors'
import CreatePost from './pages/CreatePost'
import CategoryPosts from './pages/CategoryPosts'
import EditPost from './pages/EditPost'
import DeletePost from './pages/DeletePost'
import AuthorPosts from './pages/AuthorPost'
import Dashboard from './pages/Dashboard'
import Logout from './pages/Logout'
import UserProvider from './context/userContext'
const router = createBrowserRouter([
  {
    path: "/",
    element: <UserProvider><Layout /></UserProvider>,
    errorElement: <Error />,
    children: [
      { index: true,element:<Home/>},
      {path: "posts/:id",element:<PostDetail/> },
      {path: "register",element:<Register/> },
      {path: "login",element:<Login/> },
      {path: "profile/:id",element:<UserProfile/> },
      {path: "authors",element:<Authors/> },
      {path: "create",element:<CreatePost/> },
      {path: "posts/categories/:category",element:<CategoryPosts/> },
      {path: "posts/users/:id",element:<AuthorPosts/> },
      {path: "myposts/:id",element:<Dashboard/> },
      {path: "posts/:id/edit",element:<EditPost/> },
      {path: "posts/:id/delete",element:<DeletePost/> },
      {path: "logout",element:<Logout/> },
     

    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
