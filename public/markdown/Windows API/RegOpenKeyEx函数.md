RegOpenKeyEx函数打开指定的注册表项。

```syntax
LONG RegOpenKeyEx(
  HKEY hKey,         // handle to open key
  LPCTSTR lpSubKey,  // subkey name
  DWORD ulOptions,   // reserved
  REGSAM samDesired, // security access mask
  PHKEY phkResult    // handle to open key
); hKey,         // handle to open key
  LPCTSTR lpSubKey,  // subkey name
  DWORD ulOptions,   // reserved
  REGSAM samDesired, // security access mask
  PHKEY phkResult    // handle to open key
);
```

参数

hkey：当前打开的密钥或以下预定义密钥之一的句柄

**HKEY_CLASSES_ROOTHKEY_CURRENT_CONFIGHKEY_CURRENT_USERHKEY_LOCAL_MACHINEHKEY_USERSWindows NT/2000/XP: HKEY_PERFORMANCE_DATAWindows 95/98/Me: HKEY_DYN_DATA**

lpSubKey：指向一个空终止字符串的指针，该字符串包含要打开的子键的名称。如果该参数为NULL或指向空字符串的指针，则函数将为由hKey参数标识的键打开一个新句柄。在这种情况下，函数将不会关闭先前打开的句柄。

ulOptions：保留;必须是零。

samDesired：一个访问掩码，它指定对密钥的期望访问权限。这个参数可以是以下值的组合。KEY_CREATE_LINK、KEY_CREATE_SUB_KEY、KEY_ENUMERATE_SUB_KEYS、KEY_EXECUTE、KEY_NOTIFY、KEY_QUERY_VALUE、KEY_SET_VALUE、KEY_ALL_ACCESS、KEY_READ、KEY_WOW64_64KEY、KEY_WOW64_32KEY、KEY_WRITE。

phkResult：指向变量的指针，该变量接收打开的键的句柄。当您不再需要返回的句柄时，请调用RegCloseKey函数来关闭它。

返回值

如果函数成功，返回值为ERROR_SUCCESS。如果函数失败，返回值是Winerror.h中定义的非零错误代码。您可以使用FormatMessage函数和FORMAT_MESSAGE_FROM_SYSTEM标志来获得错误的通用描述。

示例代码：

```html
#include<stdio.h>
#include<conio.h>
#include<windows.h>
void main(void)
{
	long lRet;
	HKEY hKey;
	TCHAR tchData[64];
	DWORD dwSize;
	lRet=RegOpenKeyEx(
	HKEY_LOCAL_MACHINE,         // handle to open key
	"Hardware\\Description\\System\\CentralProcessor\\0",  // subkey name
	0,   // reserved
	KEY_QUERY_VALUE, // security access mask
	&hKey    // handle to open key
	);
	if(lRet==ERROR_SUCCESS)
	{
		dwSize=sizeof(tchData);
		lRet=RegQueryValueEx(
		hKey,            // handle to key
		"ProcessorNameString",  // value name
		NULL,   // reserved
		NULL,       // type buffer
		(LPBYTE)tchData,        // data buffer
		&dwSize      // size of data buffer
		);
		if(lRet==ERROR_SUCCESS)
		{
			printf("\n CPU INFO:");
			printf("%s\n",tchData);
		}
		//以下是失败的内容
		else
		{
			printf("\nCPU INFO:");
			printf("UNKNOWN\n");
		}
	}
	//以下是打开失败
	else
	{
		printf("\n CPU INFO:");
		printf("UNKNOWN\n");
	}
	RegCloseKey(hKey);
	getch();
}
```

