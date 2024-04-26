const express = require('express');

const router = express.Router();

//controller functions

const {createGym, getGyms, getGym, updateGym, deleteGym} = require('../controller/gymController');


//get all gyms
router.get('/', getGyms);

//get a specific gym
router.get('/:id', getGym);

//create a new gym
router.post('/', createGym);

//update a gym
router.patch('/:id', updateGym);

//delete a gym
router.delete('/:id', deleteGym);

module.exports = router;

