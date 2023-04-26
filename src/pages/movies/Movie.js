import React, { useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

import { OverlayTrigger, Tooltip} from "react-bootstrap";

import Avatar from '../../components/Avatar'

import { useCurrentUser } from '../../contexts/CurrentUserContext';

import styles from '../../styles/Movie.module.css'
import appStyles from '../../App.module.css'

const Movie = (props) => {

    const [fullScreen, setFullScreen] = useState(false);

    const handleFullScreen = ()=> setFullScreen(!fullScreen)

    const { 
        id,
        owner,
        profile_id,
        profile_image,
        rating_count,
        list_count,
        seen_count,
        seen_id,
        watchlist_count,
        watchlist_id,
        created_at,
        updated_at,
        title,
        synopsis,
        directors,
        main_cast,
        movie_genre,
        poster,
        release_year,
        release_decade,
    } = props;

    const currentUser = useCurrentUser();

     

  return (
    <>
        <div className={`${styles.Header} d-flex`}>
            <div className={`${styles.PosterContainer} ${fullScreen && styles.FullScreen} d-flex align-items-center justify-content-center`}> 
                {fullScreen && (
                    <img 
                    src={poster} 
                    alt={`${title} movie poster overlay`} 
                    className={styles.PosterOverlay}
                    onClick={handleFullScreen}
                    />
                )}
                <img 
                src={poster} 
                alt={`${title} movie poster`} 
                onClick={handleFullScreen}
                />
            </div>
            <div className={styles.InfoContainer}> 
                <h1>{title} <span>({release_year})</span></h1>
                <p>Directed by: <span>{directors}</span></p>
                <p>Genre: <span>{movie_genre}</span></p>
                <p>Main cast: <span>{main_cast}</span></p>
                <div className={styles.IconsWrapper}>
                    <div className={styles.Icon}>
                        {seen_id ? (
                            // already seen
                            <span className={appStyles.Green}>
                                <i className="fa-solid fa-eye"></i>
                            </span>
                        ): currentUser ? (
                            // logged not seen
                            <span>
                                <i className="fa-regular fa-eye"></i>
                            </span>
                        ): (
                            // not logged
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Log in to mark as a seen movie</Tooltip>}
                            >
                                <i className="fa-regular fa-eye"></i>
                            </OverlayTrigger>
                        )}
                        <p>Seen by {seen_count} users</p>
                    </div>
                    <div className={styles.Icon}>
                        {watchlist_id ? (
                            // in the watchlist
                            <span className={appStyles.Green}>
                                <i className="fa-solid fa-bookmark"></i>
                            </span>
                        ): currentUser ? (
                            // logged but not in watchlist
                            <span>
                                <i className="fa-regular fa-bookmark"></i>
                            </span>
                        ): (
                            // not logged
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Log in to add this movie to your watchlist</Tooltip>}
                            >
                                <i className="fa-regular fa-bookmark"></i>
                            </OverlayTrigger>
                        )}
                        <p>Added to {watchlist_count} future watchlists</p>
                    </div>
                    <div className={styles.Icon}>
                        <i className="fa-solid fa-list-ul"></i>
                        <p>Appears in {list_count} lists</p>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.Body}>
            <p>{synopsis}</p>
            <div className={styles.Credits}>
                <p>Movie information provided by <Link to={`/profiles/${profile_id}`}>{owner}</Link></p>
                <Avatar 
                  src={profile_image} 
                  height={35}
                  id={profile_id}
                  username={null}
                />
            </div>
        </div>
    </>
  )
}

export default Movie