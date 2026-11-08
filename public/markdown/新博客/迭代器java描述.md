**迭代器是什么？** 它使客户可以从第一个元素开始从头走到尾，或遍历像线性表一样的数据集。在遍历过程中，记住自己的形成。他可以告诉程序员下一个元素是否存在，如果存在，则返回对这个元素的引用。在一趟迭代期间，每一个数据元素只被访问一次。

**JAVA类库在java.util中** 有Iterator和ListIterator两个地带其接口。
## Iterator接口
 说明了三个方法：hasNext、next、remove。hasNext方法查看迭代器是否返回下一个元素。如果是，next返回一个指向它的引用。方法remove可以删除最近由next调用的元素，或者抛出一个UnsuortedOperationException异常。
**多个迭代器** 多个迭代器就像选择排序中用了两个迭代器一样，每一次选择排序都是用一个迭代器选择一个位置，然后另一个迭代器去找最小的元素。
**独立类迭代器** 必须通过ADT（抽象数据类型）的共有方法来访问ADT的数据。但是某些ADT，如堆没有提供足够的数据访问方法，使得不能实现这种迭代器。另外独立迭代器比其他类型的迭代器的运行时间要长，但是独立迭代器的实现比较简单；

```
//独立迭代器
import	java.util.Iterator;
import java.util.NosuchElementException;
public class SeparateIterator<T> implements Iterator<T>
{
	private ListInterface<T> list;
	private int nextPosition;//next()最近返回的元素的位置
	private boolean wasNextCalled;//需要删除的
	public SeparateIterator(ListInterface<T> aList){
		list=alist;
		nextPosition=0;
		wasNextCalled=false;
	}
	//hasNext实现
	public boolean hasNext(){
		return  nextPosition<list.getLength();
	}
	public T next(){
		if(hasNext)){
			wasNextCalled=true;
			nextPosition++;
			return list.getEntry(nextPosition);
		}else{
			throw new NoSuchElementException("Illegal call to next();"+"iterator is after end of list.");
		}
	public void remove(){
		if(wasNextCalled){
			//通过调用next是nextPosition的递增，因此它是要删除的元素的位置号。
			list.remove(nextPosition);
			nextPosition--;//删除操作不能影响next()的调用
			wasNextCalled=false;//重置标记
		}else{
			throw new IllegalStateException("Illegal call to remove(); "+"next() was not called."
		}
	}
}
```
**内部迭代器** 可以直接访问ADT（抽象数据类型）的数据，因此它往往比一个单独的迭代器运行速度要快。其实现代价也更大。这两种迭代器还有另一个优点：可以同时存在多个迭代器对象，这些迭代器其可以各自独立遍历线性表。

```
//基于链表的实现
import java.util.Iterator;
public interface ListWithIteratorInterface<T> extends ListInterface<T>{
	public Iterator<T> getIterator();
}

import java.util.Iterator;
import java.util.NoSuchElementException;
public class LinkedListWithIterator<T> implements ListWithIteratorInterface<T>{
	private Node firstNode;
	private int length;
	public LinkedListWithIterator(){
		clear();
	}
	...构造方法
	public T next(){
		if(hasNext()){
			Node returnNode=nextNode;//获得下一个节点
			nextNode=nextNode.next;//迭代迁移一步
			return returnNode.data;//返回迭代的下一个元素
		}else{
			throw new NoSuchElementException("Illegal call to next();"+"iteration is after end of list.");
		}
	}
	public boolean hasNext(){
		return nextNode!=null;
	}
	public void move(){
		throw new UnsupportedOperationException("remove() is not"+"supported by this iterator");
	}
	public Iterator<T>getIterator(){
		return new IteratorForLinkList();
	}
	private class IteratorForLinkList implements Iterator<T>{
		private Node nextNode;
		private IteratorForLinkedList(){
			nextNode=firstNode;
		}
		...Iterator中方法的实现
	}
	...私有类Node的实现
```
**迭代器方法为何在自己的类中** 独立迭代器和内部迭代器都有多种不同的数据集同时进行迭代的方法。由于内部类迭代器可以知道访问包含ADT数据的结构，因此运行更快，通常也更好。
 ## ListIterator接口
 listIterator接口含有九个方法，包括Iterator说明的三个方法。这些方法是：hasNext、hasPrivious、next、previous、next Index、previous Index、add、remove、set。
 **hasPrevious()方法**检查迭代器是否已经完成遍历并到达数据集中第一个元素之前。
 **previous()方法** 提取线性表中前一个元素并将迭代向后移动一个元素。
 **nextIndex()方法** 取得当前（下一个）元素的索引。
 **previousIndex()方法**  取得当前元素上一个元素的索引。
 **add()方法** 向线性表插入元素，插入位置在next()可能返回的元素之前，previous()函数可能返回的元素之后。插入之后，调用privious()将返回新的元素，在调用next()将与插入前的行为一样。此外，插入使nextIndex()和previousIndex()将返回的值增1。
 **set()方法** 替换线性表中由next()或previous()刚返回的最后一个元素
## List接口
java.util.List接口扩展了Iterable接口，因此它具有iterator方法。另外，List还神明了乳香迭代器有关的方法：

    public ListIterator<T> listIterator(int index);
    public ListIterator<T> listIterator();
每个listIterator方法都返回一个迭代器，其方法指定在ListIterator中。由listIterator的第一个版本返回迭代器从由index指定的线性表元素开始，其中零表示线性表的第一个元素。该方法得第二个版本的效果与listIterator(0)的相同。
*由于java.util包的ArrayList、LinkedList和Vector实现了List接口，因此他们具有这两个listIterator方法和iterator方法。
