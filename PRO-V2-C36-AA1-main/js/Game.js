class Game {
  constructor() {
  this.resetButton = createButton("resetar");
  }

  position(){
  this.resetButton.position(width - 200,height - 150);
  this.resetButton.class("customButton");
  this.resetButton.mousePressed(()=>{
  database.ref("/").set({
  quantjogadores:0, estadodejogo:0
  })
  window.location.reload()
  })
  }

  start() {
    form = new Form();
    form.display();
    player = new Player();
    this.position();
    quantijogadores = player.pegaquantijogadores();
    car1 = createSprite(width/2 -100, height -100);
    car1.addImage(car1Image);
    car2 = createSprite(width/2 +100, height -100);
    car2.addImage(car2Image);
    car1.scale = 0.15;
    car2.scale = 0.15;
    grpdecarros = [car1,car2]
  }

  play() {
   Player.jogadoresinfobancodedados();
   image(pistaImage,0, height*-5, width, height*6);
   drawSprites();
   this.position();
   form.hide();
   if (infojogadoresdobancodedados != undefined){
   var controle = 0;
   for(var indice in infojogadoresdobancodedados){
   controle += 1
   var x,y;
   x = infojogadoresdobancodedados[indice].positionX;
   y = height - infojogadoresdobancodedados[indice].positionY;
   grpdecarros[controle -1].position.x = x;
   grpdecarros[controle -1].position.y = y;
   if (controle == player.windex){
   if (player.positionY > 677){
   camera.position.y = grpdecarros[controle -1].position.y;
   }
   }
   }}
   this.movimentaçaodoscarros();

   const LinhaDeChegada = height*6 - 50;
   if (player.positionY > LinhaDeChegada){
   this.voceganhou();
   estadodejogo = 2;
   this.atualizarestadodejogo(2);
   }
  }  

  pegaestadodejogo(){
  database.ref("estadodejogo").on("value",function(data){estadodejogo = data .val()
  })
  }
  atualizarestadodejogo(estadodejogo) {
  database.ref("/").update({estadodejogo:estadodejogo});
  }

  movimentaçaodoscarros(){
  if (keyIsDown(UP_ARROW)) {
  player.positionY += 20; 
  player.atualizarposiçao();
  }
  if (keyIsDown(LEFT_ARROW)&& player.positionX > width/2 - 230) {
  player.positionX -= 20;
  player.atualizarposiçao();
  }
  if (keyIsDown(RIGHT_ARROW)&& player.positionX <width/2 + 200) {
  player.positionX += 20;
  player.atualizarposiçao();
  }
  }

  voceganhou(){
  swal({
  title:"PARABÉNS",
  text:"Você ganhou",
  imageUrl:"https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
  imageSize:"100x100",
  confirmButtonText:"Jogue novamente"
  },
  function(isConfirm){
  if(isConfirm){
    database.ref("/").set({
      quantjogadores:0, estadodejogo:0
      })
      window.location.reload()
  }
  })
  }
  
  voceperdeu(){
  swal({
  title:"Você perdeu",
  imageUrl:"https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
  imageSize:"100x100",
  confirmButtonText:"Jogue novamente"
  },
  function(isConfirm){
  if(isConfirm){
    database.ref("/").set({
      quantjogadores:0, estadodejogo:0
      })
      window.location.reload()
  
  }
  }) 
  }
}
