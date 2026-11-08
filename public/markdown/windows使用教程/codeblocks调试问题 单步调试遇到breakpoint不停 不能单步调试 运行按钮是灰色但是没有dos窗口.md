今天晚上调试的时候可能不小心改了设置，还是其它原因，codeblocks突然遇到breakpoint不停了，然后百度了一下，大部分是说project创建的问题，感觉和自己的问题不同，我的问题是所有的project都不能单步调试。然后在seting->debug设置中找了一会都没有找到相应的设置，然后我就到debug中找到了debug->active debuggers->gdb/cdb debugger:default,勾选之后发现可以调试了，然后决定用博客记录下来，希望能给遇到相似的问题的同学也能得到帮助。

<img src="img/20180724213613828.png" style="width:500px">
以前刚用codeblocks编写程序的时候发现也不能但不单步调试，单步调试的时候提示下面一样的信息，其实下面的信息就是解决方法，下面大概意思就是没有但不调试的软件。 

 <img src="img/20180724214645342.png" style="width:800px">

点开setting->debugger

 <img src="img/20180724214849212.png" style="width:250px"> <img src="img/20180724215006382.png" style="width:450px">

 上面的红色框中就是你要选择调试器的路径，点开选择路径，如果codeblocks软件是安装在C:\Program Files (x86)下面的话就是下面图片中所示的路径了，然后选择gdb32.exe，点击ok保存就可以调试了。（对了，还要选择上图中的GDB选项）

 <img src="img/20180724215122687.png" style="width:300px">

 有时候调试器出错了，虽然你看不到程序的运行窗口，但是程序其实是在运行的。并且你是不可以再点击运行按钮运行程序的，这个时候就可以打开任务管理器，关闭相应的任务了，一般关闭想下图所示的那样的图标一样的任务就可以了。

<img src="img/20180724214539638.png" style="width:500px">