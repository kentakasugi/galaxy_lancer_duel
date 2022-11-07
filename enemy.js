let enemyImg = [];
for (let i=0 ;i<5 ;i++) {
    enemyImg[i] = new Image();
}
enemyImg[0].src = "../image_gl/enemy1.png";
enemyImg[1].src = "../image_gl/enemy2.png";
enemyImg[2].src = "../image_gl/enemy3.png";
enemyImg[3].src = "../image_gl/enemy4.png";
enemyImg[4].src = "../image_gl/enemy_boss3.png";

let enemyNo = 0;

let enemyFireImg = new Image();
enemyFireImg.src = "../image_gl/enemy0.png";
let enemyFire = [];

class Enemy {
    constructor() {
        this.x = -30;
        this.y = 5;
        this.vx = 0;
        this.axelX = +1;
    }
 
    update(gs) {
        if (gs == 'ready') {
            this.x += 2;
            if (this.x >= SCREEN_SIZE_W /2) {
                GAME_STATUS = 'go'; 
                MAX_FIRE = 2;                               
            }
        }
        else if (gs == 'go') {
            if (enemyNo < 5) {
                if(Math.random()>0.5) this.vx -= this.axelX;
                else this.vx += this.axelX;

                if(enemyNo == 4) {   //lasBossは相手の玉から逃げる動きをとる
                   //作成中

                }

                if(this.vx > MAX_SPEED)     this.vx=MAX_SPEED;
                if(this.vx < -MAX_SPEED)    this.vx=-MAX_SPEED;

                this.x += this.vx;
                if(this.x < 0) this.x = 0;
                if(this.x > SCREEN_SIZE_W-ENEMY_SIZE_W[enemyNo]) this.x = SCREEN_SIZE_W-ENEMY_SIZE_W[enemyNo];

                if(Math.random()>0.7 && enemyFire.length < MAX_FIRE &&  frameCount%10==0)  {
                    enemyFire.push(new EnemyFire(this.x+ENEMY_SIZE_W[enemyNo]/2,this.y+ENEMY_SIZE_H[enemyNo]/2)); 
                }
            }
            enemyFire.forEach(function(obj){
                obj.update();
            });
        }
        else if (gs == 'enemy_explode') {

            enemyFire = [];
            playerFire = [];
            
            if(frameCount % 5 == 0) {                
                enemyImg[enemyNo].src = '../image_gl/explosion' + explodeStatus +'.png';
                explodeStatus++;
                if (explodeStatus == 6) {
                    enemyNo += 1;
                    if (enemyNo ==5){
                        GAME_STATUS = 'enemy_over';
                    }
                    else {
                        GAME_STATUS = 'ready';
                        explodeStatus = 1;
                        this.x = -30;
                    }
    
                }
            }

        }   
    }
 
  
    draw(gs) {

        if (gs == 'ready') {
            con.font = "36px 'Impact'";
            con.fillStyle = "yellow"; 
            con.fillText('Ready ?',SCREEN_SIZE_W/2-120,SCREEN_SIZE_H/2);
            con.drawImage(enemyImg[enemyNo],0,0,ENEMY_SIZE_W[enemyNo],ENEMY_SIZE_H[enemyNo], this.x, this.y,ENEMY_SIZE_W[enemyNo],ENEMY_SIZE_H[enemyNo]);
            enemyFire.forEach(function(obj){
                obj.draw();
            });
        }
        else if (gs == 'enemy_explode') { 
            con.drawImage(enemyImg[enemyNo],0,0,96,96, this.x, this.y, ENEMY_SIZE_W[enemyNo],ENEMY_SIZE_H[enemyNo]);
        }
             
        else if (gs == 'enemy_over') {
            con.font = "36px 'Impact'";
            con.fillStyle = "green"; 
            con.fillText('You Win!!',SCREEN_SIZE_W/2-100,SCREEN_SIZE_H/2);
        }
        else {
            con.drawImage(enemyImg[enemyNo],0,0,ENEMY_SIZE_W[enemyNo],ENEMY_SIZE_H[enemyNo], this.x, this.y, ENEMY_SIZE_W[enemyNo],ENEMY_SIZE_H[enemyNo]);
            enemyFire.forEach(function(obj){
                obj.draw();
            });
        }
    }
}

let enemy = new Enemy();

let prevDirX = 0;
class EnemyFire {
    constructor(x,y) {
        this.x = x;
        this.dirX = 0;
        this.y = y;
        this.vy = 10;
        this.diffX = (player.x -x)/((player.y -y)/this.vy);
    }
 
    update() {
        if (enemyNo == 0) {  //真っすぐ下へ
            this.dirX = 0;
            this.y += this.vy;
        }
        else if (enemyNo == 1) {   //狙い撃ち
            this.dirX += this.diffX;
            this.y += this.vy;
        }
        else if (enemyNo == 2) {  //曲がりながら下へ
            this.dirX = Math.sin(frameCount/10) * 50;
            this.y += this.vy;
        }
        else if (enemyNo < 5) { //曲がりながら狙い撃ち
            
            this.dirX += this.diffX - prevDirX;  
            prevDirX = Math.sin(frameCount/10) * 50;          
            this.dirX += prevDirX;           

            this.y += this.vy;
        }

        if (this.y > SCREEN_SIZE_H) {  //画面から消え去った弾は削除
            enemyFire.shift();
        }
        //playerに当たったか？
        if (player.x <= (this.x+this.dirX)+ENEMY_FIRE_SIZE_W/2 && (this.x+this.dirX)+ENEMY_FIRE_SIZE_W/2 <= player.x + PLAYER_SIZE_W 
         && player.y <= this.y+ENEMY_FIRE_SIZE_H/2 && this.y+ENEMY_FIRE_SIZE_H/2 <= player.y + PLAYER_SIZE_H ) {
            GAME_STATUS = 'player_explode';           

            playerImg[0].src = "../image_gl/explosion3.png";
            playerImg[1].src = "../image_gl/explosion3.png";
            playerImg[2].src = "../image_gl/explosion3.png";
         }

    }
    
    draw() {
        //console.log("a",this.x,this.y);
        con.drawImage(enemyFireImg,0,0,ENEMY_FIRE_SIZE_W,ENEMY_FIRE_SIZE_H, (this.x+this.dirX), this.y,ENEMY_FIRE_SIZE_W,ENEMY_FIRE_SIZE_H);
    }
}

