# Filtrify Photo Backend

## For Livecoding Stream
### **(1) Express Server**  
- init Express webserver
- init favicon route for favicon.ico request
- wildcard route for adding cors proxy to all requests
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
- write URL repair function
  - check if contains [ :/ ] ~ ?
    - ~ break into 3 vars
      - [ http ] var
      - [ :/ ] static string var
      - [ /rest-of-link.com/something ] var
    - ~ use provided url without repair Fn
- deploy to Now.sh
- update frontend to hit cors proxy
- test using known CORS blocked image
- celebrate!
---

## TODO

- Do it again to understand it better
- Break into 4 main tasks
- Beginner friendly as possible

- Deployment of Backend

---

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

