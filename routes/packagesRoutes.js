const express = require('express');
const router = express.Router();
const Delivery = require('./../models/delivery');

router.get('/', (req,res)=>{
    res.status(200).json({
        requests: {
            "Creating Packages Delivery": {
                type: 'POST',
                path: '/deliver',
                exampleBody: [
                    { "id": "ID-1", "weight": 345 },
                    { "id": "OTHER-ID-2", "weight": 500 },
                    { "id": "CLIENT-ID-3", "weight": 300 },
                ]
            }
        },
        description: "Packages routes for calculating price and number of trucks"
    });
});

router.post('/', async (req,res)=>{
    const delivery = new Delivery(req.body);


    res.status(200).json({
        "price": delivery.price,
        "trucks": delivery.trucks
    });
});


module.exports = router;