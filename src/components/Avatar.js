import React from 'react'
import styles from '../styles/Avatar.module.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

/**
 * Returns a Link with the profile id as target and the selected image displayed
 * in a circle shape
 */
const Avatar = ({ src, height, id, username}) => {
    return (
      <Link to={`/profiles/${id}`}>
          <img 
          className={styles.Avatar} 
          src={src} height={height} 
          width={height} 
          alt="avatar"
      />
      {username && username}
      </Link>
    )
  }

export default Avatar