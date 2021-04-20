function random_setup() {
    game_settings = {};
    game_settings['right'] = 39;
    game_settings['left'] = 37;
    game_settings['up'] = 38;
    game_settings['down'] = 40;
    num_balls = Math.floor(50 + Math.random() * 40);
    balls_color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    game_len = Math.floor(60 + Math.random() * 120);
    num_mansters = Math.floor(1 + Math.random() * 3);
    game_settings['num_balls'] = num_balls;
    game_settings['game_len'] = game_len;
    game_settings['num_mansters'] = num_mansters;
    game_settings['balls_color'] = balls_color;

}

function displays_button(event, button) {
    user_key = event.key;
    document.getElementById(button).value = "" + x;
}

function Save_button() {
    game_settings = {};
    var right = document.getElementById("rightBotton").value;
    var left = document.getElementById("leftBotton").value;
    var up = document.getElementById("upBotton").value;
    var down = document.getElementById("downBotton").value;
    game_settings['right'] = right;
    game_settings['left'] = left;
    game_settings['up'] = up;
    game_settings['down'] = down;
}

function save_num_ball() {
    game_settings = {};
    num_balls = document.getElementById("numBalls").value;
    if (num_balls >= 50 && num_balls <= 90) {
        document.getElementById("end_ball_num").disabled = false;
        game_settings['num_balls'] = num_balls;
    }
}

function save_color() {
    game_settings = {};
    var color5p = document.getElementById("color1").style.background;
    var color15p = document.getElementById("color2").style.background;
    var color25p = document.getElementById("color3").style.background;
    game_settings['color5p'] = color5p;
    game_settings['color15p'] = color15p;
    game_settings['color25p'] = color25p;
    show_div('Game_time');
}

function saveTime() {
    game_settings = {};
    var time = document.getElementById("time_game").value;
    if (time >= 60) {
        document.getElementById("finish_time").disabled = false;
        game_settings['time'] = time;
    }

}

function Save_monsters() {
    game_settings = {};
    var monster_num = document.getElementById("Nmonster").value;
    if (monster_num >= 1 && monster_num <= 4) {
        document.getElementById("finish_monster").disabled = false;
        game_settings['monster'] = monster_num;
    }
}