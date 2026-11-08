题目详情：

## 会场安排问题

时间限制：3000 ms  |  内存限制：65535 KB

**描述**

学校的小礼堂每天都会有许多活动，有时间这些活动的计划时间会发生冲突，需要选择出一些活动进行举办。小刘的工作就是安排学校小礼堂的活动，每个时间最多安排一个活动。现在小刘有一些活动计划的时间表，他想尽可能的安排更多的活动，请问他该如何安排。

**输入**

第一行是一个整型数m(m<100)表示共有m组测试数据。
每组测试数据的第一行是一个整数n(1<n<10000)表示该测试数据共有n个活动。
随后的n行，每行有两个正整数Bi,Ei(0<=Bi,Ei<10000),分别表示第i个活动的起始与结束时间（Bi<=Ei)

**输出**

对于每一组输入，输出最多能够安排的活动数量。
每组的输出占一行

**样例输入**

```html
2
2
1 10
10 11
3
1 10
10 11
11 20
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

**样例输出**

```html
1
2
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

**解题思路：**先将数据进行排序，根据时间段的结束时间从小到大安排，然后根据开始时间从大到小安排，最后从序列中找到第一个时间段，再将一天的开始时间设置为前面那段时间的结束时间，再找下面的时间段，知道所有的时间段都找完。

```cpp
#include<iostream>
#include<algorithm>
#include<vector>
using namespace std;
const int MAXN=1e4+10;
struct Time
{
    int b,e;
};
bool operator<(Time a,Time b){
    if(a.e==b.e)
        return a.b>=b.b;
    return a.e<b.e;
}
int main()
{
    ios::sync_with_stdio(false);//关闭同步，节约时间
    int m,n,i,count,first;
    cin>>m;
    while(m--){
        cin>>n;
        vector<Time> t(n);
        for(i=0;i<n;i++){
            cin>>t[i].b>>t[i].e;
        }
        sort(t.begin(),t.end());
        first=-1;i=0;count=0;
        while(i<n){
            if(t[i].b>first){
                count++;
                first=t[i].e;
            }
            i++;
        }
        cout<<count<<endl;
    }
    return 0;
}
```

