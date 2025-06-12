// src/config/swagger.js

import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
dotenv.config();

const options = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Backend3 API',
            version: '1.0.0',
            description: 'API para mocks, usuarios, mascotas y adopciones'
        },
        servers: [
            { url: `http://localhost:${process.env.PORT || 8080}` }
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        first_name: { type: 'string' },
                        last_name: { type: 'string' },
                        email: { type: 'string' },
                        role: { type: 'string' },
                        pets: {
                            type: 'array',
                            items: { type: 'string' }
                        }
                    }
                },
                Pet: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        name: { type: 'string' },
                        type: { type: 'string' },
                        age: { type: 'integer' }
                    }
                }
            }
        }
    },
    apis: [
        './src/mocks/mocks.router.js',
        './src/routes/adoption.router.js'
    ]
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
