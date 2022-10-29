"use strict";

let can = document.getElementById("can");
let con = can.getContext("2d");
						
document.body.style.overflow = "hidden";

//フレームレート維持
let startTime;
let frameCount;

can.width = SCREEN_SIZE_W;
can.height = SCREEN_SIZE_H;

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
    map.update();
    if (GAME_STATUS == 'over') return;
    if(GAME_STATUS == 'ready') {
        MAX_FIRE = 0;
        player.update();
        enemy.update(GAME_STATUS);

    }
    else {
        map.update();
        player.update(GAME_STATUS);
        enemy.update(GAME_STATUS);
    }
}

function draw() {
    map.draw();
    if (GAME_STATUS == 'over') return;
    else {
        player.draw(GAME_STATUS);
        enemy.draw(GAME_STATUS);
    }

}