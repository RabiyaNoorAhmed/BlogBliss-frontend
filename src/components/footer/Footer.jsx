import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
  <footer>
    <ul className='footer__categories'>
<li><Link to='/posts/categories/Technology'>Technology</Link></li>
<li><Link to='/posts/categories/Lifestyle'>Lifestyle</Link></li>
<li><Link to='/posts/categories/Business'>Business</Link></li>
<li><Link to='/posts/categories/Education'>Education</Link></li>
<li><Link to='/posts/categories/Entertainment'>Entertainment</Link></li>
<li><Link to='/posts/categories/Science & Nature'>Science & Nature</Link></li>
<li><Link to='/posts/categories/Sports'>Sports</Link></li>
<li><Link to='/posts/categories/Opinion & Editorial'>Opinion & Editorial</Link></li>
<li><Link to='/posts/categories/DIY & Crafts'>DIY & Crafts</Link></li>
<li><Link to='/posts/categories/Family & Parenting'>Family & Parenting</Link></li>
    </ul>
    <div className='footer__copyrigt'>
      <small>All Rights Reserved &copy; Copyright, Rabiya Noor Ahmed</small>
    </div>
  </footer>
  )
}

export default Footer
