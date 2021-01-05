const Jimp = require('jimp')

const Fonts = require('./FontsController')

const ImageController = {
  generate: async function(imageConfig, text) {
    const image = await Jimp.read(imageConfig.path)
    const font = await Jimp.loadFont(Fonts.comicSams16Yellow);

    image.print(font, 10, 10, 'Teste 2!')
    .write('./output/image.png')
    //console.log(image)
  }
}

module.exports = ImageController