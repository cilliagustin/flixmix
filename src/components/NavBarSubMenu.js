import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import styles from '../styles/NavBarSubMenu.module.css'
import axios from 'axios';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';

const NavBarSubMenu = ({ item, last }) => {

  const currentUser = useCurrentUser()
  const setCurrentUser = useSetCurrentUser();

  const [submenu, setSubMenu] = useState(false);

  const showSubMenu = () => setSubMenu(!submenu);

  const handleLinkClick = (e) => {
    if (!item.subNav) {
      setSubMenu(false);
    } else {
      e.stopPropagation();
    }
  }

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      console.log(currentUser)
    } catch (err) {
      console.log(currentUser)
      console.log(err);
    }
  };

  return (
    <>
      <NavLink
        className={`${styles.Link} ${submenu && styles.Open} ${last && styles.AuthLink}`}
        activeClassName={styles.Active}
        exact
        to={item.path}
        onClick={() => {
          if (item.subNav) {
            showSubMenu();
          } else if (item.authIconLink && item.loggedInRequired) {
            handleSignOut();
          }
        }}
      >
        <div className={styles.MainLink}>
          {item.icon}
          <span>{item.title}</span>
          {item.iconSubNav}
        </div>
      </NavLink>
        <div className={`${styles.Dropdown} ${submenu && styles.Open}`}>
          {item.subNav?.map((el, idx) => {
            return (
              <NavLink
                exact
                key={idx}
                className={styles.DropdownLink}
                activeClassName={styles.DropdownLinkActive}
                to={el.path}
                onClick={(e) => handleLinkClick(e)}
              >
                {el.title}
              </NavLink>
            )
          })}
        </div>
    </>
  )
}

export default NavBarSubMenu