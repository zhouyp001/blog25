题目表述：

### I Hate It

Time Limit: 9000/3000 MS (Java/Others)    Memory Limit: 32768/32768 K (Java/Others)Total Submission(s): 96882    Accepted Submission(s): 36592

**Problem Description**

很多学校流行一种比较的习惯。老师们很喜欢询问，从某某到某某当中，分数最高的是多少。
这让很多学生很反感。
不管你喜不喜欢，现在需要你做的是，就是按照老师的要求，写一个程序，模拟老师的询问。当然，老师有时候需要更新某位同学的成绩。

**Input**

本题目包含多组测试，请处理到文件结束。
在每个测试的第一行，有两个正整数 N 和 M ( 0<N<=200000,0<M<5000 )，分别代表学生的数目和操作的数目。
学生ID编号分别从1编到N。
第二行包含N个整数，代表这N个学生的初始成绩，其中第i个数代表ID为i的学生的成绩。
接下来有M行。每一行有一个字符 C (只取'Q'或'U') ，和两个正整数A，B。
当C为'Q'的时候，表示这是一条询问操作，它询问ID从A到B(包括A,B)的学生当中，成绩最高的是多少。
当C为'U'的时候，表示这是一条更新操作，要求把ID为A的学生的成绩更改为B。

**Output**

对于每一次询问操作，在一行里面输出最高成绩。

**Sample Input**

5
6 1 2 3 4 5
Q 1 5
U 3 6
Q 3 4
Q 4 5
U 2 9
Q 1 5

**Sample Output**

5
6
5
9

题目分析： 因为学生的成绩的动态更新的，并且是区间查询，求区间的最大值。这是一个很明显的线段树的题目，线段树记录每一段区间的最大值。

```cpp
#include<cstdio>
#include<algorithm>
#include<cmath>
using namespace std;
const int  MAXN = 2e6+10;//学生的最大个数
const int  MAXNODE = 1<<19;//线段树节点的最多个数
//学生数量在最下层，我们可以根据满二叉树的性质计算所有节点的性质
struct {
    int value,right,left;//value记录区间的最大值
}node[MAXNODE];
int father[MAXN];//记录节点在二叉树中的位置
void BuildTree(int i,int left,int right){//建树，将树所有节点初始化为0，得到father的数据
    node[i].left = left;
    node[i].right = right;
    node[i].value = 0;
    if(left==right){
        father[left] = i;
        return ;
    }
    BuildTree(i<<1,left,(int) floor((right+left)/2.0));//建左数
    BuildTree((i<<1)+1,(int) floor((right+left)/2.0+1),right);//建右树
}

void UpdateTree(int ni){//更新树
    if(ni==1)return ;
    int fni=ni/2;
    int lv=node[fni<<1].value;
    int rv=node[(fni<<1)+1].value;
    node[fni].value=max(lv,rv);//得到左右孩子的最大值
    UpdateTree(ni/2);//更新父亲
}

int Max;
void Query(int i,int left,int right)//从i位置开始查询(left,right)区间的的最大值
{
    if(node[i].left==left&&node[i].right==right){//找到要查询的区间计算
        Max = max(Max,node[i].value);
        return ;
    }
    i=i<<1;
    if(left<=node[i].right){//对左孩子查询
        if(right<=node[i].right)Query(i,left,right);
        else Query(i,left,node[i].right);
    }
    i++;
    if(right>=node[i].left)//对有孩子查询
    {
        if(left>=node[i].left)Query(i,left,right);
        else Query(i,node[i].left,right);
    }
}

int main()
{
    int n,m,i,g;
    while(~scanf("%d%d",&n,&m)){
        BuildTree(1,1,n);//从1开始键树
        for(i=1;i<=n;i++){
            scanf("%d",&g);
            node[father[i]].value=g;//更新叶子节点
            UpdateTree(father[i]);//向上更新父亲节点
        }
        char par[2];
        int a,b;
        while(m--){
            scanf("%s",par);
            scanf("%d%d",&a,&b);
            if(par[0]=='Q'){
                Max=0;
                Query(1,a,b);//查询
                printf("%d\n",Max);
            }
            else{
                node[father[a]].value=b;//更新a学生的成绩
                UpdateTree(father[a]);
            }
        }
    }
    return 0;
}
```

