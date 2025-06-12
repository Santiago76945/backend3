// tests/adoption.test.js

import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import express from 'express';

import { mocksRouter } from '../src/mocks/mocks.router.js';
import { adoptionRouter } from '../src/routes/adoption.router.js';
import { User } from '../src/models/User.model.js';
import { Pet } from '../src/models/Pet.model.js';

let mongod, app;

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);

    app = express();
    app.use(express.json());
    app.use('/api/mocks', mocksRouter);
    app.use('/api/adoptions', adoptionRouter);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

describe('API de Adopciones', () => {
    let user, pet;

    beforeEach(async () => {
        await User.deleteMany();
        await Pet.deleteMany();
        user = await User.create({
            first_name: 'Test',
            last_name: 'User',
            email: 'test@example.com',
            password: 'pass',
            role: 'user'
        });
        pet = await Pet.create({ name: 'Fido', type: 'dog', age: 3 });
    });

    test('POST /api/adoptions → crea adopción', async () => {
        const res = await request(app)
            .post('/api/adoptions')
            .send({ userId: user._id, petId: pet._id });
        expect(res.statusCode).toBe(200);
        expect(res.body.payload.pets).toHaveLength(1);
    });

    test('GET /api/adoptions/:userId → lista mascotas de un usuario', async () => {
        user.pets.push(pet._id);
        await user.save();
        const res = await request(app).get(`/api/adoptions/${user._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.payload.pets).toHaveLength(1);
    });

    test('GET /api/adoptions → lista todas las adopciones', async () => {
        user.pets.push(pet._id);
        await user.save();
        const res = await request(app).get('/api/adoptions');
        expect(res.statusCode).toBe(200);
        expect(res.body.payload).toEqual(
            expect.arrayContaining([
                { userId: user._id.toString(), petId: pet._id.toString() }
            ])
        );
    });

    test('DELETE /api/adoptions/:userId/:petId → elimina adopción', async () => {
        user.pets.push(pet._id);
        await user.save();
        const res = await request(app).delete(
            `/api/adoptions/${user._id}/${pet._id}`
        );
        expect(res.statusCode).toBe(200);
        const updated = await User.findById(user._id);
        expect(updated.pets).toHaveLength(0);
    });
});
