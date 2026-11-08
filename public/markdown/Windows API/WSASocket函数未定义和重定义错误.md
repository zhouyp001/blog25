报错error C2065: 'WSASocket' : undeclared identifier

意思是WSASocket函数没有声明定义

WSASocket()是：创建一个与指定传送服务提供者捆绑的套接口，可选地创建和/或加入一个套接口组。

此函数为socket（）的扩展版本，其功能都是创建一个原始套接字。使用时需要包含

winsock2.h 头文件和链接ws2_32.lib库。

刚开始我的情况是再cpp文件中包含了windows.h的头文件，也链接了ws2_32.lib库，然后出现没有定义的错误，后来我通过百度查到其需要包含winsock2.h的头文件然后我再windows.h后面又包含了winsock2.h的头文件，但是出现的报错就更多了，报错如下：

c:\program files\microsoft visual studio\vc98\include\winsock2.h(99) : error C2011: 'fd_set' : 'struct' type redefinition
c:\program files\microsoft visual studio\vc98\include\winsock2.h(134) : warning C4005: 'FD_SET' : macro redefinition
        c:\program files\microsoft visual studio\vc98\include\winsock.h(84) : see previous definition of 'FD_SET'

。。。。。。。。（还有好多）

然后我将winsock2.h的头文件删了，又到百度找答案，然后查到一篇博文说他误打误撞在winsock.h的头文件中包含stdafx.h头文件，我也试了一下，但是还是不行，可能是我的文件不同吧，因为编译之后我说stdafx.h没有定义，我找一下放头文件的文件夹是没有这个文件，我不至于这样就到网上找找一个包含进去吧，然后我打开我引入的头文件windows.h看了一下，里面包含了winsock.h，然后我到MSDN Library 找才知道winsock2.h是winsock.h的升级版，不能放在一起用，所以我就将winsock2.和定义到windows.h文件的前面，然后就可以了。

最后我打开winsock2.h和winsock.h两个文件，发现他们的宏定义是这样的

![img](img/20180703185814153.png?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlX3lpXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

winsock2.h中定义了winsock.h的宏，说明如果先引入了winsock2.h同文件再引入winsock.h头文件，编译器是不会去编译winsock.h头文件的，如果倒过来就不同，并且会出现很多错误，是因为winsock.h和winsock2.h存在很多相同的定义或者其它。其实在winsock2.h文件中就能找到答案，下图“阻止包含windows.h中的winsock.h”。

![img](img/20180703190149690.png?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlX3lpXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)