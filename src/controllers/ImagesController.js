const Jimp = require('jimp')

const Fonts = require('./FontsController')

const ImageController = {
  getAuthorPosition: function(font, text) {
    const textHeight = Jimp.measureTextHeight(font, text.content, 1024)

    return textHeight
  },
  generate: async function(imageConfig, text) {
    const image = await Jimp.read(imageConfig.path)
    const textFont = await Jimp.loadFont(Fonts.comicSams64Yellow);
    const creditFont = await Jimp.loadFont(Fonts.comicSams16Yellow);

    image.print(
      textFont,
      0,
      200,
      {
        text: `"${ text.content }"`,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_TOP
      },
      1024,
      400
    )
    .print(
      creditFont,
      0,
      200 + this.getAuthorPosition(textFont, text),
      {
        text: `- @${text.author}`,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_TOP
      },
      1024,
      400
    )
    .write('./output/image.png')
  }
}

module.exports = ImageController