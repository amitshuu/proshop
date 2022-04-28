import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AlertMessage, Loading, FormContainer } from '../components';
import { setupUser, getUserDetails } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMember, setIsMember] = useState(true);
  const [name, setName] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { isLoading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    let currentUser;
    // Means register
    if (!isMember) {
      currentUser = { name, email, password };
      dispatch(setupUser({ currentUser, endpoint: '/api/users' }));
    } else {
      //Means log in
      currentUser = { email, password };
      dispatch(setupUser({ currentUser, endpoint: '/api/users/login' }));
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <AlertMessage variant='danger'>{error}</AlertMessage>}
      {isLoading && <Loading />}
      <Form onSubmit={submitHandler}>
        {!isMember && (
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
        )}
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='my-4'>
          {isMember ? 'Sign in' : 'Register'}
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          {isMember ? 'New customer?' : 'Already a member?'}
          <Button
            type='submit'
            variant='primary ms-3 btn-sm'
            onClick={() => setIsMember(!isMember)}
          >
            {isMember ? 'Register ' : 'Sign in'}
          </Button>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
