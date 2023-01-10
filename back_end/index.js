const express = require('express');/* recupere la variable express dans la boite express */
const mongoose  = require('mongoose'); //gere link api base de donnees
require('dotenv').config();/* pour recuperer le fichier env */

var cors = require('cors') //configuration des differentes requettes pour acceder aux ressources

const routes = require('./routes/routes');

const databaseLink = process.env.DATABASE_URL/* permet de recuperer le lien de la base de donnée */

mongoose.connect(databaseLink);/* permet d'avoir access à la base mongodb */
const database = mongoose.connection

const app = express(); /* express sert a ecouté les ports et à envoyer des données */

app.use(cors({origin:'*'}));/*   */

app.use(express.json());/* affiche les fichiers au format json */

app.use('/api', routes);

database.on('error', (error)=> {

console.log(error)

})

database.once('connected', ()=> {
    
console.log('Database Connected')

})
app.listen(3001, ()=>{
    console.log('server started at ${3001}')/* apres avoir ecouter le port 3000 affiche les données */
})