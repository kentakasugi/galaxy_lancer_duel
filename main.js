"use strict";

let can = document.getElementById("can");
let con = can.getContext("2d");						
document.body.style.overflow = "hidden";

//フレームレート維持
let startTime;
let frameCount;

can.width = SCREEN_SIZE_W;
can.height = SCREEN_SIZE_H;

let titleImg = new Image();
titleImg.src = "../image_gl/logo.png";
let titleBackImg = new Image();
titleBackImg.src = "../image_gl/nebula.png";
let titleBackAngle = 0;

let explodeStatus = 1;



window.onload = function() {
    startTime = performance.now();
    frameCount = 0;
    mainLoop();
}

function mainLoop()
{
    let nowTime = performance.now();
    let nowFrame = (nowTime - startTime)/ GAME_FPS;

    if(nowFrame > frameCount)
    {
        let c=0;
        while(nowFrame > frameCount) {
            frameCount++;
            //
            update();
            if (++c >= 4) break;
        }
        draw();
    }
    requestAnimationFrame(mainLoop);
}

function update() {
    if(GAME_STATUS != 'go') {
        MAX_FIRE = 0;
    }
    if (GAME_STATUS == 'opening') {

        if(frameCount%5==0){
            titleBackAngle += 20;
        }
        map.update();
    }
    else {
        map.update();
        player.update(GAME_STATUS);
        enemy.update(GAME_STATUS);
    }    
}

function draw() {
    map.draw();

    if (GAME_STATUS == 'opening') {
        con.save();
        con.translate(SCREEN_SIZE_W/2, SCREEN_SIZE_H/2);
        con.rotate(titleBackAngle);
        con.drawImage(titleBackImg,  -400, -400, 800,800);  
        con.restore();   
        con.drawImage(titleImg,  0, 0, 820,240, SCREEN_SIZE_W/2-820/2, SCREEN_SIZE_H/2-240/2,820,240);
        if(keyb.Start)   GAME_STATUS = 'ready';
    }
    else {
        player.draw(GAME_STATUS);    
        enemy.draw(GAME_STATUS);
    }
}