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
        res.json(await getreport.getoutward());
    } catch (err) {
        console.error(`Error while getting sales entry `, err.message);
        next(err);
    }
});

router.get('/outward/:id', async function(req, res, next) {
    try {
        console.log(req.params);
        res.json(await getreport.getoutward(req.params.id));
    } catch (err) {
        console.error(`Error while getting sales entry `, err.message);
        next(err);
    }
});

module.exports = router;