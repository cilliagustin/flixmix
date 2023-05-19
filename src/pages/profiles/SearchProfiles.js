import React, { useState } from 'react'

import { Form, Col, Row, Container } from "react-bootstrap";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import styles from '../../styles/SearchPage.module.css'
import ProfilesPreview from './ProfilesPreview';

const SearchProfiles = () => {
    const [query, setQuery] = useState("")
    const [searchFilter, setSearchFilter] = useState("base");

    const placeholders = {
        base: "Search profile by Name or Username",
        followed: "Search followed profile by Name or Username",
        follower: "Search follower by Name or Username",
    }


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
                            className={`mr-sm-2 ${styles.SearchBar}`}
                            placeholder={placeholders[searchFilter]}
                        />
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
                    </Form>
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