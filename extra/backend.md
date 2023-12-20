# BACKEND GUIDE

## package.json

### Initialize package.json

`npm init`

### Set importing type to modules (default is commonjs. E.g. required)

#### Add following code under description in package.json (backend)
```
'type': 'modules'
```

### Starting scripts

#### Start normal server
```
"scripts": {
  "start": "node backend/server.js"
}
```

#### Start client - with prefix, it will go to frontend folder first and then start
```
"scripts": {
  "client": "npm run dev --prefix frontend"
}
```

#### For CRA (Create React App)
```
"scripts": {
  "client": "npm start --prefix frontend"
}
```

### Update server automatically when save file without need of restarting the server

#### Install nodemon and concurrently as dev dependency

`npm i nodemon concurrently --save-dev`

#### Add following to package.json file
```
"server": "nodemon backend/server.js"
```

#### Run both server and client
```
"dev": "concurrently \"npm run server\" \"npm run client\""
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

### Create express main route

```
app.get('/', (req, res) => {
  res.send('API is running...');
});
```

### Start the server

```
app.listen(port, () => console.log(`Server running on port ${port}`));
```
