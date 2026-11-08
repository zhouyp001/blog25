1.在虚拟机中添加vmnet8，设置为nat模式
点击虚拟机菜单栏的编辑-->虚拟网络编辑器：弹出窗口如下

 ![img](img/20181015202545155.png?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlX3lpXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)![img](img/20181015202619944.png?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlX3lpXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)![img](img/20181015202705874.png?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlX3lpXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

![img](img/20181015202820729.png?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlX3lpXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

\2. 打开网络共享中心-->更改适配器设置：可以看到有一个vmnet8

然后点击物理机联网的适配器-->共享-->勾选“允许其他网络用户。。。。”-->选择vmnet8-->确认保存

![img](img/20181015203359579.png?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlX3lpXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

 3.设置ubuntu14虚拟计算机网络属性，选择自定义为vnet8，确认保存，进入虚拟计算机就可以了。

![img](img/20181015203828806.png?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlX3lpXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)