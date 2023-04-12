const express = require('express');
const { async } = require('rxjs');
const router = express.Router();
const salesmaster = require('../services/salesmaster');


/* Post sales entry. */
router.post('/', async function(req, res, next) {
    try {
        if(req.query.sales=='update') {
            res.json(await salesmaster.salesUpdate(req.body));
        } else if(req.query.receipt=='update') {
            res.json(await salesmaster.receiptUpdate(req.body));
        } else if(req.query.type=='saveprint') {
            res.json(await salesmaster.savePrint(req.body));
        } else if(req.query.type=='savesalesprint') {
            res.json(await salesmaster.savesalesPrint(req.body));    
        } else {
            res.json(await salesmaster.createsalesmaster(req.body));
        }
    } catch (err) {
        console.error(`Error while creating salesmaster`, err.message);
        next(err);
    }
});

router.get('/:id', async function(req, res, next) {
    try {
        res.json(await salesmaster.getSalesId(req.params.id));
    } catch (err) {
        console.error(`Error while getting sales entry `, err.message);
        next(err);
    }
});

module.exports = router;