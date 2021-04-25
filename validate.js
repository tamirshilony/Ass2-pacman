$().ready(function() {
    $("#regform").validate({
        rules: {
            rusername: {
                required: true,
                minlength: 2
            },
            rpassword: {
                required: true,
                minlength: 6,
                validPassword: true
            },
            rfullname: {
                required: true,
                validName: true
            },
            remail: {
                required: true,
                email: true
            },
            rdate: {
                required: true,
                minDate: true
            }
        },
        errorElement: "em",
        errorPlacement: function (error, element) {error.insertAfter(element)},
    });

});
$.validator.addMethod("minDate", function(value, element) {
    var now = new Date();
    var myDate = new Date(value);
    return this.optional(element) || myDate < now;
}, "this date is in the future");

$.validator.addMethod('validPassword', function(value, element) {
    return this.optional(element) ||
        (value.search(/[a-zA-Z0-9]/) >= 0 &&
            value.search(/[\!\@\#\$\%\^\&\*\(\)\_\+\,\.\?\\\'\`\~\{\}\[\]\|\-]/) == -1);
}, "Password should contains numbers and letters only");

$.validator.addMethod('validName', function(value, element) {
    return this.optional(element) ||
        value.search(/[0-9]/) == -1;
}, "Full name should contains only letters")


$("#submit").on('click', function() {
    $("#regform").valid();
});

//valid the number of balls in the game
$("#balls_form").validate({
    rules: {
        numBalls: {
            required: true,
            range: [50, 90]
        }
    }
});

$("#check_nballs").on('click', function() {
    $("#balls_form").valid();
});

//valid the time of the game

$("#time_form").validate({
    rules: {
        time_game: {
            required: true,
            range: [60, 1000000000000000]
        }
    }
});

$("#save_time").on('click', function() {
    $("#time_form").valid();
});

//valid the num of mansters
$("#Monsters_form").validate({
    rules: {
        Nmonster: {
            required: true,
            range: [1, 4]
        }
    }
});

$("#save_monster").on('click', function() {
    $("#Monsters_form").valid();
});