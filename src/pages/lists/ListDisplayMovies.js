import React from 'react'
import styles from '../../styles/ListDisplayMovies.module.css'
import MovieListCard from '../movies/MovieListCard'

/**
 * Display movies delected in the list create and list edit form
 * This are the movies selected to be included in the list
*/
const ListDisplayMovies = ({ listedMovies, setListedMovies }) => {
    return (
        <div className={styles.Container}>
            {/* Map through the movies and display them in a card */}
            {listedMovies.map((movie) => (
                <MovieListCard
                    key={movie.id}
                    movie={movie}
                    listedMovies={listedMovies}
                    setListedMovies={setListedMovies}
                />
            ))}
        </div>
    )
}

export default ListDisplayMovies