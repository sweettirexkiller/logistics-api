const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    price: {type: Number, required: true},
    trucks: {type: Object, required: true}
});

module.exports = mongoose.model('Order', orderSchema);