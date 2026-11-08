poj2823----sliding window单调队列_优先队列入门题

**Sliding Window**

| **Time Limit:** 12000MS      |      | **Memory Limit:** 65536K |
| ---------------------------- | ---- | ------------------------ |
| **Total Submissions:** 71411 |      | **Accepted:** 20312      |
| **Case Time Limit:** 5000MS  |      |                          |

**Description**

An array of size *n* ≤ 106 is given to you. There is a sliding window of size *k* which is moving from the very left of the array to the very right. You can only see the *k* numbers in the window. Each time the sliding window moves rightwards by one position. Following is an example: 
The array is [1 3 -1 -3 5 3 6 7], and *k* is 3.

| Window position           | Minimum value | Maximum value |
| ------------------------- | ------------- | ------------- |
| [1  3  -1] -3  5  3  6  7 | -1            | 3             |
| 1 [3  -1  -3] 5  3  6  7  | -3            | 3             |
| 1  3 [-1  -3  5] 3  6  7  | -3            | 5             |
| 1  3  -1 [-3  5  3] 6  7  | -3            | 5             |
| 1  3  -1  -3 [5  3  6] 7  | 3             | 6             |
| 1  3  -1  -3  5 [3  6  7] | 3             | 7             |

Your task is to determine the maximum and minimum values in the sliding window at each position. 

**Input**

The input consists of two lines. The first line contains two integers *n* and *k* which are the lengths of the array and the sliding window. There are *n* integers in the second line. 

**Output**

There are two lines in the output. The first line gives the minimum values in the window at each position, from left to right, respectively. The second line gives the maximum values. 

**Sample Input**

```sio
8 3
1 3 -1 -3 5 3 6 7
```

 

**Sample Output**

```sio
-1 -3 -3 -3 3 3
3 3 5 5 6 7</span>
```

 

 两个priority_queue<int>（优先队列）可以实现。用双端队列实现单调队列，同样可以实现。

初学者，由于第一次没有初始化mq.k一直wa，后来又rt，因为maxn定义了100。/xk

双端队列实现代码：没有优化，优化可能空间会更小，这样看着比较直观。

*求最小时，因为窗口滑动的时候，如果是“小  大    较小”这个样的，然后k的范围大于3，那么中间哪个大的数完全可以不要记录在里面。同样求最大时也是一样的。

```cpp
#include<iostream>
#include<deque>
#define maxn 1000006
using namespace std;
int a[maxn],ma[maxn],mi[maxn];
struct node
{
    int d;
    int i;
    node(int dd,int ii)
    {
        d=dd;
        i=ii;
    }
};
template <typename Item>struct monotone_queue
{
    std::deque<Item> data,ma;
    int k;
    void push(Item it)
    {
        while(!data.empty()&&data.back().i<=it.i-k)data.pop_back();
        while(!data.empty()&&data.front().d>it.d)data.pop_front();
        data.push_front(it);
        while(!ma.empty()&&ma.back().i<=it.i-k)ma.pop_back();
        while(!ma.empty()&&ma.front().d<it.d)ma.pop_front();
        ma.push_front(it);
    }
    void clear(){data.clear();}
    Item min(){return data.back();}
    Item max(){return ma.back();}
};
int main()
{

    //freopen("C:\\Users\\zhou\\Desktop\\1.in","r",stdin);
    //freopen("C:\\Users\\zhou\\Desktop\\1.out","w",stdout);
    monotone_queue<node> mq;
    int n,k;
    scanf("%d%d",&n,&k);
    mq.k=k;
    for(int i=1;i<=n;i++)
        scanf("%d",&a[i]);
    for(int i=1;i<k;i++)
        mq.push(node(a[i],i));
    int j=0;
    for(int i=k;i<=n;i++)
    {
        mq.push(node(a[i],i));
        mi[j]=mq.min().d;
        ma[j]=mq.max().d;
        j++;
    }
    for(int i=0;i<j-1;i++)
        printf("%d ",mi[i]);
    printf("%d\n",mi[j-1]);
    for(int i=0;i<j-1;i++)
        printf("%d ",ma[i]);
    printf("%d\n",ma[j-1]);
    return 0;
}
```

 