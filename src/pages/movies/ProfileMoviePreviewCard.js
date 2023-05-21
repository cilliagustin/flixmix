import React from 'react'
import styles from '../../styles/ProfileMoviePreviewCard.module.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useFullScreen, FullScreenModal } from '../../components/HandleFullScreen'


const ProfileMoviePreviewCard = (props) => {
    const { id, title, release_year, poster } = props
    const { fullScreen, handleFullScreen, imageData } = useFullScreen();

    return (
        <>
            {fullScreen && (
                <FullScreenModal src={imageData.src} alt={imageData.alt} handleClick={handleFullScreen} />
            )}
            <div className={styles.Card}>
                <div className={styles.PosterContainer}>
                    <img
                        src={poster}
                        alt={`${title} movie Poster`}
                        onClick={e => handleFullScreen(e)}
                    />
                </div>
                <Link to={`/movies/${id}`} className={styles.Title}>
                    <h4>{title}<span>({release_year})</span></h4>
                </Link>
            </div>
        </>
    )
}

export default ProfileMoviePreviewCard