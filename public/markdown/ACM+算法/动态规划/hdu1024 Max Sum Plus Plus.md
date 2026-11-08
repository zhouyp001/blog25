题目描述：

# Max Sum Plus Plus

**Time Limit: 2000/1000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)Total Submission(s): 36429    Accepted Submission(s): 12963**

**Problem Description**

Now I think you have got an AC in Ignatius.L's "Max Sum" problem. To be a brave ACMer, we always challenge ourselves to more difficult problems. Now you are faced with a more difficult problem.

Given a consecutive number sequence S*1*, S*2*, S*3*, S*4* ... S*x*, ... S*n* (1 ≤ x ≤ n ≤ 1,000,000, -32768 ≤ S*x* ≤ 32767). We define a function sum(i, j) = S*i* + ... + S*j* (1 ≤ i ≤ j ≤ n).

Now given an integer m (m > 0), your task is to find m pairs of i and j which make sum(i*1*, j*1*) + sum(i*2*, j*2*) + sum(i*3*, j*3*) + ... + sum(i*m*, j*m*) maximal (i*x* ≤ i*y* ≤ j*x* or i*x* ≤ j*y* ≤ j*x* is not allowed).

But I`m lazy, I don't want to write a special-judge module, so you don't have to output m pairs of i and j, just output the maximal summation of sum(i*x*, j*x*)(1 ≤ x ≤ m) instead. ^_^

**Input**

Each test case will begin with two integers m and n, followed by n integers S*1*, S*2*, S*3* ... S*n*.
Process to the end of file.

**Output**

Output the maximal summation described above in one line.

**Sample Input**

1 3 1 2 3
2 6 -1 4 -2 3 -2 3

**Sample Output**

6
8

题目大意：先输入两个数m,n，n表示接下来输入一个含有n个元素的序列，m表示在序列中，找到m个连续子段，相互不相交不包含。输出m个子段和最大的子段的和。

题目分析：dp解决就是将问题缩小，求n个元素的序列中m个子段，可以通过一种方式将问题转换为求m-1个子段，或者求n-1个元素的子段中m个子段。就会得到求n序列m子段就是求n-1序列中m-1子段与n-1序列总m子段的最大值，前者表示将在n-1序列中找到m-1子段的最大值再加上最后一个元素单独成一段就是n个元素中m个子段，后者表示在n-1序列中m个子段的最后一个段中加上第n个元素。两者加起来就是n序列m子段的全部情况了。

实现：用一个二维数组进行模拟，i行表示分成i段，j列表示j个元素的序列。dp[i][j]表示包含第j个元素在内的j个元素序列分成i段的子段和。<img src="img/2018072711064125.png" style="width:600px">

<img src="img/20180727105621667.png" style="width:400px">![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)<img src="img/20180727105656773.png" style="width:400px"> ![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

<img src="img/20180727110322788.png" style="width:400px">![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)<img src="img/20180727110448939.png" style="width:400px">![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

 假设我们要球的序列m=4，那么我们要求的就是左下图最下面那一行的最大值，然后我们删除没有用的元素得到右下图。

<img src="img/2018072711085176.png" style="width:400px">![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)<img src="img/20180727111008418.png" style="width:400px"> ![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

 其实我们要求的元素就只有中间类似的几条对角线中的元素。并且求每行元素都只与其前面那行元素有联系，因此我们要保存的元素就只有两行。

<img src="img/20180727111427112.png" style="width:400px">![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

然后我们再通过t=1-t的变化滚动数组得到第一行，然后得到第二行... ...直到得到第m行。

<img src="img/20180727111549933.png" style="width:400px">![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)<img src="img/20180727111707732.png" style="width:400px">![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

 再计算过程中由于只要得到中间几个元素，因此要确定每一次计算的右边界。如下图得到第i行的边界n-m-i：

<img src="img/20180727112305742.png" style="width:800px">![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

代码如下：

```cpp
#include<iostream>
#include<cstring>
using namespace std;
const int MAXN=1e6+10;
int dp[2][MAXN],d[MAXN];
int Max(int x,int y){return x>y?x:y;}
int main(){
    ios::sync_with_stdio(false);
    int i,j,m,n,maxn,re,t=1;
    while(cin>>m>>n){
        dp[0][0]=dp[1][0]=d[0]=0;//初始化
        for(i=1;i<=n;i++){
            dp[0][i]=dp[1][i]=0;//初始化
            cin>>d[i];
        }
        for(i=1;i<=m;i++){//左界
            dp[t][i]=dp[1-t][i-1]+d[i];
            maxn=dp[1-t][i-1];
            for(j=i+1;j<=n-m+i;j++){//右界
                maxn=Max(maxn,dp[1-t][j-1]);//得到上一行j之前的最大值
                dp[t][j]=Max(maxn,dp[t][j-1])+d[j];
            }
            t=1-t;//滚动
        }
        t=1-t;
        for(i=m+1,re=dp[t][m];i<=n;i++)
            re=Max(re,dp[t][i]);
        cout<<re<<endl;
    }
    return 0;
}
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)