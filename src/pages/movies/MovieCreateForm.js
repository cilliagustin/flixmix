import React, { useRef, useState } from "react";

import { axiosReq } from '../../api/axiosDefaults'

import { Form, Col, Row, Container } from "react-bootstrap";

import Upload from "../../assets/upload.png";

import styles from "../../styles/MovieCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Alert from "../../components/Alert";
import { handleInputChange } from "../../utils/utils";

function MovieCreateForm() {

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

    const imageInput = useRef(null)
    const history = useHistory()

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setMovieData({
                ...movieData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('title', title);
        formData.append('synopsis', synopsis);
        formData.append('directors', directors);
        formData.append('main_cast', main_cast);
        formData.append('release_year', release_year);
        formData.append('movie_genre', movie_genre);
        formData.append("poster", imageInput.current.files[0]);


        try {
            const { data } = await axiosReq.post("/movies/", formData);
            history.push(`/movies/${data.id}`);
        } catch (err) {
            console.log(err)
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
                createAlert()
            }
        }
    }

    
    //Errors and alert
    const [errors, setErrors] = useState({});
    const [timeout, setTimeoutId] = useState(null);
    const [activeAlert, setActiveAlert] = useState(false);
    const allErrors = [
        { title: "Movie title", message: errors.title },
        { title: "Movie synopsis", message: errors.synopsis },
        { title: "Movie director", message: errors.directors },
        { title: "Movie cast", message: errors.main_cast },
        { title: "Movie release year", message: errors.release_year },
        { title: "Movie genre", message: errors.movie_genre },
        { title: "Movie image", message: errors.poster },
    ]
    const createAlert = () => {
        if (timeout) {
          clearTimeout(timeout);
          setTimeoutId(null);
          setActiveAlert(false);
        }
        setActiveAlert(true);
        const newTimeout = setTimeout(() => {
          setActiveAlert(false);
        }, 5000);
        setTimeoutId(newTimeout);
      };

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
                create
            </button>
        </div>
    );

    return (
        <>
        <Alert  type="warning" errors={allErrors} active={activeAlert} />
            <Form onSubmit={handleSubmit}>
                <Row className="mx-0">
                    <Col className="py-2 p-0 p-md-2" md={{ span: 7, order: 2 }}>
                        <Container
                            className={`${styles.ColContainer} d-flex flex-column justify-content-center`}
                        >
                            <Form.Group className="text-center h-100">
                                {image ? (
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
                                ) : (
                                    <Form.Label
                                        className="d-flex justify-content-center"
                                        htmlFor="image-upload"
                                    >
                                        <Asset src={Upload} message={"Click or tap to upload an image"} />
                                    </Form.Label>
                                )}

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
        </>
    );
}

export default MovieCreateForm;