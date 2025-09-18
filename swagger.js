const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My Api',
        description: 'Temple API'
    },
    host: 'localhost:3000',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Note to self: this is what helps auto-generate a swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc)