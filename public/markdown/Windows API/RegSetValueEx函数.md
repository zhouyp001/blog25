RegSetValueEx函数在注册表项下设置指定值的数据和类型。

```cpp
LONG RegSetValueEx(
  HKEY hKey,           // handle to key
  LPCTSTR lpValueName, // value name
  DWORD Reserved,      // reserved
  DWORD dwType,        // value type
  CONST BYTE *lpData,  // value data
  DWORD cbData         // size of value data
); hKey,           // handle to key
  LPCTSTR lpValueName, // value name
  DWORD Reserved,      // reserved
  DWORD dwType,        // value type
  CONST BYTE *lpData,  // value data
  DWORD cbData         // size of value data
);
```

参数

hkey： 当前打开的密钥或以下预定义密钥之一的句柄: 

**HKEY_CLASSES_ROOTHKEY_CURRENT_CONFIGHKEY_CURRENT_USERHKEY_LOCAL_MACHINEHKEY_USERSWindows NT/2000/XP: HKEY_PERFORMANCE_DATAWindows 95/98/Me: HKEY_DYN_DATA**

lpValueName：指向一个字符串的指针，该字符串包含要设置的值的名称。如果键中不存在这个名称的值，函数将其添加到键中。如果lpValueName是NULL或空字符串""，函数将为键的未命名或默认值设置类型和数据。

Reserved：保留;必须是零。

dwType：指定由lpData参数指向的数据类型的代码。有关可能类型代码的列表，请参见注册表值类型。![img](img\20180705173320511.png?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlX3lpXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

Ipdata：指向一个缓冲区的指针，该缓冲区包含以指定值名存储的数据。对于基于字符串的数据类型，如REG_SZ，字符串必须为空终止。对于REG_MULTI_SZ数据类型，字符串必须以双null结尾。

cbData：指定lpData参数指向的信息的大小(以字节为单位)。如果数据类型为REG_SZ、REG_EXPAND_SZ或REG_MULTI_SZ，则cbData必须包括终止null字符或字符的大小。

**返回值**

如果函数成功，返回值为ERROR_SUCCESS。如果函数失败，返回值是Winerror.h中定义的非零错误代码。您可以使用FormatMessage函数和FORMAT_MESSAGE_FROM_SYSTEM标志来获得错误的通用描述。

**示例代码：**

```cpp
#include<stdio.h>
#include<windows.h>
void main(void)
{
	//根键、子键名称和到子键的句柄
	HKEY hRoot=HKEY_LOCAL_MACHINE;
	char *szSubKey="Software\\Microsoft\\Windows\\CurrentVersion\\Run";
	HKEY hKey;//打开指定子键
	DWORD dwDisposition=REG_OPENED_EXISTING_KEY;
	//如果不存在就创建
	LONG lRet=RegCreateKeyEx(
		hRoot,
		szSubkey,
		0,
		NULL,
		REG_OPTION_NON_VOLATILE,KEY_ALL_ACCESS,
		NULL,
		&hKey,
		&dwDisposition
		);
	if(lRet!=ERROR_SUCCESS)
		return;
	//得到当前执行文件的文件名（包含路径）
	char szModule[MAX_PATH];
	GetModuleFileName(NULL,szModule,MAX_PATH);
	//创建一个新的键值，设置键值数据为文件
	lRet=RegSetValueEx(
		hKey,
		"SelfRunDemo",
		0,
		REG_SZ,
		(BYTE*)szModule,
		strlen(szModule)
		);
	if(lRet==ERROR_SUCCESS)
		printf("self run success\n");
	//关闭子键句柄
	RegCloseKey(hKey);
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)