var jq = require('jquery');

//Code courtesy of https://codepen.io/kruxor/pen/CwpFq

jq(window).scroll(function() {
    if (jq(this).scrollTop() > 50 ) {
        jq('.scrolltop:hidden').stop(true, true).fadeIn();
    } else {
        jq('.scrolltop').stop(true, true).fadeOut();
    }
});
jq(function(){jq(".scroll").click(function(){jq("html,body").animate({scrollTop:jq("#top").offset().top},"1000");return false})});
