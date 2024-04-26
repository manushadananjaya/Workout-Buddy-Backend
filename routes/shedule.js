const express = require('express');

const router = express.Router();

//controller functions

const {createShedule, getShedules, getShedule, updateShedule, deleteShedule} = require('../controller/scheduleController');

//get all shedules
router.get('/', getShedules);

//get a specific shedule
router.get('/:id', getShedule);

//create a new shedule
router.post('/', createShedule);

//update a shedule
router.patch('/:id', updateShedule);

//delete a shedule
router.delete('/:id', deleteShedule);

module.exports = router;
