let mapImg = new Image();
mapImg.src = "../image_gl/galaxy.png";


let firstPageY   = 0;
let secondPageY  = -SCREEN_SIZE_H;


class Map {
    constructor() {
    }
 
    update()
    {   
        firstPageY  += 2;
        secondPageY += 2;

        if(firstPageY > SCREEN_SIZE_H)  firstPageY = -SCREEN_SIZE_H;
        if(secondPageY > SCREEN_SIZE_H) secondPageY = -SCREEN_SIZE_H;

    }
    
    draw() {
        con.drawImage(mapImg, 0, 0, 960,720, 0,firstPageY ,960,720);
        con.drawImage(mapImg, 0, 0, 960,720, 0,secondPageY ,960,720);
    }
}

let map = new Map();