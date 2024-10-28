const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.get('/', (req, res)=>{
    res.send('This is Landing Page')
})

const user = []

///USER  ROUTES///

//Register USER
app.post('/Register',(req, res)=>{
    const newUser = req.body;
    user.push(newUser);
    res.status(201).send({message: "User Registered successfuly!", user: newUser});

})
//Login User
app.post('/login',(req, res)=>{
    const {username, password } = req.body;
    const user = user .find((u) => u.username === username && u.password === password);

    if(user){
        res.send({message: "Login successful!", user});
    }else{
        res.status(401).send({message: "Invalid username or Password"});
    }
    
})
//Get user Profile
app.get('/profile/:username',(req, res)=>{
    const username = req.params.username;
    const user = user.find((u) => u.username === username);

    if(user){
        res.send(user);
    }else{
        res.status(404).send({message: "User not found"});
    }
})

//Get User by Id    
app.get('/user/:userId',(req, res)=>{
    const id = req.params.id;
    const u = user.find((user) => user.id == id);
})
 // Scan Product
app.post('/scan',(req, res)=>{
    const {productId} = req.body;
    res.send({message: 'Product ${productId} scanned successfully.'})
})
//Payment Process
app.post('/payment',(req, res)=>{
    const {userId, amount,method} = req.body;
    res.send({message: 'Payment of ${amount} using ${method} processed for user ${userId}'})

})


app.listen(3000, () => {
    console.log("server is running on port 3000")
})