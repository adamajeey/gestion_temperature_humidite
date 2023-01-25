const express = require('express');/* recupere la variable express dans la boite express */
const mongoose  = require('mongoose'); //gere link api base de donnees
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var binary = mongodb.Binary;
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

const http = require('http').Server(app);

const io = require('socket.io')(http);

database.once('connected', ()=> {
    
console.log('Database Connected')

})

var fs = require('fs');
/* var index = fs.readFileSync( '/'); */


const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const port = new SerialPort({ path: '/dev/ttyUSB0', baudRate: 9600 })


const router = require('./routes/routes');

// On lit les donnees par ligne telles quelles apparaissent
var parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
/* parser.on('open', function() {
    console.log('Connexion ouverte');
});

port.pipe(parser); */
var url = "mongodb://localhost:27017/";




io.on('connection', function(socket) {
    
    console.log('Node is listening to port');
   
    
});

parser.on('data', function(data) {
    
    console.log('les information sont: ' + data);
    temp = data.split('/');
    console.log(data);
    var temperature = data.slice(0, 2); //decoupe de la temperature
    var humidite = data.slice(3, 5); //decoupe de l'humidite
    
   
    io.emit('data', {"temperature": temperature, "humidite": humidite});
    var datHeure = new Date();
    var min = datHeure.getMinutes();
    var heur = datHeure.getHours(); //heure
    var sec = datHeure.getSeconds(); //secondes
    var mois = datHeure.getDate(); //renvoie le chiffre du jour du mois 
    var numMois = datHeure.getMonth() + 1; //le mois en chiffre
    var laDate = datHeure.getFullYear(); // me renvoie en chiffre l'annee
    if (numMois < 10) { numMois = '0' + numMois; }
    if (mois < 10) { mois = '0' + mois; }
    if (sec < 10) { sec = '0' + sec; }
    if (min < 10) { min = '0' + min; }
    var heureInsertion = heur + ':' + min + ':' + sec;
    var heureEtDate = mois + '/' + numMois + '/' + laDate;
    console.log(heureInsertion);
    console.log(heureEtDate);
    const fetchMovies = (socket) => {
        data.findAll()
            .then(data => io.emit('fetchMovies', data))
            .catch(logError)
    }
   
    
    /* if ((heur == 08 && min == 00 && sec == 00) || (heur == 12 && min == 00 && sec == 00) || (heur == 19 && min == 00 && sec == 00)) { */
    if(sec == 00){ 
        var temperature = data.slice(0, 2); //decoupe de la temperature
        var humidite = data.slice(3, 5); //decoupe de l'humidite
        var tempEtHum = { "temperature": temperature, "humidite": humidite,"Date": heureEtDate, "Heure": heureInsertion };
         //Connexion a mongodb et insertion Temperature et humidite
         MongoClient.connect(url, { useUnifiedTopology: false }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("dhtTemp");
            dbo.collection("tempHum").insertOne(tempEtHum, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        })
    } //Fin if
}
    
);
router.get('/', (req, res) => {
    res.json(data)
  });

  http.listen(3001, ()=>{
    console.log('server started at ${3001}')/* apres avoir ecouter le port 3000 affiche les données */
})
 
