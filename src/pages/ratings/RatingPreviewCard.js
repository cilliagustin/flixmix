import React from 'react'
import styles from '../../styles/RatingPreviewCard.module.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import DisplayRating from '../../components/DisplayRating'
import Avatar from '../../components/Avatar'
import { useFullScreen, FullScreenModal } from '../../components/HandleFullScreen'

const RatingPreviewCard = (props) => {
    const {
        content,
        id,
        movie,
        movie_poster,
        movie_release_year,
        movie_title,
        owner,
        profile_id,
        profile_image,
        title,
        value } = props
    const { fullScreen, handleFullScreen, imageData } = useFullScreen()
    return (
        <>
            {fullScreen && (
                <FullScreenModal src={imageData.src} alt={imageData.alt} handleClick={handleFullScreen} />
            )}
            <div className={`${styles.Card}`}>
                <Link className={styles.MovieTitle} to={`/movies/${movie}`}>
                    <h2>{movie_title}<span>({movie_release_year})</span></h2>
                </Link>
                <div className={styles.Stars}>
                    <DisplayRating xs={true} title={movie_title} rating={value} type={"user"} />
                </div>
                <Link className={styles.Owner} to={`/profiles/${profile_id}`}>
                    {owner}
                </Link>
                <Avatar
                    src={profile_image}
                    height={25}
                    id={profile_id}
                    username={null}
                />
                <img
                    className={styles.Poster}
                    src={movie_poster}
                    alt={`${movie_title} movie poster`}
                    onClick={e => handleFullScreen(e)}
                />
                <Link className={styles.RatingTitle} to={`/reviews/${id}`}>
                    <h3>{title}</h3>
                </Link>
                <Link className={styles.RatingContent} to={`/reviews/${id}`}>
                    <p>{content}</p>
                </Link>
            </div>
        </>
    )
}

export default RatingPreviewCard