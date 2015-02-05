<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>信息</title>
<script type="text/javascript">
function go_index(){
	window.location="../index.php";
}
function go_login(){
	window.location="denglu.php";
}

</script>
</head>
<body>
    <?php 
 
    require_once '../includes/mylib.php';
    //得到消息码
    $code=$_REQUEST["code"];
    //先经过base64解码，再反序列化后得到参数数组
    $params=unserialize(base64_decode($_REQUEST["params"]));
    //解析xml，获得消息模板
    $msg=getMsgByCode($code, "../config/msg.xml");
    //参数替换，得到具体的消息内容
    $msg=strtr($msg,$params);
    echo $msg."<br/>";
    ?>
    <input type="button" value="回首页" onclick="go_index()"/>
    <input type="button" value="回登陆页" onclick="go_login()"/>  
</body>
</html>