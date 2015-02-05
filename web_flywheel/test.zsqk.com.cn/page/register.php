<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>新用户注册</title>
<script type="text/javascript">
   function check(){
	   var pass=document.getElementById("loginpass").value;
	   var repass=document.getElementById("reloginpass").value;
	   if(pass!=repass){
		   alert("两次密码不一致！请重新输入！");
		   return false;
	   }

	   if(pass.length<6 || repass.length<6){
		   alert("密码长度不能少于6！");
		   return false;
	   }
       if(document.getElementById("phone").value.length<11){
           alert("手机号码不正确！");
           return false;
       }
	   return true;
   }
</script>
<link rel="stylesheet" href="http://cdn.amazeui.org/amazeui/2.1.0/css/amazeui.min.css"/>
<style type="text/css">
.header {text-align: center;}
.input{background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QsPDhss3LcOZQAAAU5JREFUOMvdkzFLA0EQhd/bO7iIYmklaCUopLAQA6KNaawt9BeIgnUwLHPJRchfEBR7CyGWgiDY2SlIQBT/gDaCoGDudiy8SLwkBiwz1c7y+GZ25i0wnFEqlSZFZKGdi8iiiOR7aU32QkR2c7ncPcljAARAkgckb8IwrGf1fg/oJ8lRAHkR2VDVmOQ8AKjqY1bMHgCGYXhFchnAg6omJGcBXEZRtNoXYK2dMsaMt1qtD9/3p40x5yS9tHICYF1Vn0mOxXH8Uq/Xb389wff9PQDbQRB0t/QNOiPZ1h4B2MoO0fxnYz8dOOcOVbWhqq8kJzzPa3RAXZIkawCenHMjJN/+GiIqlcoFgKKq3pEMAMwAuCa5VK1W3SAfbAIopum+cy5KzwXn3M5AI6XVYlVt1mq1U8/zTlS1CeC9j2+6o1wuz1lrVzpWXLDWTg3pz/0CQnd2Jos49xUAAAAASUVORK5CYII=&quot;); background-repeat: no-repeat; background-attachment: scroll; background-position: right center; cursor: auto;}

#divError{background-color: red;}
</style>
</head>
    <body>
    <iframe style="" scrolling="no" name="header" src="denglu.php" frameborder="0" height="337px" width="100%">footer</iframe>
    <div class="header">
      <div class="am-g">
        <h1>注册</h1>
        <p>一些说明</p>
      </div>
      <hr>
    </div><div class="am-g">
      <div class="am-u-lg-4 am-u-md-8 am-u-sm-centered">
        <form method="post" class="am-form" action="../handler/regist.php" onsubmit="return check()">
          <label for="email">邮箱:</label>
          <input  name="email" value="<?php if(!empty($_GET['email'])) echo $_GET['email'];?>" id="email" value="" type="email" required="required" style="ime-mode: disabled;" maxlength="40" oninvalid="setCustomValidity('email格式正确且不能为空')">
          <br>
         <label for="password">密码:</label>
          <input name="loginpass" id="loginpass" value="" type="password" required="required" maxlength="40" style="ime-mode: disabled;" oninvalid="setCustomValidity('密码不能为空')">
          <br>
          <label for="reloginpass">重新输入密码:</label>
          <input name="reloginpass" id="reloginpass" value="" type="password" required="required" style="ime-mode: disabled;" maxlength="40" oninvalid="setCustomValidity('密码不能为空')">
          <br>
          <label for="phone">手机号:</label>
          <input name="phone" id="phone" value="<?php if(!empty($_GET['phone'])) echo $_GET['phone'];?>" type="text" required="required" style="ime-mode: disabled;" maxlength="11" onkeyup="this.value=this.value.replace(/\D/g,'')"  onafterpaste="this.value=this.value.replace(/\D/g,'')" oninvalid="setCustomValidity('联系方式不能为空')" >
          <br>
          <label for="password">昵称:</label>
          <input name="nickname" id="nickname" value="<?php if(!empty($_GET['nickname'])) echo $_GET['nickname'];?>" type="text" maxlength="20" required="required" oninvalid="setCustomValidity('昵称不能为空！')">
          <br>
          <div class="am-cf">
            <input name="" value="注  册" class="am-btn am-btn-primary am-btn-sm am-fl" type="submit">
          </div>
          <div id="divError">
              <p><?php if(!empty($_GET["info"])) echo urldecode($_GET["info"]);?></p>
          </div>
        </form>
        <hr>
        <p>其他信息</p>
      </div>
    </div>
    
    </body>
</html>