$(window).load(function(){$("#warp").fadeIn(1e3,function(){$(".loading").fadeOut(500,function(){$("article").addClass("active"),new Swiper(".swiper-container",{mode:"vertical",onTouchEnd:function(){}}),new Swiper(".smSwiper",{mode:"horizontal",autoplayStopOnLast:!0,autoplay:3e3,loop:!0,calculateHeight:!0,slidesPerView:3})})})}),$(document).ready(function(){});