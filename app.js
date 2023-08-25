const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const app = express();

// connecting with database
mongoose.connect("mongodb://127.0.0.1:27017/Ketan", 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected with Mongodb");
})
.catch((err) => {
    console.log(err);
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json())

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
})

const Product = new mongoose.model("Product", productSchema);

// Create Product
app.post("/api/v1/product/new", async(req, res) => {
    const product = await Product.create(req.body);
    res.status(200).json({
        success:true,
        product
    })
})


app.listen(4500, () => {
    console.log('server is working http://localhost:4500')
})