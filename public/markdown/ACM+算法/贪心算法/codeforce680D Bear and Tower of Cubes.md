**D. Bear and Tower of Cubes**
time limit per test2 seconds
memory limit per test256 megabytes	inputstandard input	outputstandard output

Limak is a little polar bear. He plays by building towers from blocks. Every block is a cube with positive integer length of side. Limak has infinitely many blocks of each side length.

A block with side a has volume a3. A tower consisting of blocks with sides a1, a2, ..., ak has the total volume a13 + a23 + ... + ak3.

Limak is going to build a tower. First, he asks you to tell him a positive integer X — the required total volume of the tower. Then, Limak adds new blocks greedily, one by one. Each time he adds the biggest block such that the total volume doesn't exceed X.

Limak asks you to choose X not greater than m. Also, he wants to maximize the number of blocks in the tower at the end (however, he still behaves greedily). Secondarily, he wants to maximize X.

Can you help Limak? Find the maximum number of blocks his tower can have and the maximum X ≤ m that results this number of blocks.

**Input**
The only line of the input contains one integer m (1 ≤ m ≤ 1015), meaning that Limak wants you to choose X between 1 and m, inclusive.

**Output**
Print two integers — the maximum number of blocks in the tower and the maximum required total volume X, resulting in the maximum number of blocks.

**Examples**
inputCopy
48
outputCopy
9 42
inputCopy
6
outputCopy
6 6

每一次选择最大的x3和次大的x3计算两个中更优的那个，贪心加dfs。

```cpp
#include<cstdio>
#include<algorithm>
#define ll long long
using namespace std;
const int MAXN=1e5+10;
ll x3[MAXN];

pair<ll,ll>ans(0,0);

void dfs(ll m,ll cnt,ll t)
{
    if(!m){
        ans=max(ans,make_pair(cnt,t));
        return ;
    }
    int q=upper_bound(x3+1,x3+100002,m)-x3;
    q--;
    dfs(m-x3[q],cnt+1,t+x3[q]);
    if(q>1)dfs(x3[q]-1-x3[q-1],cnt+1,t+x3[q-1]);
}
int main()
{
    ll m;
    for(ll i=1;i<=100001;i++)
        x3[i]=i*i*i;
    scanf("%I64d",&m);
    dfs(m,0,0);
    printf("%I64d %I64d\n",ans.first,ans.second);
}
```

