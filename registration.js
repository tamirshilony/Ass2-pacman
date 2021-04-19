function save_user() {
    // if(!checkForm(document.forms["registerform"])){
    // 	document.forms["registerform"].focus();
    // 	return false;
    // }
    uName = document.getElementById('rusername').value;
    uPSW = document.getElementById('rpassword').value;
    uFullName = document.getElementById('rname').value;
    uEmail = document.getElementById('rmail').value;
    uDate = document.getElementById('rdate').value;
    // var uName = document.forms["regform"]["rusername"].value;
    // var uPSW = document.forms["regform"]["rpassword"].value;
    // var uFullName = document.forms["regform"]["rname"].value;
    // var uEmail = document.forms["regform"]["rmail"].value;
    // var uDate = document.forms["regform"]["rdate"].value;
    var info = { 'username': uName, 'password': uPSW, 'name': uFullName, 'mail': uEmail, 'date': uDate }
    localStorage.setItem(uName, info)
    userName = uName;
}