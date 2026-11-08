### System.out.pintln(new Date())是怎样实现的
1. 首先System是java.lang包里面的类  
2. System类里面有一个out的静态变量(静态变量的类型是PrintsStream)
3. PrintsString是java.io包里面的类
4. pintln方法有10个，这里的是prinln(Object o)的方法
所以要想知道是怎么实现的，就需要知道prinln（Object o）是怎样实现的。
### 寻找真正的println(Object o)
1. 查看prinln（Object o）
```
//java类库中复制过来的代码
public void println(Object x) {
        String s = String.valueOf(x);//将x转换成String类型
        synchronized (this) {//这里是synchronized锁
            print(s);//打印String类型的对象s
            newLine();//结束这一行
        }
    }
```
**解释synchronized关键字**：代表这个方法加锁,相当于不管哪一个线程（例如线程A），运行到这个方法时,都要检查有没有其它线程B（或者C、 D等）正在用这个方法(或者该类的其他同步方法)，有的话要等正在使用synchronized方法的线程B（或者C 、D）运行完这个方法后再运行此线程A,没有的话,锁定调用者,然后直接运行。它包括两种用法：synchronized 方法和 synchronized 块。

2. 因此问题转移到了String.valueOf(Object o)方法上，valueOf方法是String类的静态方法
3. 查看valueOf(Object o)方法的源码

```
//java类库中复制过来的代码
  public static String valueOf(Object obj) {
  //返回一个String对象，如果obj为null则返回null，否则调用obj.toString()方法
        return (obj == null) ? "null" : obj.toString();
    }
```

**总结**：问题已经很明了了，println（new Date()）实际上是调用了Date()定义的对象的toString方法来实现打印。
