# PAYPAL SANDBOX GUIDE - For virtual payment

## Creating PayPal App

1. Create PayPal account
2. Go to PayPal developer website dashboard - https://developer.paypal.com/dashboard/
3. Click on Apps & Credentials and click on Create App button
4. Give a name, select Merchant, leave Sandbox Account as its and click on CreateApp
5. Copy Client ID and paste it in .env with key PAYPAL_CLIENT_ID
6. Go to Testing Tools and select SandBox Accounts
7. Click on email ending with @personal.example.com
8. Under Login Info, Save Email and Password. We need this when we pay

---

## Setting PayPal route in server.js

```js
app.get('/api/config/paypal', (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
})
```

---

## Installing React PayPal package - (In frontend folder)
`npm i @paypal/react-paypal-js`

--- 

## Wrap main route in PayPalScriptProvider
```js
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

<PayPalScriptProvider deferLoading={true}>
  <RouterProvider router={router} />
</PayPalScriptProvider>
```

---

## Add payOrder mutation and getPayPalClientId query in ordersApiSlice.js
```js
payOrder: builder.mutation({
  query: ({orderId, details}) => ({
    url: `${ORDERS_URL}/${orderId}/pay`,
    method: 'PUT',
    body: { ...details },
  }),
}),
getPayPalClientId: builder.query({
  query: () => ({
    url: PAYPAL_URL, // coming from constants.js /api/config/paypal
  }),
  keepUnusedDataFor: 5,
}),

export const { usePayOrderMutation, useGetPayPalClientIdQuery } = ordersApiSlice;
```

## Using React PayPal in OrderPage.js
```js
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from '../slices/ordersApiSlice';

const { id: orderId } = useParams();
const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
const { userInfo } = useSelector(state => state.auth);
const {
  data: paypal,
  isLoading: loadingPayPal,
  error: errorPayPal,
} = useGetPayPalClientIdQuery();

const {
  data: order,
  refetch,
  isLoading,
  error,
} = useGetOrderDetailsQuery(orderId);

useEffect(() => {
  if (!errorPayPal && !loadingPayPal && paypal.clientId) {
    const loadPayPalScript = async () => {
      paypalDispatch({
        type: 'resetOptions',
        value: {
          'client-id': paypal.clientId,
          currency: 'USD',
        },
      });
      paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
    };
    if (order && !order.isPaid) {
      if (!window.paypal) {
        loadPayPalScript();
      }
    }
  }
}, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

const onApprove = (data, actions) => {
  return actions.order.capture().then(async function (details) {
    try {
      await payOrder({ orderId, details });
      refetch();
      toast.success('Payment successfull');
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  });
};

const createOrder = (data, actions) => {
  return actions.order
    .create({
      purchase_units: [
        {
          amount: {
            value: order.totalPrice,
          },
        },
      ],
    })
    .then(orderId => {
      return orderId;
    });
};

const onError = error => {
  toast.error(error.messge);
};

// PayPal button in return section of OrderPage.jsx
{!order.isPaid && (
  <ListGroup.Item>
    {loadingPay && <Loader />}{' '}
    {isPending ? (
      <Loader />
    ) : (
      <div>
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}></PayPalButtons>
      </div>
    )}
  </ListGroup.Item>
)}

```
