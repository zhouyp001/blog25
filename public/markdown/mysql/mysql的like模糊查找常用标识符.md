下面列举常用的几种标识含义；

1:% 表示零个或多个字符的任意字符串： 

​    \1. LIKE'Mi%' 将搜索以字母 Mi开头的所有字符串（如 Michael）。

​    \2. LIKE'%er' 将搜索以字母 er 结尾的所有字符串（如 Worker、Reader）。

​    \3. LIKE'%en%' 将搜索在任何位置包含字母 en 的所有字符串（如 When、Green）。

2:_（下划线）表示任何单个字符：

​     \1. LIKE'_heryl' 将搜索以字母 heryl 结尾的所有六个字母的名称（如 Cheryl、Sheryl）。

3：[ ] 表示指定范围 ([a-f]) 或集合 ([abcdef]) 中的任何单个字符： 

LIKE'[CK]ars[eo]n' 将搜索下列字符串：Carsen、Karsen、Carson 和 Karson（如 Carson）。
LIKE'[M-Z]inger' 将搜索以字符串 inger 结尾、以从 M 到 Z 的任何单个字母开头的所有名称（如 Ringer）。
D：[^] 不属于指定范围 ([a-f]) 或集合 ([abcdef]) 的任何单个字符：

​      \1. LIKE'M[^c]%' 将搜索以字母 M 开头，并且第二个字母不是 c 的所有名称（如MacFeather）。

4：* 它同于DOS命令中的通配符，代表多个字符：

​       \1. c*c代表cc,cBc,cbc,cabdfec等多个字符。

5：？同于DOS命令中的？通配符，代表单个字符 :

​       \1. b?b代表brb,bFb等。

6：# 大致同上，不同的是代只能代表单个数字。

​       \1. k#k代表k1k,k8k,k0k 。

7：[!] 排除 它只代表单个字符。
举例：
例1，查询name字段中包含有“明”字的。
select * from table1 where name like '%明%'

例2，查询name字段中以“李”字开头。
select * from table1 where name like '李*'

例3，查询name字段中含有数字的。
select * from table1 where name like '%[0-9]%'

例4，查询name字段中含有小写字母的。
select * from table1 where name like '%[a-z]%'

例5，查询name字段中不含有数字的。
select * from table1 where name like '%[!0-9]%'

以上例子能列出什么值来显而易见。但在这里，我们着重要说明的是通配符“*”与“%”的区别。

很多朋友会问，为什么我在以上查询时有个别的表示所有字符的时候用"%"而不用“*”？先看看下面的例子能分别出现什么结果：
select * from table1 where name like '*明*'
select * from table1 where name like '%明%'

大家会看到，前一条语句列出来的是所有的记录，而后一条记录列出来的是name字段中含有“明”的记录，所以说，当我们作字符型字段包含一个子串的查询时最好采用“%”而不用“*”,用“*”的时候只在开头或者只在结尾时，而不能两端全由“*”代替任意字符的情况下。