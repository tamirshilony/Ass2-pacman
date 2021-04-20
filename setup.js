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