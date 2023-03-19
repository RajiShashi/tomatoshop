const express = require('express');
const { async } = require('rxjs');
const router = express.Router();
const getreport = require('../services/getreports');


router.get('/inward', async function(req, res, next) {
    try {
        res.json(await getreport.getinward());
    } catch (err) {
        console.error(`Error while getting sales entry `, err.message);
        next(err);
    }
});

router.get('/outward', async function(req, res, next) {
    try {
        res.json(await getreport.getoutward(req.query));
    } catch (err) {
        console.error(`Error while getting sales entry `, err.message);
        next(err);
    }
});

router.get('/outward/:id', async function(req, res, next) {
    try {
        res.json(await getreport.getoutward(req));
    } catch (err) {
        console.error(`Error while getting sales entry `, err.message);
        next(err);
    }
});

router.get('/tallydata', async function(req, res, next) {
    try {
        res.json(await getreport.getTallyData(req.query));
    } catch (err) {
        console.error(`Error while getting sales entry `, err.message);
        next(err);
    }
});

module.exports = router;