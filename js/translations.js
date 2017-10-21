var iso;

$(document).ready(function() {
    if (document.title in isoConfig) {
        thisIsoConfig = isoConfig[document.title];
        $(thisIsoConfig[0]).imagesLoaded( function() {
            iso = new Isotope(isoConfig[document.title][0], isoConfig[document.title][1]);
        });
    }
});

var isoConfig = {
    Translations: ['.translationChart', {
      itemSelector: '.tchart-item',
      layoutMode: 'fitRows',
      getSortData: {
        title: '.post-title',
        artist: '.post-artist',
        date: 'post-date'
      }}],
    Project: ['.chart', {
      itemSelector: '.chart-item',
      layoutMode: 'fitRows',
      masonry: {
        columnWidth: 300,
        isFitWidth: true,
        percentPosition: true
      }}]
};

function initIso(isoGrid, isoOptions) {

}
function isoFilter(filterValue) {
    iso.arrange({ filter: filterValue });
}

function isoSpecifiedFilter(filterClass, filterValue){
    console.log(filterClass, filterValue);
    function result() {
        var filterItem = $(this).find(filterClass).text();
        return filterItem == filterValue;
    }
    return result;
}

function isoSort(sortValue) {
    iso.arrange({ sortBy: sortValue });
}

function flip() {
    $('.left-lyrics').toggleClass('flipped');
    if ($('#select-romaji').prop('disabled')) {
        $('#select-romaji').removeAttr('disabled');
        $('#select-jp').prop('disabled', 'true');
        $('#romajiLyrics').hide();
        $('#jpLyrics').show();
    } else {
        $('#select-jp').removeAttr('disabled');
        $('#select-romaji').prop('disabled', 'true');
        $('#jpLyrics').hide();
        $('#romajiLyrics').show();
    }
}