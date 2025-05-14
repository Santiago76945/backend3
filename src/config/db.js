// src/config/db.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('🟢 Base de datos conectada correctamente');
    } catch (error) {
        console.error('🔴 Error al conectar con la base de datos:', error);
    }
};
