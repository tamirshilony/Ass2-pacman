function show_div(div_name) {
    hideAllDivAndModal();
    div2show = document.getElementById(div_name);
    div2show.style.display = "block"
}

function hideAllDivAndModal() {
    let divs = document.getElementsByClassName("section");
    let modals = document.getElementsByClassName("modal");
    for (let i = 0; i < divs.length; i++) {
        divs[i].style.display = "none";
    }
    for (let i = 0; i < modals.length; i++) {
        modals[i].style.display = "none";
    }
}


function modal_handler(modalID) {

    // Get the modal
    let modal = document.getElementById(modalID);
    modal.style.display = "block";

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("closeModal")[0];
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


$(function() {
    $("#col1n").drawrpalette();
});

$("#col1n").click(function() {
    $("#col1n").drawrpalette();

});

$(function() {
    $("#col2n").drawrpalette();
});

$("#col2n").click(function() {
    $("#col2n").drawrpalette();

});

$(function() {
    $("#col3n").drawrpalette();
});

$("#col3n").click(function() {
    $("#col3n").drawrpalette();

});