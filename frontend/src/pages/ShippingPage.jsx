import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../ui/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { saveShippingAddress } from '../slices/cartSlice';
import CheckoutSteps from '../ui/CheckoutSteps';

const ShippingPage = () => {
  const cart = useSelector(state => state.cart);
  // grab shipping address from localStorage
  const { shippingAddress } = cart;

  // if shipping address exists, fill up with shipping address or fill with empty string
  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = e => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h2>Shipping</h2>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" className="mt-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="city" className="mt-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="postalCode" className="mt-3">
          <Form.Label>Postal code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={e => setPostalCode(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="country" className="mt-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            onChange={e => setCountry(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
