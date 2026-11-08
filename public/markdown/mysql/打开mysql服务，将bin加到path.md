找到自己的mysql安装目录，将bin目录路径复制

例如我的

<img src="img/20190310203404764.png" style="width:400px">

然后右键我的电脑---->点击属性---->点击高级 系统设置---->点击环境变量

<img src="img/20190310203644400.png" style="width:400px"><img src="img/20190310203726236.png" style="width:400px">

 编辑系统变量的path,粘贴自己的bin路径，保存

<img src="img/20190310203823212.png" style="width:400px">

 以后打开服务就只要管理员身份运行cmd，然后mysqld install。或者其他的一些与mysql相关的命令也直接输入就好了，不要再cd到目录了。