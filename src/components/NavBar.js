import React, { useState } from 'react';
import logo from '../assets/logo_placeholder.png';
import logo2 from '../assets/logo_placeholder2.png';
import { NavLink } from 'react-router-dom'
import styles from '../styles/NavBar.module.css'
import {NavBarData} from './NavBarData'
import NavBarSubMenu from './NavBarSubMenu';
import UseScrollDirection from './UseScrollDirection';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';

const NavBar = () => {

  const currentUser = useCurrentUser()

  const generalLinks = NavBarData.map((item,index)=>{
    if(item.generalLink === true){
      return <NavBarSubMenu 
                item={item} 
                key={index} 
              />
    }
  })

  const loggedInLinks = NavBarData.map((item,index)=>{
    if(item.loggedInRequired === true){
      return <NavBarSubMenu 
                item={item} 
                key={index} 
                last={item.authIconLink === true}
              />
    }
  })

  const loggedOutLinks = NavBarData.map((item,index)=>{
    if(item.loggedInRequired === false){
      return <NavBarSubMenu 
                item={item} 
                key={index}
                last={item.authIconLink === true}
              />
    }
  })

  const [hidden, setHidden] = useState(true);

  const showNavBar = () => setHidden(!hidden);

  const scrollUp = UseScrollDirection();


  return (
    <>
      <nav className={`${styles.NavBar} ${!hidden && styles.Open}`}>
        <NavLink to="/">
          <div className={styles.LogoContainer}>
            <img src={logo} alt="Brand logo"></img>
          </div>
        </NavLink>
        
        <div className={`
          ${styles.ButtonContainer}
          ${scrollUp && styles.ButtonContainerHide}
        `}>
          <button onClick={showNavBar}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className={styles.SubmenuWrapper}>
            <NavLink to="/">
              <div className={styles.FullLogoContainer}>
                <img src={logo2} alt="Brand full name logo"></img>
              </div>
            </NavLink>
          <div>
            {generalLinks}
            {currentUser ? loggedInLinks : loggedOutLinks}
            {currentUser && 
            <div className={styles.Profile}>
                <Avatar 
                  src={currentUser?.profile_image} 
                  height={45}
                  id={currentUser?.profile_id}
                  username={null}
                />
            </div>
            }

          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar