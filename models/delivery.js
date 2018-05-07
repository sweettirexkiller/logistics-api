const Truck = require('./truck');

module.exports = class Delivery {
    constructor(packages) {
        this.packages = packages.sort((a, b) => a.weight < b.weight); //sort them immediately
        this.price = 0;
        this.trucks = [];
        this.calculatePrice();
        this.loadTrucks();
    }

    calculatePrice() {
        this.packages.map(({weight}) => {
            this.price += weight > 400 ? (2 + 0.005 * weight) : (0.01 * weight);
        });
    }

    loadTrucks() {
        while (this.packages.filter(item => !item.loaded).length) { // if there is some number of packages not loaded yet
            const packagesLeft = this.packages.filter(item => !item.loaded);
            const truck = new Truck();
            this.fillTrunk(truck, packagesLeft);
            this.trucks.push({truckID: truck.ID, load: truck.load});
        }
    }

    fillTrunk(truck, packages) {
        packages.forEach(item => {
            if (!item.loaded && truck.fit(item)) item.loaded = true;
        });
    }

};