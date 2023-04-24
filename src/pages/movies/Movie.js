import React from 'react'

import { useCurrentUser } from '../../contexts/CurrentUserContext';

import styles from '../../styles/Movie.module.css'

const Movie = (props) => {

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
            <div className={`${styles.PosterContainer} d-flex align-items-center justify-content-center`}> 
                <img src={poster} alt={`${title} movie poster`} />
            </div>
            <div className={styles.InfoContainer}> 
                <h1>{title}</h1>
                <p>Directed by: <span>{directors}</span></p>
                <p>Released on: <span>{release_year}</span></p>
                <p>Genre: <span>{movie_genre}</span></p>
                <p>Main cast: <span>{main_cast}</span></p>
            </div>
        </div>
    </>
  )
}

export default Movie