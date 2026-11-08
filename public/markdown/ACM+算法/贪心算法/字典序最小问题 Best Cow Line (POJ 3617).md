**Best Cow Line**
Time Limit: 1000MS        Memory Limit: 65536K
Total Submissions: 32184        Accepted: 8533
**Description**

FJ is about to take his N (1 ≤ N ≤ 2,000) cows to the annual"Farmer of the Year" competition. In this contest every farmer arranges his cows in a line and herds them past the judges.

The contest organizers adopted a new registration scheme this year: simply register the initial letter of every cow in the order they will appear (i.e., If FJ takes Bessie, Sylvia, and Dora in that order he just registers BSD). After the registration phase ends, every group is judged in increasing lexicographic order according to the string of the initials of the cows' names.

FJ is very busy this year and has to hurry back to his farm, so he wants to be judged as early as possible. He decides to rearrange his cows, who have already lined up, before registering them.

FJ marks a location for a new line of the competing cows. He then proceeds to marshal the cows from the old line to the new one by repeatedly sending either the first or last cow in the (remainder of the) original line to the end of the new line. When he's finished, FJ takes his cows for registration in this new order.

Given the initial order of his cows, determine the least lexicographic string of initials he can make this way.

**Input**

\* Line 1: A single integer: N
\* Lines 2..N+1: Line i+1 contains a single initial ('A'..'Z') of the cow in the ith position in the original line

**Output**

The least lexicographic string he can make. Every line (except perhaps the last one) contains the initials of 80 cows ('A'..'Z') in the new line.

**Sample Input**

6
A
C
D
B
C
B

先对第一个字母和最后一个字母进行比较，取较小的那个，如果相等对顺序序列和逆序序列进行比较，取小的那头。

```cpp
#include<iostream>
#include<algorithm>
#include<cstdlib>
#include<cstdio>
using namespace std;
int main()
{
    char cow[2010],ne[2010];
    int n;
    scanf("%d",&n);
    getchar();
    for(int i=0;i<n;i++){
        scanf("%c",&cow[i]);
        getchar();
    }
    int a=0,b=n-1,j=0;
    while(a<=b)
    {
        bool cmp=false;
        for(int i=0;a+i<=b;i++)
        {
            if(cow[a+i]<cow[b-i])
            {
                cmp=false;
                break;
            }
            else if(cow[a+i]>cow[b-i])
            {
                cmp=true;
                break;
            }
        }
        if(cmp)
        {
            ne[j++]=cow[b--];
        }
        else
        {
            ne[j++]=cow[a++];
        }
    }
    for(int i=0;i<n;i++){
        printf("%c",ne[i]);
        if((i+1)%80==0&&i<n-1)
            printf("\n");
    }
}
```

