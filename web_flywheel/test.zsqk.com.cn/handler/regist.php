<?php
require_once '../path.php';
require_once INCLUDE_PATH.'/mylib.php';

//得到表单数据
$email=$_POST["email"]; //邮箱
$loginpass=$_POST["loginpass"];//登录密码
$phone=$_POST["phone"];//手机号码
$name=$_POST["nickname"];//用户名
//表单数据验证
$errors=checkRegister($email, $loginpass, $phone, $name);
if(count($errors)>0){
    header("location:".URL_ROOT."page/register.php?info=".urlencode(current($errors))."&email=".$email."&phone=".$phone."&nickname=".$name);
    exit();
}
register($email, $loginpass, $phone, $name);

?>

