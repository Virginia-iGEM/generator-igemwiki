var sitemap = {
    '': 'home',
    
    'Overview_Project': 'quorus',
    'Description': 'quorus',
    'Design': 'quorus',
    'Experiments': 'quorus',
    'Notebook': 'quorus',
    'InterLab': 'quorus',
    'Model': 'quorus',
    'Results': 'quorus',
    'Demonstrate': 'quorus',
    'Improve': 'quorus',

    'Parts': 'quorus',
    'Basic_Part': 'quorus',
    'Composite_Part': 'quorus',
    'Part_Collection': 'quorus',

    'Safety': 'quorus',

    'Overview_HP': 'hp',
    'Human_Practices': 'hp',
    'Public_Engagement': 'hp',

    'Team': 'team',
    'Collaborations': 'team',
    'Attributions': 'team',

    'Applied_Design': 'competition',
    'Entrepreneurship': 'competition',
    'Hardware': 'competition',
    'Measurement': 'competition',
    'Model': 'competition',
    'Software': 'competition'
}
$(document).ready(function() {
    var curnavitem = window.location.href;
    if(curnavitem.match(/igem\.org/i)) { // We know we're live
        curnavitem = curnavitem.replace(/(http:\/\/)?\d{4}\.igem\.org\.Team:\w+\/?/i, '');
    }
    else {
        curnavitem = curnavitem.replace(/(http:\/\/)?localhost:\d+\/?/, '');
        curnavitem = curnavitem.replace(/\.html/i, '');
    }
    console.log(curnavitem);
    $('.' + sitemap[curnavitem]).addClass('current');
})