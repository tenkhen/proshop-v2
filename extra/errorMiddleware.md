# ERROR HANDLER GUIDE

## Create a file called errorMiddleware.js in middleware folder and add following code
```js
const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  <!-- handling Mongoose bad ObjectId error -->
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    message = 'Resource not found';
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    <!-- if it's developer mode then return error stack -->
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

export { notFound, errorHandler };

```

---

## Initialize and using error handler

### Initialize by adding following code in server.js below app.use('/api/products', productRoutes);
```js
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

app.use(notFound);
app.use(errorHandler);
```

### Using error handler - Add following code wherever you need error handler

#### For example:
```js
if(!product) {
  res.status(404);
  throw new Error('Product not found')
}
```
