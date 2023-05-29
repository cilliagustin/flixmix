import React from 'react'
import styles from '../../styles/ProfileContentDisplay.module.css'
import ProfileListPreviewCard from './ProfileListPreviewCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import Asset from '../../components/Asset';
import { fetchMoreData } from '../../utils/utils'

/**
 * display all lists of a specific profile
*/
const ProfileLists = ({lists, setLists}) => {
    // destructure the lists and setLists function
    return (
        <div className={styles.Container}>
            <InfiniteScroll
                children={
                    lists.results.map((list) => (
                        // display each list information in a list card
                        <ProfileListPreviewCard key={list.id} {...list} />
                    ))
                }
                dataLength={lists.results.length}
                loader={<Asset spinner />}
                hasMore={!!lists.next}
                next={() => fetchMoreData(lists, setLists)}
            />  
        </div >
    )
}

export default ProfileLists