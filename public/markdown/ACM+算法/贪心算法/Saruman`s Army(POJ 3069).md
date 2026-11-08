**Saruman's Army**
**Time Limit:** 1000MS        **Memory Limit:** 65536K
**Total Submissions:** 13974        **Accepted:** 7011
**Description**

Saruman the White must lead his army along a straight path from Isengard to Helm’s Deep. To keep track of his forces, Saruman distributes seeing stones, known as palantirs, among the troops. Each palantir has a maximum effective range of R units, and must be carried by some troop in the army (i.e., palantirs are not allowed to “free float” in mid-air). Help Saruman take control of Middle Earth by determining the minimum number of palantirs needed for Saruman to ensure that each of his minions is within R units of some palantir.

**Input**

The input test file will contain multiple cases. Each test case begins with a single line containing an integer R, the maximum effective range of all palantirs (where 0 ≤ R ≤ 1000), and an integer n, the number of troops in Saruman’s army (where 1 ≤ n ≤ 1000). The next line contains n integers, indicating the positions x1, …, xn of each troop (where 0 ≤ xi ≤ 1000). The end-of-file is marked by a test case with R = n = −1.

**Output**

For each test case, print a single integer indicating the minimum number of palantirs needed.

**Sample Input**

0 3
10 20 20
10 7
70 30 1 7 15 20 50
-1 -1
**Sample Output**

2
4

将点从小到大排序，从左边开始选点，排除覆盖的点，再从新开始选点。

```cpp
#include<iostream>
#include<algorithm>
using namespace std;
int main()
{
    int r,n,d=0;
    int data[1010];
    while(cin>>r>>n&&(r!=-1||n!=-1))
    {
        d++;
        for(int i=0;i<n;i++)
            cin>>data[i];
        sort(data,data+n);
        int i=0;
        int a=data[0];
        int b=data[n-1];
        int total=0;
        while(i<n&&a<=b)
        {
            while(i<n&&data[i]<=a+r)i++;
            a=data[i-1];
            while(i<n&&data[i]<=a+r)i++;
            total++;
            if(i<n)a=data[i];
        }
        cout<<total<<endl;
    }
    return 0;
}
```

