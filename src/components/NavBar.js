import React, { useState } from 'react';
import logo from '../assets/logo_placeholder.png';
import logo2 from '../assets/logo_placeholder2.png';
import { NavLink } from 'react-router-dom'
import styles from '../styles/NavBar.module.css'
import {NavBarData} from './NavBarData'
import NavBarSubMenu from './NavBarSubMenu';
import UseScrollDirection from './UseScrollDirection';

const NavBar = () => {

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
          ${!scrollUp && styles.ButtonContainerHide}
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
            {NavBarData.map((item,index)=>{
              return <NavBarSubMenu 
                        item={item} 
                        key={index} 
                      />
            })}
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar