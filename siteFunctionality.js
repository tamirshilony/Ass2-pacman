function showModel(modalID) {

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
// function modal_handler(modalID){
//     let modal = document.getElementById(modalID);
//     console.log(modal);
//     modal.style.display = "block";

//     let esc = document.getElementsByClassName('closeModal')[0];
//     console.log(esc)
//     esc.onclick = close_modal(modalID);
    
// }

// function close_modal(modalID){
//     document.getElementById(modalID).style.display = "block";
// }
//     function open_modal(modalID){
//         document.getElementById(modalID).style.display = "block";
//     }

    // window.onclick = function(event){
    //     if(event.target == modal)
    // }