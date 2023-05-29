import React, { useEffect, useState } from "react";
import { axiosReq } from '../../api/axiosDefaults'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import styles from '../../styles/MoviePage.module.css'
import Asset from "../../components/Asset";
import { fetchMoreData } from '../../utils/utils'
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Movie from "./Movie";
import RatingCreateForm from "../ratings/RatingCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import RatingMoviePage from "../ratings/RatingMoviePage";
import InfiniteScroll from 'react-infinite-scroll-component'

/**
 * Display movie Page
*/
function MoviePage() {
  // get id from url
  const { id } = useParams()
  const [hasLoaded, setHasLoaded] = useState(false)
  //profile data
  const currentUser = useCurrentUser()
  const profile_image = currentUser?.profile_image;
  const profile_id = currentUser?.profile_id;
  // movie data
  const [movie, setMovie] = useState({ results: [] })
  // rating data
  const [ratings, setRatings] = useState({ results: [] });
  const [userRating, setUserRating] = useState({ results: [] });
  const [wasRated, setWasRated] = useState(false)

  //fetch movie data data and ratings when loading the page
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
        setHasLoaded(true)
      } catch (err) {
        console.log(err)
      }
    }

    handleMount()
  }, [id])

  useEffect(() => {
    const handleMount = async () => {
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

  return (
    <Row className="h-100 mx-0">
      {hasLoaded ? (
        <Col className="p-0">
          {/* display the movie information in the Movie component */}
          <Movie {...movie.results[0]} setMovies={setMovie} />
          <Container fluid className="mx-0 px-0">
            {currentUser && (
              wasRated ? (
                // if the user is logged and rated the movie display their rating on top
                <RatingMoviePage
                  rating={userRating}
                  currentUserRating={true}
                  setMovie={setMovie}
                  setRatings={setRatings}
                  setWasRated={setWasRated}
                  setUserRating={setUserRating}
                  movieData={movie.results[0]}
                />
              ) : (
                // if the user is logged but has not rated the movie display thei create rating form
                <RatingCreateForm
                  profile_id={profile_id}
                  profile_image={profile_image}
                  movieId={id}
                  movieData={movie.results[0]}
                  setMovie={setMovie}
                  setRatings={setRatings}
                  setWasRated={setWasRated}
                />
              )
            )}
            <div className={styles.Container}>
              {ratings.results.length ? (
                // If the movie has ratings display them in the infinite scroll
                // component the currentUser rating is not diplayed here because 
                // it was displayed on top
                <InfiniteScroll
                  children={
                    ratings.results.map((rating) => {
                      if (rating.id !== movie.results[0]?.rating_id) {
                        return <RatingMoviePage key={rating.id} rating={rating} />
                      }
                      return null;
                    })
                  }
                  dataLength={ratings.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!ratings.next}
                  next={() => fetchMoreData(ratings, setRatings)}
                />
              ) : currentUser ? (
                // if there are no ratings and the user is logged invite them to write a review
                <span>Be the first one to make a review</span>
                ) : (
                // if there are no ratings and the user is not logged display a text stating this
                <span>No reviews made... yet</span>
              )}
            </div>
          </Container>
        </Col>
      ) : (
        <Container>
          <Asset spinner />
        </Container>
      )}
    </Row>
  );
}

export default MoviePage;