在一次做题中，发现while(j<str.length())逻辑不正确的情况，比如当j=0并且str.length()==10的或者其它数，算数上j是要小于str.length()的，但是当用c/c++实现这条代码是cout<<j<str.length()<<endl,输出的是0。很奇怪。

当时我做的是nyoj5Binary String Matching 使用的是一个自己改的kmp模板；在模板实现的时候遇到的这个问题

正确代码

```cpp
#include<iostream>
#include<string>
using namespace std;
const int MaxSize=1e5;
void GetNextval(string t,int nextval[])
{
    int j=0,k=-1;
    nextval[0]=-1;
    while(j<t.length())
    {
        if(k==-1||t[j]==t[k])
        {
            j++;k++;
            if(t[j]!=t[k])
                nextval[j]=k;
            else
                nextval[j]=nextval[k];
        }
        else
            k=nextval[k];
    }
}
int KMPIndex(string s,string t)
{
    int nextval[MaxSize],i=0,j=0;
    GetNextval(t,nextval);
    int result=0;
    int sl=s.length(),tl=t.length();
    while(i<sl){
    //cout<<s.length()<<endl<<t.length()<<endl;
    //cout<<i<<endl<<j<<endl;
    //cout<<(i<s.length()&&j<t.length())<<endl;
    while(i<sl&&j<tl)///((i<s.length())&&(j<t.length()))//
    {
        if(j==-1||s[i]==t[j])
        {
            i++;
            j++;
        }
        else
            j=nextval[j];
    }
    if(j==t.length())
    {
        result++;
        i=i-j+1;
        j=0;
    }
    }
    return result;
}
int main()
{

	//freopen("C:\\Users\\zhou\\Desktop\\in.txt","r",stdin);
	//freopen("C:\\Users\\zhou\\Desktop\\out.txt","w",stdout);
	ios::sync_with_stdio(false);
    string s,t;
    int n;
    cin>>n;
    while(n--)
    {
        t.clear();s.clear();
        cin>>t>>s;
        //cout<<t<<endl<<s<<endl;
        int r=KMPIndex(s,t);
        cout<<r<<endl;
    }
    return 0;
}
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

 错误代码如下：（错误代码比正确代码只有kmp函数的while（）中有区别）

```cpp
#include<iostream>
#include<string>
using namespace std;
const int MaxSize=1e5;
void GetNextval(string t,int nextval[])
{
    int j=0,k=-1;
    nextval[0]=-1;
    while(j<t.length())
    {
        if(k==-1||t[j]==t[k])
        {
            j++;k++;
            if(t[j]!=t[k])
                nextval[j]=k;
            else
                nextval[j]=nextval[k];
        }
        else
            k=nextval[k];
    }
}
int KMPIndex(string s,string t)
{
    int nextval[MaxSize],i=0,j=0;
    GetNextval(t,nextval);
    int result=0;
    int sl=s.length(),tl=t.length();
    while(i<sl){
    //cout<<s.length()<<endl<<t.length()<<endl;
    //cout<<i<<endl<<j<<endl;
    //cout<<(i<s.length()&&j<t.length())<<endl;
    while((i<s.length())&&(j<t.length()))//(i<sl&&j<tl)///
    {
        if(j==-1||s[i]==t[j])
        {
            i++;
            j++;
        }
        else
            j=nextval[j];
    }
    if(j==t.length())
    {
        result++;
        i=i-j+1;
        j=0;
    }
    }
    return result;
}
int main()
{

	//freopen("C:\\Users\\zhou\\Desktop\\in.txt","r",stdin);
	//freopen("C:\\Users\\zhou\\Desktop\\out.txt","w",stdout);
	ios::sync_with_stdio(false);
    string s,t;
    int n;
    cin>>n;
    while(n--)
    {
        t.clear();s.clear();
        cin>>t>>s;
        //cout<<t<<endl<<s<<endl;
        int r=KMPIndex(s,t);
        cout<<r<<endl;
    }
    return 0;
}
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

解释原因，来自百度知道[missgya](https://zhidao.baidu.com/usercenter?uid=87fe4069236f25705e793901)的[回答](https://zhidao.baidu.com/question/537621390.html)

因为string的length函数，[返回类型](https://www.baidu.com/s?wd=返回类型&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)[size_type](https://www.baidu.com/s?wd=size_type&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)是个无符号类型：

[size_type](https://www.baidu.com/s?wd=size_type&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao) length( ) const;

[size_type](https://www.baidu.com/s?wd=size_type&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)   An unsigned integral type for the number of elements in a string



而根据C语言的类型自动转换规则，当signed和unsigned作运算时，signed会自动转换为unsigned。

例如：

```cpp
void main()
{
    int a = -1;
    unsigned int b = 10;
    if (a < b)
    {
        cout<< "right\n";
    }
    else
    {
        cout<< "wrong\n";
    }
}
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)


程序输出结果是wrong。因为在把a和b做比较时，会自动把a变成一个unsigned。

同样的原因，当你用：

while(i<test.length()&&j<par.length())时，length函数返回的是个unsigned，假如在判断过程中，j变成了-1，j < par.length()这个条件将不会再成立，因此循环退出。

为什么while(i<length1&&j<length)   正确呢，因为在此之前你定义的length1和length都是int，已经把length()函数返回的值变成signed了。

所以，你可以这么判断：

while(i<(signed int)test.length()&&j< (signed int)par.length())