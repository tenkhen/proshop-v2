# REACT HELMET ASYNC - 

## Installing  React helmet async in frontend folder
`npm i react-helmet-async`

---

## Adding provider in main.jsx as follows
```js
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <React.StrictMode>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
        <Toaster />
      </Provider>
    </React.StrictMode>
  </HelmetProvider>
);
```

---

## Creating component file called Meta.jsx in ui (or component) folder

```js
import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome to ProShop',
  description: 'We sell the best products for cheap',
  keywords: 'electronics, buy electronics, cheap electronics',
};

export default Meta;
```

---

## Using React helmet - We use it to change page title individually
```js
import Meta from '../ui/Meta';

return {
  <Meta title={product.name} />
}
```