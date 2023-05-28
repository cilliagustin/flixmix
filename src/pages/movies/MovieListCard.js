import React from 'react'
import styles from '../../styles/ProfileMoviePreviewCard.module.css'

const MovieListCard = ({ movie, setListedMovies, listedMovies}) => {
    const removeMovie = () =>{
        const updatedMovies = listedMovies.filter(listedMovie => listedMovie.id !== movie.id);
        setListedMovies(updatedMovies);
    }
    return (
        <div
            className={`${styles.Card} ${styles.ListCard}`}
            onClick={()=> removeMovie()}
        >
            <div className={styles.PosterContainer}>
                <img
                    src={movie.poster}
                    alt={`${movie.title} movie Poster`}
                />
            </div>
            <h4 className={styles.Title}>{movie.title}<span>({movie.release_year})</span></h4>
        </div>
    )
}

export default MovieListCard