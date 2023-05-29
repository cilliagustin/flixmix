import React from 'react'
import styles from '../../styles/ProfileListPreviewCard.module.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useFullScreen, FullScreenModal } from '../../components/HandleFullScreen'

/**
 * display list in a card format
*/
const ProfileListPreviewCard = (props) => {
  //destructure list information
  const { id, title, movies_details, description, comments_count, created_at } = props
  const { fullScreen, handleFullScreen, imageData } = useFullScreen();
  return (
    <>
      {fullScreen && (
        <FullScreenModal src={imageData.src} alt={imageData.alt} handleClick={handleFullScreen} />
      )}
      <div className={styles.Card}>
        <div className={styles.PostersContainer}>
          {/* map though the first 6 movies (max) in the list and display the posters */}
          {movies_details.slice(0, 6).map((movie) => (
            <div key={movie.id} className={styles.Poster}>
              <img
                src={movie.poster}
                alt={`${title} movie poster`}
                onClick={e => handleFullScreen(e)}
              />
            </div>
          ))}
        </div>
        <Link to={`/list/${id}`} className={styles.Title}>{title}</Link>
        <p className={styles.Description}>{description}</p>
        <div className={styles.Details}>
          <i className="fa-regular fa-comment"></i>
          <span>{comments_count}</span>
          <span>{created_at}</span>
        </div>
      </div>
    </>
  )
}

export default ProfileListPreviewCard