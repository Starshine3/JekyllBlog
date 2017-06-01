//Run only when document is ready
$(document).ready(function() {

    /* Vertical dot navigation prep*/
    var sectionPosition = [];
    $('section').each(function() {
        sectionPosition.push($(this).offset().top);
    });

    $('a').click(function() {
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 1000);
        return false;
    });

    $('.vNav ul li a').click(function() {
        $('.vNav ul li a').removeClass('active');
        $(this).addClass('active');
    });

    $('.vNav a').hover(function() {
        $(this).find('.node').show();
    }, function() {
        $(this).find('.node').hide();
    });

    //When user is scrolling
    $(document).scroll(function () {
        var position = $(document).scrollTop();
        var index;
        //Fade in/out navbar
        if (position > 70) {
            $('.navbar').fadeOut();
        } else {
            $('.navbar').fadeIn();
        }
        //Vertical dot indication of which page currently on
        for (var i = 0; i < sectionPosition.length - 1; i++) {
            if (position <= sectionPosition[i + 1]) {
                index = i;
                break;
            } else if (i == sectionPosition.length - 2) {
                index = sectionPosition.length - 1;
            }
        }
        $('.vNav ul li a').removeClass('active');
        $('.vNav ul li a:eq(' + index + ')').addClass('active');

        //In about section: description flags follow scroller
        if (position > sectionPosition[1]
          && position < 0.6 * sectionPosition[2]) {
          var change = position-sectionPosition[1];
            $('.description').each(function() {
              $(this).css('-webkit-transform', 'translateY(' + change + 'px)');
              $(this).css('transform', 'translateY(' + change + 'px)');
              $(this).css('-moz-transform', 'translateY(' + change + 'px)');
          })
        }
    });

    /* Picture of me. */
    $('#pic').hover(function() {
        $('#shadowOne').attr('opacity', '0');
        $('#myPic').css('opacity', '1');
    }, function() {
        $('#shadowOne').css('opacity', '1');
        $('#myPic').css('opacity', '0');
    });

});

//Parallax Scroll
var ParallaxManager, ParallaxPart;

ParallaxPart = (function() {
  function ParallaxPart(el) {
    this.el = el;
    this.speed = parseFloat(this.el.getAttribute('data-parallax-speed'));
    this.maxScroll = parseInt(this.el.getAttribute('data-max-scroll'));
  }

  ParallaxPart.prototype.update = function(scrollY) {
    if (scrollY > this.maxScroll) { return; }
    var offset = -(scrollY * this.speed);
    this.setYTransform(offset);
  };

  ParallaxPart.prototype.setYTransform = function(val) {
    this.el.style.webkitTransform = "translate3d(0, " + val + "px, 0)";
    this.el.style.MozTransform    = "translate3d(0, " + val + "px, 0)";
    this.el.style.OTransform      = "translate3d(0, " + val + "px, 0)";
    this.el.style.transform       = "translate3d(0, " + val + "px, 0)";
    this.el.style.msTransform     = "translateY(" + val + "px)";
  };

  return ParallaxPart;

})();

ParallaxManager = (function() {
  ParallaxManager.prototype.parts = [];

  function ParallaxManager(elements) {
    if (Array.isArray(elements) && elements.length) {
      this.elements = elements;
    }
    if (typeof elements === 'object' && elements.item) {
      this.elements = Array.prototype.slice.call(elements);
    } else if (typeof elements === 'string') {
      this.elements = document.querySelectorAll(elements);
      if (this.elements.length === 0) {
        throw new Error("Parallax: No elements found");
      }
      this.elements = Array.prototype.slice.call(this.elements);
    } else {
      throw new Error("Parallax: Element variable is not a querySelector string, Array, or NodeList");
    }
    for (var i in this.elements) {
      this.parts.push(new ParallaxPart(this.elements[i]));
    }
    window.addEventListener("scroll", this.onScroll.bind(this));
  }

  ParallaxManager.prototype.onScroll = function() {
    window.requestAnimationFrame(this.scrollHandler.bind(this));
  };

  ParallaxManager.prototype.scrollHandler = function() {
    var scrollY = Math.max(window.pageYOffset, 0);
    for (var i in this.parts) { this.parts[i].update(scrollY); }
  };

  return ParallaxManager;

})();

new ParallaxManager('.parallax-layer');
