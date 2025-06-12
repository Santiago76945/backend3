// src/mocks/userMocker.js

import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

/**
 * Genera un array de usuarios falsos para testing.
 * @param {number} count - Cantidad de usuarios a generar.
 * @returns {Array<Object>} Array de objetos usuario.
 */
export const generateUsers = (count = 50) => {
    const users = [];

    for (let i = 0; i < count; i++) {
        users.push({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: bcrypt.hashSync("coder123", 10),
            role: faker.helpers.arrayElement(["user", "admin"]),
            pets: []
        });
    }

    return users;
};
