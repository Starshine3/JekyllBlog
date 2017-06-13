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

function capIt() {
  var codeWindow = document.getElementById("textCode").contentWindow;
  var codeHTML = codeWindow.document.body.innerHTML;
  var codeText = codeWindow.document.body.innerText;

  console.log(codeHTML);
  console.log(codeText);
  console.log(titleCase(codeText));
  document.getElementById("editedText").innerText = titleCase(codeText);

}
function titleCase(str) {
    console.log('inside titlecase', str);
    return str
        .toLowerCase()
        .split('\n')
        .map(function(word) {
            return word[0].toUpperCase() + word.substr(1);
        })
        .join('\n');
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