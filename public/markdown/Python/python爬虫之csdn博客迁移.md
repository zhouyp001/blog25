目的：将csdn上的不是md格式的博客爬下来放到github上面去
[源码开源地址](https://github.com/zyipeng/ShiftBlogByPython.git)，一起学习交流

## 实现流程

1.爬到博客的总页数，获取每页的url
2.爬到每一页的所包含的博客，将所有的博客url爬下来
3.爬到每一篇博客的标题和内容
4.爬到每一篇博客所含的图片下载下来
5.将爬到的文章和图片打包保存

## 实现步骤

**爬虫的基本工作**

 - 首先访问url将url对应的页面存到字符串
 - 然后到页面字符串里面寻找想要的东西
 - 继续访问url，继续寻找，知道找到真正想要的为止

**爬取博客的总页数，获取每一页的url**

 1. 获取总页数，打开自己博客的首页，然后翻页发现传过来好多包，然后发现里面有一个js文件时用来设置翻页显示的。并且在html源码里面是没有翻页的源码的。（这些代码是js生成的）所以需要将js生成的代码一起获取。
 2. 获取每一页的url

**获取html，我知道的有两种方式**

 1. 通过requests包里面的requests.get(url).text获得页面代码
 2. 通过webdriver中的selenium包里面的driver=webdriver.PhantomJS(executable_path('[phantomjs.exe绝对路径]’)
 driver.get(url)访问url页面 ，通过driver.page_source获得页面代码

示例代码
```
import requests
from selenium import webdriver
url="https://blog.csdn.net/ke_yi_/article/details/90080807"
res=requests.get(url).text
driver=webdriver.PhantomJS(executable_path='D:\\Program Files\\phantomjs-2.1.1-windows\\bin\\phantomjs.exe')
driver.get(url)
f1=open("date1.html","a",encoding="utf-8")
f2=open("data2.html","a",encoding="utf-8")
f1.write(res)
f2.write(driver.page_source)
f1.close()
f2.close()
print("yes")
```
**获取每一页的博客url**

- 遍历每一页，获取每一页的html页面，找到博客url的特征，写出正则表达式，得到每个博客的url放入列表。

**爬到每一篇博客的标题和内容**

 -通过寻找标题和内容的特征，写出正则表达式，但是由于文章的标签是双标签前面左标签好判断，有标签就有点难寻找。因此我在这里是通过两次正则才得到整个博客正文。

 **下载每一篇博客所有的图片**

 - 下载图片需要得到图片的url，首先通过对得到的正文内容进行正则表达式查找所有图片的url，然后下载图片。由于图片需要显示，因此在保存正文之前需要将正文中的url改成本地的url，下载图片的时候可以有更加优化，因为两次都是需要查找url的位置，然后再进行操作，分开就会多需要一些时间。
 - 图片下载的时候，csdn我的有两种图片标签格式，一种是png?或jpg？结束的，一种是gif"结束的，所以在编正则表达式需要注意。

**下载图片**

- 下载图片我是通过urlretrieve的urllib.request里面的urlretrieve(img_url,local_img_url)下载。

 **将图片和博客打包**

 - 图片的话可以用先建一个文件夹，然后将所有图片都放入。博客开始我是以博客标题作为文件名，但是博客标题中有很多特殊字符，所以最有我是存为md格式，将标题放在文件里面。（#其实最终我将博客放csdn上的时候，由于我的标题里面有冒号，导致出错。）

**保存文件**

 

```
f=open("newfile.txt","w",encoding="utf-8")
f.write("filecontent")
f.close()
```
**遇到的错误**
![遇到的错误](img\20190516160924142.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlX3lpXw==,size_16,color_FFFFFF,t_70)
**最终效果**
![最终效果](img\20190516160203737.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlX3lpXw==,size_16,color_FFFFFF,t_70)