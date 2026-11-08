dos下也不能编译eclipse以前编辑的文件。因为eclipse文件里面有package****语句。

如果非要在dos下编译那就需要将程序里面的package语句注释掉，在前面加两条反斜杠\\package

另外在eclipse下编译出来的.class文件，就我的的编译器而言是不可以的，可能是jdk不同的问题，具体我也不清楚，以后有时间再研究。