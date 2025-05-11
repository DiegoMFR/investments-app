# Frontend assignment
Welcome to the Brand New Day Frontend assignment! 
You can find the [full assignment here](assignment.md) and the [backend services here](backend). 

## Run backend services
Go to the relevant folder and run `npm start`, when started it'll display the relevant URLs.
Note that for both the MVC & API requests a valid JWT is required, which will be automatically generated when you start a service.

```bash
$ npm start

> product-details@1.0.0 start
> node src/index.js

Server is running on http://localhost:3001
Example requests:
curl -X GET http://localhost:3001/product/overview/12345 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NSIsImlhdCI6MTc0NTU2MzY1NSwiZXhwIjoxNzQ1NTY3MjU1fQ.yWc0GhAhLu9I7IExeviOIDJx9wlg2RUvvVBpjOq3I9I"
```
