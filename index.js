require('dotenv').config()
const Twit = require('twit');

const config = require('./config')
const ImageController = require('./src/controllers/ImagesController')

const text = {
  content: 'Teste 1! Teste 2! Teste 3! Teste 4! Teste 5! Teste 6! Teste 7! Teste 8! Teste 9! Teste 10! Teste 11! Teste 122! Teste 13! Teste 14! Teste 15!',
  author: 'bu_nro'
}

ImageController.generate(text)