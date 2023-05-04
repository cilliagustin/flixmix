import React, { useEffect, useState } from "react";

import {axiosReq} from '../../api/axiosDefaults'

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Movie from "./Movie";
import RatingCreateForm from "../ratings/RatingCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import RatingPreviewCard from "../ratings/RatingPreviewCard";

function MoviePage() {
    const { id } = useParams()
    const [movie, setMovie] = useState({results: []})
    const currentUser = useCurrentUser()
    const profile_image = currentUser?.profile_image;
    const profile_id = currentUser?.profile_id;
    const [ratings, setRatings] = useState({ results: [] });
    const [wasRated, setWasRated] = useState(false)

    useEffect(()=>{
        const handleMount = async ()=>{
            try {
                const [{data: movie}, {data:ratings}] = await Promise.all([
                    axiosReq.get(`/movies/${id}`),
                    axiosReq.get(`/ratings/?movie=${id}`)
                ])
                setMovie({results: [movie]});
                setRatings(ratings)
                setWasRated(!!movie.rating_id);
            } catch (err) {
                console.log(err)
            }
        }

        handleMount()
    },[id])

console.log(ratings.results)
  return (
    <Row className="h-100 mx-0">
      <Col className="p-0">
        <Movie {...movie.results[0]} setMovies={setMovie} />
        <Container fluid className={`${appStyles.Content} mx-0 px-0`}>
          {currentUser && (
            wasRated ? (
              // add later a preview rate card
              "was rated"
              ) : (
              <RatingCreateForm 
                profile_id={profile_id} 
                profile_image={profile_image} 
                movie={id}
                setMovie={setMovie}
                setRatings={setRatings} 
              />
            )
          )}
          {ratings.results.length ? (
            <div className="w-100">
              {ratings.results.map((rating)=>{













                  return <RatingPreviewCard key={rating.id} rating={rating}/>












                  
              })}
            </div>
          ): currentUser ? (
            <span>Be the first to make a review</span>
          ): (
            <span>No reviews made... yet</span>
          )}
        </Container>
      </Col>
    </Row>
  );
}

export default MoviePage;