大部分手机用户可能因为手机自带软件对我们没有用想卸载，但是手机在没有刷机的情况下是不能卸载的。而电脑不同，但是我们想卸载的原因可能和我们想卸载手机软件是不同的，就比如说我，我当时是因为电脑自带软件打开太慢，而当时又想用自己设置的软件默认打开，但是window10的设置我设置了多次都没有用，所以就产生了想卸载它的想法。

卸载自带软件的步骤如下：

首先我们按window键然后在所有程序列表中找到Windows powershell文件夹打开，找到第一个Windows power shell程序，右键以管理员运行，如下图

<img src="img/20180621133454351.png" style="width:400px">

运行结果如下

<img src="img/20180621133524712.png" style="width:800px">

比如我们要卸载3d画图软件我们在命令行输入

Get-AppxPackage *Paint3D* |Remove-AppxPackage

其它的自带软件卸载命令如下：

OneNote：

Get-AppxPackage*OneNote* | Remove-AppxPackage

3D：

Get-AppxPackage*3d* | Remove-AppxPackage

Camera相机：

Get-AppxPackage*camera* | Remove-AppxPackage

邮件和日历：

Get-AppxPackage*communi* | Remove-AppxPackage

新闻订阅：

Get-AppxPackage*bing* | Remove-AppxPackage

Groove音乐、电影与电视：

Get-AppxPackage*zune* | Remove-AppxPackage

人脉：

Get-AppxPackage*people* | Remove-AppxPackage

手机伴侣（Phone Companion）：

Get-AppxPackage*phone* | Remove-AppxPackage

照片：

Get-AppxPackage*photo* | Remove-AppxPackage

纸牌游戏：

Get-AppxPackage*solit* | Remove-AppxPackage

录音机：

Get-AppxPackage*soundrec* | Remove-AppxPackage

Xbox：

Get-AppxPackage*xbox* | Remove-AppxPackage