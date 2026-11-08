上一篇我们讲到了卸载自带软件的方法，其原因就是打开方式不能根据自己想要的方式打开。而这里正是解决这个问题的更加符合要求的方式。

设置某格式打开方式是如下：

//该经验是设置将图片管理器设置可以打开.gif后缀文件，其它文件格式可以依次类推

首先按win+r键打开运行窗口如下：

<img src="img/20180621134300451.png" style="width:400px">

然后打开注册表编辑器，在运行窗口中输入regedit点击确认，具体操作如上图

找到目录

计算机\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\WindowsPhoto Viewer\Capabilities\FileAssociations

如下：

<img src="img/20180621134454800.png" style="width:400px"><img src="img/20180621134501104.png" style="width:400px">



<img src="img/20180621134518442.png" style="width:800px">

<img src="img/20180621134530866.png" style="width:400px">

将新值设置为.gif后在右键点击文件然后左键点击“*修改*”

<img src="img/20180621134555977.png" style="width:500px">

然后退出注册表，再右键.gif后缀的文件选择打开方式就会有图片管理器选项了。

附：如果你想要使用Windows照片查看器查看.png后缀的文件，那么数值名称写为.png，数值数据还是为PhotoViewer.FileAssoc.Tiff。换句话说，只要你想更改任何格式的图片文件打开方式，那么数值名称就是.格式名称，数值数据一直为PhotoViewer.FileAssoc.Tiff。