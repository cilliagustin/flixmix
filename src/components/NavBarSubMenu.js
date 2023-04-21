import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import styles from '../styles/NavBarSubMenu.module.css'

const NavBarSubMenu = ({ item, last }) => {

  const [submenu, setSubMenu] = useState(false);

  const showSubMenu = () => setSubMenu(!submenu);

  const handleLinkClick = (e) => {
    if (!item.subNav) {
      setSubMenu(false);
    } else {
      e.stopPropagation();
    }
  }

  return (
    <>
      <NavLink
        className={`${styles.Link} ${submenu && styles.Open} ${last && styles.AuthLink}`}
        activeClassName={styles.Active}
        exact
        to={item.path}
        onClick={item.subNav && showSubMenu}
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