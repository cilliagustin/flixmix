import React, { useState } from 'react';
import logo from '../assets/logo_placeholder.png';
import { NavLink } from 'react-router-dom'
import styles from '../styles/NavBar.module.css'

const NavBar = () => {

  const [hidden, setHidden] = useState(true);

  const showNavBar = ()=>setHidden(!hidden);


  return (
    <>
      <nav className={`${styles.NavBar} ${!hidden ? styles.Open: ""}`}>
        <NavLink to="/">
          <div className={styles.LogoContainer}>
            <img src={logo} alt="logo"></img>
          </div>
        </NavLink>
        <div className={styles.ButtonContainer}>
          <button onClick={showNavBar}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </>
  )
}

export default NavBar