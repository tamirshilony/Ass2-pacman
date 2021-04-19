function save_user() {
    uName = document.getElementById('rusername').value;
    uPSW = document.getElementById('rpassword').value;
    uFullName = document.getElementById('rname').value;
    uEmail = document.getElementById('rmail').value;
    uDate = document.getElementById('rdate').value;
    var info = { 'username': uName, 'password': uPSW, 'name': uFullName, 'mail': uEmail, 'date': uDate }
    localStorage.setItem(uName, info)
    userName = uName;
}