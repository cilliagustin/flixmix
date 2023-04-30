import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import {axiosReq} from '../../api/axiosDefaults'
import MoviePreviewCard from './MoviePreviewCard'
import styles from '../../styles/MoviesPreview.module.css'
import { Container } from "react-bootstrap";
import NoResults from '../../assets/no-results.png'
import Asset from '../../components/Asset'

const MoviesPreview = ({message, filter = "", query = "", searchParameter = ""}) => {
    const [movies, setMovies] = useState({results: []})
    const [hasLoaded, setHasLoaded] = useState(false)
    const {pathname} = useLocation()
    const search = query !== "" ? `?${searchParameter}=${query}` : ""

    useEffect(()=>{
        
        const fecthMovies = async ()=>{
            try {
                const {data} = await axiosReq.get(`/movies/${filter}${search}`)
                setMovies(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err)
            }
        }
        
        setHasLoaded(false);
        const timer = setTimeout(()=>{
            fecthMovies()
        }, 1000)
        return ()=>{
            clearTimeout(timer)
        }
    },[filter, pathname, query, search])

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
                <Container>
                    <Asset src={NoResults} message={message} />
                </Container>
            )}
            </>
        ) : (
            <Container>
                <Asset spinner />
            </Container>
    )}
    </>
  )
}

export default MoviesPreview