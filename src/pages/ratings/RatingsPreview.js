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

const RatingsPreview = ({ message, query = "", searchParameter = "", infiniteScroll = false, followedFilter }) => {
    const currentUser = useCurrentUser()
    const profile_id = currentUser?.profile_id || "";

    const [ratings, setRatings] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const pathname = useLocation();
    const search = query !== "" ? `${searchParameter}=${query}&` : ""
    const followedProfilesFilter = followedFilter ? `owner__followed__owner__profile=${profile_id}&` : ""


    useEffect(() => {
        const fetchRatings = async () => {
            try {
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
                        <span className={styles.Count}>{ratings.count} results</span>
                    )}
                    {ratings.results.length ? (infiniteScroll ? (
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
                        ratings.results.map((rating) => (
                            <RatingPreviewCard
                                key={rating.id}
                                {...rating}
                            />
                        ))
                    )) : (
                        <Container>
                            <Asset src={NoResults} message={message} />
                        </Container>
                    )}
                </>
            ) : (
                <Asset spinner white={!infiniteScroll} />
            )}
        </div>
    )
}

export default RatingsPreview