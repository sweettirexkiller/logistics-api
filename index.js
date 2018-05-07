const express = require('express');
const morgan = require('morgan');
const app = express();
// later add mongoose

const packagesRoutes = require('./routes/packagesRoutes');

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        res.status(200).json({});
    }

    next();
});

app.get('/', (req,res)=>{
   res.status(200).json({
       routes: {
           '/deliver':'GET, POST',
           "/public/prices.pdf":"GET"
       }
   })
});

app.use('/deliver', packagesRoutes);
app.use('/public', express.static('public'));

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
   res.status(error.status || 500);
   res.json({
       error: {
           message: error.message
       }
   })
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
