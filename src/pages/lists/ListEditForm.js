import React, { useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults';
import { Form, Col, Row, Container } from "react-bootstrap";
import appStyles from '../../App.module.css'
import btnStyles from '../../styles/Button.module.css'
import { handleInputChange } from '../../utils/utils';
import ProfileMovies from '../movies/ProfileMovies';
import Asset from '../../components/Asset';
import ListDisplayMovies from './ListDisplayMovies';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Alert from "../../components/Alert";
import { useErrorHandling } from './../../components/HandleErrors';
import { useProfileData } from '../../contexts/ProfileDataContext';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useRedirect } from '../../hooks/useRedirect';

const ListEditForm = () => {
    const { id } = useParams()
    const [listData, setListData] = useState({
        title: "",
        description: "",
        owner:"",
    });
    const { title, description, owner } = listData
    const [hasListLoaded, setHasListLoaded] = useState(false)
    const [hasMoviesLoaded, setHasMoviesLoaded] = useState(false)
    const [listedMovies, setListedMovies] = useState([]);
    const [movies, setMovies] = useState({})
    const [query, setQuery] = useState("")
    const search = query !== "" ? `?title=${query}` : ""
    const history = useHistory()

    //Errors and alert
    const { errors, activeAlert, handleErrors } = useErrorHandling();
    const allErrors = [
        { title: "List title", message: errors.title },
        { title: "List Description", message: errors.description },
    ]

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/lists/${id}`);
                console.log(data)
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
        const handleMount = () => {
            if ((profileData !== null && currentUser?.profile_id !== owner)) {
                history.push("/")
            }
        };

        handleMount();
    }, [profileData, history]);
    return (
        <>
            <Alert type="warning" errors={allErrors} active={activeAlert} />
            <Row className='mx-0'>
                <Col md={{ span: 10, offset: 1 }}>
                    {hasListLoaded ? (

                        <Form onSubmit={handleSubmit} className='d-flex flex-column'>
                            <Form.Group>
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
                        <ProfileMovies movies={movies} setMovies={setMovies} listSearch={true} listedMovies={listedMovies} setListedMovies={setListedMovies} />
                    ) : (
                        <Asset spinner />
                    )}
                </Col>
            </Row>
        </>

    )
}

export default ListEditForm