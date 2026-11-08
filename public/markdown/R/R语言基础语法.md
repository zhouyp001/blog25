**一、基础操作函数**

source('~/.active-rstudio-document')

\#列出workspace中所有对象

ls()

\#删除某个变量

rm（）

\#查看R保存文件的目录

getwd()

\#保存文件

save（yourname，file='yourname.rda'）

\#提取保存的工作结果

load（'yourname.rda')

\#安装扩展包

install.packages('fortunes')

\#载入扩展包

library(fortunes)

\#卸载扩展包

detach(package:fortunes)

\#查看帮助

？……

**二、基本数学函数**

1、基本算符

+、-、*、/、^、%%[取模]、%/%[取整]、complex()[复数]、1.33e4[科学计算]

2、基本数学函数

abs（）、log(x,base=y)[y为底，x的对数，y默认为e]、exp(x)[x的自然指数]、sqrt(x)、factorial(x)[x的阶乘]、choose(x,y)[x个数选y个数的组合数]；

**近似函数**：round(123.123,digits=4)、round(4.5)、signif(123.123,4)[保留有效数]、floor(x)[最近整数]、trunc(x)[截取整数]；

**三角函数**：sin()、cos()、tan()

Inf[无穷大]、NaN[无定义]、NA[缺失值]

**值检测**：is.finite()[是否有限]、is.infinite()、is.nan()、is.na()；

未完成。。。