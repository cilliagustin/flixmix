import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styles from '../../styles/LogInRegister.module.css'
import btnStyles from '../../styles/Button.module.css'
import { Form, Col, Row, Container } from "react-bootstrap";

const LogInRegister = () => {
  const [showRegister, setShowRegister] = useState(false);

  const changeForm  = () => {setShowRegister(!showRegister)};

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
              <Form className={styles.Form}>
                <Form.Group className={styles.FormGroup} controlId="register_username">
                  <Form.Label className="d-none">username</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="text"
                    placeholder="Username"
                    name="register_username"
                  />
                </Form.Group>
                <Form.Group className={styles.FormGroup} controlId="register_password1">
                  <Form.Label className="d-none">Password</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="password"
                    placeholder="Password"
                    name="register_password1"
                  />
                </Form.Group>
                <Form.Group className={styles.FormGroup} controlId="register_password2">
                  <Form.Label className="d-none">Confirm password</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="password"
                    placeholder="Confirm password"
                    name="register_password2"
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
  )
}

export default LogInRegister

