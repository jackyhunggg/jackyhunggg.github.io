// define sample function to randomly return an item in an array
function sample(array) {
    const index = Math.floor(Math.random() * array.length)
    return array[index]
}

// define the password generator function
function generatePassword(options) {
// define things user might want
const lower = 'abcdefghijklmnopqrstuvwxyz'
const upper = lower.toUpperCase()
const num = '1234567890'
const symbol = '`~!@$%^&*()-_+={}[]|;:"<>,.?/'

// create a collection to store things user picked up
let collection = []

if(options.lowercase === 'on') {
    collection = collection.concat(lower.split(''))
}

if(options.uppercase === 'on') {
    collection = collection.concat(upper.split(''))
}

if(options.numbers === 'on') {
    collection = collection.concat(num.split(''))
}

if(options.symbols === 'on') {
    collection = collection.concat(symbol.split(''))
}
// remove things user do not need
if(options.excludeCharacters) {
    collection = collection.filter(character => {
      return !options.excludeCharacters.includes(character)
      })      
}

// return error notice if collection is empty
if (collection.length === 0) {
    return 'There is no valid character in your selection.'
  }

// start generating password
// make a empty string for password
let password = ''

for(let i = 0; i < Number(options.length); i ++) {
    password += sample(collection)
}

// return the generated password
return password
}

// export generatePassword function for other files to use
module.exports = generatePassword