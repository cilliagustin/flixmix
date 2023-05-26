import React, { useState } from 'react';
import { handleInputChange } from '../../utils/utils';
import styles from '../../styles/LogInRegister.module.css'
import btnStyles from '../../styles/Button.module.css'
import { Form, Col, Row, Container } from "react-bootstrap";
import Alert from '../../components/Alert';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';
import { useRedirect } from '../../hooks/useRedirect';

const LogInRegister = () => {
  useRedirect('loggedIn')

  //user context
  const setCurrentUser = useSetCurrentUser()


  //history
  const history = useHistory()

  //handle Login form
  const [logInData, setLogInData] = useState({
    logInUsername: "",
    logInPassword: "",
  });
  const { logInUsername, logInPassword } = logInData;
  const [logInErrors, setLogInErrors] = useState({});
  const handleLogInSubmit = async (event) => {
    event.preventDefault();
    setLogInErrors({});
    setRegisterErrors({});
    const logInSubmitObj = { username: logInUsername, password: logInPassword }
    try {
      const {data} = await axios.post("/dj-rest-auth/login/", logInSubmitObj);
      setCurrentUser(data.user)
      history.goBack()
    } catch (err) {
      setLogInErrors(err.response?.data);
      createAlert()
    }
  }

  //handle register form
  const [registerData, setRegisterData] = useState({
    registerUsername: "",
    registerPassword1: "",
    registerPassword2: "",
  });
  const { registerUsername, registerPassword1, registerPassword2 } = registerData;
  const [registerErrors, setRegisterErrors] = useState({});
  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setLogInErrors({});
    setRegisterErrors({});
    const registerSubmitObj = { username: registerUsername, password1: registerPassword1, password2: registerPassword2 }
    try {
      await axios.post("/dj-rest-auth/registration/", registerSubmitObj);
      changeForm();
    } catch (err) {
      setRegisterErrors(err.response?.data);
      createAlert()
    }
  }

  //set classes to show different forms
  const [showRegister, setShowRegister] = useState(false);
  const changeForm = () => {
    setLogInErrors({});
    setRegisterErrors({});
    setShowRegister(!showRegister)
    setTimeout(() => {
      setRegisterData({ registerUsername: "", registerPassword1: "", registerPassword2: "" })
      setLogInData({ logInUsername: "", logInPassword: "" })
    }, 800)
  };

  const logInOverlayContent = <>
    <h3>Welcome Back!</h3>
    <p>Please enter with your credentials to log in.</p>
    <p>If you don´t have an account yet please register.</p>
    <button onClick={changeForm} className={`${btnStyles.Button} ${btnStyles.Inverted}`}>Register</button>
  </>
  const registerOverlayContent = <>
    <h3>Welcome!</h3>
    <p>Please fill out the form to Register.</p>
    <p>If you already have an account please Log in using your credentials.</p>
    <button onClick={changeForm} className={`${btnStyles.Button} ${btnStyles.Inverted}`}>Log In</button>
  </>

  //Errors and alert
  const [timeout, setTimeoutId] = useState(null);
  const [activeAlert, setActiveAlert] = useState(false);
  const allErrors = [
    {title: "registration form username", message: registerErrors.username}, 
    {title: "registration form password", message: registerErrors.password1}, 
    {title: "registration form password confirmation", message: registerErrors.password2}, 
    {title: "registration form", message: registerErrors.non_field_errors},  
    {title: "log in form username", message: logInErrors.username}, 
    {title: "log in form password", message: logInErrors.password}, 
    {title: "log in form", message: logInErrors.non_field_errors}
  ]
  const createAlert = () => {
    if (timeout) {
      clearTimeout(timeout);
      setTimeoutId(null);
    }
    setActiveAlert(true);
    const newTimeout = setTimeout(() => {
      setActiveAlert(false);
    }, 5000);
    setTimeoutId(newTimeout);
  };



  return (
    <>
      <Alert type="warning" errors={allErrors} active={activeAlert} />
      <Row className='mx-0'>
        <Col className='my-auto' xs={{ span: 10, offset: 1 }}>
          <Container className={styles.FormContainer}>
            <div className={`${styles.Forms} ${showRegister && styles.ShowRegister}`}>
              <div className={styles.FormCard}>
                <h2>Log In</h2>
                <Form className={styles.Form} onSubmit={handleLogInSubmit}>
                  <Form.Group className={styles.FormGroup} controlId="logInUsername">
                    <Form.Label className="d-none">username</Form.Label>
                    <Form.Control
                      className={styles.Input}
                      type="text"
                      placeholder="Username"
                      name="logInUsername"
                      value={logInUsername}
                      onChange={(event) => handleInputChange(event, logInData, setLogInData)}
                    />
                  </Form.Group>
                  <Form.Group className={styles.FormGroup} controlId="logInPassword">
                    <Form.Label className="d-none">Password</Form.Label>
                    <Form.Control
                      className={styles.Input}
                      type="password"
                      placeholder="Password"
                      name="logInPassword"
                      value={logInPassword}
                      onChange={(event) => handleInputChange(event, logInData, setLogInData)}
                    />
                  </Form.Group>
                  <button
                    className={`${btnStyles.Button}`}
                    type="submit"
                  >
                    submit
                  </button>
                </Form>
                <span>You don´t have an account yet?<br></br>Click <button onClick={changeForm} className={btnStyles.ButtonLink}>here</button> to register</span>
              </div>
              <div className={`${styles.FormCard} ${styles.FormCardRegister}`}>
                <h2>Register</h2>
                <Form className={styles.Form} onSubmit={handleRegisterSubmit}>
                  <Form.Group className={styles.FormGroup} controlId="registerUsername">
                    <Form.Label className="d-none">username</Form.Label>
                    <Form.Control
                      className={styles.Input}
                      type="text"
                      placeholder="Username"
                      name="registerUsername"
                      onChange={(event) => handleInputChange(event, registerData, setRegisterData)}
                      value={registerUsername}
                    />
                  </Form.Group>
                  <Form.Group className={styles.FormGroup} controlId="registerPassword1">
                    <Form.Label className="d-none">Password</Form.Label>
                    <Form.Control
                      className={styles.Input}
                      type="password"
                      placeholder="Password"
                      name="registerPassword1"
                      value={registerPassword1}
                      onChange={(event) => handleInputChange(event, registerData, setRegisterData)}
                    />
                  </Form.Group>
                  <Form.Group className={styles.FormGroup} controlId="registerPassword2">
                    <Form.Label className="d-none">Confirm password</Form.Label>
                    <Form.Control
                      className={styles.Input}
                      type="password"
                      placeholder="Confirm password"
                      name="registerPassword2"
                      value={registerPassword2}
                      onChange={(event) => handleInputChange(event, registerData, setRegisterData)}
                    />
                  </Form.Group>
                  <button
                    className={`${btnStyles.Button}`}
                    type="submit"
                  >
                    submit
                  </button>
                </Form>
                <span>You already have an account?<br></br>Click <button onClick={changeForm} className={btnStyles.ButtonLink}>here</button> to Log In</span>
              </div>
              <div className={styles.Overlay}>
                {showRegister ? registerOverlayContent : logInOverlayContent}
              </div>
            </div>
          </Container>

        </Col>
      </Row>
    </>
  )
}

export default LogInRegister

