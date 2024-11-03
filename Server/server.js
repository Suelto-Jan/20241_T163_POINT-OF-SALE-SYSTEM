
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db.js'
import UserModel from './Models/user.js'

const app = express()

connectDB();


app.listen(8000,() =>{
    console.log('Connected to PORT ');
})


