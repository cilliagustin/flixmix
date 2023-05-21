import React from 'react'
import styles from '../../styles/ProfileMoviesRatings.module.css'
import ProfileMoviePreviewCard from './ProfileMoviePreviewCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import Asset from '../../components/Asset';
import { fetchMoreData } from '../../utils/utils'

const ProfileMovies = ({movies, setMovies}) => {

    return (
        <div className={styles.Container}>
            <InfiniteScroll
                children={
                    movies.results.map((movie) => (
                        <ProfileMoviePreviewCard key={movie.id} {...movie} />
                    ))
                }
                dataLength={movies.results.length}
                loader={<Asset spinner />}
                hasMore={!!movies.next}
                next={() => fetchMoreData(movies, setMovies)}
            />  
        </div >
    )
}

export default ProfileMovies