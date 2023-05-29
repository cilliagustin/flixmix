import React, { useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults';
import { Form, Col, Row, Container } from "react-bootstrap";
import appStyles from '../../App.module.css'
import btnStyles from '../../styles/Button.module.css'
import { handleInputChange } from '../../utils/utils';
import ProfileMovies from '../movies/ProfileMovies';
import Asset from '../../components/Asset';
import NoResults from '../../assets/no-results.png'
import ListDisplayMovies from './ListDisplayMovies';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Alert from "../../components/Alert";
import { useErrorHandling } from './../../components/HandleErrors';
import { useProfileData } from '../../contexts/ProfileDataContext';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useRedirect } from '../../hooks/useRedirect';


/**
 * Display list edit form
*/
const ListEditForm = () => {
    // set the list id from url
    const { id } = useParams()

    const history = useHistory()

    // list data
    const [listData, setListData] = useState({
        title: "",
        description: "",
        owner: "",
    });
    const { title, description, owner } = listData
    const [listedMovies, setListedMovies] = useState([]);
    const [hasListLoaded, setHasListLoaded] = useState(false)
    // movie data
    const [movies, setMovies] = useState({})
    const [hasMoviesLoaded, setHasMoviesLoaded] = useState(false)
    // search movies filter
    const [query, setQuery] = useState("")
    const search = query !== "" ? `?title=${query}` : ""

    //Errors and alert
    const { errors, activeAlert, handleErrors } = useErrorHandling();
    const allErrors = [
        { title: "List title", message: errors.title },
        { title: "List Description", message: errors.description },
    ]

    // Set list data and default movies displayed
    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/lists/${id}`);
                const { title, description, profile_id, movies_details } = data;

                setListData({
                    title: title,
                    description: description,
                    owner: profile_id,
                })
                setListedMovies(movies_details)
                setHasListLoaded(true)
            } catch (err) {
                console.log(err)
            }
        }

        handleMount()
    }, [history, id])


    // fetch Movies
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const { data } = await axiosReq.get(`/movies/${search}`)
                setMovies(data);
                setHasMoviesLoaded(true);
            } catch (err) {
                console.log(err)
            }
        }

        setHasMoviesLoaded(false);
        const timer = setTimeout(() => {
            fetchMovies()
        }, 1000)
        return () => {
            clearTimeout(timer)
        }
    }, [query])

    //submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const moviesIds = listedMovies.map(movie => movie.id)
        const requestData = {
            title: title,
            description: description,
            movies: moviesIds,
        };

        try {
            await axiosReq.put(`/lists/${id}/`, requestData);
            //redirect to list page
            history.push(`/list/${id}`)

        } catch (err) {
            console.log(err)
            if (err.response?.status !== 401) {
                handleErrors(err.response?.data);
            }
        }
    }

    // only allow the owner or the admin to enter to this page
    useRedirect('loggedOut')
    const currentUser = useCurrentUser()
    const profileData = useProfileData()
    useEffect(() => {
        // check that the profileData has loaded and check if the
        // user is an admin or the list owner
        const handleMount = () => {
            if (typeof owner === "number") {
                const isAdminOrOwner = (profileData?.is_admin || currentUser?.profile_id === owner)
                if (!isAdminOrOwner) {
                    history.push("/")
                }
            }
        };

        if (profileData !== null) {
            handleMount();
        }
    }, [listData, hasListLoaded, currentUser, profileData]);

    return (
        <>
            <Alert type="warning" errors={allErrors} active={activeAlert} />
            <Row className='mx-0'>
                <Col md={{ span: 10, offset: 1 }}>
                    {hasListLoaded ? (
                        /* when movie data has loaded fill out form with default data */
                        <Form onSubmit={handleSubmit} className='d-flex mt-5 flex-column'>
                            <Form.Group className='mt-2'>
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    className={appStyles.Input}
                                    type="text"
                                    name="title"
                                    value={title}
                                    onChange={(event) => handleInputChange(event, listData, setListData)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    className={appStyles.TextArea}
                                    as="textarea"
                                    value={description}
                                    onChange={(event) => handleInputChange(event, listData, setListData)}
                                    name="description"
                                    rows={7}
                                />
                            </Form.Group>
                            <ListDisplayMovies listedMovies={listedMovies} setListedMovies={setListedMovies} />
                            <button
                                className={`${btnStyles.Button} ${btnStyles.HoverWhite} mx-auto my-3`}
                                type='submit'
                                disabled={listedMovies === []}
                            >
                                submit
                            </button>
                        </Form>
                    ) : (
                        /* Display spinner until data is fetched */
                        <Asset spinner />
                    )}
                </Col>
                <Col>
                    <Form
                        onSubmit={(event) => event.preventDefault()}
                        style={{ position: "relative" }}
                    >
                        <i className={`fas fa-search ${appStyles.SearchIcon}`} />
                        <Form.Control
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            type="text"
                            className={`mr-sm-2 ${appStyles.Input}`}
                            placeholder={"Search movie by title"}
                        />
                    </Form>
                    {hasMoviesLoaded ? (
                        <>
                            {movies.results.length ? (
                                /* if the search has results (found movies) display them here */
                                <ProfileMovies movies={movies} setMovies={setMovies} listSearch={true} listedMovies={listedMovies} setListedMovies={setListedMovies} />
                            ) : (
                                /* if the search has no results (found movies) display no results*/
                                <Container>
                                    <Asset src={NoResults} message={"No movies found with that title"} />
                                </Container>
                            )}
                        </>
                    ) : (
                        /* Display spinner until movieData is fetched */
                        <Asset spinner />
                    )}
                </Col>
            </Row>
        </>

    )
}

export default ListEditForm