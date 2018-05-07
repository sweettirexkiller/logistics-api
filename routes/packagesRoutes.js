const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.status(200).json({
        description: "Packages routes for calculating price and number of trucks",
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
        }
    });
});

router.post('/', async (req,res)=>{
    let packages = req.body;
    let totalWeight = 0;
    let price = 0;
    await packages.map(package => {
        totalWeight += package.weight;
        console.log(package);
    });
    price = calculatePrice(totalWeight);
    //body: array of package objects
    //response: price and trucks
    res.status(200).json({
        "price": price,
        "weight":totalWeight
    });
});


const calculatePrice = (weight) => {
  if(weight > 400){
      return 2+ (0.005 * weight);
  }
  return weight * 0.01;
};


module.exports = router;