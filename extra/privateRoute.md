# PRIVATE ROUTE GUIDE - Some routes can only be accessed with conditions

## Check if userInfo in state, if yes then allow to access route other wise return to /login
```
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const { userInfo } = useSelector(state => state.auth);

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
```

## Usage
```
<Route path="/" element={<App />}>
  <Route index={true} path="/" element={<HomePage />} />
  <Route path="/products/:id" element={<ProductPage />} />
  <Route path="/cart" element={<CartPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />

  <Route path='' element={<PrivateRoute />}>
    <Route path="/shipping" element={<ShippingPage />} />
    <Route path="/payment" element={<PaymentPage />} />
  </Route>
</Route>
```