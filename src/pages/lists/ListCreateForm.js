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
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Alert from "../../components/Alert";
import { useErrorHandling } from './../../components/HandleErrors';
import { useRedirect } from '../../hooks/useRedirect';


/**
 * Display list create form
*/
const ListCreateForm = () => {
    // only allow registered users to enter to this page
    useRedirect('loggedOut')
    const [hasLoaded, setHasLoaded] = useState(false)
    const history = useHistory()

    // list data
    const [listData, setListData] = useState({
        title: "",
        description: "",
    });
    const { title, description } = listData
    const [listedMovies, setListedMovies] = useState([]);
    // movie data
    const [movies, setMovies] = useState({})
    // search movies filter
    const [query, setQuery] = useState("")
    const search = query !== "" ? `?title=${query}` : ""

    //Errors and alert
    const { errors, activeAlert, handleErrors } = useErrorHandling();
    const allErrors = [
        { title: "List title", message: errors.title },
        { title: "List Description", message: errors.description },
    ]

    // fetch movies from api
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const { data } = await axiosReq.get(`/movies/${search}`)
                setMovies(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err)
            }
        }

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchMovies()
        }, 1000)
        return () => {
            clearTimeout(timer)
        }
    }, [query])

    // send list information to api
    const handleSubmit = async (e) => {
        e.preventDefault();

        const moviesIds = listedMovies.map(movie => movie.id)
        const requestData = {
            title: title,
            description: description,
            movies: moviesIds,
        };

        try {
            const { data } = await axiosReq.post("/lists/", requestData);
            //redirect to list page
            history.push(`/list/${data.id}`)

        } catch (err) {
            console.log(err)
            if (err.response?.status !== 401) {
                handleErrors(err.response?.data);
            }
        }
    }

    return (
        <>
            <Alert type="warning" errors={allErrors} active={activeAlert} />
            <Row className='mx-0'>
                <Col md={{ span: 10, offset: 1 }}>
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
                        {/* display selected movies here */}
                        <ListDisplayMovies listedMovies={listedMovies} setListedMovies={setListedMovies} />
                        <button
                            className={`${btnStyles.Button} ${btnStyles.HoverWhite} mx-auto my-3`}
                            type='submit'
                            disabled={listedMovies === []}
                        >
                            submit
                        </button>
                    </Form>
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
                    {hasLoaded ? (
                        /* display data when fetched (has loaded = true) */
                        <>
                            {
                                /* if there are movies fetched by the user search display them
                                clicking them here will add them to the listed movies 
                                */
                            }
                            {movies.results.length ? (
                                <ProfileMovies movies={movies} setMovies={setMovies} listSearch={true} listedMovies={listedMovies} setListedMovies={setListedMovies} />
                            ) : (
                                /* if there are not movies fetched by the user search display no results */
                                <Container>
                                    <Asset src={NoResults} message={"No movies found with that title"} />
                                </Container>
                            )}
                        </>
                    ) : (
                        /* display spinner until data is fetched */
                        <Asset spinner />
                    )}
                </Col>
            </Row>
        </>

    )
}

export default ListCreateForm