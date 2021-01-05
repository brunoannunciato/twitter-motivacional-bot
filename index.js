require('dotenv').config()
const Twit = require('twit');
const config = require('./config')

const T = new Twit(config)