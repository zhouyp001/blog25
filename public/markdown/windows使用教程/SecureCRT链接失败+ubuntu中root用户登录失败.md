事情是这样的，前几天使用redhat的时候用到了securecrt软件登录linux终端，最近又使用ubuntu系统，在使用找这个软件的时候发现连接不了然后在找了好久终于找到了原因。

原来是Ubuntu是没有带ssh这个软件的，

//              1.sudo apt-get install openssh-server openssh-client
//　　　　2.rpm -qa | grep ssh查看SSH是否安装 若没有执行第1步
//　　　　3.service sshd status 查看是否开启 如果没有继续下面
//　　　　4.启动SSH服务 service sshd restart 停止服务 service sshd stop 
//　　　　5.netstat -antp | grep sshd 查看是否启动22端口
//　　　　6.chkconfig sshd on 设置SSH服务为开机启

sudo apt install ssh  下载这个软件后是用root用户还是不能链接

思考了一下是不是密码忘了

然后我就直接gurb模式改了root密码，像前一篇文章一样

改了之后我又登，发现还是登不上，我还是怀疑密码有问题

于是打开虚拟机登了一下，发现密码还真是错的，于是又进入那个模式开始改密码，发现进去不了了

于是我找原因，其实我第一次进入的时候是在虚拟机加载界面的时候像redhat那样随便按e进入的，原来redhat还没有打开开机grub选项，于是我又找到grub的配置文件/etc/default/grub

打开/etc/default/grub文件

找到 GRUB_HIDDEN_TIMEOUT=0 这行，使用#注释掉，变成 #GRUB_HIDDEN_TIMEOUT=0

 找到 GRUB_TIMEOUT=10 把10变成3,意思是等待3秒钟。 保存文件

其实在这个过程中，还好我的本地用户在root组中，不然可能就要以其它的方式进入grub了，因为grub这个文件是readonly只读文件

sudo chmod 666 grub，更改文件权限，当然是在/etc/default文件目录下执行的

然后vi grub 然后改咯（命令模式下：i前插，a后插，x删字，dd删行，p粘贴，u撤回，hjkl移动；然后wq保存退出）

执行命令 sudo update-grub 现在启动的时候就会显示grub菜单了，如果3秒内不选择，则会自动进入系统。

有了这个以后，用上一篇文章更改，但是在下面登录的时候，老是提示要ctrl+d,然后一直循环，仔细一看说要确认密码，然后改输入，上一次没有打开Num Lock，的数字密码后enter，就进入了root了

![img](img/20180810110103453.png?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlX3lpXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

更改密码以后，还是不行

于是我又找，发现下载的ssh是没有把root设置允许的,于是寻找配置文件

$ sudo vi /etc/ssh/sshd_config

找到PermitRootLogin no（prohibit password)一行，改为PermitRootLogin yes

重启 openssh server

service sshd restart

然后就可以了登陆了。



中间参考文章

https://blog.csdn.net/sfe1012/article/details/53113271

https://blog.csdn.net/xiaocai9999/article/details/78012235

https://blog.csdn.net/cnyygj/article/details/76086430