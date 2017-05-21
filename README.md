# Project Management

## install
after downloading type to console
`npm install`

## run

type to console `npm start`

open localhost:3000 in your browser

## Credentials
1. login: john; password: 1234
2. login: alik; password: 1234 
3. login: linux; password: 1234

## notes

For disable default values.
Go to `project-management-learning/src/index.js`
Comment 

```javascript
const store = createStore(rootReducer, defaultStore(), enhancer);
```

and uncomment 

```javascript
const store = createStore(rootReducer, {
     profile: {
         token: localStorage.getItem("authToken")   
     }
}, enhancer);
```
