let context;
let shape = new Object();
let board;
let score;
let life;
let pac_color;
let start_time;
let time_elapsed;
let interval1;
let interval2;
let board_size = 16;
let game_settings = new Object();
let monster_num;
let moving_objects_num;
let keyCodeUp;
let keyCodeDown;
let keyCodeRight;
let keyCodeLeft;
let endMsg;
game_settings.time = 20;

class MovingObject {
    constructor(type, i = 0, j = 0, typeBefore = 0) {
        this.type = type; //5 for monster, 1 for moving food
        this.i = i;
        this.j = j;
        this.typeBefore = typeBefore; //keeps the object type on this [i][j] so it wont lost
    }
}

let moving_objects = [new MovingObject(1), new MovingObject(5), new MovingObject(5),
    new MovingObject(5), new MovingObject(5),]; //1 moving food 4 monsters 
    
let monst_loc = [[1,1],[1,14],[14,1],[14,14]];


$(document).ready(function() {
    context = canvas.getContext("2d");
    Start();
});

function Start() {
    board = new Array(board_size).fill(0);
    score = 0;
    life = 5;
    pac_color = "yellow";
    let food_remain = 90;
    let food5 = Math.floor(food_remain * 0.6);
    let food15 = Math.floor(food_remain * 0.3);
    let food25 = food_remain - food5 - food15;
    endMsg = document.getElementById('endMsg');
    console.log(endMsg);
    // let monster_num = game_settings.num_mansters;
    monster_num = 3;
    moving_objects_num = monster_num + 1; // monsters + candy
    start_time = new Date();
    
    //creat board and fix walls
    for (let i = 0; i < board_size; i++) {
        board[i] = new Array(board_size).fill(0);
        fix_walls(i);
    }

    placeMonsters();

    //place moving food in center
    moving_objects[0].i = 7;
    moving_objects[0].j = 7;
    board[7][7] = 1;

    // place time and life food
    let emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = 23;
    emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = 24;

    // place all kinds of food on board randomly
    while (food_remain > 0) {
        let food_kind;
        if (food_remain > food15 + food25) {
            food_kind = 20;
        } else if (food_remain > food25) {
            food_kind = 21;
        } else {
            food_kind = 22;
        }
        emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = food_kind;
        food_remain--;
    }

    placePacman();
    
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
    interval1 = setInterval(UpdatePosition, 150);
    interval2 = setInterval(UpdateObjectsPositions, 400);
}

function placeMonsters(){
    let l = 0, m = 0;
    if (moving_objects[m].type == 1)// check if the first object is moving food
        m =1;

    for(m; m < moving_objects_num; m++){
        if(moving_objects[m].i != 0) // only if it is not the first move
            board[moving_objects[m].i][moving_objects[m].j] = moving_objects[m].typeBefore;

        //go back to corners
        moving_objects[m].i = monst_loc[l][0]; 
        moving_objects[m].j =  monst_loc[l][1];
        board[moving_objects[m].i][moving_objects[m].j] = 5;
        l++;
    }
}
    
function placePacman(){
    emptyCell = findRandomEmptyCell(board);
        shape.i = emptyCell[0];
        shape.j = emptyCell[1];
        board[emptyCell[0]][emptyCell[1]] = 2;
}

function findRandomEmptyCell(board) {
    let i = Math.floor(Math.random() * (board_size - 1) + 1);
    let j = Math.floor(Math.random() * (board_size - 1) + 1);
    while (board[i][j] != 0) {
        i = Math.floor(Math.random() * (board_size - 1) + 1);
        j = Math.floor(Math.random() * (board_size - 1) + 1);
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
    lblTime.value = Math.floor(time_elapsed);
    lblLife.value = life;
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
                DrawFood(center.x, center.y, 'red');
            } else if (board[i][j] == 22) {
                DrawFood(center.x, center.y, 'blue');
            } else if (board[i][j] == 23) {
                DrawFullRect(center.x, center.y, 'DeepPink')
            } else if (board[i][j] == 24) {
                DrawFullRect(center.x, center.y, 'BlueViolet')
            } else if (board[i][j] == 4) {
                DrawFullRect(center.x, center.y, 'grey')
            } else if (board[i][j] == 5) {
                DrawFullRect(center.x, center.y, 'black')
            }else if (board[i][j] == 1) {
                DrawFullRect(center.x, center.y, 'DarkMagenta')
            }
        }
    }
}

function DrawFood(x, y, color) {
    context.beginPath();
    context.arc(x, y, 15, 0, 2 * Math.PI); // circle
    context.fillStyle = color; //color
    context.fill();
}

function DrawFullRect(x, y, color) {
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
        if (shape.j < (board_size - 1) && board[shape.i][shape.j + 1] != 4) {
            shape.j++;
        }
    }
    if (x == 3) {
        if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
            shape.i--;
        }
    }
    if (x == 4) {
        if (shape.i < (board_size - 1) && board[shape.i + 1][shape.j] != 4) {
            shape.i++;
        }
    }
    CheckCollision();

    board[shape.i][shape.j] = 2;
    let currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    if (score >= 20 && time_elapsed <= 10) {
        pac_color = "green";
    }
    if (lblTime.value == game_settings.time) {
        EndGame();
    } else {
        Draw();
    }
}


function UpdateObjectsPositions(){
    let mov, next_i, next_j;
    let copy_objects = moving_objects
    for(let m = 0; m < moving_objects_num; m++){
        board[moving_objects[m].i][moving_objects[m].j] = moving_objects[m].typeBefore;
        do{

            mov = getDirection(moving_objects[m]);
            next_i = moving_objects[m].i + mov[0];
            next_j = moving_objects[m].j + mov[1];

        } while (board[next_i][next_j] == 4)
        
        board[moving_objects[m].i][moving_objects[m].j] = moving_objects[m].typeBefore;// put back what ever was in this square before
        
        moving_objects[m].i += mov[0];
        moving_objects[m].j += mov[1];
        
        if( board[moving_objects[m].i][moving_objects[m].j] == 0 || board[moving_objects[m].i][moving_objects[m].j] > 5)
            moving_objects[m].typeBefore = board[moving_objects[m].i][moving_objects[m].j];// keep whatever is in this square

        board[moving_objects[m].i][moving_objects[m].j] = moving_objects[m].type;// move myself to next square
    }
    CheckCollision()
    Draw();
}

function CheckCollision(){
    if (board[shape.i][shape.j] == 20) {
        score += 5;
    } else if (board[shape.i][shape.j] == 21) {
        score += 15;
    } else if (board[shape.i][shape.j] == 22) {
        score += 25;
    } else if (board[shape.i][shape.j] == 23) {
        game_settings.time += 10;
    } else if (board[shape.i][shape.j] == 24) {
        life ++;
    } else if (board[shape.i][shape.j] == 5) {
        score -= 10;
        life --;
        if (life == 0){
            EndGame();
        }
        board[shape.i][shape.j] = 5;
        placeMonsters();
        placePacman();
    } else if (board[shape.i][shape.j] == 1){
        moving_objects_num --;
        score += 50;
        moving_objects.shift()
    }
}

// get direction for moving objects
function getDirection(obj){
    let i_change, j_change;
    let rand = Math.random();
    let directions_prob = [0.25,0.5,0.75];// all directions get the same probability

    if (obj.type == 5){

        // calculate in which direction the movment of the monster should get higer probability
        if (Math.abs(obj.i - shape.i) - Math.abs(obj.j - shape.j) >= 0){// check on which axis the diff is larger
            if (obj.i - shape.i > 0)// pacman is on the left of monster
                directions_prob = [0.7,0.8,0.9]; 
            else
                directions_prob = [0.1,0.8,0.9]; 
        } else{
            if (obj.j - shape.j > 0)// pacman is higher than monster
            directions_prob = [0.1,0.2,0.9]; 
            else
            directions_prob = [0.1,0.2,0.3]; 
        }        
    }

    if (rand < directions_prob[0]){ 
        i_change = -1, j_change = 0; // left
    }else if (directions_prob[0] <= rand && rand < directions_prob[1]){ 
        i_change = 1, j_change = 0; // right

    }else if (directions_prob[1] <= rand && rand < directions_prob[2]){ 
        i_change = 0, j_change = -1; // up
    }else if (directions_prob[2] <= rand){ 
        i_change = 0, j_change = 1; // down
    }
    return [i_change, j_change]
}

function EndGame(){
    window.clearInterval(interval1);
    window.clearInterval(interval2);

    if (life == 0){
        endMsg.innerHTML = "Loser!"
    }
    if(score < 100){
        endMsg.innerHTML = "You are better than " + score + " points!"  
    }else {
        endMsg.innerHTML = "Winner!!!"      
    }
    modal_handler('gameEnd');
}

function fix_walls(i) {
    if (i == 0) {
        for (let j = 0; j < board_size; j++)
            board[i][j] = 4;
    } else if (i == 1) {
        board[i][9] = 4;
        board[i][0] = 4;
        board[i][15] = 4;
    } else if (i == 2) {
        for (let j = 3; j < 8; j++)
            board[i][j] = 4;
        board[i][0] = 4;
        board[i][9] = 4;
        board[i][10] = 4;
        board[i][15] = 4;
    } else if (i == 3) {
        board[i][7] = 4;
        board[i][0] = 4;
        board[i][15] = 4;
    } else if (i == 4) {
        for (let j = 10; j < 15; j++) {
            board[i][j] = 4;
        }
        board[i][7] = 4;
        board[i][0] = 4;
        board[i][15] = 4;
    } else if (i == 5) {
        board[i][7] = 4;
        board[i][6] = 4;
        board[i][10] = 4;
        board[i][0] = 4;
        board[i][15] = 4;
        board[i][5] = 4;
    } else if (i == 6) {
        board[i][7] = 4;
        board[i][9] = 4;
        board[i][10] = 4;
        board[i][0] = 4;
        board[i][15] = 4;
    } else if (i == 7) {
        board[i][0] = 4;
        board[i][2] = 4;
        board[i][15] = 4;
        board[i][7] = 4;
    } else if (i == 8) {
        board[i][4] = 4;
        board[i][1] = 4;
        board[i][2] = 4;
        board[i][7] = 4;
        board[i][12] = 4;
        board[i][13] = 4;
        board[i][15] = 4;
        board[i][0] = 4;
    } else if (i == 9) {
        board[i][0] = 4;
        board[i][4] = 4;
        board[i][12] = 4;
        board[i][15] = 4;
        board[i][7] = 4;
        board[i][8] = 4;
    } else if (i == 10) {
        board[i][0] = 4;
        board[i][4] = 4;
        board[i][12] = 4;
        board[i][15] = 4;
        board[i][15] = 4;
    } else if (i == 11) {
        board[i][9] = 4;
        board[i][10] = 4;
        board[i][12] = 4;
        board[i][4] = 4;
        board[i][15] = 4;
        board[i][0] = 4;
    } else if (i == 12) {
        board[i][4] = 4;
        board[i][3] = 4;
        board[i][2] = 4;
        board[i][9] = 4;
        board[i][15] = 4;
        board[i][0] = 4;
    } else if (i == 13) {
        board[i][6] = 4;
        board[i][7] = 4;
        board[i][12] = 4;
        board[i][13] = 4;
        board[i][15] = 4;
        board[i][0] = 4;
    } else if (i == 14) {
        board[i][15] = 4;
        board[i][0] = 4;
    } else if (i == board_size - 1) {
        for (let j = 0; j < board_size; j++)
            board[i][j] = 4;
    }
}