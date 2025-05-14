// src/index.js

import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { mocksRouter } from './mocks/mocks.router.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use('/api/mocks', mocksRouter);

connectDB();

app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
