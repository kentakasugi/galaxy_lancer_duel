"use strict";

const GAME_FPS = 1000/60;

const SCREEN_SIZE_W = 800;
const SCREEN_SIZE_H = 600;

let   GAME_STATUS = 'opening';
const MAX_SPEED = 5;
const PLAYER_SIZE_W = 74;
const PLAYER_SIZE_H = 96;
let   now_fire = 0;
const MAX_FIRE = 3;
const PLAYER_FIRE_SIZE_W = 20;
const PLAYER_FIRE_SIZE_H = 64;

const ENEMY_SIZE_W = [58, 60, 88, 116,109];
const ENEMY_SIZE_H = [52, 64, 88, 116,96];
const ENEMY_FIRE_SIZE_W = 32;
const ENEMY_FIRE_SIZE_H = 32;

