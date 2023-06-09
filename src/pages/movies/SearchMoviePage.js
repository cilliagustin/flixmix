import React, { useState } from 'react'

import { Form, Col, Row, Container } from "react-bootstrap";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import styles from '../../styles/SearchPage.module.css'
import MoviesPreview from './MoviesPreview';
import { useCurrentUser } from '../../contexts/CurrentUserContext';


/**
 * display search movie page
*/
const SearchMoviePage = () => {

  const currentUser = useCurrentUser()

  //set filters for the endpoint
  const [query, setQuery] = useState("");
  const [searchParameter, setSearchParameter] = useState("title")
  const [searchFilter, setSearchFilter] = useState("");
  const [followedFilter, setFollowedFilter] = useState(false);


  //toggle between giving search filter a value of seen, watchlist or none
  const handleCheckBoxChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'seen' && checked) {
      setSearchFilter("seen");
    } else if (name === 'watchlist' && checked) {
      setSearchFilter("watchlist");
    } else {
      setSearchFilter("");
    }
  };

  //manipulate followed filter state
  const handleFollowedChange = () => {
    setFollowedFilter(!followedFilter)
  }

  //toggle between giving search parameter a title, directors, main_cast or release_decade filter
  const handleRadio = (e) => {
    setSearchParameter(e.target.value)
    e.target.value === "release_decade" && setQuery("")
    e.target.value !== "release_decade" && !isNaN(query) && setQuery("")
  }

  //set dinamic placeholders
  const placeholders = {
    title: "Search Movie by title",
    directors: "Search Movie by director",
    main_cast: "Search Movie by main cast",
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
            {searchParameter !== "release_decade" ? (
              <>
                <Form.Control
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  type="text"
                  className={`mr-sm-2 ${styles.SearchBar}`}
                  placeholder={placeholders[searchParameter]}
                />
              </>
            ) : (
              <Form.Group controlId="release_decade">
                <Form.Label className='d-none'>Select release decade</Form.Label>
                <Form.Control as="select" className={styles.Select} onChange={(event) => setQuery(event.target.value)}>
                  <option defaultValue={""} value="">Select release decade</option>
                  <option value="2020">2020</option>
                  <option value="2010">2010</option>
                  <option value="2000">2000</option>
                  <option value="1990">1990</option>
                  <option value="1980">1980</option>
                  <option value="1970">1970</option>
                  <option value="1960">1960</option>
                  <option value="1950">1950</option>
                  <option value="1940">1940</option>
                  <option value="1930">1930</option>
                  <option value="1920">1920</option>
                  <option value="1910">1910</option>
                  <option value="1900">1900</option>
                  <option value="1890">1890</option>
                  <option value="1880">1880</option>
                </Form.Control>
              </Form.Group>
            )}
            {['radio'].map((type) => (
              <div className={styles.Radio} key={`inline-${type}`}>
                <Form.Check onChange={handleRadio} defaultChecked inline value="title" label="Title" name="group" type={type} id={`inline-${type}-1`} />
                <Form.Check onChange={handleRadio} inline value="directors" label="Director" name="group" type={type} id={`inline-${type}-2`} />
                <Form.Check onChange={handleRadio} inline value="main_cast" label="Main cast" name="group" type={type} id={`inline-${type}-3`} />
                <Form.Check onChange={handleRadio} inline value="release_decade" label="Release decade" name="group" type={type} id={`inline-${type}-4`} />
              </div>
            ))}
            {currentUser && (
              /* current users will have displayed a checkbox to select filter data by
              movies they have seen or they set in their watchlist */
              <div className={styles.Checkbox}>
                <input
                  type="checkbox"
                  name="seen"
                  id='seen'
                  checked={searchFilter === "seen"}
                  onChange={handleCheckBoxChange}
                />
                <label htmlFor="seen">
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        {searchFilter === "seen" ? "Filtering" : "Filter"} seen movies
                      </Tooltip>}
                  >
                    <i
                      className={`${searchFilter === "seen" ? "fa-solid" : "fa-regular"} fa-eye`}>
                    </i>
                  </OverlayTrigger>
                </label>
                <input
                  type="checkbox"
                  name="watchlist"
                  id='watchlist'
                  checked={searchFilter === "watchlist"}
                  onChange={handleCheckBoxChange}
                />
                <label htmlFor="watchlist">
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        {searchFilter === "watchlist" ? "Filtering" : "Filter"} movies in your watchlist
                      </Tooltip>}
                  >
                    <i
                      className={`${searchFilter === "watchlist" ? "fa-solid" : "fa-regular"} fa-bookmark`}>
                    </i>
                  </OverlayTrigger>
                </label>
                {/* current users will have displayed a checkbox to select filter
                data created by users they follow */}
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
              </div>
            )}
          </Form>
        {/* send filters to MoviesPreview to fetch the movies*/}
          <MoviesPreview
            message="No result found adjust your search"
            query={query}
            searchParameter={searchParameter}
            searchFilter={searchFilter}
            infiniteScroll={true}
            followedFilter={followedFilter}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default SearchMoviePage