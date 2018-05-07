const expressValidator = require('express-validator');
const validator = require('validator');

module.exports = app => {
    app.use(expressValidator({
        customValidators: {
            eachIsInteger: (values, prop) => {
                return values.every((val)=>{
                    return validator.isInt(val[prop]);
                })
            }
        }
    }))
};