import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { axiosReq } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";

import { useErrorHandling } from './../../components/HandleErrors';
import Alert from "../../components/Alert";

import { handleInputChange } from '../../utils/utils';

const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    name: "",
    description: "",
    image: "",
  });
  const { name, description, image } = profileData;

  const [hasLoaded, setHasLoaded] = useState(false);

  const { errors, activeAlert, handleErrors } = useErrorHandling();
  const allErrors = [
    { title: "Username", message: errors.name },
    { title: "Username", message: errors.description },
    { title: "Username", message: errors.image },
  ]

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, description, image } = data;
          setProfileData({ name, description, image });
          setHasLoaded(true)
        } catch (err) {
          console.log(err);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
  }, [currentUser, history, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      history.goBack();
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        handleErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <>
      <Form.Group>
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          className={appStyles.Input}
          type="text"
          name="name"
          value={name}
          onChange={(event) => handleInputChange(event, profileData, setProfileData)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Bio</Form.Label>
        <Form.Control
         className={appStyles.TextArea}
          as="textarea"
          value={description}
          onChange={(event) => handleInputChange(event, profileData, setProfileData)}
          name="description"
          rows={7}
        />
      </Form.Group>
      <button
        className={`${btnStyles.Button} ${btnStyles.HoverWhite} mx-1`}
        onClick={() => history.goBack()}
      >
        cancel
      </button>
      <button className={`${btnStyles.Button} ${btnStyles.HoverWhite} mx-1`} type="submit">
        save
      </button>
    </>
  );

  return (
    <>
      <Alert type="warning" errors={allErrors} active={activeAlert} />
      {hasLoaded ? (
        <Form onSubmit={handleSubmit}>
          <Row className="mx-0">
            <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
              <Container className={appStyles.Content}>
                <Form.Group>
                  {image && (
                    <figure>
                      <Image src={image} fluid />
                    </figure>
                  )}
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.BigButton} ${btnStyles.HoverWhite} m-auto`}
                      htmlFor="image-upload"
                    >
                      Change image
                    </Form.Label>
                  </div>
                  <Form.File
                    className="d-none"
                    id="image-upload"
                    ref={imageFile}
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files.length) {
                        setProfileData({
                          ...profileData,
                          image: URL.createObjectURL(e.target.files[0]),
                        });
                      }
                    }}
                  />
                </Form.Group>
                <div className="d-md-none">{textFields}</div>
              </Container>
            </Col>
            <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
              <Container className={appStyles.Content}>{textFields}</Container>
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
};

export default ProfileEditForm;