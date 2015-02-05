功能:
===
* 用户登录
* 注册功能
* 将 msg 剥离出来, 用错误代码传参
* 与 kf5.com 对接 [文档](http://www.kf5.com/v1api/single_sign_on/)

等待修复:
===

* ~~index.php 文件乱码~~(已修复)
* ~~$_REQUEST["msg"]通过网页传值失败！~~(已修复)
* ~~denglu.php中，js代码onsubmit()中return false了以后表单仍然提交~~(已修复)
* ~~config.php在首次访问产生后不能在访问完毕后删除，安全性还不是很强~~(已修复)

等待增加:
===

1. 注册输入过滤
2. 登陆输入过滤
3. 在设置文件中定义文件路径, 比如加个 $img_paths . 可参考 https://github.com/opengovfoundation/madison/blob/master/bootstrap/paths.php
4. 利用文件夹整理项目文件, 函数放在一个文件夹中.
5. 为名称模糊的文件重命名.
10. 用框架重构代码