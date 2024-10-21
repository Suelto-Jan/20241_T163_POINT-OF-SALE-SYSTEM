const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

const user = require("./db")

app.get('/', (req, res)=>{
    res.send('This is Landing Page')
})

///USER  ROUTES///

//Add USER
app.post('/Register',(req, res)=>{
     ///
})
//Add USER
app.post('/login',(req, res)=>{
      ///
})
//Add USER
app.get('/profile',(req, res)=>{
    ///
})
//Add USER
app.get('/user/:userId',(req, res)=>{
    ///
})
//Add USER
app.post('/scan',(req, res)=>{
    ///
})
//Add USER
app.post('/payment',(req, res)=>{
    ///
})





///ADMIN ROUTES///

app.post('/admin/login',(req, res)=>{
    ///
})
app.post('/admin/products',(req, res)=>{
    ///
})
app.put('/admin/products/productId',(req, res)=>{
    ///
})
app.delete('/admin/products/prodcutId',(req, res)=>{
    ///
})
app.get('/admin/products',(req, res)=>{
    ///
})





app.listen(3000)