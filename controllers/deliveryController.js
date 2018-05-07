const Order = require('../models/order');
const Delivery = require('../models/delivery');
const {validationResult} = require('express-validator/check');

exports.index = async (req, res) => {
    const orders = await Order.find({}).select('_id price trucks').exec();
    res.status(200).json({
        "Orders": orders,
        "Requests": {
            type: 'POST',
            path: '/deliver',
            description: "Route for creating a delivery order",
            exampleBody: [
                {"id": "ID-1", "weight": 345},
                {"id": "OTHER-ID-2", "weight": 500},
                {"id": "CLIENT-ID-3", "weight": 300},
            ]
        }
    });
};

exports.store = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const err = new Error();
        err.message = errors.mapped();
        err.status = 422;
        return next(err);
    }

    const delivery = new Delivery(req.body);
    const order = await new Order({
        "price": delivery.price,
        "trucks": delivery.trucks
    }).save();

    res.status(200).json({price: order.price, trucks: order.trucks});
};