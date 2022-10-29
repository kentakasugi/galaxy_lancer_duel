let playerImg = [];
for (let i=0 ;i<3 ;i++) {
    playerImg[i] = new Image();
}
playerImg[0].src = "../image_gl/starship_l.png";
playerImg[1].src = "../image_gl/starship.png";
playerImg[2].src = "../image_gl/starship_r.png";
let playerNo=1;

let keyb ={};

let playerFireImg = new Image();
playerFireImg.src = "../image_gl/bullet.png";
let playerFire = [];

class Player {
    constructor() {
        this.x = SCREEN_SIZE_W /2 -PLAYER_SIZE_W/2;
        this.y = SCREEN_SIZE_H -100;
        this.vx = 0;
        this.axelX = +1;
    }
 
    update(gs) {
        if (gs != 'player_explode') {
            if(keyb.Left)   this.vx -= this.axelX;
            if(keyb.Right)  this.vx += this.axelX;
            if(!keyb.Left && !keyb.Right) {
                if(this.vx>0)       this.vx -=(this.axelX/5);
                else if(this.vx<0)  this.vx +=(this.axelX/5);
            }

            if(this.vx > MAX_SPEED)     this.vx=MAX_SPEED;
            if(this.vx < -MAX_SPEED)    this.vx=-MAX_SPEED;

            this.x += this.vx;
            if(this.x < 0) this.x = 0;
            if(this.x > SCREEN_SIZE_W-PLAYER_SIZE_W) this.x = SCREEN_SIZE_W-PLAYER_SIZE_W;

            if(keyb.Fire && playerFire.length < MAX_FIRE)  {
                playerFire.push(new PlayerFire(this.x+27,this.y)); 
                keyb.Fire = false;
            }
                // ダメだった例
                //for (let fireObj in playerFire) {
                //    console.log("p:"+ playerFire.length, fireObj.x,fireObj.y);
                    //fireObj.update();
                //}
            playerFire.forEach(function(obj){
                obj.update();
            });
        }
        else if (gs == 'player_explode') {            
            enemyFire = [];
            playerFire = [];
            playerNo = 0;
            
            if(frameCount % 5 == 0) {                               
                playerImg[0].src  = '../image_gl/explosion' + explodeStatus +'.png';
                explodeStatus++;
                if (explodeStatus == 6) 
                        GAME_STATUS = 'over';
            }
        }
    
    }
    
    draw(gs) {
        if (gs != 'player_explode') {        
            con.drawImage(playerImg[playerNo],0,0,PLAYER_SIZE_W,94, this.x, this.y, PLAYER_SIZE_W, 94);
            playerFire.forEach(function(obj){
                obj.draw();
            });
        }
        else if (gs == 'player_explode') {
            con.drawImage(playerImg[playerNo],0,0,96,96, this.x, this.y, 96, 96);
        }
    }
}

let player = new Player();

class PlayerFire {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.vy = 10;
    }
 
    update() {
        this.y -= this.vy;
        if (this.y < -100) {  //画面から消え去った弾は削除
            playerFire.shift();
        }
        //enemyに当たったか？
        if (enemy.x <= this.x+ENEMY_SIZE_W[enemyNo]/2 && this.x+ENEMY_SIZE_W[enemyNo]/2 <= enemy.x + ENEMY_SIZE_W[enemyNo]
         && enemy.y <= this.y+ENEMY_SIZE_H[enemyNo]/2 && this.y+ENEMY_SIZE_H[enemyNo]/2 <= enemy.y + ENEMY_SIZE_H[enemyNo] ) {
           
            //You WIn表示
            con.font = "36px 'Impact'";
            con.fillStyle = "red"; 
            con.fillText('You Win!!',SCREEN_SIZE_W/2-30,SCREEN_SIZE_H/2);
            GAME_STATUS = 'enemy_explode';

         }
        
    }
    
    draw() {
        con.drawImage(playerFireImg,0,0,PLAYER_FIRE_SIZE_W,PLAYER_FIRE_SIZE_H, this.x, this.y,PLAYER_FIRE_SIZE_W,PLAYER_FIRE_SIZE_H);
    }
}



//--------------------------------------------------------------------
document.onkeydown = function(e) {
    if(e.code == 'ArrowLeft') {
        keyb.Left = true;
        playerNo = 0;
    }
    if(e.code == 'ArrowRight') {
        keyb.Right = true;
        playerNo = 2;
    }
    if(e.code == 'KeyZ') {
        keyb.Fire = true;
    }
}
document.onkeyup = function(e) {
    if(e.code == 'ArrowLeft')   {
        keyb.Left   = false;
        playerNo = 1;
    }
    if(e.code == 'ArrowRight')  {
        keyb.Right  = false;
        playerNo = 1;       
    }
    if(e.code == 'KeyZ') keyb.Fire = false;
}