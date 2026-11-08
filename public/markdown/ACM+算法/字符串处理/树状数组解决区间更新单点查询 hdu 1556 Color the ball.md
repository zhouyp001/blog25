题目详情： 

### Color the ball

Time Limit: 9000/3000 MS (Java/Others)    Memory Limit: 32768/32768 K (Java/Others)Total Submission(s): 26931    Accepted Submission(s): 13049

**Problem Description**

N个气球排成一排，从左到右依次编号为1,2,3....N.每次给定2个整数a b(a <= b),lele便为骑上他的“小飞鸽"牌电动车从气球a开始到气球b依次给每个气球涂一次颜色。但是N次以后lele已经忘记了第I个气球已经涂过几次颜色了，你能帮他算出每个气球被涂过几次颜色吗？

**Input**

每个测试实例第一行为一个整数N,(N <= 100000).接下来的N行，每行包括2个整数a b(1 <= a <= b <= N)。
当N = 0，输入结束。

**Output**

每个测试实例输出一行，包括N个整数，第I个数代表第I个气球总共被涂色的次数。

**Sample Input**

3
1 1
2 2
3 3
3
1 1
1 2
1 3
0

**Sample Output**

1 1 1
3 2 1 

题目分析：其实这个题目根本不需要用到树状数组，完全可以用简单的技巧解出来。代码如下：



```cpp
#include "stdio.h"
int main()
{
    int n,i,l,s,r;
    while(scanf("%d",&n),n)
    {
        int c[100001]={0};
        i=n;
		s=0;
        while(i--)
        {
            scanf("%d %d",&l,&r);
            c[l]++;
			c[r+1]--;
        }
        for(i=1;i<n;i++)
        {
            s+=c[i];
            printf("%d ",s);
        }
        printf("%d\n",s+c[n]);
    }
    return 0;
}
```



虽然能这样解，但是下次遇到不是查询所有点而是查询，更新一次查询一次，并且查询不是连续的就不能直接这样了。树状数组是这样的，因为我们要求的是每一个点的和所以只要将更新区间的c[l]加上增量然后c[r+1]减去增量就可以了。如下图

<img src="img/20180725101338392.png" style="width:800px">

 为什么会有这样的效果呢，每一次更新都会将后面+=lowbit（）的下标更新,c[i]+add后面相应的位置都会+add，然后再c[j]-add,后面的相应位置都会-add。

下面是树状数组的代码：

```cpp
#include<cstdio>
#include<cstring>
using namespace std;
const int MAXN=1e5+10;
int s[MAXN];
int n;
int lowbit(int x){return x&(-x);}
int sum(int x){
    int sum=0;
    while(x){
        sum+=s[x];
        x-=lowbit(x);
    }
    return sum;
}
void add(int x){
    while(x<=MAXN){
        s[x]++;
        x+=lowbit(x);
    }
}
void sub(int x){
    while(x<=MAXN){
        s[x]--;
        x+=lowbit(x);
    }
}
int main(){
    int a,b;
    while(~scanf("%d",&n)&&n!=0){
        memset(s,0,sizeof(s));
        for(int i=1;i<=n;i++){
            scanf("%d%d",&a,&b);
            add(a);//在做端点加
            sub(b+1);//在有端点后面一个位置减
        }
        for(int i=1;i<=n;i++){
            printf("%d",sum(i));
            if(i!=n)printf(" ");
        }
        printf("\n");
    }
    return 0;
}
```

