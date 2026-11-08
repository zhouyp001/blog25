最近在学习python，在使用作者的实例数据的时候，用widnows下的nodepad打开看到的是完整的一行数据

但是用python读取文件的时候却读出了多个字符串

我使用notepad++打开以后显示的和理论上的是一样的，多行

其实因为windows使用的换行是\n而linux系统下是\r，所以那个txt文件里面的换行就是\r，但是nodepad也没有将转义字符\r显示出来，我猜测可能是这样的：\r在windows里面有另外的转义的含义，也有可能nodepad默认将\r这个转义字符忽略

![img](img/2019012015545341.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlX3lpXw==,size_16,color_FFFFFF,t_70)

