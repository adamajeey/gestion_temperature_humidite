const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
temperature: {
required: true,
type: String
},
humidité: {
required: true,
type: String
},
date: {
required: true,
type: String
},
heure: {
required: true,
type: String
}
})


module.exports = mongoose.model('tempHum', dataSchema);/* users nom de la collection */