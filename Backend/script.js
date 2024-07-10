const express = require('express')
const main = require('./main.js')
const main_flipkart = require('./main_flipkart.js')
const cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser');
const main_myntra = require('./main_myntra.js');
require('dotenv').config();
const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("hahahahahaha");
});
app.post('/api', (req, res) => {
    const { url, website } = req.body;
    
    if (website === "Amazon") {
        main(url).then(product_name => {
        res.json(product_name);
      }).catch(err => {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
    }
    else if(website==='Flipkart'){
      main_flipkart(url).then(product_name => {
        res.json(product_name);
      }).catch(err => {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
    }
    else if(website==='Myntra'){
      main_myntra(url).then(product_name => {
        res.json(product_name);
      }).catch(err => {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
    }
    else {
      res.status(400).json({ error: "Unsupported website" });
    }
});
app.listen(port,()=>{
    console.log(`sun raha hun is ${port} port kp `)
})