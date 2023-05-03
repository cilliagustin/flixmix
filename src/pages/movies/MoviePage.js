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

function MoviePage() {
    const { id } = useParams()
    const [movie, setMovie] = useState({results: []})
    const currentUser = useCurrentUser()
    const profile_image = currentUser?.profile_image;
    const profile_id = currentUser?.profile_id;

    useEffect(()=>{
        const handleMount = async ()=>{
            try {
                const [{data: movie}] = await Promise.all([
                    axiosReq.get(`/movies/${id}`)
                ])
                setMovie({results: [movie]})
            } catch (err) {
                console.log(err)
            }
        }

        handleMount()
    },[id])


  return (
    <Row className="h-100 mx-0">
      <Col className="p-0">
        <Movie {...movie.results[0]} setMovies={setMovie} />
        <Container fluid className={`${appStyles.Content} mx-0 px-0`}>
          <RatingCreateForm profile_id={profile_id} profile_image={profile_image} />
        </Container>
      </Col>
    </Row>
  );
}

export default MoviePage;