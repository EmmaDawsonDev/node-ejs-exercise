// Generating a Static Web site
// Utgå från albums.csv/.json.

// Sätt upp ett litet projekt som kan generera en statisk webbplats där man kan bläddra bland albumen. Varje sida bör innehålla 10-20st album och ska vara i en separat html-fil.

// Skapa minst två olika stylesheets på sidan och styr vilket stylesheet som ska användas med hjälp av en miljövariabel.

const ejs = require("ejs")
const path = require("path")
const fs = require("fs")

//Bearbeta album.csv

const customSplit = (string) => {
  const array = []
  let newStr = ''

  let OUTSIDE = 0
  let INSIDE = 1
  let state = OUTSIDE

  for (let i = 0; i < string.length; i++) { // "Chronicle, Vol. 1",Creedence Clearwater Revival,20
    switch (state) {
      case INSIDE:
        if (string[i] == '"') {
          state = OUTSIDE
        } else {
          newStr += string[i]
        }
        break
      case OUTSIDE:
        if (string[i] == '"') {
          state = INSIDE
        } else if (string[i] != ',') {
          newStr += string[i]
        } else {
          array.push(newStr)
          newStr = ''
        }
    }
  }
  array.push(newStr)

  return array
}

const albums = fs.readFileSync('albums.csv', {
  encoding: 'utf-8'
}).split('\n')

const [key1, key2, key3] = albums.shift().split(',')

const objectArray = []

for (const album of albums) {
  const albumObject = {}

  const values = customSplit(album)

  albumObject[key1] = values[0]
  albumObject[key2] = values[1]
  albumObject[key3] = values[2]

  objectArray.push(albumObject)
}

console.log(objectArray);



const viewsFolder = "views"
const layoutFile = "layout.ejs"
const templatePath = path.join(viewsFolder, layoutFile)
const distFolder = "dist"
const indexFile = "index.html"
const indexPath = path.join(distFolder, indexFile)


const data = {
  message: "Hello World"
}

// ejs.renderFile(templatePath, data, function(err, str) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(str);
//     fs.writeFileSync(indexPath, str)
//   }
// })