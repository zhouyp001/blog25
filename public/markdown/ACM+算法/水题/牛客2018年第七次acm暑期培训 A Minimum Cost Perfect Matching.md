链接：https://www.nowcoder.com/acm/contest/145/A
来源：牛客网

Minimum Cost Perfect Matching

时间限制：C/C++ 1秒，其他语言2秒
空间限制：C/C++ 262144K，其他语言524288K
Special Judge, 64bit IO Format: %lld

## 题目描述

You have a complete bipartite graph where each part contains exactly n nodes, numbered from 0 to n - 1 inclusive.

The weight of the edge connecting two vertices with numbers x and y is ![img](https://uploadfiles.nowcoder.com/files/20180809/305336_1533786786948_equation?tex=x%20%5Cwedge%20y) (bitwise AND).

Your task is to find a minimum cost perfect matching of the graph, i.e. each vertex on the left side matches with exactly one vertex on the right side and vice versa. The cost of a matching is the sum of cost of the edges in the matching.

![img](https://uploadfiles.nowcoder.com/files/20180809/305336_1533786786949_equation?tex=%5Cwedge) denotes the bitwise AND operator. If you're not familiar with it, see {https://en.wikipedia.org/wiki/Bitwise_operation#AND}.

## 输入描述:

```html
The input contains a single integer n (1 ≤ n ≤ 5 * 105).
```
## 输出描述:

```html
Output n space-separated integers, where the i-th integer denotes pi (0 ≤ pi ≤ n - 1, the number of the vertex in the right part that is matched with the vertex numbered i in the left part. All pi should be distinct.

Your answer is correct if and only if it is a perfect matching of the graph with minimal cost. If there are multiple solutions, you may output any of them.
```

示例1

## 输入

```html
3
```

## 输出

```html
0 2 1
```

## 说明

```html
For n = 3, p0 = 0, p1 = 2, p2 = 1 works. You can check that the total cost of this matching is 0, which is obviously minimal.
```

```cpp
#include<cstdio>
#include<algorithm>
using namespace std;
const int MAXN=500100;
int d[MAXN];
int c[20];
int main()
{
    int n,i,j;
    c[0]=1;
    for(int i=0;i<20;i++)
    {
        c[i+1]=2<<i;
    }
    scanf("%d",&n);
    int p=upper_bound(c,c+20,n-1)-c;
    if(p!=0)p--;
    for(int i=n-1;i>=0;i--)
    {
        if(i!=0&&d[i]==0)
        {
            while(i<c[p])p--;
            d[i]=2*c[p]-i-1;
            d[2*c[p]-i-1]=i;
        }
    }
    for(int i=0;i<n-1;i++)
        printf("%d ",d[i]);
    printf("%d\n",d[n-1]);
    return 0;
}
```