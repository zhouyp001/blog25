出项这种问题的原因可能很多，但是我的问题我是通过关闭防火墙解决的。开始出现这个问题我没有觉得关闭防火墙有用，因为我上一次不照样能运行吗！但是后来我新建了一个项目还是出现同样的问题，打开日记一看，有一个这样的错误：

Cannot start internal HTTP server. Git integration, JavaScript debugger and LiveEdit may operate with errors. Please check your firewall settings and restart Android        Studio

于是我将所有的防火墙都关闭，特别是那个红色标记的：

![img](img/201901111006532.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlX3lpXw==,size_16,color_FFFFFF,t_70)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)回想了一下，上一次运行的时候，确实没有，电脑也是正常睡眠，但是这一次开机我们充好电再开的，我想可能就是因为电脑没有电关机了，然后开机防火墙自动开启。我也不记得as是需要关闭防火墙去了，哎，新手嘛！