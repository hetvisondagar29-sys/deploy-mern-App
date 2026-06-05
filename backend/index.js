const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const ProductRouter = require('./Routes/ProductRouter') 
const AuthRouter = require('./Routes/AuthRouter');
const { required } = require('joi');

dotenv.config();

const app = express();

require('./Models/db');


const PORT = process.env.PORT || 1000;


app.get('/ping',(req,res)=>{
    res.send('PONG');
})

app.use(bodyParser.json());
app.use(cors()); // to allow req from diffrent ports 
app.use('/auth',AuthRouter)
app.use('/products',ProductRouter)

app.listen(PORT,()=>{console.log(`server is running on ${PORT}`)})