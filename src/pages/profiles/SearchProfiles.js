import React, { useState } from 'react'

import { Form, Col, Row, Container } from "react-bootstrap";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import styles from '../../styles/SearchPage.module.css'
import ProfilesPreview from './ProfilesPreview';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

/**
 * display search profiles page
*/
const SearchProfiles = () => {

    const currentUser = useCurrentUser()

    //set filters for the endpoint
    const [query, setQuery] = useState("")
    const [searchFilter, setSearchFilter] = useState("base");

    //set dinamic placeholders
    const placeholders = {
        base: "Search profile by Name or Username",
        followed: "Search followed profile by Name or Username",
        follower: "Search follower by Name or Username",
    }

    // this allows the user to filter profiles they follow, they are being followed by or
    // clear the filters and search all profiles
    const handleCheckBoxChange = (e) => {
        const { name, checked } = e.target;

        if (name === 'followed' && checked) {
            setSearchFilter("followed");
        } else if (name === 'follower' && checked) {
            setSearchFilter("follower");
        } else {
            setSearchFilter("base");
        }
    };

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
                            className={`mr-sm-2 mb-3 ${styles.SearchBar}`}
                            placeholder={placeholders[searchFilter]}
                        />
                        {/* render checkbox to select followers of followed profiles
                        if the user is loged in
                        */}
                        {currentUser && (
                            <div className={styles.Checkbox}>
                                <input
                                    type="checkbox"
                                    name="followed"
                                    id='followed'
                                    checked={searchFilter === "followed"}
                                    onChange={handleCheckBoxChange}
                                />
                                <label htmlFor="followed">
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip>
                                                {searchFilter === "followed" ? "Filtering" : "Filter"} followed profiles
                                            </Tooltip>}
                                    >
                                        <p>Followed Profiles</p>
                                    </OverlayTrigger>
                                </label>
                                <input
                                    type="checkbox"
                                    name="follower"
                                    id='follower'
                                    checked={searchFilter === "follower"}
                                    onChange={handleCheckBoxChange}
                                />
                                <label htmlFor="follower">
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip>
                                                {searchFilter === "follower" ? "Filtering" : "Filter"} followers
                                            </Tooltip>}
                                    >
                                        <p>Followers</p>
                                    </OverlayTrigger>
                                </label>
                            </div>
                        )}
                    </Form>
                    {/* send filter to ProfilesPreview to fetch the profiles*/}
                    <ProfilesPreview
                        message="No result found adjust your search"
                        query={query}
                        searchFilter={searchFilter}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default SearchProfiles