RegQueryValueEx函数检索与开放注册表键关联的指定值名称的类型和数据。

```cpp
LONG RegQueryValueEx(
  HKEY hKey,            // handle to key
  LPCTSTR lpValueName,  // value name
  LPDWORD lpReserved,   // reserved
  LPDWORD lpType,       // type buffer
  LPBYTE lpData,        // data buffer
  LPDWORD lpcbData      // size of data buffer
); hKey,            // handle to key
  LPCTSTR lpValueName,  // value name
  LPDWORD lpReserved,   // reserved
  LPDWORD lpType,       // type buffer
  LPBYTE lpData,        // data buffer
  LPDWORD lpcbData      // size of data buffer
);
```

参数

hKey：当前打开的密钥或以下预定义密钥之一的句柄:



**HKEY_CLASSES_ROOTHKEY_CURRENT_CONFIGHKEY_CURRENT_USERHKEY_LOCAL_MACHINEHKEY_USERSWindows NT/2000/XP: HKEY_PERFORMANCE_DATAWindows XP: HKEY_PERFORMANCE_TEXTHKEY_PERFORMANCE_NLSTEXTWindows 95/98/Me: HKEY_DYN_DATA**

lpValueName：指向一个以null结尾的字符串的指针，该字符串包含要查询的值的名称。如果lpValueName是NULL或空字符串“”，函数将检索键的未命名或默认值(如果有的话)的类型和数据。

Windows 95/98/Me:每个键都有一个默认值，最初不包含数据。在Windows 95上，默认值类型总是REG_SZ。在Windows 98上，键的默认值的类型最初是REG_SZ，但是RegSetValueEx可以指定具有不同类型的默认值。

Windows NT/2000/XP:键不自动具有未命名或默认值。未命名值可以是任何类型。

lpReserved：保留;必须为NULL。

lpType：指向一个变量的指针，该变量接收指示存储在指定值中的数据类型的代码。有关可能的类型代码的列表，请参见注册表值类型。如果不需要类型代码，则lpType参数可以为NULL。

lpData：指向接收该值数据的缓冲区的指针。如果不需要数据，此参数可以为空。

lpcbData：指向一个变量的指针，该变量指定lpData参数指向的缓冲区的大小(以字节为单位)。当函数返回时，该变量包含复制到lpData的数据的大小。

如果数据具有REG_SZ、REG_MULTI_SZ或REG_EXPAND_SZ类型，那么lpcbData也将包含终止null字符或字符的大小。
只有当lpData为空时，lpcbData参数才可以为NULL。

如果lpData参数指定的缓冲区不够大，无法容纳数据，则函数返回值ERROR_MORE_DATA，并将所需的缓冲区大小(以字节为单位)存储到lpcbData指向的变量中。在这种情况下，lpValue缓冲区的内容没有定义。

如果lpData是NULL，并且lpcbData是非NULL，那么函数将返回ERROR_SUCCESS，并在lpcbData指向的变量中存储数据的大小(以字节为单位)。这让应用程序确定为值的数据分配缓冲区的最佳方法。

如果hKey指定HKEY_PERFORMANCE_DATA，而lpData缓冲区太小，RegQueryValueEx返回ERROR_MORE_DATA，但是lpcbData不返回所需的缓冲区大小。这是因为性能数据的大小可以从一个调用更改为下一个调用。在这种情况下，您必须增加缓冲区大小并调用RegQueryValueEx，在lpcbData参数中再次传递更新的缓冲区大小。重复此操作，直到函数成功。您需要维护一个单独的变量来跟踪缓冲区大小，因为lpcbData返回的值是不可预测的。



返回值

如果函数成功，返回值为ERROR_SUCCESS。



如果函数失败，返回值是Winerror.h中定义的非零错误代码。您可以使用FormatMessage函数和FORMAT_MESSAGE_FROM_SYSTEM标志来获得错误的通用描述。

示例代码：

```cpp
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

