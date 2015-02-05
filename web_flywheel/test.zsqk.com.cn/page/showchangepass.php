<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>修改密码</title>
<script type="text/javascript">
    function check(){
        var newpass=document.getElementById("newpass").value;
        var renewpass=document.getElementById("renewpass").value;
        
        if(newpass!=renewpass){
            alert("两次密码不一致！")
            return false;
        }
        return true;
    }
</script>
</head>
    <body>
       <form action="../handler/changepass.php" method="post" onsubmit="return check()">
           <label for="newpass">新密码：</label><input type="password" name="newpass" required="required" id="newpass"/><br/>
           <label for="renewpass">重新输入新密码：</label><input type="password" name="renewpass" required="required" id="renewpass"/><br/>
           <input type="submit" value="确认修改"/>
       </form>
    </body>
</html>