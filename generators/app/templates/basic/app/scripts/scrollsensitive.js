var jq = require('jquery');

// Code courtesy of Mohamed Hasan
// https://codepen.io/Mhmdhasan/pen/mAdaQE

jq(document).ready(function () {
  
  'use strict';
  
   var c, currentScrollTop = 0,
       navbar = jq('header');

    var hovered = false;

    navbar.hover(function() {
        hovered = true;
    },
    function() {
        hovered = false;
    });

   jq(window).scroll(function () {
      var a = jq(window).scrollTop();
      var b = navbar.height();
     
      currentScrollTop = a;
     
      if (c < currentScrollTop && a > b + b && navbar && !hovered) {
        navbar.addClass("scrollUp");
      } else if (c > currentScrollTop && !(a <= b)) {
        navbar.removeClass("scrollUp");
      }
      c = currentScrollTop;
  });
  
});
