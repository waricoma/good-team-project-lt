'use strict';

let waricomaLeft = 0;
$('.waricoma').each(function(){
  $(this).attr('style', `width: ${Math.floor(12+Math.random()*9)}%;left:${waricomaLeft+Math.floor(Math.random()*11)}%;`);
  $(this).css('animation-delay', `-${Math.floor(Math.random()*61)}s`);
  waricomaLeft+=20;
});



let stage = new createjs.Stage('circles');
stage.canvas.width  = $(window).width();
stage.canvas.height = $('.slides').height()-68;
$('#circles').css('height', $('.slides').height()-68);

let mvcArr = [];
let mvc;
let mvcSize   = stage.canvas.width*(95/1366);
let mvcBorder = stage.canvas.width*(4.5/1366);
let circle;
let circleColors = ['#3F51B5', '#F44336', '#03A9F4', '#8854d0', '#20bf6b'];
let triangle;
let sub;
let defRotation = 1;
let rotation = defRotation;
let shadow = new createjs.Shadow('#000000',0,0,20);
let skill;
let skills = [
  '> PHP\nCake\nZend',
  '> Ruby\nRails',
  '> Node.js\nSails.js\nExpress',
  '> C#\nASP.NET',
  'Electron\nChromeEx\nMonaca ...etc'
];
let minicoma = new createjs.Bitmap('/asset/waricoma.svg');
minicoma.regX = 0;
minicoma.regY = 0;
let thunder;
let thunderArr = [];
let getPrice = new createjs.Bitmap('/asset/get.png');

function mvcMain(){try{
  minicoma.scaleX = stage.canvas.width*(0.3/1366);
  minicoma.scaleY = stage.canvas.width*(0.3/1366);
  minicoma.x = (stage.canvas.width - (minicoma.getBounds().width *minicoma.scaleX))/2;
  minicoma.y =  stage.canvas.height- (minicoma.getBounds().height*minicoma.scaleY);
  stage.addChild(minicoma);

  getPrice.scaleX = stage.canvas.width*(1.1/1366);
  getPrice.scaleY = stage.canvas.width*(1.1/1366);
  getPrice.x = (stage.canvas.width - (getPrice.getBounds().width *getPrice.scaleX))/2;
  getPrice.visible = false;
  stage.addChild(getPrice);

  for (let i = 0; i < 5; i++) {
    mvc  = new createjs.Container();

    circle = new createjs.Shape();
    circle.graphics.beginStroke(circleColors[i]).setStrokeStyle(mvcBorder).drawCircle(0, 0, mvcSize);
    mvc.addChild(circle);

    triangle = new createjs.Shape();
    triangle.graphics.beginStroke('#f5f6fa').setStrokeStyle(mvcBorder).drawPolyStar(0, 0, mvcSize, 3, 0, -30);
    mvc.addChild(triangle);

    for (let j = 0; j < 3; j++) {
      sub = new createjs.Shape();
      sub.graphics.beginStroke(circleColors[i]).setStrokeStyle(mvcBorder).drawCircle(0, 0, mvcSize/2);
      sub.x = mvcSize * Math.sin(j*360/3*Math.PI/180);
      sub.y = mvcSize * Math.cos(j*360/3*Math.PI/180);
      mvc.addChild(sub);
    }
    mvc.shadow = shadow;
    mvc.x = mvcSize+(mvcSize/2)+(mvcBorder*2)+(mvcSize*2.5*i)+(stage.canvas.width*(50/1366));
    mvc.y = stage.canvas.height- (minicoma.getBounds().height*minicoma.scaleY);

    mvcArr.push(mvc);
    stage.addChild(mvc);

    thunderArr.push([]);
    thunder = new createjs.Bitmap('/asset/thunder.svg');
    thunder.scaleX = stage.canvas.width*(0.8/1366);
    thunder.scaleY = stage.canvas.height*(0.8/700);
    thunder.regX = thunder.getBounds().width;
    thunder.regY = thunder.getBounds().height;
    thunder.x = mvc.x + (stage.canvas.width*(180/1366));
    thunder.y = mvc.y - (stage.canvas.height*(50/1366));
    thunder.shadow = shadow;
    thunder.rotation = 15;
    thunder.visible = false;
    stage.addChild(thunder);
    thunderArr[thunderArr.length-1].push(thunder);

    thunder = new createjs.Bitmap('/asset/thunder.svg');
    thunder.scaleX = stage.canvas.width*(0.9/1366);
    thunder.scaleY = stage.canvas.height*(0.9/700);
    thunder.regX = thunder.getBounds().width;
    thunder.regY = thunder.getBounds().height;
    thunder.x = mvc.x + (stage.canvas.width*(180/1366));
    thunder.y = mvc.y - (stage.canvas.height*(50/1366));
    thunder.shadow = shadow;
    thunder.rotation = -20;
    thunder.visible = false;
    stage.addChild(thunder);
    thunderArr[thunderArr.length-1].push(thunder);

    skill = new createjs.Text(skills[i], `${stage.canvas.width*(42/1366)}px "GenEiAntique_v4"`, '#feca57');
    skill.x = mvc.x - (mvcSize*0.8);
    skill.y = mvc.y - (mvcSize*0.7);
    skill.shadow = shadow;
    stage.addChild(skill);
  }

  stage.update();
}catch(e){
  //if(confirm(`${e}\n\nDo you reload the page?\n*The developer confirmed normal operation.(Chrome and Vivaldi)`)) location.reload();
}}

let forThunderSpeed = 0;
createjs.Ticker.addEventListener('tick', function () {
  for(let mvc of mvcArr){
    mvc.rotation -= rotation;
    if(mvc.rotation < -360) mvc.rotation = 0;
  }
  if(rotation !== defRotation && forThunderSpeed !== 10){
    for(let thunder of thunderArr){
      if(thunder[0].visible){
        thunder[0].visible = false;
        thunder[1].visible = true;
      }else{
        thunder[1].visible = false;
        thunder[0].visible = true;
      }
    }
    forThunderSpeed = 0;
  }
  forThunderSpeed++;
  stage.update();
});

window.addEventListener('resize', function () {
  for(let mvc of mvcArr) stage.removeChild(mvc);
  stage.removeChild(minicoma);
  stage.update();
  mvcMain();
});

mvcMain();

setInterval(function () {
  if($('#circlesTrigger').prop('class') == 'fragment visible current-fragment'){
    if(rotation != defRotation) return;
    rotation = 30;
    for(let i=0; i<5; i++) mvcArr[i].skewX = 50;
    for(let thunder of thunderArr) thunder[0].visible = true;
  }else{
    if(rotation == defRotation) return;
    rotation = defRotation;
    for(let i=0; i<5; i++) mvcArr[i].skewX = 0;
    for(let thunder of thunderArr) for(let thunderLR of thunder) thunderLR.visible = false;
  }
  getPrice.visible = $('#getPriceTrigger').prop('class') == 'fragment visible current-fragment';
},200);
