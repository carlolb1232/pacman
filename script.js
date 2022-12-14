let domWorld = document.getElementById("world");
let domPacman = document.getElementById("pacman");
let domPacman2 = document.getElementById("pacman2");
let domScore = document.getElementById("score");
let domScore2 = document.getElementById("score2");
let domFantasma = document.getElementsByClassName("fantasma");
let domGameOver = document.getElementById("game-over");
let domLives = document.getElementById("lives");
let domLives2 = document.getElementById("lives2");
let domSelect = document.getElementById("dificulty")

let domFantasmaArray = Array.prototype.slice.call(domFantasma,0)
let score = 0;
let score2 = 0;

let ghostPositions = [];

let aleatorio = 0;

let lives = 1;
let lives2 = 2;

let velocidad = 1000;

// ESTABLECER REGLAS DEL MUNDO
let world = [
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  [2,0,1,1,1,2,1,3,1,1,1,1,2,1,1,3,1,1,1,1,1,1,1,2,3,1,1,1,1,1,0,2],
  [2,1,1,1,1,2,1,1,1,1,1,3,2,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1,1,2],
  [2,1,1,2,2,2,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,1,2,2,2,2,2],
  [2,1,1,1,1,2,2,2,2,0,1,1,2,2,2,2,1,1,1,1,1,1,3,2,1,1,1,1,1,3,1,2],
  [2,1,1,3,1,1,3,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,0,1,1,1,2],
  [2,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,3,1,2,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,1,1,1,3,1,1,2,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,2],
  [2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,2,2,2,2,2,2,2,2],
  [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,1,1,1,1,1,1,2,1,1,1,1,1,1,2],
  [2,1,0,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,2],
  [2,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,2,1,3,1,1,1,1,1,2,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
  [2,1,3,1,2,1,1,1,1,1,1,1,2,3,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,2],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
];

// let originalWorld = world.map((array)=>array.map((element)=>element));

// CREAR COPIA DEL MUNDO
let originalWorld = world.map((a)=>{
  // console.log(a);
  return a.map((e)=>{
    // console.log(e);
    return e
  })
}) 

// ESTABLECER PUNTO DE ORIGEN DE PACMAN1
let pacman = {
  x:1,
  y:1
};
// ESTABLECER PUNTO DE ORIGEN DE PACMAN2
let pacman2 = {
  x:30,
  y:1
};

// ESTABLECER PUNTOS DE ORIGEN DE FANTASMAS
let ghosts = [
  ghost1={
    x:17,
    y:14
  },
  ghost2={
    x:21,
    y:10
  },
  ghost3={
    x:2,
    y:13
  },
  ghost4={
    x:9,
    y:4
  },
  ghost5={
    x:27,
    y:5
  },
  ghost6={
    x:20,
    y:2
  }
];

function changeDificulty() {
  console.log(domSelect.value);
  if (domSelect.value == 1) {
    velocidad = 1000;
  }
  if (domSelect.value == 2) {
    velocidad = 600
  }
  if (domSelect.value == 3) {
    velocidad = 400
  }

  setInterval(ghostsLoop, velocidad);
  displayWorld(world);
  displayGhosts();
  displayPacman();
  displayPacman2();
  displayScore();
  displayScore2();
  displayLives();
  displayLives2();

}

// FUNCION PARA CREAR EL MUNDO
function displayWorld(array) {
  let output = ''

  for (let i = 0; i < array.length; i++) {
    output+="<div class='row'>"
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] == 3) {
        output +="<div class='cherry'></div>"
      }
      if (array[i][j] == 2) {
        output +="<div class='brick'></div>"
      }
      if (array[i][j] == 1) {
        output +="<div class='coin'></div>"
      }
      if (array[i][j] == 0) {
        output +="<div class='empty'></div>"
      }
    }
    output+="</div>"
  }
  domWorld.innerHTML = output;
};

// FUNCION PARA CREAR PACMAN1
function displayPacman() {
  domPacman.style.top=pacman.y*20+"px";
  domPacman.style.left=pacman.x*20+"px";
};
// FUNCION PARA CREAR PACMAN2
function displayPacman2() {
  domPacman2.style.top=pacman2.y*20+"px";
  domPacman2.style.left=pacman2.x*20+"px";
};
// FUNCION PARA CREAR FANTASMAS
function displayGhosts() {
  for (let i = 0; i < domFantasmaArray.length; i++) {
    domFantasmaArray[i].style.top=ghosts[i].y*20+"px";
    domFantasmaArray[i].style.left=ghosts[i].x*20+"px";
  }
};
// FUNCION PARA MOSTRAR PUNTAJE DE PACMAN1
function displayScore() {
  domScore.innerHTML = `El jugador 1 tiene: ${score} puntos`;
}
// FUNCION PARA MOSTRAR PUNTAJE DE PACMAN2
function displayScore2() {
  domScore2.innerHTML = `El jugador 2 tiene: ${score2} puntos`;
}
// FUNCION PARA MOSTRAR VIDAS DEL PACMAN1
function displayLives() {
  domLives.innerHTML = `El jugador 1 tiene ${lives} vidas`;
}
// FUNCION PARA MOSTRAR VIDAS DEL PACMAN2
function displayLives2() {
  domLives2.innerHTML = `El jugador 2 tiene ${lives2} vidas`;
}

// FUNCION PARA MOVER LOS FANTASMAS ALEATORIAMENTE
function moveGhosts() {
  for (let i = 0; i < ghosts.length; i++) {
    aleatorio = Math.random()
    if (aleatorio < 0.25 && world[ghosts[i].y][ghosts[i].x+1] != 2) {
      ghosts[i].x++
    }
    if (aleatorio >= 0.25 && aleatorio < 0.5 && world[ghosts[i].y][ghosts[i].x-1] != 2) {
      ghosts[i].x--
    }
    if (aleatorio >= 0.5 && aleatorio < 0.75 && world[ghosts[i].y+1][ghosts[i].x] != 2) {
      ghosts[i].y++
    }
    if (aleatorio >= 0.75 && aleatorio <= 1 && world[ghosts[i].y-1][ghosts[i].x] != 2) {
      ghosts[i].y--
    }
  }
}

// FUNCION PARA DETECTAR SI UN FANTASMA Y UN PACMAN CHOCARON
function detectarColision() {
  for (let i = 0; i < ghosts.length; i++) {
    if( pacman.x == ghosts[i].x && pacman.y == ghosts[i].y){
      pacman.x = 1;
      pacman.y = 1;
      displayPacman();
      lives--
      displayLives();
      if (lives == 0) {
        domGameOver.innerHTML = "JUEGO TERMINADO GANO EL JUGADOR 2"
        displayWorld(originalWorld);
        setTimeout(()=>location.reload(),1000)
      }
    }
    if( pacman2.x == ghosts[i].x && pacman2.y == ghosts[i].y){
      pacman2.x = 30;
      pacman2.y = 1;
      displayPacman2();
      lives2--
      displayLives2();
      if (lives2 == 0) {
        domGameOver.innerHTML = "JUEGO TERMINADO GANO EL JUGADOR 1"
        displayWorld(originalWorld);
        setTimeout(()=>location.reload(),1000)
      }
    }
  }
}

// FUNCION QUE ENCAPSULA EL COMPORTAMIENTO DE LOS FANTASMAS
function ghostsLoop() {
  moveGhosts();
  displayGhosts();
  detectarColision();
  console.log(velocidad);
}



// FUNCION PARA QUE LOS FANTASMAS SE MUEVAN SOLOS
// setInterval(ghostsLoop, velocidad);

// FUNCION PARA DETECTAR EL TECLADO
document.onkeydown = function (e) {
  // console.log(e.keyCode);
  // MOVER PRIMER PACMAN
  // Izquierda
  if (e.keyCode ==37 && world[pacman.y][pacman.x-1] != 2) {
    pacman.x--;
  }
  // Derecha
  if (e.keyCode ==39 && world[pacman.y][pacman.x+1] != 2) {
    pacman.x++;
  }
  // Arriba
  if (e.keyCode ==38 && world[pacman.y-1][pacman.x] != 2) {
    pacman.y--;
  }
  // Abajo
  if (e.keyCode ==40 && world[pacman.y+1][pacman.x] != 2) {
    pacman.y++;
  }
  // MOVER SEGUNDO PACMAN
  // A
  if (e.keyCode == 65 && world[pacman2.y][pacman2.x-1] != 2) {
    pacman2.x--;
  }
  // D
  if (e.keyCode ==68 && world[pacman2.y][pacman2.x+1] != 2) {
    pacman2.x++;
  }
  // W
  if (e.keyCode ==87 && world[pacman2.y-1][pacman2.x] != 2) {
    pacman2.y--;
  }
  // S
  if (e.keyCode ==83 && world[pacman2.y+1][pacman2.x] != 2) {
    pacman2.y++;
  }

  // OBTENER PUNTOS PARA PRIMER PACMAN
  if (world[pacman.y][pacman.x]== 1) {
    world[pacman.y][pacman.x] = 0;
    score+=10;
    displayWorld(world);
    displayScore();
  }
  if (world[pacman.y][pacman.x]== 3) {
    world[pacman.y][pacman.x] = 0;
    score+=50;
    displayWorld(world);
    displayScore();
  }
  
  
  // OBTENER PUNTOS PARA SEGUNDO PACMAN
  if (world[pacman2.y][pacman2.x]== 1) {
    world[pacman2.y][pacman2.x] = 0;
    score2+=10;
    displayWorld(world);
    displayScore2();
  }
  if (world[pacman2.y][pacman2.x]== 3) {
    world[pacman2.y][pacman2.x] = 0;
    score2+=50;
    displayWorld(world);
    displayScore2();
  }
  

  displayPacman();
  displayPacman2();

  detectarColision();

  
}