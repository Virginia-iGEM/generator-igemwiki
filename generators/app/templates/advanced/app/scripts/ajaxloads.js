var jq = require('jquery');

jq(function() {
    jq('header').load('/templates/header.html');
    jq('footer').load('/templates/footer.html');
    var main_article = jq('article#main-content');
    main_article.load(main_article.attr('href'));
});

