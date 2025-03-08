import React, { useState } from "react";
import { Container, Row, Col, Form, Button, ToggleButton, ToggleButtonGroup } from "react-bootstrap";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const onGoogleLogin = () => {
    window.location.replace(`http://localhost:3000/api/auth/google?type=${isLogin ? 'logIn' : 'signUp'}`)
  }

  return (
    // <div>
    //     <button onClick={() => {
    //         window.location.replace('http://localhost:3000/api/auth/google?type=login');
    //     }} type="button" className='add-user-btn'>Google Login</button>
    // </div>
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <div className="border p-4 shadow rounded">
            <h3 className="text-center mb-4">{isLogin ? "Login" : "Sign Up"}</h3>
            <ToggleButtonGroup type="radio" name="authToggle" className="w-100 mb-3" defaultValue={1}>
              <ToggleButton id="login-toggle" variant="outline-primary" value={1} onClick={() => setIsLogin(true)}>
                Login
              </ToggleButton>
              <ToggleButton id="signup-toggle" variant="outline-primary" value={2} onClick={() => setIsLogin(false)}>
                Sign Up
              </ToggleButton>
            </ToggleButtonGroup>
            <Form>
              {!isLogin && (
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>
              )}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 mb-2">
                {isLogin ? "Login" : "Sign Up"}
              </Button>
              <Button onClick={onGoogleLogin} variant="danger" className="w-100">
                Continue with Google
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Login