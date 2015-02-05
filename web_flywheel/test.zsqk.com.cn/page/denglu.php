<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>登录</title>
    <link rel="stylesheet" type="text/css" href="../css/0_reset.css" />
    <link rel="stylesheet" type="text/css" href="../css/1_base.css" />
    <link rel="stylesheet" type="text/css" href="../css/home.css" />
    <style type="text/css">
        .loginInput:focus{
            outline: 0;
            box-shadow: 0 0 3px #6cf;
            border: solid 1px #39f;
        }
    </style>
</head>
<body>
<div class="wrapper">
<div class="header">
    <div class="header-wrapper">
        <div class="header-brand w960 marM">
            <h1 class="tac">
                <a href="javascript:history.go(-1);" class="koudai-logo ft30" hidefocus="hidefocus">口袋购物</a>
            </h1>
        </div>
    </div>
    <div class="header-middle">
        <div id="homepageBanner" class="header-middle-banner">
            <div class="header-content w960 marM">
                <a href="" target="_blank" hidefocus="hidefocus"></a>
            </div>
        </div>
    </div>
</div>
<div class="main">
<div class="main-body w960 marM">
<div class="main-body-wrapper clearfix">
<div class="home-left">
    <p class="home-left-title">
        入驻口袋晋城 将<span class="ft24">为您带来</span>：
    </p>
    <div class="itembg"></div>
    <!-- <div class="home-left-item home-item-flow clearfix">
        <div class="home-l-item-icon">&nbsp;</div>
        <div class="home-l-item-name">
            <p class="home-l-i-name-flow">粉 丝</p>
        </div>
        <div class="home-l-item-detail" style="padding-top: 15px;">
            <p>
                ● 诱惑的装机量,丰富的 <span class="focus">活动形式</span>, <span class="focus">上万</span>的粉丝预览
            </p>
        </div>
    </div>
    <div class="home-left-seperate">&nbsp;</div>
    <div class="home-left-item home-item-convert clearfix">
        <div class="home-l-item-icon">&nbsp;</div>
        <div class="home-l-item-name">
            <p class="home-l-i-name-convert">转化率</p>
        </div>
        <div class="home-l-item-detail">
            <p>
                ● 针对潜在买家, 进行<span class="focus">精准化营销</span>!
            </p>
            <p>
                ● 支付交易更便捷, 下单成功率更高
            </p>
        </div>
    </div>
    <div class="home-left-seperate">&nbsp;</div>
    <div class="home-left-item home-item-stickness clearfix">
        <div class="home-l-item-icon">&nbsp;</div>
        <div class="home-l-item-name">
            <p class="home-l-i-name-stick">大数据</p>
        </div>
        <div class="home-l-item-detail">
            <p>
                ● 后台操作简易, <span class="focus">大数据</span>分析一目了然, 实时掌握店铺动态
            </p>
        </div>
    </div>
    <div class="home-left-seperate">&nbsp;</div>
    <div class="home-left-item home-item-stickness clearfix">
        <div class="home-l-item-icon">&nbsp;</div>
        <div class="home-l-item-name">
            <p class="home-l-i-name-stick">粘 性</p>
        </div>
        <div class="home-l-item-detail">
            <p>
                ● 卖家促销<span class="focus">信息推送</span>, 买家随时随地购买
            </p>
            <p>
                ● 店铺上新, 促销, 提高顾客<span class="focus">回头率</span>, 增强店铺粘性
            </p>
        </div>
    </div> -->
</div>

<div class="home-right ">
    <div style="height: 1px"></div>
    <dl class="main-login border">
	        <dd>
	            <div class="login">
	                <div class="login01">
                        登  录
	                </div>
	                <div class="clear"></div>
	                <div class="login02">
	                    <div class="mb10" id="loginWeidian">
	                        <form action="../handler/login.php" method="post">
	                            <div style="height: 63px;">
	                                <input type="email"  value="<?php if(!empty($_GET['email'])) echo urldecode($_GET['email']);?>" style="ime-mode: disabled; width: 298px; text-indent: 30px; *width: 268px; *text-indent: 0px; *padding-left: 30px;" class="loginInput border phone" placeholder="请填写您的邮箱" id="email" name="email" required="required"/>
	                            </div>
	
	                            <div style="height: 63px;">
	                                <div style="height: 63px;">
	                                    <input style="ime-mode: disabled; width: 298px; text-indent: 30px; *width: 268px; *text-indent: 0px; *padding-left: 30px;" type="password" name="loginpass" class="border password loginInput"
	                                           placeholder="密码"  required="required"  maxlength="40"/>
	                                </div>
	                            </div>
	
	                            <p style="color: #c33200;"><?php if(!empty($_GET['info'])) echo urldecode($_GET['info']);?></p>
	                            <p class="mb20">
	                                <input type="submit" class="loginButton" value="登 录" style="cursor: pointer;"/>
	                            </p>
	                        </form>
                            <p class="align-right">
                                <a href="showfindpass.php" style="color: #666666;" target="_blank">忘记密码</a>
                                <a href="register.php" class="ml20" style="color: #6393c3;" target="_blank">注册（免费入驻）</a>
                            </p>
	                    </div>
	
	                </div>
	            </div>
	        </dd>
        <!--
        <dd class="mention">
            <dl>
                <dt>口袋购物入驻条件：</dt>
                <dd>1. 店铺主营类目非 '游戏/话费' 行业。</dd>
                <dd>
                    <dl class="third-list">
                        <dt>2. 店铺经营指标符合以下条件：</dt>
                        <dd>(1) 加入淘宝消费者保障计划</dd>
                        <dd>
                            (2) 天猫商家或信用等级1钻及以上的<br /> <span style="padding-left: 20px;">淘宝卖家</span>
                        </dd>
                        <dd>(3) 好评率大于等于98％</dd>
                        <dd>(4) 动态评分三项均大于等于4.6分</dd>
                    </dl>
                </dd>
            </dl>
        </dd>
        -->
    </dl>
</div>

</div>
</div>
</div>
</div>
<!-- <script src="/pages/footer.js"></script> -->
<iframe style="margin-top: 50px;" frameborder=0 scrolling=no width=100% height="530px" name="footer" src="/pages/footer.htm">footer</iframe>
</body>
</html>