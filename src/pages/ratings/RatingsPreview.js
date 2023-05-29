import React, { useEffect, useState } from 'react'
import styles from '../../styles/RatingsPreview.module.css'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';
import RatingPreviewCard from './RatingPreviewCard';
import { Container } from "react-bootstrap";
import InfiniteScroll from 'react-infinite-scroll-component'
import NoResults from '../../assets/no-results.png'
import Asset from '../../components/Asset'
import { fetchMoreData } from '../../utils/utils'
import { useCurrentUser } from '../../contexts/CurrentUserContext';

/**
 * Display ratings
 * can be fetched using or not a specific endpoint
 * can be displayed with our without using infinite scroll
*/
const RatingsPreview = ({ message, query = "", searchParameter = "", infiniteScroll = false, followedFilter }) => {
    const currentUser = useCurrentUser()
    const profile_id = currentUser?.profile_id || "";

    const [ratings, setRatings] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const pathname = useLocation();
    //import filter data to create a specific endpoint if the user selectd filter options
    const search = query !== "" ? `${searchParameter}=${query}&` : ""
    const followedProfilesFilter = followedFilter ? `owner__followed__owner__profile=${profile_id}&` : ""

    // fetch ratings from api
    useEffect(() => {
        const fetchRatings = async () => {
            try {
                // if the user applied filters an endpint using this will fetch the data. 
                // Otherise all ratings will be fetched
                const { data } = await axiosReq.get(`/ratings/?${search}${followedProfilesFilter}`)
                setRatings(data)
                setHasLoaded(true)
            } catch (err) {
                console.log(err)
            }
        }

        setHasLoaded(false)
        const timer = setTimeout(() => {
            fetchRatings()
        }, 1000)
        return () => {
            clearTimeout(timer)
        }
    }, [pathname, followedProfilesFilter, currentUser, search])


    return (
        <div className={infiniteScroll ? styles.Container : styles.HomeContainer}>
            {hasLoaded ? (
                <>
                    {infiniteScroll && (
                        //display the ratings count the infinitescroll param is true
                        <span className={styles.Count}>{ratings.count} results</span>
                    )}
                    {ratings.results.length ? (infiniteScroll ? (
                        // if there are ratings in the requested search and the infinitescroll param is true
                        //display the ratings with infinite scroll
                        <div className={styles.InfiniteScrollContainer}>
                            <InfiniteScroll
                                children={
                                    ratings.results.map((rating) => (
                                        <RatingPreviewCard
                                            key={rating.id}
                                            {...rating}
                                        />
                                    ))
                                }
                                dataLength={ratings.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!ratings.next}
                                next={() => fetchMoreData(ratings, setRatings)}
                            />
                        </div>
                    ) : (
                        // if there are ratings in the requested search and the infinitescroll param is false
                        //display the first results fetched
                        ratings.results.map((rating) => (
                            <RatingPreviewCard
                                key={rating.id}
                                {...rating}
                            />
                        ))
                    )) : (
                        // if there are no ratings in the requested search display a no results asset
                        <Container>
                            <Asset src={NoResults} message={message} />
                        </Container>
                    )}
                </>
            ) : (
                // display loader until rating data is fetched
                <Asset spinner white={!infiniteScroll} />
            )}
        </div>
    )
}

export default RatingsPreview