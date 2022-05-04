/*eslint-disable*/
const fs = require('fs')

const cb = () => {}

const appendToScss = (path, fontname) => {
  fs.appendFile(
    path,
    '@include font("' +
      fontname +
      '", "' +
      fontname +
      '", "400", "normal");\r\n',
    cb
  )
}

const appendToMetaList = (path, fontname, endOfLine, cb) => {
  fs.appendFile(
    path,
    `
  {
    "rel": "preload",
    "type": "font/woff2",
    "href": "/fonts/${fontname}.woff2",
    "crossorigin": "anonymous",
    "as": "font"
  }${endOfLine}`,
    cb
  )
}

function fontsStyle() {
  const path = './assets/styles/helpers/fonts-include.scss'
  const path2 = './utils/fontsMetaList.json'
  const buildFontsPath = './public/fonts'

  fs.writeFile(path, '', cb)
  fs.writeFile(path2, '', cb)
  return fs.readdir(buildFontsPath, function (_, fonts) {
    if (fonts) {
      fs.writeFile(path2, '{\r\n"fonts": [', cb)
      fonts.forEach((font, i) => {
        const endOfLine = i + 1 < fonts.length ? ',\r\n' : '\r\n'
        const fontname = font.split('.')[0]

        const onFinishCycle = () => {
          if (i + 1 === fonts.length) {
            fs.appendFile(path2, '\r\n]\r\n}', cb)
          }
        }

        appendToScss(path, fontname)
        appendToMetaList(path2, fontname, endOfLine, onFinishCycle)
      })
    } else {
      fs.writeFile(path2, '{\r\n"fonts": []\r\n}', cb)
    }
  })
}

module.exports = fontsStyle()
