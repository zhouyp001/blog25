文档下载路径（内含源码）[点击打开链接](http://t.cn/RrMS0Tv)


# stl总结

## 迭代器

输出迭代器：！=，++，*first（只实现输出）操作。OutputIterator

输入迭代器：*first（实现输入），++。InputIterator

向前迭代器：包括输出、输出迭代器的所有操作，有类似指针的++操作。ForwardIterator

双向迭代器：包括前向迭代器的操作，有类似指针的—操作。

随机访问迭代器：包括双向迭代器的操作，然后还满足下列操作

对整数的加减法，以r+n，n+r和r-n表示。

使用表达式r[n]访问第n个元素，其含义为*(r+n)。

双向“跳转”，以r+=n和r-=n表示。

迭代器减法，以r-s表示，其结果为整数值。

比较，以r<s、r>s、r<=s、r>=s表示，其结果为布尔值。

插入迭代器：插入迭代器可将类书算法转入到“插入模式”，意味着表达式*i=…的意义将不在是将i处的对象改写，而是在该位置执行插入操作，这种操作是通过容器的某个插入成员数实现的。STL提供了3种类型的插入迭代器：

back_insert_iterator<Container> 使用了Container的push_back成员函数。

Front_insert_iterator<Container> 使用了Container的push_front成员函数。

Insert_iterator<Container> 使用了Container的insert成员函数。

copy(deque1.begin(),deque1.end(),vector1.begin());//ERROR

*(vector1())=*(deque1.begin())//会产生运行错误

copy(deque1.begin(),deque1.end(),back_insert_iteraror<vector<int>>(vector1))//AC

附：

template<typename Container>

inline back_insert_iterator<Container>back_inserter(Container&x){

return back_insert_iterator<Container>(x);}

这样就可以：copy(deque1.begin(),deque1.end(),back_inserter(vector1));

流迭代器：istream_iterator类提供输入迭代去，ostream_iterator类提供输出迭代器。

常量迭代器和可变迭代器：根据运算符*返回的结果是指针还是常量指针分别。如果是指针就可以对*vector1执行*vector=…操作，如果是常量就不能。例：vector<int>：：const_iterator;

 

迭代器的分类：

<img src="img/2019071501.png" style="width:1000px">

## 类属算法

STL基本算法组织

原地形式和复制形式：

原地形式：sort(&a[0],a[1000]);

复制形式：reverse_sort(&a[0],&a[1000],&b[0]);

**具有函数参数的算法：**sort(&a[0],&a[1000],greater<int>());

利用了模板参数greater的默认构造函数创建一个函数对象greater<int>(),并把它作为二元判断函数传给类属算法sort，一边对数组按升序排序

find(InputIterator first,InputIterator last,constT&value);

find_if(InputIterator first,InputIterator last,Predicatepred);

非可变序列算法：

**find:**线性时间复杂度

class GreaterThan50{public:bool operator()(intx)const{return x>50;}};

vector<int>::iterator wherefind_if(vector1.begin(),vector1.end(),GreaterThan50());

**adjacent_find:**线性时间复杂度

在序列中查找相邻且相等的两个元素，找到时返回只想两个元素中第一个迭代器。

deque<string> play[5];...deque<string>::iteratori;

i=adjacent_find(play.begin(),play.end());

**count:**线性时间复杂度

在序列中查找等于某个给定值的元素的个数。

int final_count=count(&a[0],&a[9],1);

final_count=count_if(&a[0],&a[9],bind2nd(not_equal_to<int>(),1);

通过二元判断函数not_equal_to<int>和1作为参数传递给函数适配器band2nd,创建count_if一元判断函数。not_...和ban…定义在functional中。

**for_each:**线性时间复杂度

对序列中的每一个元素施加由函数f指定的操作。

void print_list(string s){cout<<s<<endl;}

list<string> dlist;....

for_each(dlist.begin(),dlise.end(),print_list);

**mismatch&equal**:线性时间复杂度

比较容器中两个区间内元素。equal如果相等返回true，反之返回false。mismatch的返回值是两个迭代器first1+i和first2+i组成的一个pair，表示第一个不想等元素的位置。如果相等返回last1和first2+(last1-first1).

equal(deq.begin(),deq.end(),list1.begin());

pair<deque<string>::iterator,list<string>::iterator>

pair=mismatch(deq.begin(),deq.end(),list1.begin());

**search:**时间复杂度O(n+m)

给定两个迭代器区间，将后一个迭代器区间内的对象作为子序列，并在前一个区间内查找出现该子序列的第1个位置。

Vector<int>::iterator K=

search(vector1.begin(),vector1.end(),deque1.begin(),deque1.end());

可变序列算法

**copy&copy_backward**:

作用是将容器中的内容从一个区间复制到另一个区间。

copy(first1,last1,first2);将[first1,last1-1]中的内容复制到[first2,last2]中，并返回last2。该算法是向前处理即不改变原来的顺序，copy_backward算法则相反。

**fill&fill_n**:具有线性时间复杂度。

fill将某个值复制到某一区间的所有位置中,fill_n则是将某个值复制到某一区间的前n个位置中。

fill(first,last,value);fill_n(first,n,value);

**generate**：具有线性时间复杂度。

连续调用gen函数last-first次，并用该函数的返回值来填充[first,last]。

Template<typename T> class calc_square{TI;public:calc_square():i(0){} 

T operator()(){++I;return i*i;}};

generate(vector1.begin(),vector1.end(),calc_square<int>());

**partition&stable_partition**:具有时间复杂度。

partition对于给定区间[first,last]和一个一元判断函数pred，它可以对该区间重新排序，以使所有满足判断函数pred的元素排在所有不满足pred的元素前面。

stable_partition类似partition功能，并且可以使分类后的两部分保持原来的相对位置。

Bool above40(int n){return(n>40);}

int*split=partition(&array1[0],&array1[N],above40);

split=stable_partition(&array1[0],&array1[N],above40);

**random_shuffle**:具有线性时间复杂度。

利用能够产生伪随机数的函数，对区间[first,last]中的元素混洗顺序后重新排列。

random_shuffle(vector1.begin(),vector1.end());

另外还有一种形式有三个参数，第三个参数是一个函数，这个函数提供不同的随机数发生器。

**remove**:具有线性时间复杂度。

从一个区间中删除所有等于某个特定值的元素，并且删除后其它元素的相对位置保持不变。

vector<int>::iterator new_end=move(vector.begin(),vector.end(),0);

**replace**:具有线性时间复杂度。

把一个区间中所有等于某一特定值的元素用另一个值替换。

replace(vector1.begin(),vector1.end(),’R’,’S’);

**reverse**:具有线性时间复杂度。倒转区间元素的排列顺序。

**rotate**:具有线性时间复杂度。

对区间内的元素进行循环移动操作。

rotate(first,middle,last);作用是将[first,last]区间内的元素循环左移middle-first个位置。函数返回后，原来[middle,last]中的元素将出现在区间[first,first+k]中，k=last-middle;而原来在[first,middle]中的元素将出现在区间[first+k,last]中，rotate算法的参数必须是双向迭代器。

**swap:**具有常量时间复杂度。

对两个值进行交换。swap(vector1,vector2);

**swap_ranges**:具有线性时间复杂度。

交换两个区间中的值，两个区间可以在不同的容器中。

swap_ranges(first1,last1,first2);表示将[first1,last1]与[first2,first2-(last1-first1)]替换，规定两个区间不可以重叠。

**transform**:具有线性时间复杂度。

将某个函数作用到某一区间内的每一个元素上，并将该函数返回的结果保存到另一个区间中。该算法有两种形式：一种采用的是一元函数，作用到区间中的每个元素上；另一种是二元函数，同时作用到两个区间中相互对应的元素上。

int sum(int val1,int val2){return val2+val1;}

ostream_iterator<int> out(cout,” “);

transform(&array1[0],&array[5],&array2[0],out,sum);

**unique**:具有线性时间复杂度。

从输入序列中去掉所有有相邻的重复元素，对序列受那个的若干个相邻且相等的元素中只保留第一个元素。并且不改变容器内原来的元素相对位置和大小，变小后的区间将返回该区间的末尾迭代器。

vector<int>::iteratornew_end=unique(vector1.begin(),vector1.end());

 

排序相关的算法

**sort&stable_sort&partial_sort**

三种算法都是对随机访问序列排序，排序后的结果仍然保存在他们操作的容器中。

sort需要对数的额外储存空间，partial_sort需要常量额外储存空间，stable需要线性额外储存空间。

sort对长度为N的序列排序所用的平均比较次数为O(NlogN),但允许最坏O(N*N)。

partial_sort可以确保时间复杂度为O(NlogN).

stable_sort时间复杂度也为O(NlogN)，最坏的情况下O(N(logN)*(logN))。

sort和partial_sort都不要求保持相等元素的相对位置。stable_sort则可以保持。

**nth_element**:时间复杂度是线性的，最坏的情况下将减少到二次。

实现分割，使分割后左边的元素小于或等于右边的元素。

nth_element(v.begin(),v.begin()+N,v.end());

**binary_search&lower_bound&upper_bound&equal_range**:

对于给定的区间[first,last]和元素x,如果存在x，对于binary_search返回真，lower_bound,upper_bound则返回一个迭代器i,分别指向x的第一个位置和最后一个位置的后一个位置。equal_range则是结合了lower_bound和upper_bound返回两个迭代器。

Pair<vector<int>::iterator,vector<int>::iterator>pi=equal_range(v.begin(),v.end(),7);

**merge**:具有线性四件复杂度

合并两个有序区间，并把结果保存到另一个和两个输入区间均不重叠的区间。Inplace_merge则是将合并后的序列代替两个区间原来的序列，它的时间复杂度依赖可用的额外存储空间，如果没有额外的储存空间则时间复杂度是O(NlogN)。

merge(vector1.begin(),vector1.end(),vector2.begin(),vector2.end(),vector3.begin());

集合操作和有序结构

**Includes&set_union&set_intersection&set_difference&set_symmetric_difference**:

Includes检测区间[first1,last1]中的元素是否全部包含在另一个区间中[first2,last2]并返回一个真值。

boolresult=includes(vector1.begin(),vector1.end(),vector2.begin(),vector2.end());

set_union对两个区间的并集保存在区间[result,last]中，并返回last。

Vector<char> setUnion;

set_union(vector1.begin(),vector1.end(),vector2.begin(),vector2.end(),back_inserter(setUnion));

set_difference得到一个集合这个集合中的元素属于第一个区间但是不属于第二个区间。

set_intersection得到两个输入序列的交集。

set_symmetric_difference该集合仅属于两个集合中的一个，而不包含交集。

和set_union算法一样将结果保存在result集合中。

堆操作

堆：first所指向的元素是区间中的最大元素。可以通过pop操作删除first指向的元素，push操作向序列中插入元素，两种操作时间复杂度是对数，返回值仍然是一个堆。

**make_heap&pop_heap&push_heap&sort_heap**:

make_heap利用[first,last]中的元素构造一个堆，并保存在原区间中。算法的时间复杂度是线性的，最多需要3N次比较。

push_heap假定[first,last-1]中已经包含了一个堆，该算法是把[first,last]重新整理为一个堆（从而把last-1位置上的元素压入堆中）。

pop_heap假定[first,last]中已经包含了一个堆，该算法作用就是将first位置上的值和last-1位置上的值交换，然后把[first,last-1]整理为一个堆。pop和push时间复杂度都是O(NlogN)。

sort_heap作用是堆储存在堆中的元素进行排序。算法的时间复杂度是O(NlogN)。

 

最小值和最大值

**min&max&min_element&max_element**

min和max分别以两个元素作为参数，返回相应的值。min_element和max_element返回指向输入序列中最小和最大的迭代器。

vectord<int>::iterator k=max_element(vector1.begin(),vector1.end());

**词典序比较**

如果e1<e1返回true,否则返回false.

bool result=

lexicographical_compare(vector1.begin(),vector1.end(),vector2.begin(),vector2.end());

**排列生成器**：

next_permutation按字典序将序列变换为下一个排列；

prev_permutation变换为前一个排序。

通用数值算法

**accumulate**计算给定区间中值的累加和。

累加：int result=accumulate(&x[0],&x[20],0);

累积：result=accumulate(&x[0],&x[5],1,multiplies<int>());

**partial_sum**计算和前t项和的序列保存在原序列中，也可以保存在另一序列中。

partial_sum(&x1[0],&x1[N],&x1[0]);partial_sum(&x1[0],&x1[N],&x2[0]);

**adjacent_differencej**计算n项与n-1项只差。

**inner_produc**t计算输入序列的内积。

1*2+2*3+3*4…

int result=inner_product(&x1[0],&x1[N],&x2[0],0);

(1+2)*(2+3)*…

intresult=inner_product(&x1[0],&x1[N],&x2[0],1,multiplies<int>(),plus<int>());

## 序列容器

### 向量

构造序列

vector<T> ();//vector<T> vector1;

vector<T>(n,value);//vector<T>vector1(n,value);

vector<T>(n);//vector<T> vector1(n);

拷贝构造函数

vector<T> vector1(3);//其实是调用拷贝构造函数三次。

char name[]=”abc”;vector<char>George(name,name+2);

//使用拷贝构造函数，向其它向量中的任意区间拷贝数据。

插入

vector<char>::iteratori=vector1.begin();

vector2.push_back(*i);//使用push_back成员在序列尾端插入元素。

vector2.insert(vector2.begin();*i);//在vectoe2.begin()位置插入。

两者都具有常数时间复杂度。

Insert成员函数还可以向序列中插入元素的n个拷贝，或者另外一个序列的某个区间

vector1.insert(position,n,x);

vector1.insert(position,first,last);

insert成员函数的时间复杂度是线性的。

插入操作在内存重新分配的操作

vector1.capaciry();//返回当前所分配的内存快的大小。

vector1.reserve(n)//重新为vector1分配大于n的内存块。

删除

cout<<vectotor1.back();vector1.pop_back();//执行的操作先显示最后元素然后删除。

vector1.erase(vector1.begin());

vector<char>::iteratorj;vector1.erase(j--);vector1.erase(j,j+2);

//erase成员函数的几种形式。

//erase函数将使所有删除点之后的迭代去失效，但是删除点上和删除点之前的迭代去则没有影响。

//vector1.erase(j++);将无法工作。

访问器

iterator begin()    返回指向向量起始点的迭代器。

iteratorend()      返回指向向量末尾的迭代器。

iteratorrebgin()   返回指向向量起始点的反向迭代器，用来对向量进行反响遍历。

Iteratorrend()     返回指向向量末尾的反向迭代器，用来对向量进行反向遍历。

size_typesize()const       返回向量中的元素个数。

size_typemax_size()const   返回向量最多可以保存的元素的个数。

size_typecapacity()const   返回向量中可以保存的元素的个数。

boolempty()const           如果向量中没有元素，则返回真，否则返回假。

referencefront()           返回向量中的第一个元素的引用。

referenceback()            返回向量中的最后一个元素的引用。

referenceoperator[ ](size_type n)返回向量中第n个元素的引用。

referenceat(size_type n)       如果n在向量区间之内，则返回第n个元素的引用。

相等和小于的关系

等于==：两个容器中的序列必须大小相等。根据定义在元素类型上的==操作，对应位置上的元素必须相等。

//a==b的定义为：a.size()=b.size()&&equal(a.begin(),a.end(),b.begin());

小于<:对于任意两个相等类型的容器a和b，如果其元素类型是T，而且<是定义在T上的严格弱序关系，则定义a<b为：

lexicographical_cimpaare(a.begin(),a.end(),b.begin(),b.end());

其它的关系操作(>,<=,>=)都是根据<定义的。

赋值

STL对所有容器都定义了赋值运算符=。赋值后x==y成立。操作的时间复杂度是O(N),N=max(x.size(),y.size())。

模板成员函数assign: 

template<typenameInputIterator>

voidassign(InputIterator first,InputIterator last);

功能上，该函数和下面的语句是等价的：

erase(begin(),end());

insert(begin(),first,last);

swap成员函数用来交换两个容器的内容。

vector1.swap(vector2)的作用是互换vector1和vector2中的值。

具有常数的时间复杂度。

### 双端队列

双端队列的操作和向量的操作大部分是类似的。区别主要体现在一下两点：

第一点是性能在非末端的删除插入操作都优于向量，insert操作的时间复杂度是哈如点到最近的序列断点的距离成正比。还有还提供了push_front和pop_front成员，时间复杂度是常数。

第二点是插入操作没有reserve，capacity成员函数，插入操作可能使迭代器永久失效。

第三点是没有访问器capacity。

### 链表

链表和前面两个容器有一定的区别：其任意位置插入删除操作时间复杂度都是常数。插入操作不会使任何迭代器失效，删除操作只会使被删除元素的迭代器失效。

倒转操作：reverse类属算法仍然可以用，但是时间开销就比较大。因此它提供了反向链接链表操作list1.reverse();

插入操作：push_back和push_front和insert。

删除操作：erase并且erase(j++)是成立的。

拼接操作：spllice无论涉及多少元素它的时间复杂度都是常数。

list1.splice(i1,list2),其中i1是list1的一个有效迭代器。该函数的作用是把list2的内容插入到i1前面，在插入完成后list2为空链表。list1和list2不可以是相同的链表。

list1.splice(i1,list2,i2)，其中i1是list1的一个有效迭代器，i2是list2的一个可引用的有效迭代器。该函数的作用是删除i2所引用的元素，并把该元素插入到list1中的i1前面。list1和list2可以是相同的链表。

list1.splic（i1，list2，i2，j2），其中i1是list1的一个有效迭代器，[i2,j2]是list2中的一个有效区间。该函数的作用是删除i2和i1中间的元素，并把这些元素插入到list1中的i1前面。list1和list2可以是相同的链表。

其中前面两种形式的splice函数的时间复杂度是常数。如果list1和list2是相同的链表，则第三种形式的时间复杂度是常数，否则其时间复杂度为线性。

排序相关的算法：

类属算法sort需要随机访问迭代器，因此该算法不能用于链表。但是我们可以利用链表的sort成员函数来对链表进行排序。

list1.sort();

另外还有一种删除链表中相邻重复元素的成员函数。

list.unique();

sort成员函数还有一种形式，可以使用给定的比较函数进行排序：

template<typenameCompare>

voidsort(Compare comp);

unique成员函数也有一种形式，可以用给定的二元判决函数对相邻元素进行比较。这些成员函数与类属算法的不同之处在于采用了重新链接的方式而不是赋值的方式进行

template<typenameBinaryPredicate>

voidunique(BinaryPredicate comp);

mere:将当前链表与另一个链表合并，其中假定两个链表都是有序的。

void merge(constlist<T>&otherList);

template<typenameCompare>

void merge(constlist<T>&otherList,Compare comp);

清除：

remove：作用是删除链表中等于某个给定值或满足某个判决函数的所有元素。

voidremove(const T&value);

template<typenamePredicate>

voidremove_if(Predicate pred);

与其它序列类属算法不同，链表的remove成员函数会减小链表的大小，其减小的数量等于删除元素的个数。

访问器：除了capacity、operator[]和at，链表类提供了所有向量类所提供的容器访问器。

相等和小于关系：和向量一样。

赋值：也有相同的定义，复杂度也相同。