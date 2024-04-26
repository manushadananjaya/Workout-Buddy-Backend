const express = require('express');

const router = express.Router();

//controller functions

const {createBilling, getBillings, getBilling, updateBilling, deleteBilling} = require('../controller/billingController');

//get all billings

router.get('/', getBillings);

//get a specific billing

router.get('/:id', getBilling);

//create a new billing

router.post('/', createBilling);

//update a billing

router.patch('/:id', updateBilling);

//delete a billing

router.delete('/:id', deleteBilling);

module.exports = router;