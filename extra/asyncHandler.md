# ASYNC HANDLER GUIDE - This will handle all errors in async functions

## Create a folder called middleware in backend folder

---

## Create a file called asyncHandler.js and add following code in it

### asyncHandler takes a function with three arguments. Then resolve that function and go next. If there is an error, this function will catch it and go next
```
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
}

export default asyncHandler;
```