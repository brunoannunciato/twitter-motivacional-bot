const Jimp = require('jimp')
const path = require('path')
const fs = require('fs')

const Fonts = require('./FontsController')

const ImageController = {
  getFont: async function(text) {
    const font64 = await Jimp.loadFont(Fonts.comicSams64Yellow)
    const font32 = await Jimp.loadFont(Fonts.comicSams32Yellow)
    const lineWidth = 1024
    const textWidth = Jimp.measureText(font64, text)

    if (textWidth >= lineWidth) {
      return font32
    }

    return font64
  },
  getBackground: function() {
    const backgroundsPath = path.join(__dirname, '../rawImages')
    const backgroundImages = fs.readdirSync(backgroundsPath)
    const sortedImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)]
    
    return `${ backgroundsPath }/${ sortedImage }`
  },
  getAuthorPosition: function(font, text) {
    const lineWillBreak = Jimp.measureText(font, text.content) > 1024
    const textHeight = Jimp.measureTextHeight(font, text.content, lineWillBreak ? 750 : 1024)

    return textHeight
  },
  generate: async function (text) {
    const image = await Jimp.read(this.getBackground())
    const textFont = await this.getFont(text.content)
    const creditFont = await Jimp.loadFont(Fonts.comicSams16Yellow)
    const lineWillBreak = Jimp.measureText(textFont, text.content) > 1024


    image.print(
      textFont,
      0,
      200,
      {
        text: `"${ text.content }"`,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_TOP
      },
      lineWillBreak ? 750 : 1024,
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