const express = require('express');
const { async } = require('rxjs');
const router = express.Router();
const customerlist = require('../services/customerlist');

/* GET customer. */


router.get('/', async function(req, res, next) {
    try {
        res.json(await customerlist.getCustomerList(req.query.page));
    } catch (err) {
        console.error(`Error while getting customer `, err.message);
        next(err);
    }
});

/* Post customer. */
router.post('/', async function(req, res, next) {
    try {
        res.json(await customerlist.createcustomer(req.body));
    } catch (err) {
        console.error(`Error while creating customer`, err.message);
        next(err);
    }
});

module.exports = router;