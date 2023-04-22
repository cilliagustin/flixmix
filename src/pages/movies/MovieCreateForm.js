import React, { useState } from "react";

import { Form, Col, Row, Container } from "react-bootstrap";

import Upload from "../../assets/upload.png";

import styles from "../../styles/MovieCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";

function MovieCreateForm() {

    const [errors, setErrors] = useState({});

    const [postData, setPostData] = useState({
        title: "",
        content: "",
        image: "",
      });
      const { title, content, image } = postData;


    const textFields = (
        <div className={`text-center`}>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    className={styles.Input}
                    type="text"
                    name="title"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Synopsis</Form.Label>
                <Form.Control
                    className={`${appStyles.TextArea} ${styles.Input}`}
                    as="textarea"
                    rows={6}
                    name="synopsis"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Director</Form.Label>
                <Form.Control
                    className={`${appStyles.TextArea} ${styles.Input}`}
                    as="textarea"
                    rows={1}
                    name="directors"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Main Cast</Form.Label>
                <Form.Control
                    className={`${appStyles.TextArea} ${styles.Input}`}
                    as="textarea"
                    rows={3}
                    name="main_cast"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Release Year</Form.Label>
                <Form.Control
                    className={`${appStyles.TextArea} ${styles.Input}`}
                    type="number"
                    min="1888"
                    name="release_year"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Genre</Form.Label>
                <Form.Control as="select" custom className={styles.Input}>
                    <option disabled selected value="">------</option>
                    <option>action</option>
                    <option>adventure</option>
                    <option>comedy</option>
                    <option>drama</option>
                    <option>fantasy</option>
                    <option>horror</option>
                    <option>mystery</option>
                    <option>romance</option>
                    <option>science_fiction</option>
                    <option>thriller</option>
                    <option>crime</option>
                    <option>documentary</option>
                    <option>historical</option>
                    <option>musical</option>
                </Form.Control>
            </Form.Group>

            <button
                className={`${btnStyles.Button} mx-1`}
                onClick={() => { }}
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
            <Form>
                <Row>
                    <Col className="py-2 p-0 p-md-2" md={{span:7, order:2}}>
                        <Container
                            className={`${styles.ColContainer} d-flex flex-column justify-content-center`}
                        >
                            <Form.Group className="text-center">
                                <Form.Label
                                    className="d-flex justify-content-center"
                                    htmlFor="image-upload"
                                >
                                    <Asset src={Upload} message={"Click or tap to upload an image"} />
                                </Form.Label>

                            </Form.Group>
                            <div className="d-md-none">{textFields}</div>
                        </Container>
                    </Col>
                    <Col md={{span:5, order:1}} className="d-none d-md-block p-0 p-md-2">
                        <Container className={`${styles.ColContainer}`}>{textFields}</Container>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default MovieCreateForm;