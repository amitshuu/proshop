import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AlertMessage, Loading } from '../components';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const ProfileScreen = () => {
  const userDetails = useSelector((state) => state.userDetails);
  const { isLoading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { error: updateProfileError, success } = userUpdateProfile;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?.name) {
      dispatch(getUserDetails('profile'));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (success || updateProfileError) {
        dispatch({ type: USER_UPDATE_RESET });
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [success, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        _id: user._id,
        name,
        email,
        password,
      })
    );
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {updateProfileError && (
          <AlertMessage variant='danger'>{updateProfileError}</AlertMessage>
        )}
        {success && (
          <AlertMessage variant='success'>Profile updated!</AlertMessage>
        )}
        {isLoading ? (
          <Loading />
        ) : error ? (
          <AlertMessage variant='danger'>{error}</AlertMessage>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

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

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
