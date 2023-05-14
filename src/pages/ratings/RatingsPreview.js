import React, { useEffect, useState } from 'react'
import styles from '../../styles/RatingsPreview.module.css'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';
import RatingPreviewCard from './RatingPreviewCard';

const RatingsPreview = ({ infiniteScroll = false }) => {
    const [ratings, setRatings] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const pathname = useLocation();

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const { data } = await axiosReq.get('/ratings/')
                setRatings(data)
                setHasLoaded(true)
            } catch (err) {
                console.log(err)
            }
        }

        setHasLoaded(false)
        fetchRatings()
    }, [pathname])


    return (
        <div className={infiniteScroll ? styles.Container : styles.HomeContainer}>
            {hasLoaded ? (
                !infiniteScroll ? (
                    ratings.results.map((rating, index) => (
                        <RatingPreviewCard
                            key={rating.id}
                            {...rating}
                        />
                    ))
                ) : ("hi")
            ) : ("hi")}
        </div>
    )
}

export default RatingsPreview