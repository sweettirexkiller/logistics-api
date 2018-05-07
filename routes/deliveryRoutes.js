const express = require('express');
const router = express.Router();
const delivery = require('../controllers/deliveryController');
const {check, body} = require('express-validator/check');


router.get('/', delivery.index);

router.post('/',
    [
        check('body').isArray().withMessage('Body must be array of objects with keys of ID and Price as integer'),
        check('body').eachIsInteger('weight').withMessage('Weight must be integer')
    ]
    , delivery.store);


module.exports = router;