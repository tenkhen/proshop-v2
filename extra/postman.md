# POSTMAN GUIDE - http client

## Download and install Postman (you can use browser version, but download is preference)

---

## Creating workspace

1. Click on Workspaces dropdown menu and click on Create Workspace and select Blank workspace
2. Give a name, select Personal and click on Create button

---

## Setting up environments - URL etc

1. Click on Environments (below above History from the left sidebar)
2. Click on + and give a name to environment
3. Under Variable, type variable name (e.g. baseURL)
4. For Initial value and Current value, use any value you want (e.g. http://localhost:5000/api)
5. Click on Save button
6. Click on No Environment dropdown menu and select newly created environment

---

## Creating Collections

1. Click on Collections, click on +, select Blank collection, give a collection name (e.g. Products)

---

## Creating Requests

#### You can have multiple requests (GET, POST, PUT, DELETE) with different url
1. Click on ellipsis next to collection name (e.g. Products), select Add request
2. Give request a name (e.g. Get All Products)
3. Select GET from dropdown menu and enter url using environment (e.g. {{baseURL}}/products)
4. Save the request by clicking on Save button