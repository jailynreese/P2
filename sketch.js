// This is a basic web serial template for p5.js. Please see:
// https://makeabilitylab.github.io/physcomp/communication/p5js-serial
// 
// By Jon E. Froehlich
// @jonfroehlich
// http://makeabilitylab.io/
//


let serialOptions = { baudRate: 9600  };
let serial;

let currentState = 0;

function preload(){
  plant = loadImage('assets/images/plant.png');
  grayPlant = loadImage('assets/images/plant.png');
  tear = loadImage('assets/images/teardrop.png');
  
  soundFormats('m4a');
  drySound = loadSound('assets/sounds/Dry_2');
  touchSound = loadSound('assets/sounds/touched');
  unlitSound = loadSound('assets/sounds/Unlit_5');
}

function setup() {
  createCanvas(800, 500);

  // Setup Web Serial using serial.js
  serial = new p5.SerialPort();

  serial.list();
  serial.open("COM3");

  /* Specify callback fcns for serial events */
  serial.on("connected", serverConnected);
  serial.on("list", gotList);
  serial.on("data", gotData);
  serial.on("error", gotError);
  serial.on("open", gotOpen);
  serial.on("close", gotClose);


}

function gotData() {
  let currentString = serial.readLine();
  trim(currentString);
  if (!currentString) return;
  //console.log(currentString);
  latestData = currentString;
}

function serverConnected() {
  print("Connected to Server");
}

function gotList(thelist) {
  print("List of Serial Ports:");

  for (let i = 0; i < thelist.length; i++) {
    print(i + " " + thelist[i]);
  }
}

function gotOpen() {
  print("Serial Port is Open");
}

function gotClose() {
  print("Serial Port is Closed");
  latestData = "Serial Port is Closed";
}

function gotError(theerror) {
  print(theerror);
}

function draw(){
  if(currentState === 1){
     noTouch();
  } else if(currentState === 2){
     thirsty();
  } else if(currentState === 3){
     dark();
  } else {
    background('lightblue');
    image(plant, 200, 100);
    fill('black');
    circle(350, 300, 10);
    circle(450, 300, 10);

    //happy face
    noFill();
    arc(400, 300, 30, 20, 0, PI);

    textSize(50);
    textFont('Helvetica');
  }
}


function noTouch(){
   if(touchSound.isLoaded()){
      touchSound.play();
  }
  
  background('red');
  image(plant, 200, 100);
  
  //mouth
  noFill();
  arc(400, 300, 30, 20, PI, 0);
  
  //eyes
  line(340, 280, 360, 290);
  line(440, 290, 460, 280);
  fill('black');
  circle(350, 291, 10);
  circle(450, 291, 10);
  
  //text
  let speech = 'leaf me alone!';
  fill('black');
  text(speech, 250, 70);
}

function thirsty(){
  if(drySound.isLoaded()){
      drySound.play();
    }
  
  background('white');
  image(plant, 200, 100);
  
  //eyes
  fill('black');
  circle(350, 290, 10);
  circle(450, 290, 10);
  //arc(355, 280, 30, 20, PI, 0);
  
  noFill();
  arc(457, 277, 20, 20, QUARTER_PI, PI);
  arc(343, 277, 20, 20, TWO_PI, HALF_PI + QUARTER_PI);
  
  //tears
  image(tear, 320, 300, 20, 30);
  image(tear, 460, 300, 20, 30);
  
  //mouth
  fill('pink');
  line(380, 300, 420, 300);
  arc(410, 301, 10, 20, 0, PI);
  
  //text
  let speech = 'i need water!';
  fill('black');
  text(speech, 250, 70);
}

function dark(){
  if(unlitSound.isLoaded()){
      unlitSound.play();
  }
  
  background('black');
  grayPlant.filter(GRAY);
  image(grayPlant, 200, 100);
  
  //eyes
  fill('black');
  circle(350, 300, 15);
  circle(450, 300, 15);
  
  //mouth
  line(390, 310, 410, 310);
  
  //text
  let speech = 'where\'s the sun?';
  fill('lightgray');
  text(speech, 220, 70);
}
