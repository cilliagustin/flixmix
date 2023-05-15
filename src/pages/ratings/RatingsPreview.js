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

const RatingsPreview = ({ message, query = "", searchParameter = "", infiniteScroll = false }) => {
    const [ratings, setRatings] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const pathname = useLocation();
    const search = query !== "" ? `?${searchParameter}=${query}` : ""

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const { data } = await axiosReq.get(`/ratings/${search}`)
                setRatings(data)
                setHasLoaded(true)
            } catch (err) {
                console.log(err)
            }
        }

        setHasLoaded(false)
        const timer = setTimeout(()=>{
            fetchRatings()
        }, 1000)
        return ()=>{
            clearTimeout(timer)
        }
    }, [pathname, query, search])


    return (
        <div className={infiniteScroll ? styles.Container : styles.HomeContainer}>
            {hasLoaded ? (
                <>
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
                <Container>
                    <Asset spinner />
                </Container>
            )}
        </div>
    )
}

export default RatingsPreview