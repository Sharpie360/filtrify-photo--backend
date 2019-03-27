# Filtrify Photo Backend

## For Livecoding Stream
### **(1) Express Server**  
- init Express webserver
- wildcard route for adding cors proxy to all requests
- add cors to express server to share with frontend
- add url-validation to test for valid URLs
### **(2) CORS Adder**  
- pull url from path prop on request object
  - validate url
  - make request to resourse
  - pipe resource response into response object
### **(3) Error Handling**  
  - write error handler function
    - if invalid url skip request
    - call next with error
  - if error from remote server
    - return new error
### **(4) Deployment**  
- try and deploy
- try against deployed



- Do it again to understand it better
- Break into 4 main tasks
- Beginner friendly as possible

- Deployment of Backend

## For Filtrify Fullstack Series
[new] [future series]

- Node / Express webserver
  - CORS
  - Auth and Auth [coding garden]
    - jwt and bcrypt
  - routes
- MongoDB hosted DB
  - Users
  - CSS Filter JSON
  - Gradient Filter JSON
- Deployment

