const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Product API',
            version: '1.0.0',
            description: 'eCommerce Product Service API'
        },
        servers: [{
            url: 'https://ecommerce-project-3zgl.onrender.com'
        }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                Admin: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        email: { type: 'string' }
                    }
                },
                Product: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                        price: { type: 'number' },
                        sku: { type: 'string' },
                        image: { type: 'string' },
                        availability: { type: 'boolean' }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.js']
};

module.exports = swaggerJsdoc(options);