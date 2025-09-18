const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Pets - Get All']
    const result = await mongodb.getDatabase().db().collection('pets').find();
    result.toArray().then((pets) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(pets);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Pets - Get Single']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid pet id to find a pet.');
        }
        const petId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('pets').find({ _id: petId });
        result.toArray().then((pets) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(pets[0]);
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const createPet = async (req, res) => {
    //#swagger.tags=['Pets - Create Pet']
    try {
        if (!req.body.name || !req.body.pet_id) {
            return res.status(400).json({ message: 'Missing required fields: name and pet_id are required.' });
        }

        const pet = {
            pet_id: req.body.pet_id,
            name: req.body.name,
            gender: req.body.gender,
            age: req.body.age,
            houseTrained: req.body.houseTrained,
            species: req.body.species,
            favFood: req.body.favFood
        };
        const result = await mongodb.getDatabase().db().collection('pets').insertOne(pet);
        //result.acknowledged = false;
        if (result.acknowledged) {
            return res.status(201).json({ message: 'Pet created successfully', petId: result.insertedId });
        } else {
            res.status(500).json(result.error || 'Error occured creating pet.');
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updatePet = async (req, res) => {
    //#swagger.tags=['Pets - Update Pet']
    try {
        if (!req.body.name || !req.body.pet_id) {
            return res.status(400).json({ message: 'Missing required fields: name and pet_id are required.' });
        }

        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid pet id to update a pet.');
        }
        const petId = new ObjectId(req.params.id);
        const pet = {
            pet_id: req.body.pet_id,
            name: req.body.name,
            gender: req.body.gender,
            age: req.body.age,
            houseTrained: req.body.houseTrained,
            species: req.body.species,
            favFood: req.body.favFood
        };
        const result = await mongodb.getDatabase().db().collection('pets').replaceOne({ _id: petId }, pet);
        //result.acknowledged = false;
        if (result.modifiedCount > 0) {
            return res.status(201).json({ message: 'Pet updated successfully', petId: result.insertedId });
        } else {
            res.status(500).json(result.error || 'Error occured updating pet.');
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deletePet = async (req, res) => {
    //#swagger.tags=['Pets - Delete Pet']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid pet id to delete a pet.');
        }
        const petId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('pets').deleteOne({ _id: petId });
        //result.acknowledged = false;
        if (result.deletedCount > 0) {
            return res.status(201).json({ message: 'Pet deleted successfully', petId: result.insertedId });
        } else {
            res.status(500).json(result.error || 'Error occured deleting pet.');
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createPet,
    updatePet,
    deletePet
}