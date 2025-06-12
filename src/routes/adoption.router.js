// src/routes/adoption.router.js

import express from 'express';
import { User } from '../models/User.model.js';
import { Pet } from '../models/Pet.model.js';

const router = express.Router();

/**
 * @route   POST /api/adoptions
 * @desc    Registrar una adopción: asocia petId a userId
 * @body    { userId, petId }
 */
router.post('/', async (req, res) => {
    const { userId, petId } = req.body;
    if (!userId || !petId) {
        return res.status(400).json({ status: 'error', message: 'Se requieren userId y petId' });
    }
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });

        const pet = await Pet.findById(petId);
        if (!pet) return res.status(404).json({ status: 'error', message: 'Mascota no encontrada' });

        if (user.pets.includes(petId)) {
            return res.status(400).json({ status: 'error', message: 'Mascota ya adoptada por el usuario' });
        }

        user.pets.push(petId);
        await user.save();
        await user.populate('pets');

        res.json({ status: 'success', payload: user });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

/**
 * @route   GET /api/adoptions
 * @desc    Listar todas las adopciones (pares userId–petId)
 */
router.get('/', async (req, res) => {
    try {
        const users = await User.find().populate('pets');
        const adoptions = users
            .map(u => u.pets.map(p => ({ userId: u._id.toString(), petId: p._id.toString() })))
            .flat();
        res.json({ status: 'success', payload: adoptions });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

/**
 * @route   GET /api/adoptions/:userId
 * @desc    Obtener todas las mascotas adoptadas por un usuario
 */
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('pets');
        if (!user) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
        res.json({ status: 'success', payload: { userId: user._id, pets: user.pets } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

/**
 * @route   DELETE /api/adoptions/:userId/:petId
 * @desc    Eliminar una adopción (quitar petId de user.pets)
 */
router.delete('/:userId/:petId', async (req, res) => {
    try {
        const { userId, petId } = req.params;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });

        if (!user.pets.includes(petId)) {
            return res.status(404).json({ status: 'error', message: 'Mascota no adoptada por el usuario' });
        }

        user.pets = user.pets.filter(id => id.toString() !== petId);
        await user.save();

        res.json({ status: 'success', message: 'Adopción eliminada' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

export const adoptionRouter = router;
