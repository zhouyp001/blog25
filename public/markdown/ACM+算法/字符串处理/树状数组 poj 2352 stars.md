题目描述：

Stars

| **Time Limit:** 1000MS       |      | **Memory Limit:** 65536K |
| ---------------------------- | ---- | ------------------------ |
| **Total Submissions:** 53181 |      | **Accepted:** 22886      |

Description

Astronomers often examine star maps where stars are represented by points on a plane and each star has Cartesian coordinates. Let the level of a star be an amount of the stars that are not higher and not to the right of the given star. Astronomers want to know the distribution of the levels of the stars. 

![img](http://poj.org/images/2352_1.jpg)


For example, look at the map shown on the figure above. Level of the star number 5 is equal to 3 (it's formed by three stars with a numbers 1, 2 and 4). And the levels of the stars numbered by 2 and 4 are 1. At this map there are only one star of the level 0, two stars of the level 1, one star of the level 2, and one star of the level 3. 

You are to write a program that will count the amounts of the stars of each level on a given map.

Input

The first line of the input file contains a number of stars N (1<=N<=15000). The following N lines describe coordinates of stars (two integers X and Y per line separated by a space, 0<=X,Y<=32000). There can be only one star at one point of the plane. Stars are listed in ascending order of Y coordinate. Stars with equal Y coordinates are listed in ascending order of X coordinate. 

Output

The output should contain N lines, one number per line. The first line contains amount of stars of the level 0, the second does amount of stars of the level 1 and so on, the last line contains amount of stars of the level N-1.

Sample Input

```html
5
1 1
5 1
7 1
3 3
5 5
```



Sample Output

```html
1
2
1
1
0
```



题目大意：所有点在笛卡尔坐标内，先输入点的数量N，然后已y坐标从小到大的顺序输入点的x,y坐标，要求将这些坐标分层，x<=x1&&y<=y1,的(x,y)在（x1,y1)的下面，计算(x,y)下面坐标的个数该点的层次，输出每一层点的数量，从第一层开始。只有每一个点的坐标都是唯一的，没有重叠的点。

题目分析：因为输入是按照y坐标的顺序输入，所以我们输入之后只要考虑x，计算小于x的元素的个数，我们可以用一个数组，记录c[x],每一次，查询就计算下标小于等于x的前面元素的和。这就可以用树状数组解决了，每一次输入进行更新。

```cpp
#include<cstdio>
#include<cstring>
using namespace std;
const int maxn=32005;
int level[maxn],cn[maxn];//level记录每层元素个数，cn树状数组，记录前缀和
int sum(int n)//查询n下标前面元素个数和
{
    int sum=0;
    while(n>0)
    {
        sum+=cn[n];
        n-=n&(-n);
    }
    return sum;
}
void add(int n)//更新树状数组n下标元素
{
    while(n<=maxn)
    {
        cn[n]++;
        n+=n&(-n);
    }
}
int main()
{
    int i,m,x,y;
    while(scanf("%d",&m)!=EOF)
    {
        memset(level,0,sizeof(level));
        memset(cn,0,sizeof(cn));
        for(i=0;i<m;i++)
        {
            scanf("%d%d",&x,&y);
            x++;//树状数组从1开始，因为笛卡尔坐标有0元素
            level[sum(x)]++;//更新对应层元素个数
            add(x);
        }
        for(i=0;i<m;i++)
            printf("%d\n",level[i]);
    }
    return 0;
}
```

