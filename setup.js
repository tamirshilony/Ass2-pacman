function random_setup() {
    keyCodeRight = "ArrowRight";
    keyCodeLeft = "ArrowLeft";
    keyCodeUp = "ArrowUp";
    keyCodeDown = "ArrowDown";
    game_settings['rightBotton'] = 39;
    game_settings['leftBotton'] = 37;
    game_settings['upBotton'] = 38;
    game_settings['downBotton'] = 40;
    num_balls = Math.floor(50 + Math.random() * 40);
    colors = [];
    for (i = 0; i < 3; i++) {
        colors[i] = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    }
    game_settings['color5p'] = colors[0];
    game_settings['color15p'] = colors[1];
    game_settings['color25p'] = colors[2];
    game_len = Math.floor(60 + Math.random() * 120);
    num_mansters = Math.floor(1 + Math.random() * 3);
    game_settings['num_balls'] = num_balls;
    game_settings['time'] = game_len;
    game_settings['num_mansters'] = num_mansters;
    game_settings['balls_color'] = balls_color;
    console.log(game_settings);
    display_prop();

    startGame();

}

function uniKeyCode(event, id) {
    var x = event.key;
    if (id == "rightBotton") {
        keyCodeRight = x;
    } else if (id == "leftBotton") {
        keyCodeLeft = x;
    } else if (id == "upBotton") {
        keyCodeUp = x;
    } else if (id == "downBotton") {
        keyCodeDown = x;
    }
    var key = event.keyCode;
    console.log(key)
    game_settings[id] = key;
    document.getElementById(id).value = "" + x;
}

function save_buttons() {
    document.getElementById("key_error").style.display = "none";
    document.getElementById("next_step").style.display = "none";
    buttons = [];
    buttons.push(game_settings['rightBotton']);
    buttons.push(game_settings['leftBotton']);
    buttons.push(game_settings['upBotton']);
    buttons.push(game_settings['downBotton']);
    console.log(buttons);
    var validuniq = true;
    for (i = 0; i < 3 && validuniq; i++) {
        curr = buttons[i];
        console.log(curr);
        for (j = i + 1; j < 4 && validuniq; j++) {
            console.log(buttons[j]);
            if (curr === buttons[j]) {
                document.getElementById("key_error").style.display = "inline";
                validuniq = false;
            }
        }
    }
    if (validuniq) {
        document.getElementById("next_step").style.display = "block";
    }
}


function save_num_ball() {
    num_balls = document.getElementById("numBalls").value;
    if (num_balls >= 50 && num_balls <= 90) {
        document.getElementById("end_ball_num").disabled = false;
        game_settings['num_balls'] = num_balls;
    }
}

function save_color() {
    var color5p = document.getElementById("col1n").value;
    console.log(color5p);
    var color15p = document.getElementById("col2n").value;
    var color25p = document.getElementById("col3n").value;
    game_settings['color5p'] = color5p;
    game_settings['color15p'] = color15p;
    game_settings['color25p'] = color25p;
    show_div('Game_time');
}

function saveTime() {
    var time = document.getElementById("time_game").value;
    if (time >= 60) {
        document.getElementById("finish_time").disabled = false;
        game_settings['time'] = time;
    }

}

function Save_monsters() {
    var monster_num = document.getElementById("Nmonster").value;
    if (monster_num >= 1 && monster_num <= 4) {
        document.getElementById("finish_monster").disabled = false;
        game_settings['num_mansters'] = monster_num;
        console.log(game_settings);
        display_prop();

        startGame();
    }
}

function display_prop() {
    var right = keyCodeRight;
    document.getElementById("Rbutton").innerHTML = right;
    var left = keyCodeLeft;
    document.getElementById("Lbutton").innerHTML = left;
    var up = keyCodeUp;
    document.getElementById("Ubutton").innerHTML = up;
    var down = keyCodeDown;
    document.getElementById("Dbutton").innerHTML = down;
    var ball = game_settings.num_balls;
    document.getElementById("Nball").innerHTML = ball;
    var manster = game_settings.num_mansters;
    document.getElementById("Nmanster").innerHTML = manster;
    var len = game_settings.time;
    document.getElementById("gameLen").innerHTML = len;
    var user = currUser;
    document.getElementById("currUserName").innerHTML = user;
    document.getElementById("myTable").style.display = "block";
}