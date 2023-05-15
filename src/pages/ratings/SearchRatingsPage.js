import React, { useState } from 'react'
import styles from '../../styles/SearchMovieRatingPage.module.css'
import { Form, Col, Row, Container } from "react-bootstrap";
import RatingsPreview from './RatingsPreview';

const SearchRatingsPage = () => {
    const [query, setQuery] = useState("")

    const [searchParameter, setSearchParameter] = useState("movie_title")

    const handleRadio = (e) =>{
        setSearchParameter(e.target.value)
      }

    const placeholders = {
        movie_title: "Search review by movie title",
        owner: "Search review by the author´s username",
    }
    return (
        <Container>
            <Row>
                <Col>
                    <Form
                        onSubmit={(e) => { e.preventDefault() }}
                        className={styles.Form}
                    >
                        <Form.Control
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            type="text"
                            className={`mr-sm-2 ${styles.SearchBar}`}
                            placeholder={placeholders[searchParameter]}
                        />
                        {['radio'].map((type) => (
                            <div className={styles.Radio} key={`inline-${type}`}>
                                <Form.Check onChange={handleRadio} defaultChecked inline value="movie_title" label="Title" name="group" type={type} id={`inline-${type}-1`} />
                                <Form.Check onChange={handleRadio} inline value="owner" label="Creator" name="group" type={type} id={`inline-${type}-2`} />
                            </div>
                        ))}
                    </Form>
                    <RatingsPreview message="No result found adjust your search" query={query} searchParameter={searchParameter} infiniteScroll={true}/>
                </Col>
            </Row>
        </Container>
    )
}

export default SearchRatingsPage