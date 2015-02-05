
    <?php
       require_once'../path.php';
       require_once INCLUDE_PATH.'/mylib.php';
       //获得参数
       $email=$_POST["email"];
       $loginpass=$_POST["loginpass"];
       
       $errors=validateLogin($email, $loginpass);
       if(count($errors)>0){
          header("location:".URL_ROOT."page/denglu.php?info=".urlencode(current($errors))."&email=".$email);
           exit();
       }
       //进行登录判断
       login($email, $loginpass);
       
	?>

