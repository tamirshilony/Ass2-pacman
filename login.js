function checkLoginValid(msg1, msg2) {
    //get the user input
    username = document.getElementById('lusername_fill').value;
    password = document.getElementById('lpassword_fill').value;
    console.log(password)
        // get the user information from the data base
    var info = JSON.parse(localStorage.getItem(username));
    //checking if user exsist
    if (info === null) {
        document.getElementById(msg1).style.display = "inline"
        document.getElementById("Login_sec").reset();
    } else {
        // checking valid password
        // getting the real password
        console.log(info);
        var real_password = info['password'];
        if (password != real_password) {
            document.getElementById(msg2).style.display = "inline"
            document.getElementById("Login_sec").reset();
        }
    }
    // if pass here username and password are valid
    show_div('setup');
}