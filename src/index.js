// src/index.js

import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { mocksRouter } from './mocks/mocks.router.js';
import { adoptionRouter } from './routes/adoption.router.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Routes
app.use('/api/mocks', mocksRouter);
app.use('/api/adoptions', adoptionRouter);

// Swagger UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to database
connectDB();

app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    console.log(`📖 Documentación Swagger: http://localhost:${PORT}/api/docs`);
});
