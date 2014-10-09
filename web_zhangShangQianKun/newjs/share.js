//圆角
$(function () {
    if (window.radius) {
        $('.rounded').each(function () {
            PIE.attach(this);
        });
    }
});

//导航
$(function() {
	$(".nav li a").wrapInner( '<span class="out"></span>' );
	$(".nav li a").each(function() {
		$( '<span class="over">' +  $(this).text() + '</span>' ).appendTo( this );
	});
	$(".nav li a").hover(function() {
		$(".nav li a").removeClass("on");
		$(".out",	this).stop().animate({'bottom':'62px'},300); // move down - hide
		$(".over",	this).stop().animate({'bottom':'0px'},300); // move down - show
	}, function() {
		$(this).addClass("on");
		$(".out",	this).stop().animate({'bottom':'0px'},300); // move up - show
		$(".over",	this).stop().animate({'bottom':'-62px'},300); // move up - hide
	});
});

//浮动客服
$(function() {
	$(".float_service_title_t").mouseover(function () {
		$(".float_service_con").show(500);
		$(".float_service_title_t").removeClass("float_service_title_t").addClass("float_service_title_t_on");
	}).mouseout(function(){;
		$(".float_service_con").hide();
		$(".float_service_title_t_on").removeClass("float_service_title_t_on").addClass("float_service_title_t");
	});

	$(".float_service_con").mouseover(function(){
		$(".float_service_title_t").removeClass("float_service_title_t").addClass("float_service_title_t_on");
		$(".float_service_con").show();
	}).mouseout(function(){
		$(".float_service_title_t_on").removeClass("float_service_title_t_on").addClass("float_service_title_t");
		$(".float_service_con").hide();
	});
});


