let context;
let shape = new Object();
let board;
let score;
let pac_color;
let start_time;
let time_elapsed;
let interval1;
let interval2;
let board_size = 16;
let game_settings = new Object();
let monster_num;


function MovingObject(type,i,j,typeBefore){
    this.type = type; //5 for monster, 10 for moving food
    this.i = i;
    this.j = j;
    this.typeBefore = typeBefore //keeps the object type on this [i][j] so it wont lost
}

let moving_objects = [new MovingObject(10,null,null,0),new MovingObject(5,1,1,0),new MovingObject(5,1,14,0),
    new MovingObject(5,14,1,0),new MovingObject(5,14,14,0),];//1 moving food 4 monsters 


$(document).ready(function() {
    context = canvas.getContext("2d");
    Start();
});

function Start() {
    board = new Array(board_size).fill(0);
    score = 0;
    pac_color = "yellow";
    let food_remain = 90;
    let food5 = Math.floor(food_remain*0.6);
    let food15 = Math.floor(food_remain*0.3);
    let food25 = food_remain - food5 - food15;
    // let monster_remains = game_settings.num_mansters;
    monster_num = 3;
    start_time = new Date();
    

    for (let i = 0; i < board_size; i++) {
        board[i] = new Array(board_size).fill(0);
        fix_walls(i);
    }

    for (let m = 1; m <= monster_num; m++){
        board[moving_objects[m].i][moving_objects[m].j] = 5
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

    //place moving food
    emptyCell = findRandomEmptyCell(board);
    moving_objects[0].i = emptyCell[0];
    moving_objects[0].j = emptyCell[1];
    board[emptyCell[0]][emptyCell[1]] = 2;

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
    interval1 = setInterval(UpdatePosition, 250);
    interval2 = setInterval(UpdateObjectsPositions, 350);
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
        window.clearInterval(interval1);
        window.clearInterval(interval2);
        window.alert("Game completed");
    } else {
        Draw();
    }
}

function UpdateObjectsPositions(){
    for(let m = 0; m < (monster_num + 1); m++){
        board[moving_objects[m].i][moving_objects[m].j] = moving_objects[m].typeBefore;
        let direction = Math.floor(Math.random()*3 + 1);
        switch (direction){
            case 0: 
                (moving_objects[m].j > 0 && board[moving_objects[m].i][moving_objects[m].j - 1] != 4) ? moving_objects[m].j-- : m--;
            case 1:
                (moving_objects[m].j < (board_size-1) && board[moving_objects[m].i][moving_objects[m].j + 1] != 4) ? moving_objects[m].j++ : m--;
            case 2:
                (moving_objects[m].i > 0 && board[moving_objects[m].i - 1][moving_objects[m].j] != 4) ? moving_objects[m].i--: m--;
            case 3:
                (moving_objects[m].i < (board_size-1) && board[moving_objects[m].i + 1][moving_objects[m].j] != 4) ? moving_objects[m].i++ : m --;
        }
        board[moving_objects[m].i][moving_objects[m].j] = moving_objects[m].type;
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

function MoveObjects(obj){

}


function fix_walls(i){
	if ( i == 0 ){
        for(let j = 0; j< board_size; j++)
            board[i][j] = 4;
    }else if ( i == 1 ){
        board[i][9] = 4; board[i][0] = 4; board[i][15] = 4;
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
    }else if ( i == board_size-1 ){
        for(let j = 0; j< board_size; j++)
            board[i][j] = 4;
    }
}