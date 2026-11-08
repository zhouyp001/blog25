 ### 题目描述：

**H-Diff-prime Pairs**
链接：https://www.nowcoder.com/acm/contest/141/H
来源：牛客网

时间限制：C/C++ 1秒，其他语言2秒
空间限制：C/C++ 262144K，其他语言524288K
64bit IO Format: %lld

### 题目描述

Eddy has solved lots of problem involving calculating the number of coprime pairs within some range. This problem can be solved with inclusion-exclusion method. Eddy has implemented it lots of times. Someday, when he encounters another coprime pairs problem, he comes up with diff-prime pairs problem. diff-prime pairs problem is that given N, you need to find the number of pairs (i, j), where ![img](https://uploadfiles.nowcoder.com/files/20180717/305345_1531803986831_equation?tex=%5Cfrac%7Bi%7D%7Bgcd(i%2C%20j)%7D) and ![img](https://uploadfiles.nowcoder.com/files/20180717/305345_1531803986872_equation?tex=%5Cfrac%7Bj%7D%7Bgcd(i%2Cj)%7D) are both prime and i ,j ≤ N. gcd(i, j) is the greatest common divisor of i and j. Prime is an integer greater than 1 and has only 2 positive divisors.

Eddy tried to solve it with inclusion-exclusion method but failed. Please help Eddy to solve this problem.

Note that pair (i1, j1) and pair (i2, j2) are considered different if i1 ≠ i2 or j1 ≠ j2.

### 输入描述:

```html
Input has only one line containing a positive integer N.

1 ≤ N ≤ 107
```

### 输出描述:

```html
Output one line containing a non-negative integer indicating the number of diff-prime pairs (i,j) where i, j ≤ N
```

示例1

### 输入

```html
3
```

### 输出

```html
2
```

示例2

### 输入

```html
5
```

### 输出

```html
6
```

**作答：**


```cpp
#include<iostream>
#include<cstring>
#define ll long long
using namespace std;
const int MAXSIZE=1e7+10;
int Mark[MAXSIZE<<2];
int prime[MAXSIZE];
 
ll sum(ll n){
    if(n%2==0)return (n+1)*(n>>1);
    else return ((n+1)>>1)*n;
}
int  Prime(int n){
    int index = 0;
    memset(Mark,0,sizeof(Mark));
    for(int i = 2; i <= n; i++)
    {
        if(Mark[i] == 0){
            prime[index++] = i;
        }
        for(int j = 0; j < index && prime[j] * i <= n; j++)
        {
            Mark[i * prime[j]] = 1;
            if(i % prime[j] == 0){
                break;
            }
        }
    }
    return index;
}
int main(){
    int n,total,i=2;
    ll s=0;
    ios::sync_with_stdio(false);
    cin>>n;
    total=Prime(n);
    s+=sum((ll)total-1)*2;
    while(total>=2){
        if(prime[total-1]*i<=n){
            s+=sum((ll)total-1)*2;
            i++;
        }
        else
            total--;
    }
    cout<<s<<endl;
    return 0;
}
```

