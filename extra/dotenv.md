# DOT ENV GUIDE

## Install dotenv as dev dependency
`npm i dotenv --save-dev`

---

## Create .env file on the root
---

## Importing env file

#### Make sure to add dotenv.config() above where you use env
```
import dotenv from 'dotenv';
dotenv.config();

<!-- for example -->
const port = process.env.PORT; 
```

--- 

## NodeJS with Vite (e.g. MERN with Vite)

### In this case you need to create separate .env.local in frontend folder
<!-- don't forget to add VITE_ prefix -->
```
<!-- in .env.local -->
VITE_URL=http://localhost:3000

<!-- where you are importing -->
import.meta.env.VITE_URL
```