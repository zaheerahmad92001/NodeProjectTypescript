require('dotenv').config()
const {HOST} = process.env
const express = require('express')
// import express from 'express'

const bodyParser = require('body-parser')
const PORT:string = process.env.PORT || '3001';
const Hostname:string = HOST || '127.0.0.0';
import connectDB from "../dbconnection";
import { route } from "../routes";

const morgan = require('morgan')
const app = require('express')();
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json()); // to upload raw data
app.use(express.json()); 
// app.use(express.urlencoded({ extended: true })) // for form data xwww/url-encoded 
app.use('/api',route)

connectDB()

const server=app.listen(PORT,()=>{
    console.log('express server listening at port',`${PORT} and hostname is ${Hostname}`)
});


const io = require('socket.io')(server);
const rootSocket = require('../socketProgramming')(io);

//  io.on('connection', (socket) => { 
//   socket.on("username", (username) => {
//     console.log('sajhdasjkhdjas',username)
//   });
//   socket.emit("hey",()=>{});
// });
// io.on("hello", (arg1) => {
//   console.log(arg1); // prints "world"
// });



