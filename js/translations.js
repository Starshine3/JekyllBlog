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