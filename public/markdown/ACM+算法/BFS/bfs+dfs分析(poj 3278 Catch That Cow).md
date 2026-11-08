题目详情

**Catch That Cow**

| **Time Limit:** 2000MS        |      | **Memory Limit:** 65536K |
| ----------------------------- | ---- | ------------------------ |
| **Total Submissions:** 115430 |      | **Accepted:** 36066      |

**Description**

Farmer John has been informed of the location of a fugitive cow and wants to catch her immediately. He starts at a point *N* (0 ≤ *N* ≤ 100,000) on a number line and the cow is at a point *K* (0 ≤ *K* ≤ 100,000) on the same number line. Farmer John has two modes of transportation: walking and teleporting.

\* Walking: FJ can move from any point *X* to the points *X* - 1 or *X* + 1 in a single minute
\* Teleporting: FJ can move from any point *X* to the point 2 × *X* in a single minute.

If the cow, unaware of its pursuit, does not move at all, how long does it take for Farmer John to retrieve it?

**Input**

Line 1: Two space-separated integers: *N* and *K*

**Output**

Line 1: The least amount of time, in minutes, it takes for Farmer John to catch the fugitive cow.

**Sample Input**

```sio
5 17
```

**Sample Output**

```sio
4
```

**Hint**

The fastest way for Farmer John to reach the fugitive cow is to move along the following path: 5-10-9-18-17, which takes 4 minutes.

**解题思路**：刚开始看这个题目的时候我首先想到的是dfs，可能因为dfs递归比较好用，而且发现倒过来从牛到人要好弄，因为是奇数还是偶数，会影响搜索路口。奇数的话一定是从加减过来的，而偶数如果要加减的话，就要一次执行两次加减才能再次除二，而且如果执行两次减再除和执行一次除再减一次效果一样后者更加优，加也一样。另外还有一种就是连加减两次以上和先除一次可能会出现歧义，所以增加了一次判断每次执行除2都与n-k相比较。我们将边界设置为n>=k，因为当n>k时，我们执行除法和减法都会越来越远，就只能连加n-k次；当n==k时，也就是catch的时候了。所以我就写了下面的代码，下面的代码是不行的。

```cpp
#include<cstdio>
#include<cstring>
#include<algorithm>
using namespace std;
int dfs(int n,int k)
{
    if(n>=k)
        return n-k;
    if(k%2==0)
        return min(k-n,dfs(n,k/2)+1);
    else
        return min(dfs(n,k+1),dfs(n,k-1))+1;
}
int main()
{
    int n,k,result=0;
    scanf("%d%d",&n,&k);
    printf("%d\n",result+dfs(n,k));
    return 0;
}
```

找了好久，都没有找到错误的，都找不到re的原因，后来我放弃了dfs。dicuss里面都是用的bfs。

bfs很简单，就是一个队列记录走的坐标和走的步数，然后进行层次遍历，当找到牛所在的地方就结束，这样就不会出现dfs那中没有尽头的路，或者总很长才发现不是最短的那条路，在一些特殊情况面前就要更加节约时间。

```cpp
#include<iostream>
#include<cstring>
using namespace std;
int n,k;
struct
{
    int n;
    int level;
}du[100005];//辅助dfs的队列，n表示人走到的坐标，level表示已经走的步数
int vis[100005];//标记数组，避免重复走相同的坐标
int front,rear;
int bfs(int n)
{
    int level;
    memset(vis,0,sizeof(vis));
    vis[n]=1;
    front=rear=-1;
    rear++;//入队操作，将第一个坐标入队
    du[rear].n=n;
    du[rear].level=0;
    while(rear!=front)
    {
        front++;//出队操作
        n=du[front].n;
        level=du[front].level;
        int m;
        for(int i=0;i<3;i++)//向三个方向走
        {
            switch(i)
            {
                case 0:m=n+1;break;
                case 1:m=n-1;break;
                case 2:m=n*2;break;
            }
            if(m>0&&m<100005&&!vis[m])
            {
                rear++;//入队操作
                du[rear].n=m;
                du[rear].level=level+1;
                vis[m]=1;
                if(m==k)return level+1;//判断是否能catch
            }
        }
    }
    return 0;
}
int main()
{
    cin>>n>>k;
    if(n>=k)
        cout<<n-k<<endl;//判断n>k，大于则直接减法走完
    else
        cout<<bfs(n)<<endl;
    return 0;
}
```

后来我翻看discuss中发现有人说0的情况，然后我试了一下，我前面那个dfs的方法是真的不行，于是我开始模拟0的情况，我发现0时dfs就是那种没有尽头的情况。原来其它任何元素都是有多个方法走到的，但是0，却只能通过1减过来，但是在我们第二个return的时候我们判断k+1和k-1的时候dfs会把两种情况都走完才能得到return值，因此k+1时永远也走不到0的，于是我改了一下代码，就过了。

```cpp
#include<cstdio>
#include<cstring>
#include<algorithm>
using namespace std;
int dfs(int n,int k)
{
    if(n>=k)
        return n-k;
    if(k%2==0)
        return min(k-n,dfs(n,k/2)+1);
    else
        return min(dfs(n,k+1),dfs(n,k-1))+1;
}
int main()
{
    int n,k,result=0;
    scanf("%d%d",&n,&k);
    if(n==0)
        n=result=1;
    printf("%d\n",result+dfs(n,k));
    return 0;
}
```