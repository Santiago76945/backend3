// src/mocks/mocks.router.js

import express from 'express';
import { generateUsers } from './userMocker.js';
import { User } from '../models/User.model.js';
import { Pet } from '../models/Pet.model.js';
import { faker } from '@faker-js/faker';

export const mocksRouter = express.Router();

// 1. Generar 50 usuarios mock (no se guardan en DB)
mocksRouter.get('/mockingusers', (req, res) => {
    const users = generateUsers(50);
    res.json({ status: 'success', payload: users });
});

// 2. Insertar en DB la cantidad de usuarios y mascotas indicados
mocksRouter.post('/generateData', async (req, res) => {
    const { users = 0, pets = 0 } = req.body;

    try {
        // Generar e insertar usuarios
        const generatedUsers = generateUsers(users);
        const createdUsers = await User.insertMany(generatedUsers);

        // Generar e insertar mascotas
        const generatedPets = [];
        for (let i = 0; i < pets; i++) {
            generatedPets.push({
                name: faker.animal.dog(),
                type: faker.animal.type(),
                age: faker.number.int({ min: 1, max: 15 }),
            });
        }
        const createdPets = await Pet.insertMany(generatedPets);

        res.json({
            status: 'success',
            message: `Se crearon ${createdUsers.length} usuarios y ${createdPets.length} mascotas.`,
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// 3. Generar 100 mascotas mock (no se guardan en DB)
mocksRouter.get('/mockingpets', (req, res) => {
    const pets = [];
    for (let i = 0; i < 100; i++) {
        pets.push({
            name: faker.animal.cat(),
            type: faker.animal.type(),
            age: faker.number.int({ min: 1, max: 20 }),
        });
    }
    res.json({ status: 'success', payload: pets });
});

// 4. Consultar todos los usuarios guardados en DB
mocksRouter.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json({ count: users.length, users });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// 5. Consultar todas las mascotas guardadas en DB
mocksRouter.get('/pets', async (req, res) => {
    try {
        const pets = await Pet.find();
        res.json({ count: pets.length, pets });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});
