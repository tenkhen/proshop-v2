# DOT ENV GUIDE

### Install dotenv as dev dependency
`npm i dotenv --save-dev`

### Create .env file on the root

### Importing env file

#### Make sure to add dotenv.config() above where you use env
```
import dotenv from 'dotenv';
dotenv.config();

<!-- for example -->
const port = process.env.PORT; 
```