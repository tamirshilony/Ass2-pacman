function modal_handler(modalID) {

    // Get the modal
    var modal = document.getElementById(modalID);
    modal.style.display = "block";

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("closeModal")[0];
    console.log(span);
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function close_modal_move_to_setup(modalID) {
    document.getElementById(modalID).style.display = "none";
    show_div('setup');
}