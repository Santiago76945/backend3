// src/mocks/mocks.router.js

import express from 'express';
import { generateUsers } from './userMocker.js';
import { User } from '../models/User.model.js';
import { Pet } from '../models/Pet.model.js';
import { faker } from '@faker-js/faker';

export const mocksRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Mocks
 *   description: Endpoints para generación y gestión de datos mock
 */

/**
 * @swagger
 * /api/mocks/mockingusers:
 *   get:
 *     summary: Generar 50 usuarios mock (no persistidos)
 *     tags: [Mocks]
 *     responses:
 *       200:
 *         description: Lista de usuarios mock generados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       first_name:
 *                         type: string
 *                       last_name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       password:
 *                         type: string
 *                       role:
 *                         type: string
 *                       pets:
 *                         type: array
 *                         items: {}
 */
mocksRouter.get('/mockingusers', (req, res) => {
    const users = generateUsers(50);
    res.json({ status: 'success', payload: users });
});

/**
 * @swagger
 * /api/mocks/generateData:
 *   post:
 *     summary: Insertar en DB la cantidad indicada de usuarios y mascotas
 *     tags: [Mocks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               users:
 *                 type: integer
 *                 example: 10
 *               pets:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Cantidad creada de usuarios y mascotas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
mocksRouter.post('/generateData', async (req, res) => {
    const { users = 0, pets = 0 } = req.body;

    try {
        const generatedUsers = generateUsers(users);
        const createdUsers = await User.insertMany(generatedUsers);

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

/**
 * @swagger
 * /api/mocks/mockingpets:
 *   get:
 *     summary: Generar 100 mascotas mock (no persistidas)
 *     tags: [Mocks]
 *     responses:
 *       200:
 *         description: Lista de mascotas mock generadas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 payload:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       type:
 *                         type: string
 *                       age:
 *                         type: integer
 */
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

/**
 * @swagger
 * /api/mocks/users:
 *   get:
 *     summary: Consultar todos los usuarios guardados en la DB
 *     tags: [Mocks]
 *     responses:
 *       200:
 *         description: Lista de usuarios persistidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
mocksRouter.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json({ count: users.length, users });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

/**
 * @swagger
 * /api/mocks/pets:
 *   get:
 *     summary: Consultar todas las mascotas guardadas en la DB
 *     tags: [Mocks]
 *     responses:
 *       200:
 *         description: Lista de mascotas persistidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                 pets:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pet'
 */
mocksRouter.get('/pets', async (req, res) => {
    try {
        const pets = await Pet.find();
        res.json({ count: pets.length, pets });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});
