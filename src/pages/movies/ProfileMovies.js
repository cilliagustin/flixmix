import React from 'react'
import styles from '../../styles/ProfileContentDisplay.module.css'
import ProfileMoviePreviewCard from './ProfileMoviePreviewCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import Asset from '../../components/Asset';
import { fetchMoreData } from '../../utils/utils'

/**
 * display all movies made by a specific profile or used in the listcreate or listedit forms
*/
const ProfileMovies = ({ movies, setMovies, listSearch = false, listedMovies, setListedMovies }) => {
    // destructure the movies and setMovies function and check if this component is being used
    // in the list create or list edit forms
    return (
        <div className={styles.Container}>
            <InfiniteScroll
                children={
                    movies.results.map((movie) => (
                         // display each movie in a movie card
                         // give it props to trigger functions if the ProfileMoviePreviewCard
                         // is beign used in the list create or list edit forms
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