require('dotenv').config()
const Twit = require('twit');

const config = require('./config')
const ImageController = require('./src/controllers/ImagesController')

const text = {
  content: 'Teu cuzin!',
  author: 'bu_nro'
}

ImageController.generate(text)