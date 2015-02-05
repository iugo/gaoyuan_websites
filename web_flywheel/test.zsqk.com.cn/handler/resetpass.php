<?php
require_once '../path.php';
require_once INCLUDE_PATH.'/mylib.php';

$email=$_REQUEST["email"];
$key=$_REQUEST["key"];
resetpass($key, $email);
?>