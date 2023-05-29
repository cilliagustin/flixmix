import React from 'react'
import styles from '../../styles/ProfileRatingPreviewCard.module.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import DisplayRating from '../../components/DisplayRating'
import { useFullScreen, FullScreenModal } from '../../components/HandleFullScreen'

/**
 * display rating in a card format
*/
const ProfileRatingPreviewCard = (props) => {
    //destructure rating information
    const { movie_poster, movie_release_year, movie_title, title, content, created_at, id, value, comments_count } = props
    const { fullScreen, handleFullScreen, imageData } = useFullScreen();
    return (
        <>
            {fullScreen && (
                <FullScreenModal src={imageData.src} alt={imageData.alt} handleClick={handleFullScreen} />
            )}
            <div className={styles.Card}>
                <img
                    src={movie_poster}
                    alt={`${movie_title} movie poster`}
                    onClick={e => handleFullScreen(e)}
                />
                <h4>{movie_title}</h4>
                <span>({movie_release_year})</span>
                <div className={styles.stars}>
                    <DisplayRating xs={true} title={movie_title} rating={value} type={"user"} />
                </div>
                <Link to={`/reviews/${id}`}>
                    <h5>{title}</h5>
                </Link>
                <Link to={`/reviews/${id}`}>
                    <p>{content}</p>
                </Link>
                <span><i className="fa-regular fa-comments"></i> {comments_count}</span>
                <p>{created_at}</p>
            </div>
        </>
    )
}

export default ProfileRatingPreviewCard