//路径类型
var PATH_TYPE_IMG='img';
var PATH_TYPE_MUSIC='music';
var PATH_TYPE_VIDEO='video';
//页面类型
var PAGE_TYPE_MASK='mask';
var PAGE_TYPE_BIGTXT='bigTxt';
var PAGE_TYPE_VIDEO='video';
var PAGE_TYPE_SHARE='share';
//视频类型
var VIDEO_UPLOAD='upload';
var VIDEO_LINK='link';
//大图文页面的按钮类型
var BIGTXT_BUTTON_IMG='img';
var BIGTXT_BUTTON_FONT='font';
//大图文页面的按钮链接类型
var BIGTXT_BUTTON_LINK='link';
var BIGTXT_BUTTON_TEL='tel';
var BIGTXT_BUTTON_WEIXIN='weixin';
//是否开启音乐标识位，给后面使用
var isOpenMusic=false;
//是否开启蒙板，给后面使用
var isOpenMask=true;
var prefixToRedirect="img/";
var prefixToRedirectUpload="/mask/cover/upload/image/";

// 创建蒙板页面
function createMask(tip,cover,bg){
	bg=getUrl(bg,PATH_TYPE_IMG);
	if(cover.indexOf(UPLOAD_PREFIX)==0){
		cover=prefixToRedirectUpload+cover.replace(UPLOAD_PREFIX,'');
	}else{
		cover=prefixToRedirect+cover;
	}
	var html='<input id="ca-tips" type="hidden" value="'+tip+'" /> '+
					'<input type="hidden" id="r-cover" value="'+cover+'" /> '+
					'<input type="hidden" id="r-bg" value="'+bg+'"/> '+
					'<div class="m-page m-fengye f-hide" data-page-type="info_pic3" '+
						'data-statics="info_pic3"> '+
						'<div class="page-con lazy-img" '+
							'data-src="'+bg+'"></div> '+
					'</div>';
	$('div.translate-back').append($(html));
}

// 创建大图文页面
function createBitTxt(bg,summary,detail,openBtn,bType,bContent,bLinkType,bLinkContent){	
	bg=getUrl(bg,PATH_TYPE_IMG);	
	var html='<div class="m-page m-bigTxt f-hide" data-page-type="bigTxt" '+
		'data-statics="info_list"> ';	
	if(summary && detail){
		html+='<div class="page-con j-txtWrap lazy-img" '+
			'data-src="'+bg+'"> '+
			'<div class="bigTxt-bd j-txt"> '+
				'<div class="bigTxt-title j-title"> '+
					'<p>'+summary+'</p> '+
					'<span class="bigTxt-arrow txt-arrow css_sprite01 f-cur"></span> '+
				'</div> '+
				'<div class="bigTxt-detail j-detail"> '+
					'<p>'+detail+'</p> '+
				'</div> '+
			'</div> '+
		'</div>';
	}else{
		html+='<div class="page-con j-txtWrap lazy-img" '+
			'data-src="'+bg+'"> '+
			'</div>';
	}		
	if(openBtn){
		if(bType==BIGTXT_BUTTON_IMG){
			bContent=getUrl(bContent,PATH_TYPE_IMG);
			html+='<div class="bigTxt-btn bigTxt-btn-wx lazy-img" '+
				'data-src="'+bContent+'"> '+
				'<a href="'+(bLinkType==BIGTXT_BUTTON_LINK?bLinkContent:bLinkType==BIGTXT_BUTTON_TEL?'tel:'+bLinkContent:'javascript:void(0)')+'"></a> '+
			'</div>';
		}else if(bType==BIGTXT_BUTTON_FONT){
			var defaultBg=getUrl('/image/mobile/bigtxt_bg_02@2x.jpg',PATH_TYPE_IMG);
			html+='<div class="bigTxt-btn bigTxt-btn-wx lazy-img" '+
				'data-src="'+defaultBg+'"> '+
				'<a href="'+(bLinkType==BIGTXT_BUTTON_LINK?bLinkContent:bLinkType==BIGTXT_BUTTON_TEL?'tel:'+bLinkContent:'javascript:void(0)')+'">'+bContent+'</a> '+
			'</div>';
		}
	}	
	if(bLinkType==BIGTXT_BUTTON_WEIXIN){
		var defaultGuide=getUrl(bLinkContent?bLinkContent:'/image/mobile/weixin-share-guide.png',PATH_TYPE_IMG);
		html+='<div class="bigTxt-weixin"> '+
			'<img src="'+defaultGuide+'"> '+
		'</div>';
	}		
	html+='</div>';	
	$('div.translate-back').append($(html));
}

//创建视频页面
function createVideo(bg,title,titleColor,vType,vCover,videoUrl,vLink){
	bg=getUrl(bg,PATH_TYPE_IMG);
	vCover=getUrl(vCover,PATH_TYPE_IMG);
	videoUrl=getUrl(videoUrl,PATH_TYPE_VIDEO);
	var html;
	if(vType==VIDEO_UPLOAD){
		html='<div class="m-page m-video f-hide" data-page-type="video" '+
							'data-statics="video_list"> '+
						'<div class="page-con lazy-img" '+
							'data-src="'+bg+'"> '+
							'<div class="video-title" style="color: '+titleColor+';"> '+
							'	<h3 class="f-tc">'+title+'</h3> '+
							'</div> '+
							'<div class="video-con j-video" data-width="640" data-height="480" '+
							'	data-src="'+videoUrl+'"> '+
							'	<div class="img lazy-img" '+
							'		data-src="'+vCover+'"> '+
							'		<span class="css_sprite01"></span> '+
							'	</div> '+
							'</div> '+
						'</div> '+
					'</div> ';
	}else if(vType==VIDEO_LINK){
		if(!vCover){
			vCover=getUrl('/image/admin/module/video_bg_01@2x.jpg',PATH_TYPE_IMG);
		}
		html='<div class="m-page m-bigTxt f-hide m-video" data-page-type="bigTxt" '+
		'			data-statics="info_list"> '+
		'			<div class="page-con j-txtWrap lazy-img" data-src="'+bg+'">		 '+			
		'				<div class="video-title" style="color: '+titleColor+';"> '+
		'				<h3 class="f-tc">'+title+'</h3> '+
		'			</div> '+
		'			<div class="video-con" data-width="640" data-height="480"> '+
		'				<div class="img lazy-img" '+
		'					data-src="'+vCover+'"> '+
		'					<span class="css_sprite01 m-btnPlay a-bouncein"></span> '+
		'				</div> '+
		'			</div> '+
		'			<div class="u-maskLayer m-youkuVideoLayer z-hide" style="display: none;background-color: rgba(0, 0, 0, 0.7);"> '+
		'				<div class="m-Video-box" style="position: absolute;bottom: 232px;width:640px;height:480px;" id="videoBody_3"  video-data="'+vLink+'"> '+
		'					<!-- <iframe height=460px width=640px src=http://player.youku.com/embed/XNzQ0NzkyNTcy frameborder=0 allowfullscreen autoplay></iframe> --> '+
		'					<!-- <video autoplay="autoplay" controls="" preload="preload" width="640" height="480" src="http://127.0.0.1//media/mobile/jiebao/5351334a9775925673.mp4"></video> --> '+
		'				</div> '+
		'				<a href="javascript:void(0);" class="u-maskLayer-close" style="background: #000000;"></a>'+
		'		</div> '+
		'	</div>';
	}
	$('div.translate-back').append($(html));
}

//根据数据初始化页面元素
function initEl(jsonData){
	
	for(var i=0;i<jsonData.length;i++){
		var page=jsonData[i];
		if(page.type==PAGE_TYPE_MASK){
			if(page.isMusic){
				isOpenMusic=true;
				$('.u-audio').attr('data-src',getUrl(page.musicUrl,PATH_TYPE_MUSIC));
			}
			isOpenMask=page.isMask;
			createMask(page.tip,page.cover,page.bg);
		}else if(page.type==PAGE_TYPE_BIGTXT){
			createBitTxt(page.bg,page.summary,page.detail,page.openButton,page.buttonType,page.buttonContent,page.buttonLinkType,page.buttonLinkContent);
		}else if(page.type==PAGE_TYPE_VIDEO){
			createVideo(page.bg,page.title,page.titleColor,page.vType,page.vCover,page.videoUrl,page.vLink);
		}else if(page.type==PAGE_TYPE_SHARE){
			var logo=getUrl(page.logo,PATH_TYPE_IMG);
			window.initShareInfo(page.title,page.description,logo);
		}
	}
	
}