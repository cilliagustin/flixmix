import React, { useEffect, useState } from "react";

import { axiosReq } from '../../api/axiosDefaults'

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import styles from '../../styles/MoviePage.module.css'
import Asset from "../../components/Asset";
import { fecthMoreData } from '../../utils/utils'

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Movie from "./Movie";
import RatingCreateForm from "../ratings/RatingCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import RatingPreviewCard from "../ratings/RatingPreviewCard";
import InfiniteScroll from 'react-infinite-scroll-component'

function MoviePage() {
  const { id } = useParams()
  const [movie, setMovie] = useState({ results: [] })
  const currentUser = useCurrentUser()
  const profile_image = currentUser?.profile_image;
  const profile_id = currentUser?.profile_id;
  const [ratings, setRatings] = useState({ results: [] });
  const [userRating, setUserRating] = useState({ results: [] });
  const [wasRated, setWasRated] = useState(false)

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: movie }, { data: ratings }] = await Promise.all([
          axiosReq.get(`/movies/${id}`),
          axiosReq.get(`/ratings/?movie=${id}`)
        ])
        setMovie({ results: [movie] });
        setRatings(ratings)
        setWasRated(!!movie.rating_id);
      } catch (err) {
        console.log(err)
      }
    }

    handleMount()
  }, [id])

  useEffect(() => {
    const handleMount = async () => {
      console.log(wasRated)
      try {
        const { data: rating } = await axiosReq.get(`/ratings/${movie.results[0]?.rating_id}`)
        setUserRating(rating)
      } catch (err) {
        console.log(err)
      }
    }
    if (wasRated) {
      handleMount()
    }
  }, [wasRated, movie.results])

  console.log(movie.results[0])

  return (
    <Row className="h-100 mx-0">
      <Col className="p-0">
        <Movie {...movie.results[0]} setMovies={setMovie} />
        <Container fluid className="mx-0 px-0">
          {currentUser && (
            wasRated ? (
              // add later a preview rate card
              <RatingPreviewCard 
                rating={userRating} 
                userRating={true} 
                setMovie={setMovie}
                setRatings={setRatings}
                setWasRated={setWasRated}
                setUserRating={setUserRating}
              />
            ) : (
              <RatingCreateForm
                profile_id={profile_id}
                profile_image={profile_image}
                movie={id}
                setMovie={setMovie}
                setRatings={setRatings}
                setWasRated={setWasRated}
              />
            )
          )}
          <div className={styles.Container}>
            {ratings.results.length ? (
              <InfiniteScroll
                children={
                  ratings.results.map((rating) => {
                    if (rating.id !== movie.results[0]?.rating_id) {
                      return <RatingPreviewCard key={rating.id} rating={rating} />
                    }
                    return null;
                  })
                }
                dataLength={ratings.results.length}
                loader={<Asset spinner />}
                hasMore={!!ratings.next}
                next={() => fecthMoreData(ratings, setRatings)}
              />
            ) : currentUser ? (
              <span>Be the first one to make a review</span>
            ) : (
              <span>No reviews made... yet</span>
            )}
          </div>
        </Container>
      </Col>
    </Row>
  );
}

export default MoviePage;