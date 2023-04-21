import React from 'react'
import styles from '../styles/Avatar.module.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

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