var jq = require('jquery');

jq(document).ajaxStop(function () {
    'use strict';
    
    var previous = ' ';

    jq(document).on('click', '#image_gallery', function(event) {
        var id_name = event.target.id;
        console.log(id_name);
        id_name = id_name.replace(/[0-9]/g, ''); //regex for alphabets, no numbers
        var id_toggle = document.getElementById(id_name); //get ID of names under class 'team-bio'

        if (document.getElementById(id_name) && id_name != "image_gallery") { //if ID exists and accounting for white space
            if ((previous != id_name)) { //if you click a diff image
                var id_previous = document.getElementById(previous);
                jq(id_previous).hide();
                //console.log(id_previous);
            } 
            else if (previous == id_name) { //clicking on the same image
                jq(id_toggle).show();
            }
            jq(id_toggle).show(); //show bio
            previous = id_name; //checks to see if you clicked different images
        } 
        else {
            jq(previous).show();
        }
    });
});
