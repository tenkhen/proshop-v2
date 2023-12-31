# AXIOS GUIDE

## Install Axios
`npm i axios`

---

## Fetching with Axios
```js
import { useEffect, useState } from 'react';
import axios from 'axios';

const [products, setProducts] = useState([]);

useEffect(() => {
  const fetchProducts = async () => {
    const { data } = await axios.get('/api/products');
    setProducts(data);
  };
  fetchProducts();
}, []);
```