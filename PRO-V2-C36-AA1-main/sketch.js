var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount;
var estadodejogo;
var quantijogadores;
var car1, car1Image;
var car2, car2Image;
var pistaImage;
var infojogadoresdobancodedados;
var grpdecarros;

function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
  car1Image = loadImage("./assets/car1.png");
  car2Image = loadImage("./assets/car2.png");
  pistaImage = loadImage("./assets/track.jpg");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game(); 
  game.pegaestadodejogo();
  game.start();

}

function draw() {
  background(backgroundImage);
  if (quantijogadores == 2){
  game.atualizarestadodejogo(1);
  }
  if(estadodejogo == 1){game.play()}
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
