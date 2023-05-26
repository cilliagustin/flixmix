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

const MoviesPreview = ({ message, searchFilter = "", query = "", searchParameter = "", infiniteScroll = false, followedFilter }) => {
    const currentUser = useCurrentUser()
    const profile_id = currentUser?.profile_id || "";

    const [movies, setMovies] = useState({ results: [] })
    const [hasLoaded, setHasLoaded] = useState(false)
    const { pathname } = useLocation()
    const search = query !== "" ? `${searchParameter}=${query}` : ""
    const filter = searchFilter === "" ? "" : `${searchFilter}__owner__profile=${profile_id}&ordering=-${searchFilter}__created_at&`
    const followedProfilesFilter = followedFilter ? `owner__followed__owner__profile=${profile_id}&` : ""

    useEffect(() => {

        const fetchMovies = async () => {
            try {
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
    }, [filter, followedProfilesFilter, pathname, query, search])

    return (
        <>
            {hasLoaded ? (
                <>
                    {infiniteScroll && (
                        <span className={styles.Count}>{movies.count} results</span>
                    )}
                    {movies.results.length ? (
                        <>
                            {infiniteScroll ? (
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
                                <div className={styles.Container}>
                                    {movies.results.map((movie) => (
                                        <MoviePreviewCard key={movie.id} {...movie} setMovies={setMovies} />
                                    ))}
                                </div>
                            )}
                        </>
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