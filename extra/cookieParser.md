# COOKIE PARSER GUIDE - Parse cookie that we created with jwt

## Install cookie parser
`npm i cookie-parser`

---

## Initialize cookie parser middleware in server.js. This will allow us to access req.cookies
```js
import cookieParser from 'cookie-parser';

// right above main api
app.use(cookieParser());
```