var $chart = $('.chart').masonry({
    itemSelector: '.chart-item',
    percentPosition: true,
    columnWidth: 160
    // columnWidth: '.grid-sizer'
});

// $chart.imagesLoaded().progress(function() {
//   $chart.masonry('layout');
//   console.log('done');
// });

$(document).ready(function() {
$('.chart').masonry({
columnWidth: 320,
itemSelector: '.chart-item'
percentPosition: true,
}).imagesLoaded(function() {
$('.chart').masonry('reload');
});
});