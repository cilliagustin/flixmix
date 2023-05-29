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
import { useProfileData } from "../../contexts/ProfileDataContext";
import { useRedirect } from "../../hooks/useRedirect";


/**
 * Display form to update username
*/
const UsernameForm = () => {
  const [username, setUsername] = useState("");

  const { errors, activeAlert, handleErrors } = useErrorHandling();
  const allErrors = [
    { title: "Username", message: errors.username },
  ]

  const history = useHistory();
  // get profile id from url
  const { id } = useParams();

  const currentUser = useCurrentUser();
  const profileData = useProfileData()
  const setCurrentUser = useSetCurrentUser();

  const [hasLoaded, setHasLoaded] = useState(false);


  // only allow the owner to access this page
  useRedirect('loggedOut')
  useEffect(() => {
    const handleMount = () => {

      if (currentUser?.profile_id?.toString() === id) {
        setUsername(currentUser.username);
        setHasLoaded(true);
      } else {
        history.push("/")
      }
    };

    if (profileData !== null) {
      handleMount();
    }
  }, [profileData, history]);


  //submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put("/dj-rest-auth/user/", {
        username,
      });
      //Update current user data
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username,
      }));
      // go back to the previous page
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
              //if data has loaded display the form
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
              //if data has not loaded display the spinner
              <Asset spinner />
            )}
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default UsernameForm;