# MONGODB GUIDE

## Setting up mongodb

### Sign up mongodb for free

### Create new project

1. Click on Create new project
2. Give a project name
3. Add member to project and click on Create Project button

### Create a deployment

1. Click on Create (in overview window)
2. Choose M0 (FREE) unless you want to pay
3. Choose AWS as a provider
4. Leave rest as default and click on Create button

### Create user

1. Click on Username and Password
2. Choose a username and generate password and copy it and save it to .env
3. Click on Create User button

### Add IP address

1. Click on My Local Environment
2. If your ip address is already listed in IP Access list then good to go
3. Otherwise click on Add My Current IP Address and click on Finish and Close

### Connect to cluster

1. Go to project and click on Connect
2. Click Drivers under Connect to your application
3. Copy application code and save it to .env

### Create DataBase

1. Go to project and click on Database under Deployment on the left side navigation bar
2. Click on Browse Collections
3. If you have database already, you will see it. Otherwise click on Add My Own Data
4. Give database a name and collection name (e.g. products, users etc)
5. No need to select Aditional Preferences and click on Create button

### Edit URI

1. Replace <password> with real password of user (above)
```
mongodb+srv://khen123:<password>@cluster0.dhlrsgv.mongodb.net/?retryWrites=true&w=majority
```
2. Add product name after mongodb.net as follows:
```
@cluster0.dhlrsgv.mongodb.net/your-product-name?retryWrites=true&w=majority
```

---

## MongoDB with MongoDB Compass

### Download MongoDB Compass

### Getting connection string for Compass

1. Go to MongoDB project
2. Click on Connect
3. Click on Compass under Access your data through tools
4. Select I have MongoDB Compass installed
5. Copy the connection string

### Connecting Compass to MongoDB

1. Paste it in Compass, New Connection
2. Replace <password> with real user password
3. Save it with your choice of name and color
4. Click on Connect