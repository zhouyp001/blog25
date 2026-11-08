**Fence Repair**
Time Limit: 2000MS        Memory Limit: 65536K
Total Submissions: 60866        Accepted: 20067
**Description**
Farmer John wants to repair a small length of the fence around the pasture. He measures the fence and finds that he needs N (1 ≤ N ≤ 20,000) planks of wood, each having some integer length Li (1 ≤ Li ≤ 50,000) units. He then purchases a single long board just long enough to saw into the N planks (i.e., whose length is the sum of the lengths Li). FJ is ignoring the "kerf", the extra length lost to sawdust when a sawcut is made; you should ignore it, too.
FJ sadly realizes that he doesn't own a saw with which to cut the wood, so he mosies over to Farmer Don's Farm with this long board and politely asks if he may borrow a saw.
Farmer Don, a closet capitalist, doesn't lend FJ a saw but instead offers to charge Farmer John for each of the N-1 cuts in the plank. The charge to cut a piece of wood is exactly equal to its length. Cutting a plank of length 21 costs 21 cents.
Farmer Don then lets Farmer John decide the order and locations to cut the plank. Help Farmer John determine the minimum amount of money he can spend to create the N planks. FJ knows that he can cut the board in various different orders which will result in different charges since the resulting intermediate planks are of different lengths.
**Input**
Line 1: One integer N, the number of planks 
Lines 2..N+1: Each line contains a single integer describing the length of a needed plank
Output
Line 1: One integer: the minimum amount of money he must spend to make N-1 cuts
**Sample Input**
3
8
5
8
**Sample Output**
34
切割方法最优就是每一次都切割两个最大的，倒过来就是将最小的接上 ，然后再将接好的替换原来的两根，再找最小的。形成一棵二叉树，二叉树的木板长度x节点深度的总和就是最优。

```cpp
#include<cstdio>
#include<algorithm>
using namespace std;
const int N=2e4+10;
int L[N];
int main()
{
    int n,i;
    long long total=0;
    scanf("%d",&n);
    for(i=0;i<n;i++)
        scanf("%d",&L[i]);
    sort(L,L+n);
    for(i=0;i<n-1;i++)
    {
        total+=(L[i]+L[i+1]);
        L[i+1]+=L[i];
        for(int j=i+2;j<n&&L[j]<L[j-1];j++)
            swap(L[j],L[j-1]);
    }
    printf("%lld\n",total);
    return 0;
}
```

