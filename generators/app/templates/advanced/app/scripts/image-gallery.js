
$(document).ready(function() {
	var previous = " ";
    $("#image_gallery").click(function(event) {
        var id_name = event.target.id;
        id_name = id_name.replace(/[0-9]/g, ''); //regex for alphabets, no numbers
        var id_toggle = document.getElementById(id_name); //get ID of names under class "team-bio"
        if(document.getElementById(id_name)){ //if ID exists
			if((previous != id_name) && (previous != " ")){ //if you click a diff image
				var id_previous = document.getElementById(previous);
				$(id_previous).toggle("hidden");
				console.log(id_previous);

			}
			else if(previous == id_name){ //clicking on the same image
				$(id_toggle).toggle("unhidden");
			}
			$(id_toggle).toggle("unhidden"); //toggles txtbox to appear
        	 previous = id_name;//checks to see if you clicked different images
        }
        else{
        	alert("This person does not exist. Try again.");
        }
        }
    );
});