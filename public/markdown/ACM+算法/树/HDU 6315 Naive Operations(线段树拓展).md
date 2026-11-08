**Naive Operations**
**Time Limit:** 6000/3000 MS (Java/Others)    **Memory Limit:** 502768/502768 K (Java/Others)
Total Submission(s): 2623    Accepted Submission(s): 1143
**Problem Description**
In a galaxy far, far away, there are two integer sequence a and b of length n.
b is a static permutation of 1 to n. Initially a is filled with zeroes.
There are two kind of operations:
\1. add l r: add one for al,al+1...ar
\2. query l r: query ∑ri=l⌊ai/bi⌋
**Input**
There are multiple test cases, please read till the end of input file.
For each test case, in the first line, two integers n,q, representing the length of a,b and the number of queries.
In the second line, n integers separated by spaces, representing permutation b.
In the following q lines, each line is either in the form 'add l r' or 'query l r', representing an operation.
1≤n,q≤100000, 1≤l≤r≤n, there're no more than 5 test cases.
**Output**
Output the answer for each 'query', each one line.
**Sample Input**
5 12
1 5 2 4 3
add 1 4
query 1 4
add 2 5
query 2 5
add 3 5
query 1 5
add 2 4
query 1 4
add 2 5
query 2 5
add 2 2
query 1 5
**Sample Output**
1
1
2
4
4
6
**题目大意**：两个数组，长度都为n，b数组元素属于[1,n],每个元素都不相同，a数组初始都为0，输入n,q,然后输入b数组，再输入q行，两种操作，add表示a数组[i,j]每个元素加一，q表示 计算[i,j]的∑ri=l⌊ai/bi⌋。
分析：每个元素增一对整体的共享都是不相同的，相当于每一个b元素都对应一种进制，查询的时候计算区间和。建设线段树的时候用两个元素俩判断性质：maxa表示区间最大的a元素的值，minb表示区间最小的b元素的值，建树的时候，minb表示区间最小，mina都为0，更新的时候判断maxa>=minb？是则向下产生影响，如果是叶子节点那就对总数产生影响。其它操作都是基本的区间更新区间查询的操作。

```cpp
#include<iostream>
#include<algorithm>
#define ll long long
using namespace std;
const int MAXN=1e5+10;
struct
{
    int l,r,lazy;
    ll maxa,minb,cnt;
}tree[MAXN<<2];

ll b[MAXN];

void PushUp(int i){//求子节点和
    tree[i].minb=min(tree[i<<1].minb,tree[i<<1|1].minb);
    tree[i].maxa=max(tree[i<<1].maxa,tree[i<<1|1].maxa);
    tree[i].cnt=tree[i<<1].cnt+tree[i<<1|1].cnt;
}

void BuildTree(int i,int L,int R){//建立一颗[L,R]的树
    tree[i].l=L;
    tree[i].r=R;
    tree[i].lazy=0;
    tree[i].maxa=0;
    tree[i].cnt=0;
    if(L==R){
        tree[i].minb=b[L];
        return ;
    }
    BuildTree(i<<1,L,(L+R)>>1);
    BuildTree(i<<1|1,((L+R)>>1)+1,R);
    tree[i].minb=min(tree[i<<1].minb,tree[i<<1|1].minb);
    return ;
}

void PushDown(int i){//判断延迟父节点的延迟变量，作用到子节点
    if(tree[i].lazy){
        tree[i<<1].maxa+=tree[i].lazy;
        tree[i<<1|1].maxa+=tree[i].lazy;
        tree[i<<1].lazy+=tree[i].lazy;
        tree[i<<1|1].lazy+=tree[i].lazy;//更新左右子节点的lazy
        tree[i].lazy=0;//将lazy传给子节点后字节归零
    }
}

void Update(int L,int R,int i){//更新[L,R]
    if(L<=tree[i].l&&R>=tree[i].r){
        tree[i].maxa++;
        if(tree[i].maxa<tree[i].minb)
        {
            tree[i].lazy++;
            return ;
        }
        if(tree[i].l==tree[i].r&&tree[i].maxa>=tree[i].minb)
        {
            tree[i].cnt++;
            tree[i].minb+=b[tree[i].l];
            return ;
        }
    }
    PushDown(i);//否则，将i的延迟变化量作用到左右子节点上
    if(L<=tree[i<<1].r) Update(L,R,i<<1);
    if(R>=tree[i<<1|1].l) Update(L,R,i<<1|1);
    PushUp(i);
}

ll Query(int L,int R,int i){//查询[L,R]区间，从i开始查询
    if(L<=tree[i].l&&R>=tree[i].r)
        return tree[i].cnt;
    PushDown(i);
    ll t=0;
    if(L<=tree[i<<1].r) t+=Query(L,R,i<<1);
    if(R>=tree[i<<1|1].l) t+=Query(L,R,i<<1|1);
    return t;
}

int main()
{
    int n,q,l,r;
    while(~scanf("%d%d",&n,&q))
    {
        for(int i=1;i<=n;i++)
            scanf("%lld",&b[i]);
        BuildTree(1,1,n);
        while(q--)
        {
            char op[6];
            scanf("%s",op);
            scanf("%d%d",&l,&r);
            if(op[0]=='q')
                printf("%lld\n",Query(l,r,1));
            else
                Update(l,r,1);
        }
    }
    return 0;
}
```

)