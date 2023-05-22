import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { useErrorHandling } from './../../components/HandleErrors';
import Asset from "../../components/Asset";
import Alert from "../../components/Alert";

const UserPasswordForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const currentUser = useCurrentUser();

  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;

  const { errors, activeAlert, handleErrors } = useErrorHandling();
  const allErrors = [
    { title: "Username", message: errors.new_password1 },
    { title: "Username", message: errors.new_password2 },
  ]

  const isLoading = true;
  const [hasLoaded, setHasLoaded] = useState(false);

  const [timeoutId, setTimeoutId] = useState(null);
  const [secondTimeoutId, setSecondTimeoutId] = useState(null);

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };


  useEffect(() => {
    setTimeout(()=>{
      if (currentUser?.profile_id?.toString() !== id) {
        history.push("/");
      } else{
        setHasLoaded(true);
      }
    }, 2500)

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(secondTimeoutId);
    };
  }, [currentUser, history, id]);

  useEffect(() => {
    let newSecondTimeoutId;
  
    if (!hasLoaded && !isLoading) {
      newSecondTimeoutId = setTimeout(() => {
        history.push("/");
      }, 200);
    }
  
    setSecondTimeoutId(newSecondTimeoutId);
  
    return () => clearTimeout(newSecondTimeoutId);
  }, [hasLoaded, isLoading]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
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
          <Container className={appStyles.Content}>
            {hasLoaded ? (
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>New password</Form.Label>
                  <Form.Control
                    placeholder="new password"
                    type="password"
                    value={new_password1}
                    onChange={handleChange}
                    name="new_password1"
                    className={appStyles.Input}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    placeholder="confirm new password"
                    type="password"
                    value={new_password2}
                    onChange={handleChange}
                    name="new_password2"
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

export default UserPasswordForm;