const express = require('express');
const { async } = require('rxjs');
const router = express.Router();
const customerlist = require('../services/productlist');

/* GET customer. */


router.get('/', async function(req, res, next) {
    try {
        res.json(await customerlist.getProductList(req.query.page));
    } catch (err) {
        console.error(`Error while getting product `, err.message);
        next(err);
    }
});

/* Post customer. */
router.post('/', async function(req, res, next) {
    try {
        res.json(await customerlist.createproduct(req.body));
    } catch (err) {
        console.error(`Error while creating product`, err.message);
        next(err);
    }
});

module.exports = router;