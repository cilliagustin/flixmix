import React, { useState } from 'react'

import { Form, Col, Row, Container } from "react-bootstrap";

import styles from '../../styles/SearchPage.module.css'
import ReportsPreview from './ReportsPreview';

const SearchReportPage = () => {

    const [query, setQuery] = useState("");
    const [searchParameter, setSearchParameter] = useState("movie_title")

    const handleRadio = (e) => {
        setSearchParameter(e.target.value)
    }

    const placeholders = {
        movie_title: "Search report by movie title",
        owner: "Search report by author",
    }
    return (
        <Container>
            <Row>
                <Col>
                    <Form
                        onSubmit={(event) => event.preventDefault()}
                        className={styles.Form}
                    >
                        <i className={`fas fa-search ${styles.SearchIcon}`} />
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
                                <Form.Check onChange={handleRadio} inline value="owner" label="Author" name="group" type={type} id={`inline-${type}-2`} />
                            </div>
                        ))}
                    </Form>

                    <ReportsPreview
                        message="No result found adjust your search"
                        query={query}
                        searchParameter={searchParameter}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default SearchReportPage