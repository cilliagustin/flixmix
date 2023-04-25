import React, { useEffect, useState } from "react";

import {axiosReq} from '../../api/axiosDefaults'

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Movie from "./Movie";

function MoviePage() {
    const { id } = useParams()
    const [movie, setMovie] = useState({results: []})

    useEffect(()=>{
        const handleMount = async ()=>{
            try {
                const [{data: movie}] = await Promise.all([
                    axiosReq.get(`/movies/${id}`)
                ])
                setMovie({results: [movie]})
                console.log(movie)
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
        <Container className={appStyles.Content}>
          Comments
        </Container>
      </Col>
    </Row>
  );
}

export default MoviePage;