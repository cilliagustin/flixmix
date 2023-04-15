import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import styles from '../styles/NavBarSubMenu.module.css'

const NavBarSubMenu = ({ item }) => {

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
        className={`${styles.Link} ${submenu && styles.Open}`}
        to={item.path}
        onClick={showSubMenu}
      >
        <div className={styles.MainLink}>
          {item.icon}
          <span>{item.title}</span>
          {item.iconSubNav}
        </div>
        <div className={`${styles.Dropdown} ${submenu && styles.Open}`}>
          {item.subNav?.map((el, idx) => {
            return (
              <NavLink
                key={idx}
                className={styles.DropdownLink}
                to={el.path}
                onClick={(e) => handleLinkClick(e)}
              >
                {el.title}
              </NavLink>
            )
          })}
        </div>
      </NavLink>
    </>
  )
}

export default NavBarSubMenu