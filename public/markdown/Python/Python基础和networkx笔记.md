**pip** freeze    #查看已经安装的模块
pip install ***    #如果为已安装模块就会显示安装目录

数学操作符
**[指数]、%、//[整除]、/、*、-、+

**漂亮打印字典**
pprint.pprint()
pprint.pfromat()

字符串里面的**isX**函数
islower()、isupper（）、isalpha（）[只包含字母]、isalnum（）[只包含字母和数字]、isdecimal（）[只包含数字]、isspace（）[只包含空格、制表符、换行]、istitle（）[里面每一个单词都是大写字母开头其他都是小写字母]  [所有这些都是非空]

'a'.join(['cats','rats','bats'])
'cats,rats,bats'.split(',')
pyperclip.paste()、pyperclip.copy()#剪贴板操作
'  hello word  '.strip()、.lstrip()、.rstrip()
'hello'.rjust(10)、.ljust(10)、.center(10)
'hello world!'.startswith('hello')、endswith('world!')

**正则表达式**
匹配
1.用improt re导入正则表达式模块
2.用re.complie()函数创建一个Regex对象（记得使用原始字符串）
3.向Regex对象的search()方法传入想查找的字符串。返回Match对象
4.调用Match对象的group()方法，返回实际匹配文本的字符串
5.调用Match对象的findall()方法，返回所用实际匹配文本的字符串
6.re.complie()函数第二个参数re.IGNORECASE[忽略大小写]、re.DOTALL [让句点包含换行]、re.VERBOSE[编写注释]
符号
\1.  ?匹配零次或一次前面的分组
\2.  *匹配零次或多次前面的分组
\3. +匹配一次或多次前面的分组
\4. {n}匹配n次前面的分组
\5. {n,}匹配n次或更多前面的分组
\6. {,m}匹配零次到m次前面的分组
\7. {n,m}匹配至少n次、至多m次前面的分组
\8. {n,m}?或*？或+？对前面的分组进行非贪心匹配
\9. ^spam意味着字符串必须以spam开始
\10. spam$意味着字符串必须以spam结尾
\11. . 匹配所有字符，除换行符外
\12. \d、\w、\s 分别匹配 数字、单词、空格
\13. \D、\W、\S 分别匹配 除数字、单词、空格外的所有字符
\14. [abc] 匹配方括号内的任意字符
\15. [^abc] 匹配不在方括号内的任意字符

**文件操作**
基本操作
os.path.join('usr','bin','spam')
os.getcwd()、os.chdir('C:\\Windows\\System32')
os.makedirs('C:\\delicious\\walnut\\waffles')
os.path.abspath('.')、os.path.isabs('.')、os.path.relpath(porpusepath,startpath)
os.path.dirname(path)、os.path.basename(path)、os.path.split(path)
'C:\\Windows\\System32\\calc.exe'.split(os.path.sep)
os.path.getsize('.\\calc.exe')、os.listdir('.')
os.path.exists('C:\\Windows')、os.path.isdir('C:\\Windows')、os.path.isfile('C:\\Windows')
hellofile=open('C:\\User\\filename.txt')#第二个参数w、a、r，返回一个File对象
hellocontext=hellofile.read()
hellocontext=hellofile.readlines()
hellofile.write('hello world!\n')

shelve模块
import shelve
shelfFile=shelve.open('mydata')
cats=['Zophie','Pooka']
shelfFile['cats']=cats
shelfFile.close()
shelfFile=shelve.open('mydata')
type(shelfFile)#检查数据是否正确存储
shelfFile['cats']
list(shelfFile.keys())
list(shelfFile.values())
shelfFile.close()

用pprint.pformat()函数保存变量
import pprint
cats=[{'name':'Zophie','desc':'chubby'}]
fileObj=open('myCats.py','w')
fileObj.write('cats='+pprint.pformat(cats)+'\n')
fileObj.close()


**Networkx**
无向图
import networkx an nx    #导入包重名为nx
import matplotlib.pyplot as plt    
G=nx.Graph()        #建立空的无向图
G.add_node(1)        #添加节点1
G.add_edge(2,3)        #添加边2-3（隐含添加2、3节点）
print(G.nodes())        #输入全部节点
print(G.edges())        #输出全部边
print(G.number_of_edges())    #输出边数

pos=nx.spectral_layout(G)    #定义一个布局
nx.draw(G,pos,with_labels=False,node_size=30)#绘制
\#with_labels决定节点带不带标签，node_size决定节点直径
plt.show()        #显示图形


**操作excel文件**
improt openpyxl            #导入openpyxl模块
wb=openpyxl.load_workbook('example.xlsx')#打开一个excel文件
wb.get_sheet_names()        #获得工作簿中所有的表名的列表
sheet=wb.get_sheet_by_name('Sheet3')#获得工作表Sheet3的Worksheet对象
sheet.title            #返回工作表的名字
anotherSheet=wb.get_active_sheet()    #获得打开工作簿出现的工作表
a1=sheet['A1']            #表示该工作表的一个单元格
a1.value                #单元格内保存的值
print('Cell '+str(a.coordinate)+', Row '+str(a1.row)+',Column '+a1.lumn+' is '+a1.value)
\#'Cell A1, Row 1, Column A is Apples'
for i in range(1,8,2):
    print(i,sheet.cell(row=i,column=2).value)
sheet.max_row            #获取最大行
sheet.max_colum            #获取最大列
from openpyxl.utils import get_column_letter,column_index_from_string#引入函数
get_column_letter(1)        #将数字装还成excel列的形式
column_index_from_string('AA')    #将列的形式转换成数字（不区分大小写）

\#从列表中取得行和列

\#一行一行显示
for rowOfCellObjects in sheet['A1':'C3']:
    for cellobj in rowOfCellObjects:
        print(cellObj.coordinate,cellObj.value)
\#输出一行
for cellObj in sheet.row[1]:
    print(cellObj.value)
\#输出一列
for cellObj in sheet.columns[1]:
    print(cellObj.value)

**NumPy**
ndarray数组
数组创建函数：
array：    array([数据、列表、元组、数组和其他序列类型])#数据类型指定或自动、默认直接复制输入数据
asarray:    #如果输入不是ndarray就复制
arange：    #类似内置range
ones、ones_like: #创建一个全1adarray数组，ones(2,3)、ones_like([[1,2,3],[2,3,4]])
zeros、zeros_like:#创建全0数组
empty、empty_like:#创建空值数组
eye、identity：    #创建N x N单位矩阵（对角线全1，其它为0）

NumPy的数据类型：
intN、floatN、complexN、bool、object[Python对象类型]、string_[例如要创建一个长度为10的字符串、应使用S10]、unicode_
例：
arr=np.array([1,2,3]),dtype=np.float64)
arr.dtype                    #显示类型
arr1=arr.astype(np.int64)            #显式类型转换

未完成。。。