<<<<<<< HEAD
let context;
let shape = new Object();
let board;
let score;
let pac_color;
let start_time;
let time_elapsed;
let interval;
let board_size = 16;
=======
var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var game_settings = new Object();
>>>>>>> 4b38c641dbcfdc7be8593afc0e40153e508e5774

$(document).ready(function() {
    context = canvas.getContext("2d");
    Start();
});

function Start() {
    board = new Array(board_size).fill(0);
    score = 0;
    pac_color = "yellow";
    let cnt = board_size^2;
    let food_remain = 80;
    let food5 = Math.floor(food_remain*0.6);
    let food15 = Math.floor(food_remain*0.3);
    let food25 = food_remain - food5 - food15;
    let monst_remain = 4;
    start_time = new Date();
    for (let i = 0; i < board_size; i++) {
        board[i] = new Array(board_size).fill(0);
        fix_mosters_n_walls(i);
    }
    // place all kinds of food on board randomly
    while (food_remain > 0) {
        let food_kind;
        if(food_remain > food15 + food25){
            food_kind = 20;
        }else if(food_remain > food25){
            food_kind = 21;
        }else{
            food_kind = 22;
        }
        let emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = food_kind;
        food_remain--;
    }

    // place pacman
    emptyCell = findRandomEmptyCell(board);
    shape.i = emptyCell[0];
    shape.j = emptyCell[1];
    board[emptyCell[0]][emptyCell[1]] = 2;


    keysDown = {};
    addEventListener(
        "keydown",
        function(e) {
            keysDown[e.keyCode] = true;
        },
        false
    );
    addEventListener(
        "keyup",
        function(e) {
            keysDown[e.keyCode] = false;
        },
        false
    );
    interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
    let i = Math.floor(Math.random() * (board_size-1) + 1);
    let j = Math.floor(Math.random() * (board_size-1) + 1);
    while (board[i][j] != 0) {
        i = Math.floor(Math.random() * (board_size-1) + 1);
        j = Math.floor(Math.random() * (board_size-1) + 1);
    }
    return [i, j];
}

function GetKeyPressed() {
    if (keysDown[38]) {
        return 1;
    }
    if (keysDown[40]) {
        return 2;
    }
    if (keysDown[37]) {
        return 3;
    }
    if (keysDown[39]) {
        return 4;
    }
}

function Draw() {
    canvas.width = canvas.width; //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;
    for (let i = 0; i < board_size; i++) {
        for (let j = 0; j < board_size; j++) {
            let center = new Object();
            center.x = i * 60 + 30;
            center.y = j * 60 + 30;
            if (board[i][j] == 2) {
                context.beginPath();
                context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] == 20) {
                DrawFood(center.x, center.y, 'green');
            } else if (board[i][j] == 21) {
                DrawFood(center.x, center.y,'red');
            } else if (board[i][j] == 22) {
                DrawFood(center.x, center.y,'blue');
            } else if (board[i][j] == 4) {
                DrawFullRect(center.x, center.y,'grey')
            }else if(board[i][j] == 5){
                DrawFullRect(center.x, center.y,'black')
            }
        }
    }
}

function DrawFood(x,y,color){
    context.beginPath();
    context.arc(x, y, 15, 0, 2 * Math.PI); // circle
    context.fillStyle = color; //color
    context.fill();
}

function DrawFullRect(x,y,color){
    context.beginPath();
    context.rect(x - 30, y - 30, 60, 60);
    context.fillStyle = color; //color
    context.fill();
}
    
function UpdatePosition() {
    board[shape.i][shape.j] = 0;
    let x = GetKeyPressed();
    if (x == 1) {
        if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
            shape.j--;
        }
    }
    if (x == 2) {
        if (shape.j < (board_size-1) && board[shape.i][shape.j + 1] != 4) {
            shape.j++;
        }
    }
    if (x == 3) {
        if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
            shape.i--;
        }
    }
    if (x == 4) {
        if (shape.i < (board_size-1) && board[shape.i + 1][shape.j] != 4) {
            shape.i++;
        }
    }
    if (board[shape.i][shape.j] == 20) {
        score+=5;
    }else if (board[shape.i][shape.j] == 21) {
        score+=15;
    }else if (board[shape.i][shape.j] == 22) {
        score+=25;
    }

    board[shape.i][shape.j] = 2;
    let currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    if (score >= 20 && time_elapsed <= 10) {
        pac_color = "green";
    }
    if (score == 50) {
        window.clearInterval(interval);
        window.alert("Game completed");
    } else {
        Draw();
    }
}

function show_div(div_name) {
    hide_all_sections();
    div2show = document.getElementById(div_name);
    div2show.style.display = "block"
}

function hide_all_sections(){
    let divs = document.getElementsByClassName("section");
    for(let i = 0; i<divs.length; i++){
        divs[i].style.display = "none";
    }
<<<<<<< HEAD
}

function random_setup() {
    game_settings = { right: 39, left: 37, up: 38, down: 40 };
    num_balls = Math.floor(50 + Math.random() * 40);
    balls_color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    game_len = Math.floor(60 + Math.random() * 120);
    num_mansters = Math.floor(1 + Math.random() * 3);
    game_settings['num_balls'] = num_balls;
    game_settings['game_len'] = game_len;
    game_settings['num_mansters'] = num_mansters;
    game_settings['balls_color'] = balls_color;

}

function fix_mosters_n_walls(i){
	if ( i == 0 ){
        for(let j = 0; j< board_size; j++)
            board[i][j] = 4;
    }else if ( i == 1 ){
        board[i][9] = 4; board[i][0] = 4; board[i][15] = 4;
        board[i][1] = 5; board[i][14] = 5;// Monsters
    }else if ( i == 2 ){
        for(let j = 3; j < 8; j++)
            board[i][j] = 4;
        board[i][0] = 4;board[i][9] = 4; board[i][10] = 4; board[i][15] = 4;
    }else if (i == 3){
        board[i][7] = 4; board[i][0] = 4; board[i][15] = 4;
    }else if ( i == 4 ){
		for(let j = 10; j< 15; j++){
            board[i][j] = 4;
        } board[i][7] = 4;board[i][0] = 4;board[i][15] = 4;
    }else if ( i == 5 ){
        board[i][7] = 4; board[i][6] = 4; board[i][10] = 4;board[i][0] = 4; 
        board[i][15] = 4; board[i][5] = 4;
	}else if ( i == 6 ){
        board[i][7] = 4; board[i][9] = 4; board[i][10] = 4;board[i][0] = 4; board[i][15] = 4;
    }else if ( i == 7 ){
        board[i][0] = 4; board[i][2] = 4; board[i][15] = 4; board[i][7] = 4;
	}else if( i == 8 ){
		board[i][4] = 4; board[i][1] = 4; board[i][2] = 4; board[i][7] = 4;
        board[i][12] = 4; board[i][13] = 4; board[i][15] = 4;board[i][0] = 4;
    }else if ( i == 9 ){
        board[i][0] = 4; board[i][4] = 4; board[i][12] = 4; board[i][15] = 4;
        board[i][7] = 4; board[i][8] = 4;
    }else if ( i == 10 ){
        board[i][0] = 4; board[i][4] = 4; board[i][12] = 4; board[i][15] = 4; board[i][15] = 4;
	}else if ( i == 11 ){
        for(let j = 9; j< 13; j++){
            board[i][j] = 4;
        } board[i][4] = 4; board[i][15] = 4;board[i][0] = 4;
	}else if( i == 12 ){
		board[i][4] = 4; board[i][3] = 4; board[i][2] = 4; board[i][9] = 4; 
        board[i][15] = 4;board[i][0] = 4;
    }else if( i == 13 ){
		board[i][7] = 4; board[i][12] = 4; board[i][13] = 4; board[i][15] = 4;board[i][0] = 4;
    }else if( i == 14 ){
		board[i][15] = 4;board[i][0] = 4;
        board[i][1] = 5; board[i][14] = 5;// Monsters
    }else if ( i == board_size-1 ){
        for(let j = 0; j< board_size; j++)
            board[i][j] = 4;
    }
=======
>>>>>>> 4b38c641dbcfdc7be8593afc0e40153e508e5774
}