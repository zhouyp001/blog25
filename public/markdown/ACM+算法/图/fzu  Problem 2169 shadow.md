**Problem 2169 shadow**

### Accept: 425    Submit: 1666 Time Limit: 1000 mSec    Memory Limit : 32768 KB

## ![img](http://acm.fzu.edu.cn/image/prodesc.gif)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==) Problem Description

YL是shadow国的国王,shadow国有N个城市。为了节省开支,shadow国只有N-1条道路,这N-1条道路使得N个城市连通。某一年,shadow国发生了叛乱,叛军占领了多个城市,王都岌岌可危。王都为编号为1的城市，除了王都外有K个城市有YL的军队。现在这K支军队要向王都进军，并且消灭沿途经过的城市中的叛军。现给出N个城市的道路情况以及城市的叛军数量，问总共需要消灭多少叛军？

## ![img](http://acm.fzu.edu.cn/image/prodesc.gif)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==) Input

第一行输入两个整数N，K，接下来输入N(1<=N<=100000)个整数Ai(0<=Ai<=10000)，表示第i个城市的叛军数量。接下来输入K个大于等于1且小于等于N的整数，表示有军队的城市的编号。数据保证王都以及有军队的城市没有叛军。接下来输入N-1行，每行两个整数u、v，表示连接u和v的一条道路。每支军队只能沿着道路走，并且是其所在城市与王都之间的最短路线走。

## ![img](http://acm.fzu.edu.cn/image/prodesc.gif)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==) Output

输出一行一个整数表示消灭的叛军数量。

## ![img](http://acm.fzu.edu.cn/image/prodesc.gif)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==) Sample Input

4 2 0 3 0 0 3 4 1 2 2 3 2 4

## ![img](http://acm.fzu.edu.cn/image/prodesc.gif)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==) Sample Output

3

 虽然数据很弱，可以很简单的代码就过，但是还是不要错过这个简单的图算法题目。

广度优先搜索，从1开始搜遇到一个有友军的城市就回溯，将路径上的所有敌军消灭，一个队列就可以解决，但是需要制作很多标记，敌军标记，友军标记，访问标记，然后队列就要有上一个城市标记，图因为太大使用邻接表存储，ylarmy.a[i]为0表示没有访问过，1表示访问过，2表示友军所在城市，为3表示皇城。ylarmy.b[i]表示回溯过的城市，也就是走过的路，这个标记是防止走重复路的，因为每一次回溯都回溯到皇城的话就会走太多的重复路，差不多就是dp中剪枝的意思。代码如下：

```cpp
#include<cstdio>
#include<cstdlib>
#include<cstring>
#include<iostream>
using namespace std;
const int maxn=1e5+5;
struct Enode{int endpoint;Enode *nextEdg;};//边终点标记
struct Vnode{int reble_army;Enode *firstedg;};//叛军//第一条边
struct Graph{Vnode vnode[maxn];int n;}g;
struct{int a[maxn];bool b[maxn];}ylarmy;
struct queue{int pre,d;};
void clearg(int n){
    g.n=n;
    for(int i=0;i<=n;i++)
        g.vnode[i].firstedg=NULL;
}
void insert(int start,int end){
    Enode *p=(Enode*)malloc(sizeof(Enode));
    p->endpoint=end;
    p->nextEdg=g.vnode[start].firstedg;
    g.vnode[start].firstedg=p;
}
int Bfs(){
    int ans=0,x;Enode *e;
    queue q[maxn];int front=-1,rear=-1;
    rear++;q[rear].pre=-1;q[rear].d=1;
    ylarmy.a[1]=3;ylarmy.b[1]=true;
    while(front!=rear){
        e=g.vnode[q[++front].d].firstedg;
        while(e!=NULL{
            if(ylarmy.a[e->endpoint]==2){
                ans+=g.vnode[e->endpoint].reble_army;
                int d=q[front].d;
                int pre=q[front].pre;
                while(!ylarmy.b[d]){
                    ans+=g.vnode[d].reble_army;
                    g.vnode[d].reble_army=0;
                    ylarmy.b[d]=true;
                    d=q[pre].d;
                    pre=q[pre].pre;
                }
                ylarmy.a[e->endpoint]=0;
            }
            if(ylarmy.a[e->endpoint]==0){
                ylarmy.a[e->endpoint]=1;///表示已经走过的点
                q[++rear].pre=front;
                q[rear].d=e->endpoint;
            }
            e=e->nextEdg;
        }
    }
    return ans;
}
int main()
{
    int n,k;
    int i,p1,p2,d;
    while(~scanf("%d%d",&n,&k)){
        memset(ylarmy.a,0,sizeof(ylarmy.a));
        memset(ylarmy.b,0,sizeof(ylarmy.b));
        clearg(n);
        for(i=1;i<=n;i++)
            scanf("%d",&g.vnode[i].reble_army);
        for(i=0;i<k;i++){
            scanf("%d",&d);
            ylarmy.a[d]=2;///表示友军
        }
        i=n-1;
        while(i--){
            scanf("%d%d",&p1,&p2);
            insert(p1,p2);
            insert(p2,p1);
        }
        printf("%d\n",Bfs());
    }
    return 0;
}
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

 有点长，但是思路很清晰，容易理解。