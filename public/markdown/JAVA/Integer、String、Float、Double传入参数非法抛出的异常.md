### Integer/String/Float/Double传入参数非法抛出的异常

1. 编译错误
   `String s=new String(null);`

2. 空指针异常：NullPointerException

   ```java
   String s=null;
   if(1==0){
   	s="123";
   }
   String s1=new String(s);
   ```

3. 抛出数值转换异常：NumberFormatException

   ```java
   Integer i=new Integer("zh");
   Integer i=new Integer(null);
   ```

4. 测试初始化小数是否需要加f/d

   ```java
   Float f=new Float("1");
   Double d=new Double("1");
   ```

   