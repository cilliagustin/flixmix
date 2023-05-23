import React from 'react'
import styles from '../../styles/ListDisplayMovies.module.css'
import MovieListCard from '../movies/MovieListCard'

const ListDisplayMovies = ({ listedMovies, setListedMovies }) => {
    return (
        <div className={styles.Container}>
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