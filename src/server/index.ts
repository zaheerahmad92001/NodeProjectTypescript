require('dotenv').config()
const {HOST} = process.env
const express = require('express')
// import express from 'express'
const app = express()
const bodyParser = require('body-parser')
// const port:number = parseInt(PORT!) || 3000; //non-null assertion
const PORT:string = process.env.PORT || '3001';
const Hostname:string = HOST || '127.0.0.1';
// const connectDB = require('../dbconnection')
import connectDB from "../dbconnection"
// const route = require('../routes')
import { route } from "../routes"
var fs = require('fs');
const morgan = require('morgan')


const puppeteer=require('puppeteer')
const axios=require('axios')
const cheerio = require('cheerio');
const TikTokScraper = require('tiktok-scraper');


connectDB()
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json()); // to upload raw data
app.use(express.json()); 
// app.use(express.urlencoded({ extended: true })) // for form data xwww/url-encoded 
app.use('/api',route)
app.listen(PORT,()=>{
    console.log('express server listening at port',`${PORT} and hostname is ${Hostname}`)
})