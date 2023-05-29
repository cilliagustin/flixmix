import React, { useState } from 'react'

import { Form, Col, Row, Container } from "react-bootstrap";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import styles from '../../styles/SearchPage.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import ListsPreview from './ListsPreview';

/**
 * display search lists page
*/
const SearchListPage = () => {
    const currentUser = useCurrentUser();
    //set filters for the endpoint
    const [query, setQuery] = useState("");
    const [searchParameter, setSearchParameter] = useState("title");
    const [followedFilter, setFollowedFilter] = useState(false);

    //manipulate followed filter state
    const handleFollowedChange = () => {
        setFollowedFilter(!followedFilter)
    }
    
    //manipulate search parameter data from radio buttons
    const handleRadio = (e) => {
        setSearchParameter(e.target.value)
    }

    //set dinamic placeholders
    const placeholders = {
        title: "Search List by title",
        // the api only has one search filter in the search 
        // fields that refers to the movie title making this endpoint 
        // locate only lists by movie title
        search: "Search List by movies on it",
        owner: "Search List by author",
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
                                <Form.Check onChange={handleRadio} defaultChecked inline value="title" label="List Title" name="group" type={type} id={`inline-${type}-1`} />
                                <Form.Check onChange={handleRadio} inline value="search" label="Movie" name="group" type={type} id={`inline-${type}-2`} />
                                <Form.Check onChange={handleRadio} inline value="owner" label="Author" name="group" type={type} id={`inline-${type}-3`} />
                            </div>
                        ))}
                        {/* current users will have displayed a checkbox to select filter data by users they follow */}
                        {currentUser && (
                            <div className={styles.Checkbox}>
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
                                                {followedFilter ? "Filtering" : "Filter"} lists created by users you follow
                                            </Tooltip>}
                                    >
                                        <i
                                            className={`${followedFilter ? "fa-solid" : "fa-regular"} fa-user`}>
                                        </i>
                                    </OverlayTrigger>
                                </label>
                            </div>
                        )}
                    </Form>
                    {/* send filter to listpreview to fetch the lists*/}
                    <ListsPreview
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

export default SearchListPage