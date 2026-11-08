[ZOJ Problem Set - 4020](http://acm.zju.edu.cn/onlinejudge/showProblem.do?problemCode=4020)

```cpp
#include<iostream>
#include<cstdio>
#include<vector>
#include<queue>
using namespace std;
const int maxn=1e5+5;
vector<int> mg[maxn];
vector<int> t[maxn];
int n,m;
struct node
{
    int x,y;
    int step;
};
bool mgph(int xi,int yi,int xe,int ye)
{
    queue<node> qu;
    node temp;
    temp.x=yi,temp.y=xi,temp.step=0;
    t[xi][yi]=-1;
    qu.push(temp);
    int x,y;
    while(!qu.empty())
    {
        temp=qu.front();
        //cout<<temp.y<<ends<<temp.x<<ends<<temp.step<<endl;
        qu.pop();
        if(temp.x==ye&&temp.y==xe)
        {
            printf("%d\n",temp.step);
            return true;
        }
        for(int i=0;i<2;i++)
        {
            if((mg[temp.y][temp.x]+temp.step)%2==0)
            {
                x=temp.x;
                switch(i)
                {
                    case 0: y=temp.y+1;break;
                    case 1: y=temp.y-1;break;
                }
            }
            else
            {
                y=temp.y;
                switch(i)
                {
                    case 0: x=temp.x+1;break;
                    case 1: x=temp.x-1;break;
                }
            }
            if(x>=0&&x<m&&y>=0&&y<n&&(t[y][x]==0||(t[y][x]==-1&&temp.step%2==0)))
            {
                node temp1;
                temp1.x=x,temp1.y=y,temp1.step=temp.step+1;
                t[y][x]-=1;
                qu.push(temp1);
            }
        }
    }
    return false;
}
int main()
{
    int T;
    scanf("%d",&T);
    while(T--)
    {
        scanf("%d%d",&n,&m);
        int d;
        for(int i=0;i<n;i++){
                mg[i].clear();
                t[i].clear();

        for(int j=0;j<m;j++){
           scanf("%d",&d);
           mg[i].push_back(d);
           t[i].push_back(false);
        }
        }
        int xi,yi,xe,ye;
        scanf("%d%d%d%d",&xi,&yi,&xe,&ye);
        if(!mgph(xi-1,yi-1,xe-1,ye-1))
        {
            printf("-1\n");
        }
    }
    return 0;
}
```

