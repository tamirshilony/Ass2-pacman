function random_setup() {
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
    game_settings['game_len'] = game_len;
    game_settings['num_mansters'] = num_mansters;
    game_settings['balls_color'] = balls_color;
    console.log(game_settings);
    // start game

}

function displays_button(event, button) {
    user_key = event.keyCode;
    // game_settings[button] = user_key;
}

function uniKeyCode(event, id) {
    var x = event.key;
    var key = event.keyCode;
    console.log(key)
    game_settings[id] = key;
    document.getElementById(id).value = "" + x;
}

function Save_button() {
    var right = document.getElementById("rightBotton").value;
    var left = document.getElementById("leftBotton").value;
    var up = document.getElementById("upBotton").value;
    var down = document.getElementById("downBotton").value;
    game_settings['right_button'] = right;
    game_settings['left_button'] = left;
    game_settings['up_button'] = up;
    game_settings['down_button'] = down;
}

function save_num_ball() {
    num_balls = document.getElementById("numBalls").value;
    if (num_balls >= 50 && num_balls <= 90) {
        document.getElementById("end_ball_num").disabled = false;
        game_settings['num_balls'] = num_balls;
    }
}

function save_color() {
    var color5p = document.getElementById("color1").style.background;
    var color15p = document.getElementById("color2").style.background;
    var color25p = document.getElementById("color3").style.background;
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
        game_settings['monster'] = monster_num;
        console.log(game_settings);
        //start game
    }
}

function ColorPickerDisplay() {
    var input1 = document.querySelectorAll("input");
    var input2 = document.querySelectorAll("input");
    var input3 = document.querySelectorAll("input");

    for (var i = 0; i < input1.length; i++) {
        input1[i].addEventListener("input", function() {
            var red = document.getElementById("red1").value,
                green = document.getElementById("grn1").value,
                blue = document.getElementById("blu1").value;
            var display = document.getElementById("color1");
            display.style.background = "rgb(" + red + ", " + green + ", " + blue + ")"

        })

        input2[i].addEventListener("input", function() {
            var red = document.getElementById("red2").value,
                green = document.getElementById("grn2").value,
                blue = document.getElementById("blu2").value;
            var display = document.getElementById("color2");
            display.style.background = "rgb(" + red + ", " + green + ", " + blue + ")"

        })

        input3[i].addEventListener("input", function() {
            var red = document.getElementById("red3").value,
                green = document.getElementById("grn3").value,
                blue = document.getElementById("blu3").value;
            var display = document.getElementById("color3");
            display.style.background = "rgb(" + red + ", " + green + ", " + blue + ")"

        })
    }
}