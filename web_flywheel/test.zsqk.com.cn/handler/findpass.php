<?php
require_once '../path.php';
require_once INCLUDE_PATH.'/mylib.php';
require_once Config_Path.'/config.php';
//得到邮箱
$email=$_POST["email"];

$dao=new DAO($config["host"], $config["username"], $config["password"], $config["db"]);
$code="";
$params=array();

//判断用户是否存在
if(!$dao->isUser($email)){
    $code="user_unexist";
   goto_msg_failed($code, $params);
}
else{
//给用户发邮件
$Subject = "重置密码";
//设置安全秘钥
$key=md5($email.time());
session_start();
$_SESSION["pass_key"]=$key;

// 邮件内容
$PHP_SELF=$_SERVER['PHP_SELF'];
$url='http://'.$_SERVER['HTTP_HOST'].substr($PHP_SELF,0,strrpos($PHP_SELF,'/')+1);
$content = "请点击<a href='".$url."resetpass.php?key=".$key."&email=".$email."'>这里</a>重置密码!";

if(!sendmail($email, $email, $content, $Subject))
{
    $code="mail_send_failed";
    goto_msg_failed($code, $params);
}
else {
   $code="mail_send_success";
   goto_msg_failed($code, $params);
}

}
