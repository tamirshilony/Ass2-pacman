function checkLoginValid(msg1, msg2) {
    //get the user input
    username = document.getElementById('lusername_fill').value;
    password = document.getElementById('lpassword_fill').value;
    // get the user information from the data base
    info = localStorage.getItem(username);
    //checking if user exsist
    if (info === null) {
        document.getElementById(msg1).style.display = "inline"
        document.getElementById("Login_sec").reset();
    } else {
        // checking valid password
        // getting the real password
        real_password = info['password'];
        if (password != real_password) {
            document.getElementById(msg2).style.display = "inline"
            document.getElementById("Login_sec").reset();
        }
    }
    // if pass here username and password are valid
    // divToShow = "setup";
    // return show_div(divToShow);
}