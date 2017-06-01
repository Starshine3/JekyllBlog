$(document).ready(function() {
    console.log('hi');

    $('.chart').masonry({
        columnWidth: 0,
        itemSelector: '.chart-item',
        isFitWidth: true,
    });
});