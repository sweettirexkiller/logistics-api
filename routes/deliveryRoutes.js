const express = require('express');
const router = express.Router();
const delivery = require('../controllers/deliveryController');
const {body} = require('express-validator/check');
const validator = require('validator');


router.get('/', delivery.index);

router.post('/',
    [
        body()
            .custom((value) => {
                return Array.isArray(value);
            })
            .withMessage('Body must be array of objects with keys of ID and Price as integer'),
        body()
            .custom((values) => {
                let boolean = values.every(({weight}) => Number.isInteger(weight));
                return boolean;
            })
            .withMessage('Weight must be integer')
    ],
    delivery.store);


module.exports = router;