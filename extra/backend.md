# BACKEND GUIDE

## package.json

### Initialize package.json

`npm init`

### Set importing type to modules (default is commonjs. E.g. required)

#### Add following code under description in package.json (backend)
```
'type': 'modules'
```

### Run server with scripts

#### Add following code in package.json
```
"scripts": {
  "start": "node backend/server.js"
}
```
---

## Express

### Install express dependency on root

`npm i express`

### Initialize express

```
import express from 'express';
const port = 5000;

const app = express();
```

### Create express route

```
app.get('/', (req, res) => {
  res.send('API is running...');
});
```

### Start the server app

```
app.listen(port, () => console.log(`Server running on port ${port}`));
```

### Add all products API

#### Don't forget to add file extension (.js) when importing
```
import products from '../data/products.js';

app.get('/api/products', (req, res) => {
  res.json(products);
});
```

### Add single product API
```
app.get('/api/product/:id', (req, res) => {
  const product = products.find(product => product._ip === req.params.id);

  res.json(product);
});
```