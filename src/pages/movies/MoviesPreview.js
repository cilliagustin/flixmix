import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq } from '../../api/axiosDefaults'
import MoviePreviewCard from './MoviePreviewCard'
import styles from '../../styles/MoviesPreview.module.css'
import { Container } from "react-bootstrap";
import NoResults from '../../assets/no-results.png'
import Asset from '../../components/Asset'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchMoreData } from '../../utils/utils'
import { useCurrentUser } from '../../contexts/CurrentUserContext'

/**
 * Display movies
 * can be fetched using or not a specific endpoint
 * can be displayed with our without using infinite scroll
*/
const MoviesPreview = ({ message, searchFilter = "", query = "", searchParameter = "", infiniteScroll = false, followedFilter }) => {
    const currentUser = useCurrentUser()
    const profile_id = currentUser?.profile_id || "";

    const [movies, setMovies] = useState({ results: [] })
    const [hasLoaded, setHasLoaded] = useState(false)
    const { pathname } = useLocation()
    //import filter data to create a specific endpoint if the user selectd filter options
    const search = query !== "" ? `${searchParameter}=${query}` : ""
    const filter = searchFilter === "" ? "" : `${searchFilter}__owner__profile=${profile_id}&ordering=-${searchFilter}__created_at&`
    const followedProfilesFilter = followedFilter ? `owner__followed__owner__profile=${profile_id}&` : ""

    useEffect(() => {
        // fetch movies from api
        const fetchMovies = async () => {
            try {
                // if the user applied filters an endpint using this will fetch the data. 
                // Otherise all movies will be fetched
                const { data } = await axiosReq.get(`/movies/?${filter}${followedProfilesFilter}${search}`)
                setMovies(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err)
            }
        }

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchMovies()
        }, 1000)
        return () => {
            clearTimeout(timer)
        }
    }, [filter, followedProfilesFilter, pathname, currentUser, search])

    return (
        <>
            {hasLoaded ? (
                <>
                    {infiniteScroll && (
                        //display the movies count the infinitescroll param is true
                        <span className={styles.Count}>{movies.count} results</span>
                    )}
                    {movies.results.length ? (
                        <>
                            {infiniteScroll ? (
                                // if there are movies in the requested search and the infinitescroll param is true
                                //display the movies with infinite scroll
                                <div className={styles.InfiniteScrollContainer}>
                                    <InfiniteScroll
                                        children={
                                            movies.results.map((movie) => (
                                                <MoviePreviewCard key={movie.id} {...movie} setMovies={setMovies} />
                                            ))
                                        }
                                        dataLength={movies.results.length}
                                        loader={<Asset spinner />}
                                        hasMore={!!movies.next}
                                        next={() => fetchMoreData(movies, setMovies)}
                                    />
                                </div>
                            ) : (
                                //if there are movies in the requested search and the infinitescroll param is false
                                //display the first results fetched
                                <div className={styles.Container}>
                                    {movies.results.map((movie) => (
                                        <MoviePreviewCard key={movie.id} {...movie} setMovies={setMovies} />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        // if there are no movies in the requested search display a no results asset
                        <Container>
                            <Asset src={NoResults} message={message} />
                        </Container>
                    )}
                </>
            ) : (
                // display loader until rating data is fetched
                <Container>
                    <Asset spinner />
                </Container>
            )}
        </>
    )
}

export default MoviesPreview