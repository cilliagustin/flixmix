import React from 'react';
import { Link } from "react-router-dom";
import styles from '../../styles/LogInRegister.module.css'
import btnStyles from '../../styles/Button.module.css'
import { Form, Col, Row, Container } from "react-bootstrap";

const LogInRegister = () => {
  return (
    <Row>
      <Col className='my-auto' xs={{span: 10, offset:1}}>
        <Container className={styles.FormContainer}>
          <div className={styles.Forms}>
            <div className={styles.FormCard}>
              <h2>Register</h2>
              <Form className={styles.Form}>
                <Form.Group controlId="register_username">
                  <Form.Label className="d-none">username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    name="register_username"
                  />
                </Form.Group>
                <Form.Group controlId="register_password1">
                  <Form.Label className="d-none">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="register_password1"
                  />
                </Form.Group>
                <Form.Group controlId="register_password2">
                  <Form.Label className="d-none">Confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    name="register_password2"
                  />
                </Form.Group>
                <button
                  className={`${btnStyles.Button} `}
                  type="submit"
                >
                  Sign up
                </button>
              </Form>
            </div>
          </div>
        </Container>
      
      </Col>
    </Row>
  )
}

export default LogInRegister

