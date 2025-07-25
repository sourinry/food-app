const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectionDB = require('./config/db');
const dotenv = require('dotenv').config();

//connect data base
connectionDB();

const app = express();
//middleware
app.use(cors()); //to give access
app.use(express.json()); //for json data
app.use(morgan('dev')); // for logging purpose in console

//routes
app.use('/api/v1/test', require('./routes/testRouter'));
app.use('/api/v1/auth', require('./routes/authRoute'));
app.use('/api/v1/user', require('./routes/userRoute'));
app.use('/api/v1/resturent', require('./routes/resturentRoute'));
app.use('/api/v1/category', require('./routes/categoryRoute'));

//url 
app.get('/', (req, res) => {
    return res.status(200).send('hello sourin you need to prepare');
});

//PORT
const PORT = process.env.PORT || 8081;

//SERVER
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});
