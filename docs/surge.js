//artblocks
function random_hash() {
    let chars = "0123456789abcdef";
    let result = '0x';
    for (let i = 64; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  
tokenData = {"hash": random_hash()};
console.log(tokenData);
/*let tokenData = {
    hash:"0x764a94cbfbecb15e308cdb429ef7faa7c88e8014aac4158296f90a16f53eb6f7",tokenId:12345
}*/
S=Uint32Array.from([0,1,s=t=2,3].map(i=>parseInt(tokenData.hash.substr(i*8+2,8),16)));R=_=>(t=S[3],S[3]=S[2],S[2]=S[1],S[1]=s=S[0],t^=t<<11,S[0]^=(t^t>>>8)^(s>>>19),S[0]/2**32);'tx piter'

//0x0b5f7c52389d4e213a8d44ee7d7490a232c89d8a7b17374b368e4a237daa5ef7
//0x393ab867f8cdfafcfb621ab2725d588f4e616c15285f189ff1abb6a73dc2ad51 rarest so far
//0x34d3dc587aceeb6ae5f0f4808d98664774c60cb0480288c557fa5522a385bfa2
//0xd3fdb5363c746d833ed8d3033f96561dd20c0a9859a652c472ce8f336fa3c6fd
//0x0dbdf0b652d472017daea611166d6160dacfecd5961c10bdc7ebe40e54520134



//ccapture
var capturer = new CCapture( { 
    format: 'webm',
    framerate: 12,
    timeLimit: 30 } );




let seed = parseInt(tokenData.hash.slice(0, 16), 16);
let hashPairs = [];
    for (let j=0; j<32; j++){
        hashPairs.push(tokenData.hash.slice(2+(j*2), 4+(j*2)));
        }
let hashData = hashPairs.map(x=>{
    return parseInt(x,16);
});


var DEFAULT_SIZE = 1000;
var WIDTH = Math.min(window.innerWidth,window.innerHeight);
var HEIGHT = Math.min(window.innerWidth,window.innerHeight);
//var WIDTH = DEFAULT_SIZE;
//var HEIGHT = DEFAULT_SIZE;
//var WIDTH = window.innerWidth;
//var HEIGHT = window.innerHeight;
//var WIDTH = 1920;
//var HEIGHT = 1080;
var DIM = Math.min(WIDTH, HEIGHT);
var M = DIM / DEFAULT_SIZE;
var RATIO = WIDTH/HEIGHT;




var color1,color2,c1,c2;
var palette;
var invertedColor;
var shapeMod;
var xInc,yInc;
var gridSize;
var shapeSize;
var noiseScale; 
var zoff = 0;
var xoff = 0;
var yoff = 0;
var xoff2 = 0;
var yoff2 = 0;
var xMod;
var yMod;
var xMod2;
var yMod2;
var speed;
var shape;
var distance;
let border = 100*M;
let pausePressed = false;
var glitched;
var monotone;
var t1,t2,t3;
var tArea
var pArea1,pArea2,pArea3;
var blendmode;
var instability;
var curMillis;
p5.disableFriendlyErrors = true;

function setup() {
    createCanvas(WIDTH, HEIGHT, P2D);
    one = createGraphics(WIDTH, HEIGHT, P2D);
    two = createGraphics(WIDTH, HEIGHT, P2D);
    one.rectMode(CORNER);
    two.rectMode(CORNER);
    t1 = createVector(WIDTH/2, (HEIGHT-((Math.sqrt(3)/2)*WIDTH-border*2))/2); 
    t2 = createVector(WIDTH-border, HEIGHT-(HEIGHT-((Math.sqrt(3)/2)*WIDTH-border*2))/2);
    t3 = createVector(border, HEIGHT-(HEIGHT-((Math.sqrt(3)/2)*WIDTH-border*2))/2);
    tArea = abs((t2.x-t1.x)*(t3.y-t1.y)-(t3.x-t1.x)*(t2.y-t1.y));
    frameRate(12);
    noiseScale = hashData[0] < 20 ? .5 : hashData[0] < 66 ? 1 : hashData[0] < 112 ? 2 : hashData[0] < 158 ? 3 : hashData[0] < 204 ? 4 : hashData[0] < 250 ? 5 : 8;
    gridSize = hashData[1] < 5 ? 40 : hashData[1] < 55 ? 60 : hashData[1] < 105 ? 70 : hashData[1] < 155 ? 80 : hashData[1] < 205 ? 90 : 100;
    speed = hashData[2] < 20 ? .5 : hashData[2] < 110 ? 1 : hashData[2] < 240 ? 2 : 6;
    noiseSeed(seed);
    palette = [
        //["#D0FA00","#E04BC7"], //Arcade
        ["#5eea12","#58727F"], //Biohazard
        //["#198C5D","#F9BF89"], //Redwood
        ["#017554","#fa985b"], //Redwood
        //["#825F41","#F77D30"], //another orange grey brown
        ["#D09CB9","#DB768F"], //Cherry Blossom
        ["#C94E26","#BFC9A0"], //Vintage
        //["#C81A58","#FFB0CD"], //Dragon Fruit
        ["#FC0072","#068C8E"], //Hotline
        ["#FA4627","#9998BC"], //Hyper
        ["#ccd2e3","#43454a"], //Mono
        ["#7288B5","#E02A31"], //Mark 1
        ["#7912E9","#C6117B"], //Vaporwave
        //["#ffa20d","#27272e"], //Yellowjacket
        //["#630012","#e80000"], //Anatomical **fix?
        ["#ffcb7d","#006fed"], //Sunset
        //["#88BDA9","#EE7E4E"], //idk sherbert purple teal
        ["#D1639C","#E9CB31"], //Vice
        ["#f0d0c2","#184E84"], //Express
        //["#d11919","#5c274e"] //Midnight
    ];
    color1 = palette[round(map(hashData[3], 0, 255, 0, palette.length-1))][0];
    color2 = palette[round(map(hashData[3], 0, 255, 0, palette.length-1))][1];
    //color1 = palette[0][0];
    //color2 = palette[0][1];
    //color1 = generateRandomColor();
    //color2 = generateRandomColor();
    //color1 = "#FC0072";
    //color2 = "#068C8E";
    invertedColor = hashData[4] > 128 ? true : false;
    //shapeMod = hashData[5] < 180 ? 1.5 : .8;
    shapeMod = 1.5;
    shapeSize = ((WIDTH-border)/gridSize);
    if (invertedColor) {
        c1 = color(color2);
        c2 = color(color1);
    } else {
        c1 = color(color1);
        c2 = color(color2);
    }
    //shape = hashData[6] < 160 ? "square" : hashData[6] < 240 ? "circle" : "triangle"; //160 240
    shape = hashData[6] < 90 ? "square" : hashData[6] < 180 ? "circle" : hashData[6] < 210 ? "4squares" : hashData[6] < 240 ? "4circles" : "triangle";
    if (shape == "square" || shape == "4squares") {
        distance = 1;
    } else if (shape == "circle") {
        border = 0*M;
        distance = 2.5;
    } else {
        distance = 5.5;
    }
    //glitched = hashData[7] > 240 ? true : false; //240
    instability = hashData[7] < 185 ? 0 : hashData[7] < 225 ? .02 : hashData[7] < 245 ? .98 : 1;


    //for promo **DELETE**
    //instability = 0;
    //////////////////////


    interference = hashData[8] > 1 ? true : false; //240
    monotone = hashData[9] > 200 ? true : false; //200
    blendmode = hashData[10] < 180 ? "dark" : "light"; //180
    if (monotone) {
        c2 = c1;
    } else {
        blendmode = "dark";
    }
    console.log(color1);
    console.log(color2);
    xMod = hashData[12] < 128 ? -1 : 1;
    yMod = hashData[13] < 128 ? -1 : 1;
    xMod2 = hashData[14] < 128 ? -1 : 1;
    yMod2 = hashData[15] < 128 ? -1 : 1;
    

}
function generateRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function draw() {
    one.clear();
    two.clear();
    background(c1);

    //debug
    /*shapeSize = 20;
    noiseScale = 0;*/
    //

    //make interference thing
    if (interference && !pausePressed) {
        if (R() < instability) {
            curMillis = millis()
            //y += random(R() * 30 *M);
            glitched = true;
        } else {
            glitched = false;
        }
    }

    for (let y = border+(WIDTH)/gridSize/2; y < WIDTH-border; y+=(WIDTH)/gridSize) {
        for (let x = border+(HEIGHT)/gridSize/2; x < HEIGHT-border; x+=(HEIGHT)/gridSize) {
            let n = int(map(noise((x/M*noiseScale / 10000) + xoff,(y/M*noiseScale / 10000) + yoff,zoff),0,1,0,360));
            let n2 = int(map(noise((x/M*noiseScale / 10000/2) + xoff,(y/M*noiseScale / 10000/2) + yoff,zoff),0,1,0,360));
            if (shape == "4circles") {
                if (dist(x,y,WIDTH/4 + border/4,HEIGHT/4 + border/4) < WIDTH/distance ||
                dist(x,y,WIDTH - WIDTH/4 - border/4,HEIGHT/4 + border/4) < WIDTH/distance ||
                dist(x,y,WIDTH/4 + border/4,HEIGHT - HEIGHT/4 - border/4) < WIDTH/distance ||
                dist(x,y,WIDTH - WIDTH/4 - border/4,HEIGHT - HEIGHT/4 - border/4) < WIDTH/distance) {
                    createShape(c1,c2,x,y,shapeSize,shapeMod,n,n2);
                }
            } else {
                if (dist(x,y,WIDTH/2,WIDTH/2) < WIDTH/distance && shape != "triangle") {
                    if (shape == "4squares") {
                        //rect((WIDTH/2) - (border/2),0,border,HEIGHT);
                        //rect(0,(HEIGHT/2) - (border/2),WIDTH,border);
                        if (!(x >= (WIDTH/2) - (border/2) &&         // right of the left edge AND
                            x <= (WIDTH/2) - (border/2) + border &&    // left of the right edge AND
                            y >= 0 &&         // below the top AND
                            y <= 0 + HEIGHT) &&
                            !(x >= 0 &&         // right of the left edge AND
                            x <= 0 + WIDTH &&    // left of the right edge AND
                            y >= (HEIGHT/2) - (border/2) &&         // below the top AND
                            y <= (HEIGHT/2) - (border/2) + border)) {    // above the bottom
                                createShape(c1,c2,x,y,shapeSize,shapeMod,n,n2);
                        } 
                    } else {
                        createShape(c1,c2,x,y,shapeSize,shapeMod,n,n2);
                    }
                    //debug
                    /*strokeWeight(5);
                    point(x,y);*/
                } else if (shape == "triangle") {
                    pArea1 = abs((t1.x-x)*(t2.y-y)-(t2.x-x)*(t1.y-y));
                    pArea2 = abs((t2.x-x)*(t3.y-y)-(t3.x-x)*(t2.y-y));
                    pArea3 = abs((t3.x-x)*(t1.y-y)-(t1.x-x)*(t3.y-y));
                    if (floor(pArea1 + pArea2 + pArea3) == floor(tArea)) {
                        createShape(c1,c2,x,y,shapeSize,shapeMod,n,n2);
                    }
                }
            }
        }
        if (!pausePressed) {
            zoff += speed / 100000;
        }
    }
    if (!pausePressed) {
        xoff += speed / 100000 * xMod*10;
        yoff += speed / 100000 * yMod*10;
        xoff2 += speed / 100000 * xMod2*10;
        yoff2 += speed / 100000 * yMod2*10;
    }

    push();
    if (blendmode == "dark") {
        blendMode(DIFFERENCE);
    } else {
        blendMode(SCREEN);
    }
    
    image(one,0,0);
    push();
    image(two,0,0);
    pop();
    pop();



    //stats
    let fps = frameRate();
    fill(255);
    stroke(0);
    text("FPS: " + fps.toFixed(2), 10, height - 10);
    fill(0);
    rect(0,0,125,270);
    fill(255);
    text("gridSize: " + gridSize,10,20);
    text("speed: " + speed,10,40);
    text("noiseScale: " + noiseScale,10,60);
    text("palette: " + round(map(hashData[3], 0, 255, 0, palette.length-1)),10,80);
    text("c1: " + color1,10,100);
    text("c2: " + color2,10,120);
    text("invertedColor: " + invertedColor,10,140);
    text("shapeMod: " + shapeMod,10,160);
    text("shape: " + shape,10,180);
    //text("glitched: " + glitched,10,200);
    text("instability: " + instability,10,200);
    text("interference: " + interference,10,220);
    text("monotone: " + monotone,10,240);
    text("blendmode: " + blendmode,10,260);

    //ccapture
    /*if (frameCount = 1) {
        capturer.start();
    }
    // rendering stuff ...
	capturer.capture( canvas );*/
}

function keyPressed() {
    //space
    if (keyCode == 32) {
        if (!pausePressed) {
            pausePressed = true;
        } else {
            pausePressed = false;
        }      
    }
    //r
    if (keyCode == 82) {
        zoff = 0;
        xoff = 0;
        yoff = 0;
        xoff2 = 0;
        yoff2 = 0;
        S=Uint32Array.from([0,1,s=t=2,3].map(i=>parseInt(tokenData.hash.substr(i*8+2,8),16)));R=_=>(t=S[3],S[3]=S[2],S[2]=S[1],S[1]=s=S[0],t^=t<<11,S[0]^=(t^t>>>8)^(s>>>19),S[0]/2**32);'tx piter'
    }
}
function createShape(c1,c2,x,y,shapeSize,shapeMod,n,n2) {
    one.noStroke();
    two.noStroke();
    one.fill(c1);
    two.fill(c2);
    //one.stroke(c1);
    //two.stroke(c2);
    if (glitched) {
        one.rect(x,y,shapeSize*Math.cos(n)*shapeMod,shapeSize*Math.tan(n)*shapeMod);
        two.rect(x,y,shapeSize*Math.cos(n2)*shapeMod,shapeSize*Math.tan(n2)*shapeMod);
        //one.rect(x,y,shapeSize*Math.tan(n)*shapeMod,shapeSize*Math.cos(n)*shapeMod);
        //two.rect(x,y,shapeSize*Math.tan(n2)*shapeMod,shapeSize*Math.cos(n2)*shapeMod);
    } else {
        one.rect(x,y,shapeSize*Math.cos(n)*shapeMod,shapeSize*Math.cos(n)*shapeMod);
        two.rect(x,y,shapeSize*Math.cos(n2)*shapeMod,shapeSize*Math.cos(n2)*shapeMod);
    }
}

