import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Chat API',
    version: '1.0.0',
    description: 'A simple chat application in Node.js and Express',
  },
  host: 'localhost:5000/api'
};

const outputFile = './swagger-output-api.json';
const routes = ["./app/routes.ts"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);