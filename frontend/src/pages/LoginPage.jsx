import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import FormContainer from '../ui/FormContainer';
import Loader from '../ui/Loader';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  // get userInfo from auth (we added userInfo to auth in authSlice initialState)
  const { userInfo } = useSelector(state => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);

  // http://localhost:3000/login?redirect=/shipping
  // check if there is redirect then set shipping to redirect otherwise simply set to home
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    // if there is userInfo in auth state, redirect to above redirect
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async e => {
    e.preventDefault();
    try {
      // send email and password from form to login and get response (userInfo)
      const res = await login({ email, password }).unwrap();
      // we sent userInfo to setCredentials to set it to localStorage
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success('Logged In Successfully');
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        {/* type 'submit' for form */}
        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          disabled={isLoading}>
          Sign In
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
