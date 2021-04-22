var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var board_size = 16;

$(document).ready(function() {
    context = canvas.getContext("2d");
    Start();
});

function Start() {
    board = new Array();
    score = 0;
    pac_color = "yellow";
    var cnt = board_size^2;
    var food_remain = 50;
    var pacman_remain = 1;
    start_time = new Date();
    for (var i = 0; i < board_size; i++) {
        board[i] = new Array();
        fix_walls(i);
        for (var j = 0; j < board_size; j++) {
            if(board[i][j] == 4)
                continue;
            var randomNum = Math.random();
            if (randomNum <= (1.0 * food_remain) / cnt) {
                food_remain--;
                board[i][j] = 1;
            }else if{
                
            }
            } else {
                board[i][j] = 0;
            }
            cnt--;
        }
    }
    while (food_remain > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 1;
        food_remain--;
    }
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
    var i = Math.floor(Math.random() * (board_size-1) + 1);
    var j = Math.floor(Math.random() * (board_size-1) + 1);
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
    for (var i = 0; i < board_size; i++) {
        for (var j = 0; j < board_size; j++) {
            var center = new Object();
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
            } else if (board[i][j] == 1) {
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] == 4) {
                context.beginPath();
                context.rect(center.x - 30, center.y - 30, 60, 60);
                context.fillStyle = "grey"; //color
                context.fill();
            }
        }
    }
}

function UpdatePosition() {
    board[shape.i][shape.j] = 0;
    var x = GetKeyPressed();
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
    if (board[shape.i][shape.j] == 1) {
        score++;
    }
    board[shape.i][shape.j] = 2;
    var currentTime = new Date();
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
    var divs = document.getElementsByClassName("section");
    for(var i = 0; i<divs.length; i++){
        divs[i].style.display = "none";
    }
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

function fix_walls(i){
	if ( i == 0 ){
        for(var j = 0; j< board_size; j++)
            board[i][j] = 4;
    }else if ( i == 1 ){
        board[i][9] = 4; board[i][0] = 4; board[i][15] = 4;
    }else if ( i == 2 ){
        for(var j = 3; j < 8; j++)
            board[i][j] = 4;
        board[i][0] = 4;board[i][9] = 4; board[i][10] = 4; board[i][15] = 4;
    }else if (i == 3){
        board[i][7] = 4; board[i][0] = 4; board[i][15] = 4;
    }else if ( i == 4 ){
		for(var j = 10; j< 15; j++){
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
        for(var j = 9; j< 13; j++){
            board[i][j] = 4;
        } board[i][4] = 4; board[i][15] = 4;board[i][0] = 4;
	}else if( i == 12 ){
		board[i][4] = 4; board[i][3] = 4; board[i][2] = 4; board[i][9] = 4; 
        board[i][15] = 4;board[i][0] = 4;
    }else if( i == 13 ){
		board[i][7] = 4; board[i][12] = 4; board[i][13] = 4; board[i][15] = 4;board[i][0] = 4;
    }else if( i == 14 ){
		board[i][15] = 4;board[i][0] = 4;
    }else if ( i == board_size-1 ){
        for(var j = 0; j< board_size; j++)
            board[i][j] = 4;
    }
}