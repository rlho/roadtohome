let videofile = "Chaos.mp4";
//let videofile = "videos/Excite.mp4"
// videofile = "videos/Frustration.mp4"

let vid;
let playing = true;

let s;
let myRec;
let chaos_song;

function preload() {
  soundFormats("wav");
  //chaos_song = loadSound("videos/deli.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // noCanvas();

  vid = createVideo(videofile);
  //vid.size(1024, 1024);
  vid.volume(0);
  vid.loop();
  vid.hide(); // hides the html video loader
  vid.position(0.0);
  console.log("hello");

  //myRec = new p5.SpeechRec(); // new P5.SpeechRec object

  //myRec.onResult = showResult;

  myRec = new p5.SpeechRec("en-US", parseResult); // new P5.SpeechRec object
  myRec.continuous = true; // do continuous recognition
  //myRec.interimResults = true; // allow partial recognition (faster, less accurate)

  myRec.start();
}

function draw() {
  background(220);

  s = second();

  let img = vid.get();
  image(img, 0, 0, windowWidth, windowHeight); // redraws the video frame by frame in                         p5

  //textSize(40);
  //counter = nf(vid.time(), 0, 2); // first argument is decimal places to the left (use zero to default to places necessary)
  //text(counter, 10, 300);
  //fill('white');
  //textSize(30);
  //text( s, 100, 100)
}

// function keyPressed() {
//  vid.time(random(vid.duration()))
// }

function mousePressed() {
  if (playing) {
    vid.pause();
  } else {
    vid.play();
  }
  playing = !playing;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function showResult() {
  if (myRec.resultValue == true) {
    //background(192, 255, 192);
    //text(myRec.resultString, width/2, height/2);
    console.log("show " + myRec.resultString);
  }
}

function parseResult() {
  // recognition system will often append words into phrases.
  // so hack here is to only use the last word:
  //console.log('myRec', myRec)
  let str = myRec.resultString;
  //console.log('str ', str)
  var mostrecentword = myRec.resultString.split(" ").pop();
  // if(mostrecentword.indexOf("chaos")!==-1) {
  //   //actionChaos()
  //  }
  // if(mostrecentword.indexOf("frustration")!==-1) {
  //  // actionFrustartion()
  // }
  // if(mostrecentword.indexOf("excitement")!==-1) {
  //   //actionExcite();
  // }
  if (mostrecentword.indexOf("chaos") !== -1) {
    actionStart();
  } else if (mostrecentword.indexOf("start") !== -1) {
    actionStart();
  } else if (mostrecentword.indexOf("excitement") !== -1) {
    actionPause();
  } else if (mostrecentword.indexOf("frustration") !== -1) {
    actionPause();
  } else if (mostrecentword.indexOf("stop") !== -1) {
    actionPause();
  }
  console.log("chicken" + mostrecentword);
}

function actionStart() {
  console.log("actionStart");

  vid.play();
  chaos_song.play();

  //  else {
  //    vid.play();
  //  }
  //  playing = !playing;
}

function actionPause() {
  vid.pause();
  chaos_song.stop();
  // console.log("actionStop");
  // if (playing) {
  //   vid.pause();
  // }
  //  else {
  //    vid.play();
  //  }
  //  playing = !playing;
}
