RegCloseKey函数是释放一个对指定注册表项的句柄。

```cpp
LONG RegCloseKey(
  HKEY hKey   // 处理键关闭。
);处理键关闭。
);
```

Parameters
    hKey      对打开键的句柄关闭。

返回值

如果函数成功，返回值为ERROR_SUCCESS。如果函数失败，返回值是Winerror.h中定义的非零错误代码。您可以使用FormatMessage函数和FORMAT_MESSAGE_FROM_SYSTEM标志来获得错误的通用描述。

例子代码

```cpp
#define RTN_UNKNOWN 0
#define RTN_SERVER 1
#define RTN_WORKSTATION 2
#define RTN_NTAS 3
#define RTN_ERROR 13

DWORD GetWindowsVariant(void)
{
    #define MY_BUFSIZE 32    // Arbitrary initial value. 
                             // Dynamic allocation will be used.
    HKEY hKey;
    TCHAR szProductType[MY_BUFSIZE];
    DWORD dwBufLen = MY_BUFSIZE;
    LONG lRet;

    if(RegOpenKeyEx(HKEY_LOCAL_MACHINE,
        TEXT("SYSTEM\\CurrentControlSet\\Control\\ProductOptions"),
                    0,
                    KEY_QUERY_VALUE,
                    &hKey) != ERROR_SUCCESS) return RTN_ERROR;

    lRet = RegQueryValueEx(hKey,
                    TEXT("ProductType"),
                    NULL,
                    NULL,
                    (LPBYTE)szProductType,
                    &dwBufLen);

    RegCloseKey(hKey);

    if(lRet != ERROR_SUCCESS) return RTN_ERROR;

    // check product options, in order of likelihood
    if(lstrcmpi(TEXT("WINNT"), szProductType) == 0) 
         return RTN_WORKSTATION;
    if(lstrcmpi(TEXT("SERVERNT"), szProductType) == 0) 
         return RTN_SERVER;
    if(lstrcmpi(TEXT("LANMANNT"), szProductType) == 0) 
         return RTN_NTAS;
    // else return "unknown variant" code
    else return RTN_UNKNOWN;
} 
```