import React, { useState } from 'react'
import styles from '../../styles/SearchPage.module.css'
import { Form, Col, Row, Container } from "react-bootstrap";
import RatingsPreview from './RatingsPreview';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const SearchRatingsPage = () => {
    const currentUser = useCurrentUser()
    const [query, setQuery] = useState("")

    const [searchParameter, setSearchParameter] = useState("movie_title")
    const [followedFilter, setFollowedFilter] = useState(false);

    const handleRadio = (e) => {
        setSearchParameter(e.target.value)
    }

    const handleFollowedChange = () => {
        setFollowedFilter(!followedFilter)
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
                                {currentUser && (
                                    <>
                                        <input
                                            type="checkbox"
                                            name="followed"
                                            id='followed'
                                            checked={followedFilter}
                                            onChange={handleFollowedChange}
                                        />
                                        <label htmlFor="followed">
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={
                                                    <Tooltip>
                                                        {followedFilter ? "Filtering" : "Filter"} movies created by users you follow
                                                    </Tooltip>}
                                            >
                                                <i
                                                    className={`${followedFilter ? "fa-solid" : "fa-regular"} fa-user`}>
                                                </i>
                                            </OverlayTrigger>
                                        </label>
                                    </>
                                )}
                            </div>
                        ))}

                    </Form>
                    <RatingsPreview
                        message="No result found adjust your search"
                        query={query}
                        searchParameter={searchParameter}
                        infiniteScroll={true}
                        followedFilter={followedFilter}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default SearchRatingsPage