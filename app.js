const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

const user = require("./db")

app.get('/', (req, res)=>{
    res.send('This is Landing Page')
})

///USER ///
//Add USER
app.post('/user',(req, res)=>{
     ///
})
//Add USER
app.get('/user',(req, res)=>{
    ///
})
//Add USER
app.get('/user',(req, res)=>{
    ///
})
//Add USER
app.get('/user',(req, res)=>{
    ///
})
//Add USER
app.patch('/user',(req, res)=>{
    ///
})
//Add USER
app.delete('/user',(req, res)=>{
    ///
})


app.listen(3000)