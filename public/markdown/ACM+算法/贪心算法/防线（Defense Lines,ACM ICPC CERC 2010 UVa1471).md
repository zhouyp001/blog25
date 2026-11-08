题目大意：

给一个长度为n（n<=200000)的序列，你的任务时删除一个连续子序列，使得剩下的序列中有一个长度最大的连续增子序列。

预处理得到g[i]（表示a[i]结尾的最长连续增序列）f[i]（表示a[i]开头的最长连续增序列），用set存a[i],g[i],然后通过f[i]找最优的a[j],g[j]。

```cpp
// UVa1471 Defense Lines
// Rujia Liu
// Algorithm 1: use STL set to maintain the candidates.
// This is a little bit more intuitive, but less efficient (than algorithm 2)
#include<cstdio>
#include<set>
#include<cassert>
using namespace std;

const int maxn = 200000 + 5;
int n, a[maxn], f[maxn], g[maxn];

struct Candidate {
  int a, g;
  Candidate(int a, int g):a(a),g(g) {}
  bool operator < (const Candidate& rhs) const {
    return a < rhs.a;
  }
};

set<Candidate> s;

int main() {
  int T;
  scanf("%d", &T);
  while(T--) {
    scanf("%d", &n);
    for(int i = 0; i < n; i++)
      scanf("%d", &a[i]);
    if(n == 1) { printf("1\n"); continue; }

    g[0] = 1;
    for(int i = 1; i < n; i++)///得到g
      if(a[i-1] < a[i]) g[i] = g[i-1] + 1;
      else g[i] = 1;

    f[n-1] = 1;
    for(int i = n-2; i >= 0; i--)///得到f
      if(a[i] < a[i+1]) f[i] = f[i+1] + 1;
      else f[i] = 1;

    s.clear();
    s.insert(Candidate(a[0], g[0]));//初始化s
    int ans = 1;//开始时字串的长度为1
    for(int i = 1; i < n; i++) {
      Candidate c(a[i], g[i]);

      // 找到s中第一个第一个大于或等于c.a的位置

      set<Candidate>::iterator it = s.lower_bound(c); 
      bool keep = true;
      //用于标记c是否满足进入后面考虑情况的条件
      //存在小于它的数时，如果c.g更小，那么就没有必要考虑，也就不满足条件

      if(it != s.begin()) {
        Candidate last = *(--it); //找到离它最近的一个小于它的数
        int len = f[i] + last.g; 
        ans = max(ans, len);
        if(c.g <= last.g) keep = false;
      }

      if(keep) {
        s.erase(c); // 删除原来那个c.a的那个
        s.insert(c);//插入新的c
        it = s.find(c); 
        it++;
        //在c位置后面的数种删除不满足条件的数据
        while(it != s.end() && it->a > c.a && it->g <= c.g) s.erase(it++);
      }
    }
    printf("%d\n", ans);
  }
  return 0;
}

//代码来自https://github.com/aoapc-book/aoapc-bac2nd
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)