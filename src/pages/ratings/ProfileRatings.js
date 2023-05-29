import React from 'react'
import styles from '../../styles/ProfileContentDisplay.module.css'
import ProfileRatingPreviewCard from './ProfileRatingPreviewCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import Asset from '../../components/Asset';
import { fetchMoreData } from '../../utils/utils'

/**
 * display all ratings of a specific profile
*/
const ProfileRatings = ({ ratings, setRatings }) => {
    // destructure the ratings and setRatings function
    return (
        <div className={styles.Container}>
            <InfiniteScroll
                children={
                    ratings.results.map((rating) => (
                        // display each rating information in a rating card
                        <ProfileRatingPreviewCard key={rating.id} {...rating} />
                    ))
                }
                dataLength={ratings.results.length}
                loader={<Asset spinner />}
                hasMore={!!ratings.next}
                next={() => fetchMoreData(ratings, setRatings)}
            />
        </div >
    )
}

export default ProfileRatings