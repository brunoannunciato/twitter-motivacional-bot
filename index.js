require('dotenv').config()
const Twit = require('twit');

const config = require('./config')
const ImageController = require('./src/controllers/ImagesController')

const image = {
  path: './src/rawImages/image-3.png'
}

const text = {
  content: 'Teu cuzin!',
  author: 'bu_nro'
}

ImageController.generate(image, text)