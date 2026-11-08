RegConnectRegistry函数在另一台计算机上建立到预定义注册表键的连接。

```cpp
LONG RegConnectRegistry(
  LPCTSTR lpMachineName, // 计算机名称
  HKEY hKey,             // 预定义的注册表处理
  PHKEY phkResult        // 用于远程关键句柄的缓冲区。
); lpMachineName, // 计算机名称
  HKEY hKey,             // 预定义的注册表处理
  PHKEY phkResult        // 用于远程关键句柄的缓冲区。
);
```

参数

lpMachineName：指向指定远程计算机名称的空终止字符串的指针。如果该参数为空，则使用本地计算机名。

hkey：指定远程计算机上的下列预定义键之一。

HKEY_LOCAL_MACHINE

HKEY_USERS

Windows NT / 2000 / XP:HKEY_PERFORMANCE_DATA

Windows 95/98 / Me:HKEY_DYN_DATA

Windows 95/98 / Me:HKEY_CURRENT_CONFIG

不能为该参数指定HKEY_CLASSES_ROOT或HKEY_CURRENT_USER值。

phkResult：指向一个变量的指针，该变量接收一个关键句柄，用于识别远程计算机上的预定义句柄。

返回值

如果函数成功，返回值为ERROR_SUCCESS。如果函数失败，返回值是Winerror.h中定义的非零错误代码。可以使用FormatMessage函数和FORMAT_MESSAGE_FROM_SYSTEM标志来获得错误的通用描述。