$(function(){
	
	$('.m-video .m-btnPlay.a-bouncein').click(function(){	
		var $self=$(this);
		var $para=$self.parents('.m-video');
		$para.css('z-index','auto');
		$para.find('.u-maskLayer').show().removeClass('z-hide').addClass('z-show');
		setTimeout(function(){
			$self.hide();		
			var $videoBox=$para.find('.m-Video-box');
			$videoBox.html($videoBox.attr('video-data'));
			if (media._audio){
				media._audioNode.addClass('close');
				media._audio.pause();
			}
			page.page_stop();
		},400);
	});
	
	$('.m-video .u-maskLayer-close,.u-maskLayer.m-youkuVideoLayer').click(function(){
		var $para=$(this).parents('.m-video');
		$para.find('.u-maskLayer').removeClass('z-show').addClass('z-hide');
		setTimeout(function(){
			$para.removeAttr("style");
			$para.find('.u-maskLayer').hide();
			$para.find('.m-btnPlay.a-bouncein').show();
			var $videoBox=$para.find('.m-Video-box');
			$videoBox.html('');
			if(!media._audio_val && media._audio){
				media._audioNode.removeClass('close');
				media._audio.play();
			}
			page.page_start();
		},500);
	});
	
	$('.m-video .m-contact-book .u-maskLayer').on('mousedown mousemove mouseup touchstart touchmove touchend',function(e){
		return false;
	});
	
});