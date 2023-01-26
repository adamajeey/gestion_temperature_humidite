const mongoose = require('mongoose');

const data1Schema = new mongoose.Schema({
temperature: {
type: String
},
humidite: {
type: String
},
Date: {
type: String
},
Heure: {
type: String
}
})


module.exports = mongoose.model('tempHum2', data1Schema);/* users nom de la collection */