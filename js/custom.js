
    $(function() {
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });


$('body').scrollspy({ target: '#navbar-scroll' })


$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});


$(document).ready(function() {
$("#screenshots").owlCarousel({
	items: 4,
	itemsCustom : [
		[0, 1],
		[480, 2],
		[768, 3],
		[992, 4]
		],
    }); 	
$("#owl-clients").owlCarousel
({
	navigation : false,
	slideSpeed : 300,
	autoHeight : true,
	singleItem:true
});
});



  $(document).ready(function(){
    $("#menu").sticky({topSpacing:0});
  });



$(document).ready(function(){
	
	$(window).scroll(function(){
		if ($(this).scrollTop() > 200) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});
	
	$('.scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});
	
});
	 

if("ontouchstart" in window){
    document.documentElement.className = document.documentElement.className + " touch";
}
if(!$("html").hasClass("touch")){
    $(".parallax").css("background-attachment", "fixed");
}


function fullscreenFix(){
    var h = $('body').height();
    $(".content-b").each(function(i){
        if($(this).innerHeight() <= h){
            $(this).closest(".fullscreen").addClass("not-overflow");
        }
    });
}
$(window).resize(fullscreenFix);
fullscreenFix();

function backgroundResize(){
    var windowH = $(window).height();
    $(".landing, .action, .contact, .subscribe").each(function(i){
        var path = $(this);
        var contW = path.width();
        var contH = path.height();
        var imgW = path.attr("data-img-width");
        var imgH = path.attr("data-img-height");
        var ratio = imgW / imgH;
        var diff = parseFloat(path.attr("data-diff"));
        diff = diff ? diff : 0;
        var remainingH = 0;
        if(path.hasClass("parallax") && !$("html").hasClass("touch")){
            var maxH = contH > windowH ? contH : windowH;
            remainingH = windowH - contH;
        }
        imgH = contH + remainingH + diff;
        imgW = imgH * ratio;
        if(contW > imgW){
            imgW = contW;
            imgH = imgW / ratio;
        }
        
        path.data("resized-imgW", imgW);
        path.data("resized-imgH", imgH);
        path.css("background-size", imgW + "px " + imgH + "px");
    });
}
$(window).resize(backgroundResize);
$(window).focus(backgroundResize);
backgroundResize();


function parallaxPosition(e){
    var heightWindow = $(window).height();
    var topWindow = $(window).scrollTop();
    var bottomWindow = topWindow + heightWindow;
    var currentWindow = (topWindow + bottomWindow) / 2;
    $(".parallax").each(function(i){
        var path = $(this);
        var height = path.height();
        var top = path.offset().top;
        var bottom = top + height;
        if(bottomWindow > top && topWindow < bottom){
            var imgW = path.data("resized-imgW");
            var imgH = path.data("resized-imgH");
            var min = 0;
            var max = - imgH + heightWindow;
            var overflowH = height < heightWindow ? imgH - height : imgH - heightWindow; // fix height on overflow
            top = top - overflowH;
            bottom = bottom + overflowH;
            var value = min + (max - min) * (currentWindow - top) / (bottom - top);
            var orizontalPosition = path.attr("data-oriz-pos");
            orizontalPosition = orizontalPosition ? orizontalPosition : "50%";
            $(this).css("background-position", orizontalPosition + " " + value + "px");
        }
    });
}
if(!$("html").hasClass("touch")){
    $(window).resize(parallaxPosition);
    $(window).focus(parallaxPosition);
    $(window).scroll(parallaxPosition);
    parallaxPosition();
}