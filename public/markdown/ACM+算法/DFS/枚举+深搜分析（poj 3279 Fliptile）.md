题目描述：

**Fliptile**

| **Time Limit:** 2000MS       |      | **Memory Limit:** 65536K |
| ---------------------------- | ---- | ------------------------ |
| **Total Submissions:** 15598 |      | **Accepted:** 5712       |

Description

Farmer John knows that an intellectually satisfied cow is a happy cow who will give more milk. He has arranged a brainy activity for cows in which they manipulate an *M* × *N* grid (1 ≤ *M* ≤ 15; 1 ≤ *N* ≤ 15) of square tiles, each of which is colored black on one side and white on the other side.

As one would guess, when a single white tile is flipped, it changes to black; when a single black tile is flipped, it changes to white. The cows are rewarded when they flip the tiles so that each tile has the white side face up. However, the cows have rather large hooves and when they try to flip a certain tile, they also flip all the adjacent tiles (tiles that share a full edge with the flipped tile). Since the flips are tiring, the cows want to minimize the number of flips they have to make.

Help the cows determine the minimum number of flips required, and the locations to flip to achieve that minimum. If there are multiple ways to achieve the task with the minimum amount of flips, return the one with the least lexicographical ordering in the output when considered as a string. If the task is impossible, print one line with the word "IMPOSSIBLE".

Input

Line 1: Two space-separated integers: *M* and *N* 
Lines 2..*M*+1: Line *i*+1 describes the colors (left to right) of row i of the grid with *N* space-separated integers which are 1 for black and 0 for white

Output

Lines 1..*M*: Each line contains *N* space-separated integers, each specifying how many times to flip that particular location.

Sample Input

```html
4 4
1 0 0 1
0 1 1 0
0 1 1 0
1 0 0 1
```



Sample Output

```html
0 0 0 0
1 0 0 1
1 0 0 1
0 0 0 0
```



题目大意：奶牛翻转地板，地板有两面，一面白色一面黑色，每翻转一块地板，与该地板有公共边的地板都会随着翻转，地板是正方形。我们要求的是，给出一块地面上面铺上了地板，地板黑白面给出，要求奶牛翻转地板最少多少次能将地面全部变成白色，输出翻转数组，如果不能全部变成白色输出"IMPOSSIBLE"，如果能输出翻转数组，每一块地板用一个数据表示，翻转为1，不翻转为0，输出翻转次数最少，并且翻转数组字典序最小的数组。

题目分析：要求到这个题目的解，可以将所有地板是否翻转的情况全部列举出来，但是全部列举出来的话有2的n*m次方种情况，并且要将每一种情况遍历完，所需要复杂度会很庞大的。必须先将情况减少，如果先将第一行确定的话，改变第一行的状态的就只有第二行的翻转了，因此第二行的翻转情况也被固定了，第二行翻转完成之后，......依次类推，当最后一行因为倒数第二行而翻转之后，如果最后一行全部变成了白色的话那么就翻转成功了。因此我们只要把第一行的情况全部考虑一遍，后面的情况基本上是固定了的。

我开始用的是递归遍历，将第一行遍历，每一次的出来的情况再推导出之后所有行的情况。代码

```cpp
#include<iostream>
#include<cstring>
using namespace std;
typedef struct
{
    int d[16];
    int total;
}Vis;
bool operator>(Vis v1,Vis v2)//vis的判断
{
    if(v1.total>v2.total)
        return true;
    else if(v1.total==v2.total)
    {
        for(int i=0;i<16;i++)
        if(v1.d[i]>v2.d[i])
            return true;
        else if(v1.d[i]<v2.d[i])
            return false;
        else
            continue;
        return true;
    }
    else
        return false;
}
Vis vis,vismin;
int bit[16];
int titles[16];
int titles1[16];
bool flag;
int m,n;
void dfs(int j)
{
    if(j>=m)
    {
        int i,k;
        memset(titles1,0,sizeof(titles1));
        for(i=0;i<m;i++)titles1[i]=titles[i];//将title备份
        vis.total=0;
        for(k=0;k<n;k++)//将vis第一行中的情况体现在title1中
        if(vis.d[0]&bit[k])
        {
            vis.total++;//记录第一行翻转的次数
            if(k-1>=0)titles1[0]^=bit[k-1];
            titles1[0]^=bit[k];
            if(k+1<n)titles1[0]^=bit[k+1];
            titles1[1]^=bit[k];
        }
        for(i=1;i<m;i++)//翻转第一行之后的所有行
        for(k=0;k<n;k++)
        {
            if(titles1[i-1]&bit[k])
            {
                vis.total++;//记录第一行之后要翻转次数
                vis.d[i]|=bit[k];
                titles1[i-1]^=bit[k];
                if(k-1>=0)titles1[i]^=bit[k-1];
                titles1[i]^=bit[k];
                if(k+1<n)titles1[i]^=bit[k+1];
                if(i<m-1)titles1[i+1]^=bit[k];
            }
        }
        if(!titles1[m-1])//判断最后一行是否全部为0
        {
            flag=true;//为0则有解
            if(vismin>vis)//判断是否比vismin更优
                vismin=vis;
        }
        for(i=1;i<m;i++)//退出来的时候要将vis.d第一行后面的都置零
            vis.d[i]=0;
        return ;
    }
    vis.d[0]&=~bit[j];//不翻转的情况
    dfs(j+1);
    vis.d[0]|=bit[j];//翻转的情况
    dfs(j+1);
}
int main()
{
    int i,j,nu;
    for(i=0;i<16;i++)//定义bit位运算
        bit[i]=1<<i;
    while(cin>>m>>n&&(m!=0||n!=0))
    {
        flag=false;
        memset(titles,0,sizeof(titles));
        memset(vis.d,0,sizeof(titles));
        vis.total=0;
        for(i=0;i<m;i++)//输入，初始化title
        for(j=0;j<n;j++)
        {
            scanf("%d",&nu);
            if(nu)
            titles[i]|=bit[j];
        }
        for(i=0;i<m;i++)//初始化vismin
            vismin.d[i]=~0;
        vismin.total=m*n;
        dfs(0);//对第一行从第一个元素开始深搜
        if(flag)
        for(i=0;i<m;i++)
        {
            for(j=0;j<n;j++)
                if(vismin.d[i]&bit[j])
                    printf("1 ");
                else
                    printf("0 ");
            printf("\n");
        }
        else
            printf("IMPOSSIBLE\n");
    }
        return 0;
}
```



上面的代码中因为考虑在递归栈中保存状态的时候会使用很大的内存，因此我用的是一个整型的以为数组存储二维状态，每一个整型数据中每一个二进制位都表示一块地板的状态和翻转的状态。

上面代码的时间复杂度和空间消耗是：

| **Memory:** 180K |      | **Time:** 188MS |
| ---------------- | ---- | --------------- |
|                  |      |                 |



优化：其实在遍历第一行的所有情况的时候并不需要用递归，枚举是完全有优势的，因为枚举出来的情况是2的n*m次方，而从0开始到2的n*m次方的所有数据的二进制形式就是第一行翻转的所有情况情况，所以只要将这个数据复制给vis[0]就确定了第一行的情况了。后面的翻转的时候只i-1行的地板状态就是i行翻转的情况，然后翻转的时候就是将i与对应的地方抑或就可以实现翻转了。优化后的代码：

```cpp
#include<cstdio>
#include<cstring>
using namespace std;
int bit[16],tit[16],n,m,flag;
typedef struct
{
    int d[16],t;
}Vis;
Vis vismin,vis;
bool operator>(Vis v1,Vis v2)
{
    if(v1.t>v2.t)return true;
    else if(v1.t==v2.t)
    {
        for(int i=0;i<16;i++)
        if(v1.d[i]>v2.d[i])return true;
        else if(v1.d[i]<v2.d[i])return false;
        return true;
    }
    else return false;
}
void dfs(int tmp)
{
    int tit1[16],i,j;
    memcpy(tit1,tit,sizeof(tit));
    vis.t=0;
    vis.d[0]=tmp;
    for(i=0;i<m;i++)
    {
        if(i>0){
            vis.d[i]=tit1[i-1];
            tit1[i-1]=0;
        }
        tit1[i]^=(vis.d[i]<<1)^(vis.d[i])^(vis.d[i]>>1);
        if(i!=m-1)tit1[i+1]^=vis.d[i];
        tit1[i]&=(1<<n)-1;
    }
    if(!tit1[m-1])
    {
        flag=1;
        for(i=0;i<m;i++)
        for(j=0;j<n;j++)
        if(vis.d[i]&bit[j])
        vis.t++;
        if(vismin>vis)
        vismin=vis;
    }
}
int main()
{
    int i,j,tmp;
    for(i=0;i<16;i++)
    bit[i]=1<<i;
    scanf("%d%d",&m,&n);
    flag=0;
    vismin.t=16*16;
    memset(tit,0,sizeof(tit));
    for(i=0;i<m;i++)
    for(j=0;j<n;j++)
    if(scanf("%d",&tmp)&&tmp)
    tit[i]|=bit[j];
    tmp=1<<n;
    for(i=0;i<tmp;i++)dfs(i);
    if(flag)
    {
        for(i=0;i<m;i++){
            for(j=0;j<n;j++){
            if(vismin.d[i]&bit[j])printf("1");
            else printf("0");
            if(j!=n-1)printf(" ");
            }
        printf("\n");
        }
    }
    else printf("IMPOSSIBLE\n");
    return 0;
}
```



优化后的时间空间消耗是：

| **Memory:** 92K |      | **Time:** 0MS |
| --------------- | ---- | ------------- |
|                 |      |               |