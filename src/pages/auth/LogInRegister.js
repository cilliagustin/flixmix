import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { handleInputChange } from '../../utils/utils';
import styles from '../../styles/LogInRegister.module.css'
import btnStyles from '../../styles/Button.module.css'
import { Form, Col, Row, Container, Alert } from "react-bootstrap";
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const LogInRegister = () => {
  const history = useHistory()

  //set classes to show different forms
  const [showRegister, setShowRegister] = useState(false);
  const changeForm  = () => {
    setShowRegister(!showRegister)
    setTimeout(()=>{
      setRegisterData({registerUsername: "",registerPassword1: "",registerPassword2: "",})
    },800)
  };

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
    const registerSubmitObj = {username: registerUsername, password1: registerPassword1, password2: registerPassword2}
    console.log(registerSubmitObj)
    try {
      await axios.post("/dj-rest-auth/registration/", registerSubmitObj);
      changeForm();
    } catch (err) {
      setRegisterErrors(err.response?.data);
      console.log(registerErrors)
    }
  }


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



  return (
    <Row>
      <Col className='my-auto' xs={{span: 10, offset:1}}>
        <Container className={styles.FormContainer}>
          <div className={`${styles.Forms} ${showRegister && styles.ShowRegister}`}>
            <div className={styles.FormCard}>
              <h2>Log In</h2>
              <Form className={styles.Form}>
                <Form.Group className={styles.FormGroup} controlId="log_in_username">
                  <Form.Label className="d-none">username</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="text"
                    placeholder="Username"
                    name="log_in_username"
                  />
                </Form.Group>
                <Form.Group className={styles.FormGroup} controlId="log_in_password1">
                  <Form.Label className="d-none">Password</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="password"
                    placeholder="Password"
                    name="log_in_password1"
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
                {registerErrors.username?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
                
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
                {registerErrors.password1?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
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
                {registerErrors.password2?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
                <button
                  className={`${btnStyles.Button}`}
                  type="submit"
                >
                  submit
                </button>
                {registerErrors.non_field_errors?.map((message, idx) => (
                  <Alert key={idx} variant="warning" className="mt-3">
                    {message}
                  </Alert>
                ))}
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
  )
}

export default LogInRegister

