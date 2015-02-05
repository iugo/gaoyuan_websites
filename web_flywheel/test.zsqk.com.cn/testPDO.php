<?php
try{
$db=new PDO('mysql:;dbname=vote', 'vote', 'eKy#89Q$%%PpJ#cxf$bc');
$sql="insert into t_user(email,loginpass)values('pdo@pdo.com','pdo')";
$result=$db->exec($sql);
echo $result;
}
catch(PDOException $e){
    echo $e->getMessage();
}
