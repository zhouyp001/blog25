###### 函数的参数

HttpServletRequest request	//用来获取参数的内容
Class<T> clas						 //用来获取需要得到的对象的类型

###### 函数的返回值

T											 //泛型对象，传入什么类型的类就得到什么类型

###### 函数实现步骤

1. 获取返回实体类的所有属性

2. 创建一个需要返回的实体类

3. 遍历实体类的每个属性

   1）获取每个属性的类型

   2）获取每个属性的名字

   3）通过每个属性的名字和request对象获取对应参数的值

   4）获取每个属性对应的参数为String类型的构造函数

   5）设置每个属性为可访问

   6）通过构造函数和获得的参数创建每个属性的对象

   7）将对应属性的值设置成为每个属性创建的对象

4. 返回实体类的对象

###### 函数具体实现

```java
private <T> T getObject(HttpServletRequest request,Class<T> clas){
	Field[] fields=clas.getDeclaredFields();//获取属性数组
	T t=null;
	try {
		t=clas.newInstance();//创建一个对象
		for (Field field : fields) {
			Class<?> field_class=field.getType();//获取每个属性的类型
			String field_name=field.getName();//获取每个属性的名字
			/***
			 * 此处可能获取不到，par_value可能为null，因此要判断
			 */
			//通过每个属性的名字获取对应参数的值
			String par_value=request.getParameter(field_name);
			
			try {
				//获取参数为String的构造函数
				Constructor<?> con = field_class.getConstructor(String.class);
				try {
					field.setAccessible(true);//设置每个属性的性质为可访问
					Object field_obj=null;
					if(par_value!=null){
            /**
             * 此处可能存在运行时异常，因为数值类基本类型不可以传入非数值的字符，如果传入就可能产生参数异常
             */
						try{
							//通过获得的每个属性的构造函数传入对应参数的值创建属性的对象
							field_obj=con.newInstance(par_value);
						}catch(IllegalArgumentException e){
				//由于非法参数异常是数值转换异常的父类因此直接抛非法参数异常
				/***
				 * 有点纠结这里要不要分一下，如果是数值转换异常就将其赋值为0
				 * 如果是非法参数异常就输出异常信息
				 * 但是它们是父子关系，会不会数值转换异常同时会被非法参数异常捕获呢？
				 * 如果会也没关系，因为能被非法参数异常捕获但是不是数值转换异常不会被数值转换异常捕获
				 */
							e.printStackTrace();
						}
					}
					field.set(t, field_obj);//将创建的每个对象设置为对应属性的值
				} catch (InstantiationException e) {
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					e.printStackTrace();
				}
			} catch (NoSuchMethodException e) {
				e.printStackTrace();
			} catch (SecurityException e) {
				e.printStackTrace();
			}
		}
	} catch (InstantiationException e1) {
		e1.printStackTrace();
	} catch (IllegalAccessException e1) {
		e1.printStackTrace();
	}
	return t;
}
```

###### 异常的处理

需要注意的几点异常：NumberFormatException、IllegalArgumentException、实体类属性为基本类型的异常。

1. 实体类属性为基本类型异常

   产生原因：由于创建属性对象是通过构造函数创建的，基本类型是没有构造函数的。因此，如果是基本类型，就不同创建属性的对象。虽然后面有抛出数值转换异常，还是会处理这样的情况，但是当使用这个函数的时候是没有提示的，当运行的时候看到数值类型不是参数的值才能发现。
   处理方式：自定义一个IllegalParameterIsPrimitiveException异常类。每次创建属性对象之前判断是否为基本类型，如果为基本类型抛出异常。在整个函数上抛出异常给调用者去处理。

2. 非法参数异常（IllegalArgumentException）

   产生原因：由于是调用构造函数传入request获取的参数创建对象。因此，如果是Data、Integer、Double、Float等类型都可能产生非法参数，其中Integer、Double、Float等可能需要进一步分析，另外Data等类型，如果传入的参数不符合需要的格式的话就会非法参数异常。

   处理方式：发生异常直接捕获，赋值为空。

3. 数值转换异常（NumberFormatException）

   产生原因：由于Data、Integer、Double、Float等如果传入非数值的字符串或null的话就会产生该异常。

   处理方式：发生异常直接捕获，赋值为空。

```java
//创建的IllegalParameterIsPrimitiveException异常类
class IllegalParameterIsPrimitiveException extends IllegalArgumentException{
	/**
	 * @author ke_yi_
	 */
	private static final long serialVersionUID = 1L;
	public IllegalParameterIsPrimitiveException() {
		super();
	}
	public IllegalParameterIsPrimitiveException(String message) {
		super(message);
	}
}
```

```java
//抛出实体类属性为基本类型异常之后的代码
private <T> T getObject(HttpServletRequest request,Class<T> clas)
		throws IllegalParameterIsPrimitiveException{//#抛出实体类属性为基本类型异常
	Field[] fields=clas.getDeclaredFields();//获取属性数组
	T t=null;
	try {
		t=clas.newInstance();//创建一个对象
		for (Field field : fields) {
			Class<?> field_class=field.getType();//获取每个属性的类型
             if(field_class.isPrimitive()){//#抛出实体类属性为基本类型异常
				throw new IllegalParameterIsPrimitiveException();
			}
			String field_name=field.getName();//获取每个属性的名字
			/***
			 * 此处可能获取不到，par_value可能为null，因此要判断
			 */
			//通过每个属性的名字获取对应参数的值
			String par_value=request.getParameter(field_name);
			try {
				//获取参数为String的构造函数
				Constructor<?> con = field_class.getConstructor(String.class);
				try {
					field.setAccessible(true);//设置每个属性的性质为可访问
					Object field_obj=null;
					if(par_value!=null){
            /**
             * 此处可能存在运行时异常，因为数值类基本类型不可以传入非数值的字符，如果传入就可能产生参数异常
             */
						try{
							//通过获得的每个属性的构造函数传入对应参数的值创建属性的对象
							field_obj=con.newInstance(par_value);
						}catch(IllegalArgumentException e){
				//由于非法参数异常是数值转换异常的父类因此直接抛非法参数异常
				/***
				 * 有点纠结这里要不要分一下，如果是数值转换异常就将其赋值为0
				 * 如果是非法参数异常就输出异常信息
				 * 但是它们是父子关系，会不会数值转换异常同时会被非法参数异常捕获呢？
				 * 如果会也没关系，因为能被非法参数异常捕获但是不是数值转换异常不会被数值转换异常捕获
				 */
							e.printStackTrace();
						}
					}
					field.set(t, field_obj);//将创建的每个对象设置为对应属性的值
				} catch (InstantiationException e) {
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					e.printStackTrace();
				}
			} catch (NoSuchMethodException e) {
				e.printStackTrace();
			} catch (SecurityException e) {
				e.printStackTrace();
			}
		}
	} catch (InstantiationException e1) {
		e1.printStackTrace();
	} catch (IllegalAccessException e1) {
		e1.printStackTrace();
	}
	return t;
}
```







