import React from 'react'
import styles from '../../styles/ProfileContentDisplay.module.css'
import ProfileMoviePreviewCard from './ProfileMoviePreviewCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import Asset from '../../components/Asset';
import { fetchMoreData } from '../../utils/utils'

const ProfileMovies = ({ movies, setMovies, listSearch = false, listedMovies, setListedMovies }) => {

    return (
        <div className={styles.Container}>
            <InfiniteScroll
                children={
                    movies.results.map((movie) => (
                        <ProfileMoviePreviewCard
                            key={movie.id}
                            {...movie}
                            listSearch={listSearch}
                            listedMovies={listedMovies}
                            setListedMovies={setListedMovies}
                        />
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