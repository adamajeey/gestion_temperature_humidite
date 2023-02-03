// Capteur de temperature et d'humidite DHT11
// https://tutoduino.fr/
// Copyleft 2020
 
#include "DHT.h"
#include <IRremote.h>
int RECV_PIN = 7;
IRrecv irrecv(RECV_PIN);
// Definit la broche de l'Arduino sur laquelle la 
// broche DATA du capteur est reliee 
#define DHTPIN 2
#define ventilateurPIN 13 // broche -> pour ventilateur
#define buzzerPIN 5 // broche -> pour buzzer
 
// Definit le type de capteur utilise
#define DHTTYPE DHT11
 
// Declare un objet de type DHT
// Il faut passer en parametre du constructeur 
// de l'objet la broche et le type de capteur
DHT dht(DHTPIN, DHTTYPE);
 
void setup() {
  irrecv.enableIRIn();
  Serial.begin(9600);

  // Initialise la capteur DHT11
  dht.begin();
  pinMode(ventilateurPIN,OUTPUT);
  pinMode(buzzerPIN,OUTPUT);
}
 
void loop() {
  // Recupere la temperature et l'humidite du capteur et l'affiche
  // sur le moniteur serie
  int t = dht.readTemperature();
  int h = dht.readHumidity();
  Serial.print(t);
  Serial.print("/");
  Serial.println(h);
  //Serial.println("");
  // Attend 10 secondes avant de reboucler
  delay(1000);
  if (t > 30) {
    digitalWrite(ventilateurPIN,HIGH); // le ventilateur se met à tourner
    digitalWrite(buzzerPIN,HIGH); // le buzzer se met à sonner
    delay(500);
    digitalWrite(buzzerPIN,LOW); // le buzzer se met à sonner
    delay(500);
  } 
  else {
    digitalWrite(ventilateurPIN,LOW); // le ventilateur s'arrête
    digitalWrite(buzzerPIN,LOW); // le buzzer s'arrête
  }

  unsigned char inChar = (unsigned char)Serial.read();
  if(inChar == '0'){
    digitalWrite(ventilateurPIN, LOW);
  }
  else if(inChar == '1'){
    digitalWrite(ventilateurPIN, HIGH);
  }

  if(irrecv.decode()){ 
    //Serial.print(irrecv.decodedIRData.decodedRawData);
    //delay(1500);
    irrecv.resume();
  }

   //Serial.println(inChar);
       if(irrecv.decodedIRData.decodedRawData == 3125149440) {
     digitalWrite(ventilateurPIN, HIGH);
      //Serial.println("on");
     //ledOn();
  }
   else if (irrecv.decodedIRData.decodedRawData == 3860463360) {
     digitalWrite(ventilateurPIN, LOW);
     //ledOff;
  }
  

  
}
