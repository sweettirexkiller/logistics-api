const express = require('express');
const morgan = require('morgan');
const app = express();

const packagesRoutes = require('./routes/packagesRoutes');

app.use(morgan('dev'));

app.get('/', (req,res)=>{
    res.send('Hello world!');
});

app.use('/packages', packagesRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
	console.log(`Server listening on ${PORT}`);
});
