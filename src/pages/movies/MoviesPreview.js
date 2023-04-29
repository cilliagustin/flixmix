import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import {axiosReq} from '../../api/axiosDefaults'
import MoviePreviewCard from './MoviePreviewCard'
import styles from '../../styles/MoviesPreview.module.css'

const MoviesPreview = ({message, filter = ""}) => {
    const [movies, setMovies] = useState({results: []})
    const [hasLoaded, setHasLoaded] = useState(false)
    const {pathname} = useLocation()

    useEffect(()=>{
        const fecthMovies = async ()=>{
            try {
                const {data} = await axiosReq.get(`/movies/${filter}`);
                setMovies(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err)
            }
        }
        
        setHasLoaded(false);
        fecthMovies()
    },[filter, pathname])

  return (
    <>
    {hasLoaded ? (
            <>
            {movies.results.length ? (
                <div className={styles.Container}>
                    {movies.results.map((movie) => (
                        <MoviePreviewCard  key={movie.id} {...movie} setMovies={setMovies}/>
                    ))}
                </div>
                ) : (          
                console.log("show no results")
            )}
            </>
        ) : (
            console.log("has not loaded")
    )}
    </>
  )
}

export default MoviesPreview