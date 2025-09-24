const express = require('express');
const router = express.Router();
const petsController = require('../controllers/pets');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', petsController.getAll);

router.get('/:id', petsController.getSingle);

router.post('/', isAuthenticated, validation.savePet, petsController.createPet);

router.put('/:id', isAuthenticated, validation.savePet, petsController.updatePet);

router.delete('/:id', isAuthenticated, petsController.deletePet);

module.exports = router;