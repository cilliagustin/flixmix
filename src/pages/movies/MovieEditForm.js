import React, { useEffect, useRef, useState } from "react";

import { axiosReq } from '../../api/axiosDefaults'

import { Form, Col, Row, Container } from "react-bootstrap";

import styles from "../../styles/MovieCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import Alert from "../../components/Alert";
import { handleInputChange } from "../../utils/utils";
import { useErrorHandling } from './../../components/HandleErrors';
import Asset from "../../components/Asset";
import { useRedirect } from '../../hooks/useRedirect';
import { useProfileData } from '../../contexts/ProfileDataContext';


/**
 * Display list edit form
*/
function MovieEditForm() {
    // set the movie id from url
    const { id } = useParams()

    const [movieData, setMovieData] = useState({
        title: "",
        synopsis: "",
        directors: "",
        main_cast: "",
        release_year: "",
        movie_genre: "",
        image: "",
    });
    const { title, synopsis, directors, main_cast, release_year, movie_genre, image } = movieData;
    const history = useHistory()

    const imageInput = useRef(null)
    const [hasLoaded, setHasLoaded] = useState(false)

    // Set movie data
    useEffect(() => {
        const handleMount = async () => {
            try {
                //fetch movie from api
                const { data } = await axiosReq.get(`/movies/${id}`);
                const { title, synopsis, directors, main_cast, release_year, movie_genre, poster } = data;

                setMovieData({
                    title: title,
                    synopsis: synopsis,
                    directors: directors,
                    main_cast: main_cast,
                    release_year: release_year,
                    movie_genre: movie_genre,
                    image: poster,
                })
                setHasLoaded(true)
            } catch (err) {
                console.log(err)
            }
        }

        handleMount()
    }, [history, id])

    //manipulate image selection
    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setMovieData({
                ...movieData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    //submit changes
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('title', title);
        formData.append('synopsis', synopsis);
        formData.append('directors', directors);
        formData.append('main_cast', main_cast);
        formData.append('release_year', release_year);
        formData.append('movie_genre', movie_genre);

        if (imageInput?.current?.files[0]) {
            formData.append("poster", imageInput.current.files[0]);
        }


        try {
            await axiosReq.put(`/movies/${id}/`, formData);
            //redirect to movie page
            history.push(`/movies/${id}`);
        } catch (err) {
            console.log(err)
            if (err.response?.status !== 401) {
                // establish custom text for error in genre
                if (err.response?.data.movie_genre) {
                    err.response.data.movie_genre[0] = 'Must select a genre';
                }
                handleErrors(err.response?.data)
            }
        }
    }


    // only allow the admin to enter to this page
    useRedirect('loggedOut')
    const profileData = useProfileData()
    useEffect(() => {
        const handleMount = () => {
            if (profileData !== null && !profileData?.is_admin) {
                history.push("/")
            }
        };

        handleMount();
    }, [profileData, history]);


    //Errors and alert
    const { errors, activeAlert, handleErrors } = useErrorHandling();
    const allErrors = [
        { title: "Movie title", message: errors.title },
        { title: "Movie synopsis", message: errors.synopsis },
        { title: "Movie director", message: errors.directors },
        { title: "Movie cast", message: errors.main_cast },
        { title: "Movie release year", message: errors.release_year },
        { title: "Movie genre", message: "A valid genre must be selected" },
        { title: "Movie image", message: errors.poster },
    ]

    const textFields = (
        <div className={`text-center`}>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    className={styles.Input}
                    type="text"
                    name="title"
                    value={title}
                    onChange={(event) => handleInputChange(event, movieData, setMovieData)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Synopsis</Form.Label>
                <Form.Control
                    className={`${appStyles.TextArea} ${styles.Input}`}
                    as="textarea"
                    rows={6}
                    name="synopsis"
                    value={synopsis}
                    onChange={(event) => handleInputChange(event, movieData, setMovieData)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Director</Form.Label>
                <Form.Control
                    className={`${appStyles.TextArea} ${styles.Input}`}
                    as="textarea"
                    rows={1}
                    name="directors"
                    value={directors}
                    onChange={(event) => handleInputChange(event, movieData, setMovieData)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Main Cast</Form.Label>
                <Form.Control
                    className={`${appStyles.TextArea} ${styles.Input}`}
                    as="textarea"
                    rows={3}
                    name="main_cast"
                    value={main_cast}
                    onChange={(event) => handleInputChange(event, movieData, setMovieData)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Release Year</Form.Label>
                <Form.Control
                    className={`${appStyles.TextArea} ${styles.Input}`}
                    type="number"
                    min="1888"
                    max={new Date().getFullYear()}
                    name="release_year"
                    value={release_year}
                    onChange={(event) => handleInputChange(event, movieData, setMovieData)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Genre</Form.Label>
                <Form.Control
                    as="select"
                    custom
                    className={styles.Input}
                    name="movie_genre"
                    value={movie_genre}
                    onChange={(event) => handleInputChange(event, movieData, setMovieData)}
                >
                    <option className="text-center" disabled value="">------------------------------------</option>
                    <option value={"action"}>action</option>
                    <option value={"adventure"}>adventure</option>
                    <option value={"comedy"}>comedy</option>
                    <option value={"drama"}>drama</option>
                    <option value={"fantasy"}>fantasy</option>
                    <option value={"horror"}>horror</option>
                    <option value={"mystery"}>mystery</option>
                    <option value={"romance"}>romance</option>
                    <option value={"science_fiction"}>science fiction</option>
                    <option value={"thriller"}>thriller</option>
                    <option value={"crime"}>crime</option>
                    <option value={"documentary"}>documentary</option>
                    <option value={"historical"}>historical</option>
                    <option value={"musical"}>musical</option>
                </Form.Control>
            </Form.Group>

            <button
                className={`${btnStyles.Button} mx-1`}
                onClick={() => { history.goBack() }}
            >
                cancel
            </button>
            <button className={`${btnStyles.Button} mx-1`} type="submit">
                edit
            </button>
        </div>
    );

    return (
        <>
            <Alert type="warning" errors={allErrors} active={activeAlert} />
            {hasLoaded ? (
                <Form onSubmit={handleSubmit}>
                    <Row className="mx-0">
                        <Col className="py-2 p-0 p-md-2" md={{ span: 7, order: 2 }}>
                            <Container
                                className={`${styles.ColContainer} d-flex flex-column justify-content-center`}
                            >
                                <Form.Group className="text-center h-100">
                                    <div className={`${styles.SelectedImageContainer} p4`}>
                                        <div className={styles.ImageContainer}>
                                            <img src={image} alt="preview poster"></img>
                                        </div>
                                        <div className={styles.ButtonContainer}>
                                            <Form.Label
                                                className={`${btnStyles.Button} ${btnStyles.BigButton}`}
                                                htmlFor="image-upload"
                                            >
                                                Change the image
                                            </Form.Label>
                                        </div>
                                    </div>
                                    <Form.File
                                        id="image-upload"
                                        accept="image/"
                                        onChange={handleChangeImage}
                                        className="d-none"
                                        ref={imageInput}
                                    />

                                </Form.Group>
                                <div className="d-md-none">{textFields}</div>
                            </Container>
                        </Col>
                        <Col md={{ span: 5, order: 1 }} className="d-none d-md-block p-0 p-md-2">
                            <Container className={`${styles.ColContainer}`}>{textFields}</Container>
                        </Col>
                    </Row>
                </Form>
            ) : (
                <Container>
                    <Asset spinner />
                </Container>
            )}

        </>
    );
}

export default MovieEditForm;