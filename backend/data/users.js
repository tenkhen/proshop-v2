import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    // this will encrypt our password. Second parameter is called salt, which more higher more secure, but slower. 10 is sweet spot
    password: bcrypt.hashSync('1234', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@email.com',
    // this will encrypt our password. Second parameter is called salt, which more higher more secure, but slower. 10 is sweet spot
    password: bcrypt.hashSync('1234', 10),
    isAdmin: false,
  },
  {
    name: 'Jane Doe',
    email: 'jane@email.com',
    // this will encrypt our password. Second parameter is called salt, which more higher more secure, but slower. 10 is sweet spot
    password: bcrypt.hashSync('1234', 10),
    isAdmin: false,
  },
];

export default users;
