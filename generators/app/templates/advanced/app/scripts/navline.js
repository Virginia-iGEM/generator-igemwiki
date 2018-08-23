var jq = require('jquery');

// Code courtesy of Ates Goral
// https://stackoverflow.com/a/187946

var updatetoc = function() {
    var smallestoffset = -jq(document).height();
    var smallestheader;

    jq('article h1').each(function(i) { 
        var offset = jq(this).position().top - jq(document).scrollTop() - Math.max(document.documentElement.clientHeight, window.innerHeight || 0)/4; // Negative offset values indicate the header's top has passed 1/4 of the way down the viewport
        //console.log(jq(this).text() + ' ' + offset);
        if (offset > smallestoffset && offset <= 0) {
            smallestoffset = offset;
            smallestheader = jq(this);
        }
    });

    if (smallestheader === undefined) {
        smallestheader = jq('article h1:first');
    }

    //console.log(smallestheader.text());

    jq('#toc>ul>li').each(function(i) {
        //console.log(jq(this).children('a').attr('href'));
        //console.log('#' + smallestheader.attr('id'));
        if (jq(this).children('a').attr('href') === '#' + smallestheader.attr('id')) {
            jq(this).children('ul').addClass('current');
        }
        else {
            jq(this).children('ul').removeClass('current');
        }
    });
    //console.log(jq(document).scrollTop());
};

jq(document).ajaxStop(function(event, xhr, options) {
    //console.log(event);

    var toc = "";
    var level = 0;

    document.getElementById("main-content").innerHTML =
        document.getElementById("main-content").innerHTML.replace(
            /<h([\d]) id="(.+)">([^<]+)<\/h([\d])>/gi,
            function (str, openLevel, id, titleText, closeLevel) {

                if (openLevel > level) {
                    toc += (new Array(openLevel - level + 1)).join("<ul>");
                }
                else if (openLevel < level) {
                    toc += (new Array(level - openLevel + 1)).join("</ul>");
                }

                toc += "</li>";

                level = parseInt(openLevel);

                toc += "<li><a href=\"#" + id + "\">" + titleText
                    + "</a>";

                return str;
            }
        );

        if (level) {
            toc += (new Array(level +1)).join("</ul>");
        }

        document.getElementById("toc").innerHTML += toc;

        updatetoc();
});

jq(document).on('scroll', updatetoc);
