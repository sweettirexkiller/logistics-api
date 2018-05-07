const Truck = require('./truck');

module.exports = class Delivery {
    constructor(packages) {
        this.packages = packages;
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
        //simple package loading algorithm as if I was working  in a warehouse
        //1) Sort packages by weight
        this.packages = this.packages.sort((a, b) => a.weight < b.weight);
        //2) Park the first truck on the ramp and manage workers
        // to start putting packages into the truck
        const truck = new Truck();
        this.packages.forEach((item, index) => {
            if (!item.loaded && truck.fit(item)) { // if item fits, remove it from the warehouse
                item.loaded = true;
            }

            
        });
        console.log('\nWarehouse: ', this.packages,'\nTruck: ', truck.load);
    }

};