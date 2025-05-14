// src/models/Pet.model.js

import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
    name: String,
    type: String,
    age: Number,
});

export const Pet = mongoose.model('Pet', petSchema);
