# BCRYPT JS

## Install bcrypt at root
`npm i bcryptjs`

---

## Use bcrypt to encrypt a password as follows
```
import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    // this will encrypt our password. Second parameter is called salt, which more higher more secure, but slower. 10 is sweet spot
    password: bcrypt.hashSync('1234', 10),
    isAdmin: true,
  },
];

export default users;
```