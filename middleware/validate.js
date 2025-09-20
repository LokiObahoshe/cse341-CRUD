const validator = require('../helpers/validate');

const savePet = (req, res, next) => {
    const validationRule = {
        pet_id: 'required|string',
        name: 'required|string',
        gender: 'required|string',
        age: 'required|string',
        houseTrained: 'required|string',
        species: 'required|string',
        favFood: 'string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(500).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveOwner = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        gender: 'string',
        age: 'required|string',
        petOwned: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(500).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    savePet,
    saveOwner
};