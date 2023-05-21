import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser, useSetCurrentUser } from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { useErrorHandling } from './../../components/HandleErrors';
import Asset from "../../components/Asset";
import Alert from "../../components/Alert";

const UsernameForm = () => {
  const [username, setUsername] = useState("");

  const { errors, activeAlert, handleErrors } = useErrorHandling();
  const allErrors = [
    { title: "Username", message: errors.username },
  ]

  const history = useHistory();
  const { id } = useParams();

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (currentUser !== null) {
      setHasLoaded(true);
      if (currentUser?.profile_id?.toString() === id) {
        setUsername(currentUser.username);
      } else {
        history.push("/");
      }
    }
  }, [currentUser, history, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put("/dj-rest-auth/user/", {
        username,
      });
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username,
      }));
      history.goBack();
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        handleErrors(err.response?.data);
      }
    }
  };

  return (
    <>
      <Alert type="warning" errors={allErrors} active={activeAlert} />
      <Row className="mx-0">
        <Col className="py-2 mx-auto text-center" md={6}>
          <Container
            className={appStyles.Content}
          >
            {hasLoaded ? (
              <Form onSubmit={handleSubmit} className="my-2">
                <Form.Group>
                  <Form.Label>Change username</Form.Label>
                  <Form.Control
                    placeholder="username"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className={appStyles.Input}
                  />
                </Form.Group>
                <button
                  className={`${btnStyles.Button} ${btnStyles.HoverWhite} mx-1`}
                  onClick={() => history.goBack()}
                >
                  cancel
                </button>
                <button
                  className={`${btnStyles.Button} ${btnStyles.HoverWhite} mx-1`}
                  type="submit"
                >
                  save
                </button>
              </Form>
            ) : (
              <Asset spinner />
            )}
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default UsernameForm;