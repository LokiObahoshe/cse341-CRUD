const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Owners - Get All']
    const result = await mongodb.getOwnersDb().collection('owners').find();
    result.toArray().then((owners) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(owners);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Owners - Get Single']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid owner id to find a owner.');
        }
        const ownerId = new ObjectId(req.params.id);
        const result = await mongodb.getOwnersDb().collection('owners').find({ _id: ownerId });
        result.toArray().then((owners) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(owners[0]);
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const createOwner = async (req, res) => {
    //#swagger.tags=['Owners - Create Owner']
    try {
        if (!req.body.ownerName) {
            return res.status(400).json({ message: 'Missing required fields: ownerName is required.' });
        }

        const owner = {
            ownerName: req.body.ownerName,
            gender: req.body.gender,
            age: req.body.age,
            petOwned: req.body.petOwned
        };
        const result = await mongodb.getOwnersDb().collection('owners').insertOne(owner);
        //result.acknowledged = false;
        if (result.acknowledged) {
            return res.status(201).json({ message: 'Owner created successfully', ownerId: result.insertedId });
        } else {
            res.status(500).json(result.error || 'Error occured creating owner.');
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateOwner = async (req, res) => {
    //#swagger.tags=['Owners - Update Owner']
    try {
        if (!req.body.ownerName) {
            return res.status(400).json({ message: 'Missing required fields: ownerName is required.' });
        }

        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid owner id to update a owner.');
        }
        const ownerId = new ObjectId(req.params.id);
        const owner = {
            ownerName: req.body.ownerName,
            gender: req.body.gender,
            age: req.body.age,
            petOwned: req.body.petOwned
        };
        const result = await mongodb.getOwnersDb().collection('owners').replaceOne({ _id: ownerId }, owner);
        //result.acknowledged = false;
        if (result.modifiedCount > 0) {
            return res.status(201).json({ message: 'Owner updated successfully', ownerId: result.insertedId });
        } else {
            res.status(500).json(result.error || 'Error occured updating owner.');
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteOwner = async (req, res) => {
    //#swagger.tags=['Owners - Delete Owner']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid owner id to delete a owner.');
        }
        const ownerId = new ObjectId(req.params.id);
        const result = await mongodb.getOwnersDb().collection('owners').deleteOne({ _id: ownerId });
        //result.acknowledged = false;
        if (result.deletedCount > 0) {
            return res.status(201).json({ message: 'Owner deleted successfully', ownerId: result.insertedId });
        } else {
            res.status(500).json(result.error || 'Error occured deleting owner.');
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createOwner,
    updateOwner,
    deleteOwner
}