import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logoimg from '../../Images/logo.png';
import { filterContextData } from '../Context/FilterContext';

export default function Navbar({ userData, logOut }) {
let {changePlatform}=useContext(filterContextData);

  return <>


    <nav className="navbar navbar-expand-lg bg-transparent shadow navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="home"><img src={Logoimg} className="logo-image" alt="" /> Game Over</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {userData ? <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-5">

            <li className="nav-item">
              <Link className="nav-link" to="home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="all">All</Link>
            </li>
            <li className="nav-item dropdown" id='platforms'>
              <Link className="nav-link  dropdown-toggle" >Platforms</Link>

              <ul className="dropdown-menu">
                <li ><Link className="dropdown-item" to='platforms/pc' onClick={()=>changePlatform('pc')} >Pc</Link></li>
                <li ><Link className="dropdown-item" to='platforms/browser' onClick={()=>changePlatform('browser')} >Browser</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown" id='sort-by'>
            <Link className="nav-link  dropdown-toggle" >SortBy</Link>

              <ul className="dropdown-menu">
                <li ><Link className="dropdown-item" to='sortby/release-date' onClick={()=>changePlatform('release-date')} >Release-Date</Link></li>
                <li ><Link className="dropdown-item" to='sortby/popularity' onClick={()=>changePlatform('popularity')}>Popularity</Link></li>
                <li ><Link className="dropdown-item" to='sortby/alphabetical' onClick={()=>changePlatform('alphabetical')}>Alphabetical</Link></li>
                <li><Link className="dropdown-item" to='sortby/relevence' onClick={()=>changePlatform('relevence')}>Relevence</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown" >
            <Link className="nav-link  dropdown-toggle" >Categories</Link>

              <ul className="dropdown-menu">
                <li ><Link className="dropdown-item" to='categories/racing' onClick={()=>changePlatform('racing')} >Racing</Link></li>
                <li ><Link className="dropdown-item" to='categories/sports' onClick={()=>changePlatform('sports')} >Sports</Link></li>
                <li ><Link className="dropdown-item" to='categories/social' onClick={()=>changePlatform('social')} >Social</Link></li>
                <li ><Link className="dropdown-item" to='categories/shooter' onClick={()=>changePlatform('shooter')} >Shooter</Link></li>
                <li ><Link className="dropdown-item" to='categories/open-world' onClick={()=>changePlatform('open-world')} >Open World</Link></li>
                <li ><Link className="dropdown-item" to='categories/zombie' onClick={()=>changePlatform('zombie')} >Zombie</Link></li>
                <li ><Link className="dropdown-item" to='categories/fantasy' onClick={()=>changePlatform('fantasy')} >Fantasy</Link></li>
                <li ><Link className="dropdown-item" to='categories/action-rpg' onClick={()=>changePlatform('action-rpg')} >Action RPG</Link></li>
                <li ><Link className="dropdown-item" to='categories/action' onClick={()=>changePlatform('action')} >Action</Link></li>
                <li ><Link className="dropdown-item" to='categories/flight' onClick={()=>changePlatform('flight')} >Flight</Link></li>

              </ul>
            </li>


          </ul> : ''}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">


            {userData ? <li className="nav-item">
              <span onClick={logOut} className="nav-link btn btn-outline-primary ms-5" >LogOut</span>
            </li> : <>
              <li className="nav-item">
                <Link className="nav-link " to="login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link btn btn-outline-primary mx-3 " to="register">Join Free</Link>
              </li>
            </>}


          </ul>
        </div>
      </div>
    </nav>

  </>

}
