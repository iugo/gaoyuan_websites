//悬浮导航
$(window).bind("scroll", function(){ 
	//当滚动条滚动时
	var scroll_top = $(document).scrollTop();
	if(scroll_top <500){
		$("#float_nav").hide();
	}
	if(scroll_top >=400){
		$("#float_nav").show();
	}
});

$(function(){
	var con_01 = $("#con_01").offset().top;
	var con_02 = $("#con_02").offset().top;
	var con_03 = $("#con_03").offset().top;
	var con_04 = $("#con_04").offset().top;
	var con_05 = $("#con_05").offset().top;
	var con_06 = $("#con_06").offset().top;
	var con_07 = $("#con_07").offset().top;

	$(window).scroll(function(){
		var scroH = $(this).scrollTop();
		if(scroH>=con_07){
			set_cur(".con_07");
		}else if(scroH>=con_06){
			set_cur(".con_06");
		}else if(scroH>=con_05){
			set_cur(".con_05");
		}else if(scroH>=con_04){
			set_cur(".con_04");
		}else if(scroH>=con_03){
			set_cur(".con_03");
		}else if(scroH>=con_02){
			set_cur(".con_02");
		}else if(scroH>=con_01){
			set_cur(".con_01");
		}
	});
	$(".slow_nav li a").click(function() {
		var el = $(this).attr('class');
     	$('html, body').animate({scrollTop: $("#"+el).offset().top}, 300);
		$(this).addClass("current").parent().siblings().find("a").removeClass("current");	
 	});
	$(".con_02").click(function() {
     	$('html, body').animate({scrollTop: $("#con_02").offset().top}, 300);
 	});
	$(".con_03").click(function() {
     	$('html, body').animate({scrollTop: $("#con_03").offset().top}, 300);
 	});
 	$(".con_04").click(function() {
     	$('html, body').animate({scrollTop: $("#con_04").offset().top}, 300);
 	});
 	$(".con_05").click(function() {
     	$('html, body').animate({scrollTop: $("#con_05").offset().top}, 300);
 	});
 	$(".con_06").click(function() {
     	$('html, body').animate({scrollTop: $("#con_06").offset().top}, 300);
 	});
 	$(".con_07").click(function() {
     	$('html, body').animate({scrollTop: $("#con_07").offset().top}, 300);
 	});
	
});

function set_cur(n){
	if($(".slow_nav a").hasClass("current")){
		$(".slow_nav a").removeClass("current");
	}
	$(".slow_nav a"+n).addClass("current");
}



/*//悬浮导航
$(window).bind("scroll", function(){ 
	//当滚动条滚动时
	var scroll_top = $(document).scrollTop();
	if(scroll_top <500){
		$("#float_nav").hide();
	}
	if(scroll_top >=400){
		$("#float_nav").show();
	}
});

$(function(){
	var con_01 = $("#con_01").offset().top;
	var con_02 = $("#con_02").offset().top;
	var con_03 = $("#con_03").offset().top;
	var con_04 = $("#con_04").offset().top;
	var con_05 = $("#con_05").offset().top;
	var con_06 = $("#con_06").offset().top;
	var con_07 = $("#con_07").offset().top;
	$(window).scroll(function(){
		var scroH = $(this).scrollTop();
		if(scroH>=con_07){
			set_cur(".con_07");
		}else if(scroH>=con_06){
			set_cur(".con_06");
		}else if(scroH>=con_05){
			set_cur(".con_05");
		}else if(scroH>=con_04){
			set_cur(".con_04");
		}else if(scroH>=con_03){
			set_cur(".con_03");
		}else if(scroH>=con_02){
			set_cur(".con_02");
		}else if(scroH>=con_01){
			set_cur(".con_01");
		}
	});
	$(".slow_nav li a").click(function() {
		var el = $(this).attr('class');
     	$('html, body').animate({scrollTop: $("#"+el).offset().top}, 300);
		$(this).addClass("current").parent().siblings().find("a").removeClass("current");	
 	});
	$(".con_02").click(function() {
     	$('html, body').animate({scrollTop: $("#con_02").offset().top}, 300);
 	});
	$(".con_03").click(function() {
     	$('html, body').animate({scrollTop: $("#con_03").offset().top}, 300);
 	});
	$(".con_04").click(function() {
     	$('html, body').animate({scrollTop: $("#con_04").offset().top}, 300);
 	});
	$(".con_05").click(function() {
     	$('html, body').animate({scrollTop: $("#con_05").offset().top}, 300);
 	});
	$(".con_06").click(function() {
     	$('html, body').animate({scrollTop: $("#con_06").offset().top}, 300);
 	});
 	$(".con_07").click(function() {
     	$('html, body').animate({scrollTop: $("#con_07").offset().top}, 300);
 	});
 	$(".con_08").click(function() {
     	$('html, body').animate({scrollTop: $("#con_08").offset().top}, 300);
 	});
});
function set_cur(n){
	if($(".slow_nav a").hasClass("current")){
		$(".slow_nav a").removeClass("current");
	}
	$(".slow_nav a"+n).addClass("current");
}
*/