const express = require('express');
const { async } = require('rxjs');
const router = express.Router();
const salesmaster = require('../services/salesmaster');


/* Post sales entry. */
router.post('/', async function(req, res, next) {
    try {
        res.json(await salesmaster.createsalesmaster(req.body));
    } catch (err) {
        console.error(`Error while creating salesmaster`, err.message);
        next(err);
    }
});

router.get('/', async function(req, res, next) {
    try {
        res.json(await salesmaster.getSalesId(req.query.page));
    } catch (err) {
        console.error(`Error while getting sales entry `, err.message);
        next(err);
    }
});

module.exports = router;