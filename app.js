const express = require ("express")
const app = express()

const userRoutes = require ("./routes/UserRoutes")
app.use("/user", userRoutes);

app.get("/", (req, res)=> {
res.send("This landing Page")

})

app.listen(3000,() => {
  console.log("Running on Port 3000")
})