# BCRYPT JS

## Install bcrypt at root
`npm i bcryptjs`

---

## Use bcrypt to encrypt a password as follows
```js
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

---

## Decrypt the password (e.g. in userModel.js we will decrypt password compare it)
```js
import bcrypt from 'bcryptjs'

// compare plain text password with decrypted password
// here we add method called matchPassword to userSchema. So it will be accessible in userController
// use regular function here. Arrow function doesn't work here somehow
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
```

## Encrypt password before save it to database (registering new user)
```js
// with 'pre', it will run before with action we choose (save). Here run before we save to user database
userSchema.pre('save', async function (next) {
  // if we are not dealing with password then move on to next
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
```