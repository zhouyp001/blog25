在编写大代码量项目的时候出现，R文件突然全红了。心态一下炸了，红了几天了今天终于解决了。

开始对r文件大概理解是它代表资源路径，但是当它报错的时候，开始对自己的认识产生怀疑了，看来还是上课没有认真。

R文件的含义：当 Android 应用程序被编译，会自动生成一个 R 类，其中包含了所有 res/ 目录下资源的 ID，如布局文件，资源文件，图片（values下所有文件）的ID等。在写java代码需要用这些资源的时候，你可以使用 R 类，通过子类+资源名或者直接使用资源 ID 来访问资源。

既然他是一个自动生成的类，只要我文件路径没有放错，然后调用没有调用错，那么它生成就一定是死的。所以它出现错误除了这两个原因就只有另外一个原因了，那就是编写的res下的文件出错了。于是我重新点了一下Sync Project with Gradle file,就是这个按钮（![img](img/20181215193613793.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)）。然后发现又报错，错误提示是（颜色错误）仔细思考一下我在选择器中item的drawable的值从原来的图片直接变成了颜色rgb值。

![img](img/20181215194131673.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

然后我重新改成图片，于是乎就可以了。果然还是这个原因。

这样实现就必须通过设置两张不同的图片，然后调用，作为一个程序员来说是多么恶心的事情，虽然我可以ps，但**

所以之后我做了轻微的更改

首先我还是将那个值变成颜色，但是这里的颜色是values文件夹下color.xml中的元素

![img](img/20181215200924848.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

也就是在values文件夹下的color.xml文件中加上了下面两条语句。

![img](img/20181215201003944.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

不过作为一个程序员来说还是有点不能忍受，但是**，哎算了，第一次写android项目而且这个又是设计方面的东西，感觉没有纠结算法那么有成就感，就暂且放下吧。。。