一、彻底关闭系统自带的windows defender

不管你用的是哪个版本的Win10，其实只要停了Windows Defender的实时监控，也就等于让这款内置杀软“离职”，至少是被架空了。所以，在创意者更新中，进入Windows Defender安全中心，找到“病毒和威胁防护设置”，把里面“实时保护”等选项关了就好。老版本Win10在设置→更新和安全→Windows Defender中关闭“实时保护”之类的开关就行。
新版本中找不到这个东西，就用注册表关闭的方法

关闭Windows Defender安全中心具体方法如下：

1、win+R打开运行小窗口，输入regedit，按回车键进入注册表编辑器。

2、定位到

HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\SecurityHealthService

3、在右侧找到DWORD（32位）值，命名为Start。

4、修改数值数据为4。

![img](img/20180811165858607.png?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlX3lpXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

5、重启文件资源管理器，或注销再登录/重启系统。

Windows10系统彻底关闭Windows Defender的技巧就为大家介绍到这里了。按照上述步骤操作，会看到Windows Defender安全中心不再出现，再配合停用Windows Defender，内置安全软件就不会打扰到大家了。当然，如果用户安装第三方杀软或安全软件，Windows Defender会自动被关闭。



二、彻底关闭360

关闭360以后发现其实后台还是有360的主动防御服务，打开任务管理器，找到360的主动服务，点击结束任务是关闭不了的。

因为360为了防止病毒强制结束进程而设有进程保护
所以我们是无法通过任务管理器结束360的
360涉及到系统底层的一些东西
所以被默认为是系统进程
不能随便关闭
要想退出只能通过它自身退出

360涉及到系统底层的一些东西
所以被默认为是系统进程
不能随便关闭
要想退出只能通过它自身退出
在你右下角的360图标上点右键退出
选择时间或者完全关闭退出就行了

360涉及到系统底层的一些东西
所以被默认为是系统进程
不能随便关闭
要想退出只能通过它自身退出



![img](img/20180811170551904.png?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlX3lpXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

 选择网络防护中心最下面的，主动防御服务

![img](img/20180811170640685.png?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlX3lpXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)