题目描述：

**Dungeon Master**

| Time Limit: 1000MS       | Memory Limit:65536K |
| ------------------------ | ------------------- |
| Total Submissions: 46622 | Accepted:17566      |

**Description**

You are trapped in a 3D dungeon and need to find the quickest way out! The dungeon is composed of unit cubes which may or may not be filled with rock. It takes one minute to move one unit north, south, east, west, up or down. You cannot move diagonally and the maze is surrounded by solid rock on all sides. 

Is an escape possible? If yes, how long will it take? 

**Input**

The input consists of a number of dungeons. Each dungeon description starts with a line containing three integers L, R and C (all limited to 30 in size). 
L is the number of levels making up the dungeon. 
R and C are the number of rows and columns making up the plan of each level. 
Then there will follow L blocks of R lines each containing C characters. Each character describes one cell of the dungeon. A cell full of rock is indicated by a '#' and empty cells are represented by a '.'. Your starting position is indicated by 'S' and the exit by the letter 'E'. There's a single blank line after each level. Input is terminated by three zeroes for L, R and C.

**Output**

Each maze generates one line of output. If it is possible to reach the exit, print a line of the form 

> Escaped in x minute(s).


where x is replaced by the shortest time it takes to escape. 
If it is not possible to escape, print the line 

> Trapped!

**Sample Input**

```sio
3 4 5
S....
.###.
.##..
###.#

#####
#####
##.##
##...

#####
#####
#.###
####E

1 3 3
S##
#E#
###

0 0 0
```

Sample Output

```sio
Escaped in 11 minute(s).
Trapped!
```

**Description - 题目描述**
[NWUACM] 
你被困在一个三维的空间中,现在要寻找最短路径逃生！
空间由立方体单位构成
你每次向上下前后左右移动一个单位需要一分钟
你不能对角线移动并且四周封闭
是否存在逃出生天的可能性？如果存在，则需要多少时间？
**Input - 输入**
　　输入第一行是一个数表示空间的数量。
　　每个空间的描述的第一行为L，R和C（皆不超过30）。
　　L表示空间的高度。
　　R和C分别表示每层空间的行与列的大小。
　　随后L层地牢，每层R行，每行C个字符。
　　每个字符表示空间的一个单元。'#'表示不可通过单元，'.'表示空白单元。你的起始位置在'S'，出口为'E'。
　　每层空间后都有一个空行。L，R和C均为0时输入结束。
**Output - 输出**
　　每个空间对应一行输出。
　　如果可以逃生，则输出如下
    Escaped in x minute(s).
　　x为最短脱离时间。
　　如果无法逃生，则输出如下

​    Trapped!

**解题思路**：这个题目一看就是一个广度优先搜索的题目，就像迷宫求解那样搜索，只是这个题目从迷宫的二维变成了三维，搜索的方向就从以前的四个变成了六个，方法还是一样的。我写了两个函数，path是通过搜索将数据纪录在队列数组中，然后result函数向前面跳，跳到入口位置就是最短路径了。其实也可以通过在队列数组中放一个记步变量，直接获取最短路径长度。

```cpp
#include<iostream>
#include<cstring>
using namespace std;
typedef struct
{
    int pre;//指向它的上一个元素，路径上的前驱
    int l,r,c;
} que;
int front,rear;
int r,c,l;
int li,ri,ci;//入口数据
char dungeon[32][32][32];
que qu[30*30*30];//队列数组
int path(int li,int ri,int ci)
{
    int i,j,k,di;
    front=rear=-1;
    rear++;
    qu[rear].l=li;qu[rear].r=ri;
    qu[rear].c=ci;qu[rear].pre=-1;

    while(front!=rear)
    {
        front++;
        i=qu[front].l;j=qu[front].r;
        k=qu[front].c;

        for(di=0;di<6;di++)//分别向六个方向搜索
        {
            switch(di)
            {
                case 0:i=qu[front].l-1;j=qu[front].r;k=qu[front].c;break;
                case 1:i=qu[front].l+1;j=qu[front].r;k=qu[front].c;break;
                case 2:i=qu[front].l;j=qu[front].r-1;k=qu[front].c;break;
                case 3:i=qu[front].l;j=qu[front].r+1;k=qu[front].c;break;
                case 4:i=qu[front].l;j=qu[front].r;k=qu[front].c-1;break;
                case 5:i=qu[front].l;j=qu[front].r;k=qu[front].c+1;break;
            }
            if(dungeon[i][j][k]=='E')//如果是出口，将出口入队（便于计算步数），返回true
            {
                rear++;
                qu[rear].l=i;qu[rear].r=j;
                qu[rear].c=k;qu[rear].pre=front;
                return true;
            }
            if(dungeon[i][j][k]=='.')//如果走的通就入队
            {
                rear++;
                qu[rear].l=i;qu[rear].r=j;
                qu[rear].c=k;qu[rear].pre=front;
                dungeon[i][j][k]='#';
            }
        }
    }
    return false;
}
int result()//得到路径
{
    int i=qu[rear].pre,res=0;
    while(i!=-1)
    {
        res++;
        i=qu[i].pre;
    }
    return res;
}
int main()
{
    int i,j,k;
    while(cin>>l>>r>>c&&(r||l||c))
    {
        for(i=0;i<l;i++)
        for(j=0;j<r;j++)
        for(k=0;k<c;k++)
        {
            cin>>dungeon[i][j][k];
            if(dungeon[i][j][k]=='S')//找到入口，纪录入口位置
            {
                li=i;ri=j;ci=k;
            }
        }
        if(path(li,ri,ci))
            cout<<"Escaped in "<<result()<<" minute(s)."<<endl;
        else
            cout<<"Trapped!"<<endl;
    }
    return 0;
}
```

