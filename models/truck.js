const uuid = require('uuid/v1');

module.exports = class Truck {
    constructor() {
        this.ID = uuid();
        this.MAX_LOAD = 1000;
        this.load = [];
    }

    fit(item) {
        if ((item.weight + this.currentWeight()) < this.MAX_LOAD) {
            this.load.push({...item});
            return true;
        }
        return false;
    }

    currentWeight() {
        return this.load.reduce((a, b) => {
            return a + b['weight'];
        }, 0);
    }

};