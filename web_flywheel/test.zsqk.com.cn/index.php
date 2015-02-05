
<?php
require_once 'includes/mylib.php';//包含自定义函数库

//生成path.php
$file="path.php";
$dirname=dirname(__FILE__);
$dirname=str_replace('\\', '/', $dirname);
$url_path=$path='http://'.$_SERVER['HTTP_HOST'].substr($_SERVER['PHP_SELF'],0,strrpos($_SERVER['PHP_SELF'],'/')+1);
if(!file_exists($file)){
    $contents="<?php\n";
    $contents.="define('FILE_ROOT_PATH','".$dirname."');\n";
    $contents.="define('Config_Path','".$dirname."/config');\n";
    $contents.="define('INCLUDE_PATH','".$dirname."/includes');\n";
    $contents.="define('HANDLER_PATH','".$dirname."/handler');\n";
    $contents.="define('PAGE_PATH','".$dirname."/page');\n";
    $contents.="define('URL_ROOT','".$url_path."');\n";
    file_put_contents($file, $contents);
}
require_once 'path.php';

/*
 * 动态生成配置文件
 */
$values=array(
    'host' =>'121.42.26.216',
    'username' => 'vote',
    'password' => 'eKy#89Q$%%PpJ#cxf$bc',
    'db' => 'vote',
    'key' => 'fd0239ec4d20346b7d24cf08743955',
    'link' =>'http://zhaoshang.go0356.com/user/remote',
    'mail_host' =>'smtp.126.com',
    'mail_name' =>'a1043519901@126.com',
    'mail_pass' =>'a13223561483'
);
writeConfig($values);
/*
 * 首页登录跳转控制
 */
login_judge();
?>
