const express = require('express');
const { async } = require('rxjs');
const router = express.Router();
const customer = require('../services/customer');

/* GET customer. */

router.get('/:id', async function(req, res, next){
    try {
        res.json(await customer.getCustomer(req.params.id))
    } catch (err) {
        console.error('Error while editing customer', err.message);
        next(err);
    }
})

router.put('/:id', async function(req, res, next){
    try {
        res.json(await customer.updateCustomer(req.params.id, req.body))
    } catch (err) {
        console.error('Error while updating customer', err.message);
        next(err);
    }
})


module.exports = router;