<?php
/**
 * 数据访问层
* @author duanjiangwei
*
*/
class DAO{
    public $host="";//主机
    public $username="";//用户名
    public $password="";//密码
    public $db=""; //数据库
     
    public function __construct($host,$username,$password,$db){
        $this->host=$host;
        $this->username=$username;
        $this->password=$password;
        $this->db=$db;
    }
     
    //登录验证
    public function check($email,$loginpass){

        $link=mysql_connect($this->host,$this->username,$this->password) or die("link error:".mysql_error());
         
        mysql_select_db($this->db,$link);
         
        $sql="select count(*) from t_user where email='" .$email. "' and loginpass='" .$loginpass ."'";
         
        $result=mysql_query($sql,$link);
         
        $count=0;
        while($info=mysql_fetch_array($result)){
            $count=$info[0];
        }
        return $count>0;
    }
     
    //ִ执行非查询语句
    public function executeUpdate($sql){
         
        $link=mysql_connect($this->host,$this->username,$this->password) or die("link error:".mysql_error());
         
        mysql_select_db($this->db,$link);
         
        mysql_query($sql,$link);
    }
     
    //判断用户是否存在
    public function isUser($email){
         
        $link=mysql_connect($this->host,$this->username,$this->password) or die("link error:".mysql_error());

        mysql_select_db($this->db,$link);
         
        $sql="select count(*) from t_user where email='" .$email."'";
         
        $result=mysql_query($sql,$link);
         
        $count=0;
        while($info=mysql_fetch_array($result)){
            $count=$info[0];
        }
        return $count>0;
    }
     
    /**
     * 得到错误次数
     * @param unknown $email
     */
    public function getErrorCount($email){
        $link=mysql_connect($this->host,$this->username,$this->password) or die("link error:".mysql_error());
        mysql_select_db($this->db,$link);
        $sql="select errorcount from t_user where email='".$email."'";
        $result=mysql_query($sql,$link);
         
        $count=0;
        while ($info=mysql_fetch_array($result)){
            $count=$info[0];
        }
         
        return $count;
    }
     
    /**
     * 得到上次错误时间
     * @param unknown $email
     */
    public function getLastErrorTime($email){
        $link=mysql_connect($this->host,$this->username,$this->password) or die("link error:".mysql_error());
        mysql_select_db($this->db,$link);
        $sql="select lasterrortime from t_user where email='".$email."'";
        $result=mysql_query($sql,$link);

        $time=0;
        while ($info=mysql_fetch_array($result)){
            $time=$info[0];
        }

        return $time;
    }
    
    /**
     * 判断用户是否是第一次登陆
     * @param unknown $email
     * @return boolean
     */
    public function isFirstLogin($email){
        $link=mysql_connect($this->host,$this->username,$this->password) or die("link error:".mysql_error());
        mysql_select_db($this->db,$link);
        $sql="select count(*) from t_user where email='".$email."'"." and last_login_time is NULL";
        $result=mysql_query($sql,$link);
        
        $count=0;
        while ($info=mysql_fetch_array($result)){
            $count=$info[0];
        }
        
        return $count>0;
    }
}


/**
 * 根据数组动态生成config.php
 * @param unknown $values 参数数组
 */
function writeConfig($values){
    $config=array();
    $config=array_merge($config,$values);
    $file=Config_Path.'/config.php';
    if(!file_exists($file)){
    $contents="<?php\n";
    $contents.='$config=array();';
    $contents.="\n";
    foreach ($config as $key => $value){
        $contents.='$config['."'".$key."']='".$value."';";
        $contents.="\n";
    }
    file_put_contents($file, $contents);
    }
    
}



/**
 * 跳转到成功提示消息页面
 * @param unknown $code 消息码
 * @param unknown $params 消息参数
 */
function goto_msg_success($code,$params){
    header('location:'.URL_ROOT.'page/msg_success.php?code='.$code.'&params='.base64_encode(serialize($params)));
}


/**
 * 跳转到失败提示的消息页面
 * @param unknown $code 消息码
 * @param unknown $params 消息参数
 */
function goto_msg_failed($code,$params){
    header('location:'.URL_ROOT.'page/msg.php?code='.$code.'&params='.base64_encode(serialize($params)));
}


/**
 * 首页登录判断
 * 如果已经登录，跳过登录页面
 * 否则，转到登录页面
 */
function login_judge(){
    session_start();  //开启session
    //cookie或者session不存在，说明没登陆，跳到登录页面
    if(!isset($_SESSION['user']) or !isset($_COOKIE['user'])){
        header('location:'.URL_ROOT.'page/denglu.php');
    }
    //相等，说明已经登录
    else if($_SESSION['user']==$_COOKIE['user']){
        $code='already_login';
        $params=array(
            '{0}' => $_SESSION['user']
        );
       goto_msg_success($code, $params);
    }
    //不相等，重新登录
    else{
        header('location:'.URL_ROOT.'page/denglu.php');
    }
}

/**
 * 解析xml文件，根据消息码得到相应消息内容
 * @param unknown $code 消息码
 * @param string $file_name 消息xml文件名
 * @return string  消息内容
 */
function getMsgByCode($code,$file_name){
    $msg='';
    $xml_1=simplexml_load_file($file_name);//加载xml文件
    //根据消息码得到对应的消息内容
    foreach ($xml_1->children() as $child){
        foreach ($child->attributes() as $name => $value){
            if($value==$code){
                $msg=$child->__toString();
            }
        }
    }
   return $msg;
}

/**
 * 登录判断
 * @param unknown $email 邮箱
 * @param unknown $loginpass 密码
 */
function login($email,$loginpass){
    require_once Config_Path.'/config.php';
    $code="";
    $params=array();
    //dao对象
    $dao=new DAO($config["host"],$config["username"],$config["password"],$config["db"]);
    //用户不存在
    if(!$dao->isUser($email)){
        $code="user_unexist";
        goto_msg_failed($code, $params);
    }
    //用户存在
    else{
        //得到错误时间
        $time=$dao->getLastErrorTime($email);
        if(time()-strtotime($time)<300){
            $code="time_out";
            goto_msg_failed($code, $params);
        }
        else{
            //登陆成功
            if($dao->check($email, $loginpass)){
                $sql="update t_user set errorcount=0 where email='".$email."'";
                //更新次数
                $dao->executeUpdate($sql);
                
                //用户是否是第一次登陆
                if($dao->isFirstLogin($email)){
                    //更新上次登录时间
                    $sql="update t_user set last_login_time='".date("Y-m-d H:i:s",time())."' where email='".$email."'";
                    $dao->executeUpdate($sql);
                    //写cookie,session
                    setcookie("user",$email,time()+2000,"/");
                     
                    session_start();
                    $_SESSION["user"]=$email;
                    
                    header("location:".URL_ROOT."test.php");
                }
                else{
                 
                //更新上次登录时间
                $sql="update t_user set last_login_time='".date("Y-m-d H:i:s",time())."' where email='".$email."'";
                $dao->executeUpdate($sql);
                //写cookie,session
                setcookie("user",$email,time()+2000,"/");
                 
                session_start();
                $_SESSION["user"]=$email;
                $code="login_success";
                $params=array(
                    "{0}" => $email
                );
                goto_msg_success($code, $params);
                }
            }
            else{
                $count=$dao->getErrorCount($email);
                if($count+1>=10){
                    $sql="update t_user set errorcount=0 where email='".$email."'";
                    $dao->executeUpdate($sql);//更新次数为0
                    $sql="update t_user set lasterrortime='".date("Y-m-d H:i:s")."' where email='".$email."'";
                    $dao->executeUpdate($sql);//更新上次错误时间
                    $code="error_arrived";
                    goto_msg_failed($code, $params);
                }
                else{
                    $sql="update t_user set errorcount=errorcount+1 where email='".$email."'";
                    $dao->executeUpdate($sql);
                    $count=$dao->getErrorCount($email);
                    $code="login_failed";
                    $params=array(
                        "{0}" => $count,
                        "{1}" => 10-$count
                    );
                    goto_msg_failed($code, $params);
                }
            }
        }
    }
}


/**
 * 更改密码
 */
function changepass(){
    require_once Config_Path.'/config.php';
    session_start();
    $code="";
    $params=array();
    if(!isset($_COOKIE["user"]) or !isset($_SESSION["user"])){
        $code="must-login";
        goto_msg_failed($code, $params);
    }
    
    $email=$_SESSION["user"]; //获得已登录的用户
    $newpass=$_POST["newpass"];//得到新密码
    $dao=new DAO($config["host"],$config["username"],$config["password"],$config["db"]);
    $sql="update t_user set loginpass='".$newpass."' where email='".$email."'";
    
    $dao->executeUpdate($sql);
    
    $code="update_pass_success";
    goto_msg_success($code, $params);
}

/**
 * 发送邮件
 * @param unknown $acceptor 接收者 
 * @param string $acceptorname 接收者姓名
 * @param string $content 邮件内容
 * @param string $subject 邮件主题
 * 
 * @return bool 发送结果
 */
function sendmail($acceptor,$acceptorname,$content,$subject){
    include Config_Path.'/config.php';
    require_once INCLUDE_PATH.'/PHPMailer/class.phpmailer.php';

    $mail = new PHPMailer();
    $mail->IsSMTP();                  // send via SMTP
    $mail->Host = $config['mail_host'];   // SMTP servers
    $mail->SMTPAuth = true;           // turn on SMTP authentication
    $mail->Username = $config["mail_name"];     // SMTP username  注意：普通邮件认证不需要加 @域名
    $mail->Password = $config["mail_pass"]; // SMTP password
    $mail->From = $config["mail_name"];      // 发件人邮箱
    $mail->FromName =$config["mail_name"];  // 发件人
    
    $mail->CharSet = "utf-8";   // 这里指定字符集！
    $mail->Encoding = "base64";
    $mail->AddAddress($acceptor,$acceptorname);  // 收件人邮箱和姓名
    $mail->isHTML();
    // 邮件主题
    $mail->Subject = $subject;
    // 邮件内容
    $mail->Body = $content;
    $mail->AltBody ="text/html";
    
    return $mail->send();
}

/**
 * 对接到云客服平台
 */
function link_to_kf5(){
    require_once Config_Path.'/config.php';
    session_start();
    $email=$_SESSION["user"];
    //读取配置文件，获得秘钥和url
    $key=$config["key"];
    $url=$config["link"];
    
    //建立通讯串
    $time=isset($_GET["time"])?$_GET["time"]:time(); //时间戳
    $token=md5($email.$time.$key);
    $url.="?username=".$email."&time=".$time."&token=".$token;
    //指定回调地址
    $return_to=isset($_GET["return_to"])?$_GET["return_to"]:"";
    $url.="&return_to=".$return_to;
    //跳转
    header("location:".$url);
}

/**
 * 用户注销
 */
function logout(){
    session_start();
    if(isset($_SESSION["user"]) or isset($_COOKIE["user"])){
        unset($_SESSION["user"]);
        setcookie("user","",time()-1,"/");
    }
    header("location:".URL_ROOT."page/denglu.php");
}


/**
 * 用户注册
 * @param unknown $email 邮箱
 * @param unknown $loginpass 登录密码
 * @param unknown $phone 电话号码
 * @param unknown $name 姓名
 */
function register($email,$loginpass,$phone,$name){
    require_once Config_Path.'/config.php';
    $dao=new DAO($config["host"],$config["username"],$config["password"],$config["db"]);
    $code="";//消息码
    $params=array();//参数
    //email已被注册过
    if($dao->isUser($email)){
        $code="user_exist";
    }
    else{
        $sql="insert into t_user(email,loginpass,display_name,phone_number,registration_time) values('".$email."','".$loginpass."','".$name."','".$phone."','".date("Y-m-d H:i:s",time())."')";
        $dao->executeUpdate($sql);
        $code="register_success";
        $params=array(
            "{0}" => $email
        );
    }
    goto_msg_failed($code, $params);
}

/**
 * 处理用户邮箱里重置密码的超链接
 * @param unknown $key 验证码
 * @param unknown $email 用户邮箱
 */
function resetpass($key,$email){
    session_start();
    $code="";
    $params=array();
    
    if(!isset($_SESSION["pass_key"])){
        $code="link_timeout";
        goto_msg_failed($code, $params);
    }
    if($key!=$_SESSION["pass_key"]){
        unset($_SESSION["pass_key"]);//销毁key
        $code="link_error";
        goto_msg_failed($code, $params);
    }//链接有效，转到修改密码的页面
    else{
        $_SESSION["user"]=$email;
        setcookie("user",$email,time()+300,"/");
        header("location:".URL_ROOT."page/showchangepass.php");
    }
}


/**
 * 注册表单校验
 * @param unknown $email 邮箱
 * @param unknown $password 密码
 * @param unknown $phone 电话
 * @param unknown $name 姓名
 * @return multitype:string 错误数组
 */
function checkRegister($email,$password,$phone,$name){
    $errors=array();
    if($email==""){
        $errors['email']='email不能为空！';
    }
    else if(!preg_match('/^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$/i', $email)){
        $errors['email']='email格式不正确！';
    }
    else if(strlen($email)>40){
        $errors['email']='email长度在40以内！!';
    }
    
    if($password==''){
        $errors['loginpass']='密码不能为空！';
    }
    else if(strlen($password)<6 || strlen($password)>40){
        $errors['loginpass']='密码长度在6-40之间！';
    }
    
    if($phone==''){
        $errors['phone']='手机号码不能为空！';
    }
    else if(!preg_match('/^1\d{10}$/', $phone)){
        $errors['phone']='手机号码格式不对！';
    }
    
    if($name==''){
        $errors['name']='姓名不能为空！';
    }
    else if(strlen($name)>20){
        $errors['name']='昵称在10个字符以内！';
    }
    
    return $errors;
}

/**
 * 登录表单验证
 * @param unknown $email 邮箱
 * @param unknown $loginpass 密码
 * @return multitype:string 错误数组
 */
function validateLogin($email,$loginpass){
    $errors=array();
    if($email==""){
        $errors['email']='email不能为空！';
    }
    else if(!preg_match('/^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$/i', $email)){
        $errors['email']='email格式不正确！';
    }
    else if(strlen($email)>40){
        $errors['email']='email长度在40以内！';
    }
    
    if($loginpass==''){
        $errors['loginpass']='密码不能为空！';
    }
    else if(strlen($loginpass)<6 || strlen($loginpass)>40){
        $errors['loginpass']='密码长度在6-40之间！';
    }
    return $errors;
}
