import React from 'react'
import styles from '../../styles/Home.module.css'
import { Col, Row } from "react-bootstrap";
import header from '../../assets/header.jpg'
import flixmix from '../../assets/flixmix_purple.png'
import MoviesPreview from '../movies/MoviesPreview';
import RatingsPreview from '../ratings/RatingsPreview';

const Home = () => {
  return (
    <>
        <Row className="mx-0">
            <Col className={`${styles.Header} px-0`}>
                <img className={styles.HeaderImg} src={header} alt='Amelie watching a movie' />
                <div className={styles.TitleContainer}>
                    <img src={flixmix} alt='Flixmix logo'/>
                    <h1>Discover, review, and remember your favorite films</h1>
                </div>
            </Col>
        </Row>
        <Row className="mx-0">
            <Col className={`${styles.Movies} px-0`}>
                <div className={styles.MoviesTitle}>
                    <h2>Latest Movies added</h2>
                </div>
                <div className={styles.LatestMovies}>
                    <MoviesPreview message="No movies here yet" />
                </div>
            </Col>
        </Row>
        <Row className="mx-0">
            <Col className={`${styles.Reviews} px-0`}>
                <h2>Latest Reviews</h2>
                <div className={styles.LatestReviews}>
                    <RatingsPreview message="No ratings here yet" />
                </div>
            </Col>
        </Row> 
    </>
  )
}

export default Home