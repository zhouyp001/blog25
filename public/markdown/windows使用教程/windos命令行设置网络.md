由于最近遇到一个问题，电脑更改IP保存的时候出先保存失败的问题

原因是由于权限不够，所导致的，由于时间问题也没有去追究为什么是这样的，以后有机会再找吧！

首先通过打开dos（强调：管理员运行）

将ip和dns改成自动获取方式：

命令1：netsh interface ip set address name="以太网" source=dhcp（作用：更改ip地址为自动获取，“以太网”是根据自己的电脑决定的）

命令2：netsh interface ip set dns name="以太网" source=dhcp（作用：更改dns服务器地址）

将IP和dns设置手动方式：

命令1：netsh interface ip set address"以太网" static (这里输入ip）（这里输入子网掩码）（这里输入网关）auto （作用：设置静态ip）

命令2：netsh interface ip set dns"以太网” static （这里输入dns服务器地址）  （作用：设置dns服务器地址）

删除ip地址和dns方式：

命令1：netsh interface ip set address name="以太网" source=dhcp（作用：更改ip地址为自动获取，“以太网”是根据自己的电脑决定的）

命令2：netsh interface ip set dns name="以太网" source=dhcp（作用：更改dns服务器地址）



![img](img/20181026141147969.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlX3lpXw==,size_27,color_FFFFFF,t_70)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)