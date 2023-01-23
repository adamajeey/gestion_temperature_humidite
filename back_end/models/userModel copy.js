const mongoose = require('mongoose');

const dataSchema1 = new mongoose.Schema({
matricule: {
required: true,
type: String
},
nom: {
required: true,
type: String
},
roles: {
required: true,
type: String
},
prenom: {
required: true,
type: String
},

email: {
    required: true,
    type: String
},

password:{
    required: true,
    type: String
},

etat:{
    required: true,
    type: Boolean
},

date_inscri:{
    required: true,
    type: Date
},

date_modif:{
    required: false,
    type: Date
},

date_archive:{
    required: false,
    type: Date
},
img:{
    required: false,
    type:String
}
})


module.exports = mongoose.model('users', dataSchema);/* users nom de la collection */