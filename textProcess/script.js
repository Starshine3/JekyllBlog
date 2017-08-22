$(document).ready(function(){

  var codeWindow = document.getElementById("textCode").contentWindow;
  codeWindow.document.designMode = "on";
  codeWindow.document.close();
  codeWindow.focus();

  $("#bold").click(function(){
    if($(this).hasClass("selected")){
     $(this).removeClass("selected");
    }else{
     $(this).addClass("selected");
    }
    boldIt();
  });

  $("#italic").click(function(){
    if($(this).hasClass("selected")){
     $(this).removeClass("selected");
    }else{
     $(this).addClass("selected");
    }
    ItalicIt();
  });

  $("#fonts").on('change',function(){
    changeFont($("#fonts").val());
  });

  $("#link").click(function(){
    var urlp =prompt("What is the link:","http://");
    url(urlp);
  });

  $("#select-text").click(function(){
    $("#htmlCode").hide();
    $("#textCode").show();
    $("#controls").show()
  });

  $("#select-html").on('click',function(){
    $("#htmlCode").css("display","block");
    $("#textCode").hide();
    $("#controls").hide();
  });

    $("#cap").click(function(){
    if($(this).hasClass("selected")){
     $(this).removeClass("selected");
    }else{
     $(this).addClass("selected");
    }
    capIt();
  });

});

function boldIt(){
  var codeWindow = document.getElementById("textCode").contentWindow;
  codeWindow.focus();
  codeWindow.document.execCommand("bold", false, "");
  codeWindow.focus();
}

function ItalicIt(){
  var codeWindow = document.getElementById("textCode").contentWindow;
  codeWindow.focus();
  codeWindow.document.execCommand("italic", false, "");
  codeWindow.focus();
}

function changeFont(font){
  var codeWindow = document.getElementById("textCode").contentWindow;
  codeWindow.focus();
  codeWindow.document.execCommand("FontName", false, font);
  codeWindow.focus();
}

function url(url){
  var codeWindow = document.getElementById("textCode").contentWindow;
  codeWindow.focus();
  codeWindow.document.execCommand("Createlink", false, url);
  codeWindow.focus();
}

function capIt() {
  var codeWindow = document.getElementById("textCode").contentWindow;
  var codeHTML = codeWindow.document.body.innerHTML;
  var codeText = codeWindow.document.body.innerText;
  document.getElementById("editedText").innerText = processText(codeText);

}
var temp;
function processText(str) {
    var lines = str.split('\n');
    var output = [];
    for (var i = 0; i < lines.length; i++) {
      if (lines[i] != '') {
        temp = replaceCommon(lines[i]);
        temp = capFirstLetter(temp);
        output.push(temp);
      } else {
        output.push(lines[i]);
      }
    }
    return output.join('\n');
}

function capFirstLetter(line) {
  var outputLine = '';
  while ((line[0].match(/^[a-zA-Z]*$/) == null) && line.length > 1) {
    outputLine += line[0];
    line = line.substring(1);
  }
  outputLine += line[0].toUpperCase();
  outputLine += line.substring(1);
  return outputLine;
}

var check, pre, suff;
var b4Change = ['o', 'ha', 'e', 'ichi nin'];
var afterChange = ['wo', 'wa', 'he', 'hitori'];
var need2Merge = ['tte', 'ta', 'da', 'i', 'te',
  'de', 'nai', 'zu', 'n', 'u', 'tara', 'ba'];
// ha -> wa
// o -> wo
// nai, ite
function replaceCommon(line) {
  var words = line.match(/\S+/g);
  var index = -2;
  for (var i = 0; i < words.length; i++) {
    check = words[i];
    pre = '';
    suff = '';
    if (words[i].length > 2) {
      if ((words[i][0].match(/[^a-zA-Z]/) != null) &&
          (words[i][words[i].length - 1].match(/[^a-zA-Z]/) != null)) {
        check = words[i].substring(1, words[i].length - 1);
        pre = words[i][0];
        suff = words[i][words[i].length - 1];
      }
    } if (words[i].length > 1) {
      if ((words[i][0].match(/[^a-zA-Z]/) != null)) {
        check = words[i].substring(1, words[i].length);
        pre = words[i][0];
      } if ((words[i][words[i].length - 1].match(/[^a-zA-Z]/) != null)) {
        check = words[i].substring(0, words[i].length - 1);
        suff = words[i][words[i].length - 1];
      }
    }
    index = b4Change.indexOf(check);
    if (index > -1) {
      words[i] = pre + afterChange[index] + suff;
    }
    index = need2Merge.indexOf(check);
    if (index > 0) {
      words[i - 1] += words[i];
      words.splice(i, 1);
    }
  }
  return words.join(' ');
}


// function flip() {
//   $('.panel-selection').toggleClass('flipped');
//   if ($('#select-text').prop('disabled')) {
//       $('#select-text').removeAttr('disabled');
//       $('#select-html').prop('disabled', 'true');
//       $('#textCode').hide();
//       $('#htmlCode').show();
//   } else {
//       $('#select-html').removeAttr('disabled');
//       $('#select-text').prop('disabled', 'true');
//       $('#htmlCode').hide();
//       $('#textCode').show();
//   }
// }

setInterval(function(){
  var gyt=$("#textCode").contents().find("body").html().match(/@/g);
  if($("#textCode").contents().find("body").html().match(/@/g)>=0){
  } else { $("#htmlCode").val($("#textCode").contents().find("body").html());
  }
  $("#htmlCode").val($("#textCode").contents().find("body").html());
},1000);