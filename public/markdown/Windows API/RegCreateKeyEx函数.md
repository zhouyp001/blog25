RegCreateKeyEx函数：创建指定的注册表项。如果键已经存在，函数将打开它。

```cpp
LONG RegCreateKeyEx(
  HKEY hKey,                                  // handle to open key
  LPCTSTR lpSubKey,                           // subkey name
  DWORD Reserved,                             // reserved
  LPTSTR lpClass,                             // class string
  DWORD dwOptions,                            // special options
  REGSAM samDesired,                          // desired security access
  LPSECURITY_ATTRIBUTES lpSecurityAttributes, // inheritance
  PHKEY phkResult,                            // key handle 
  LPDWORD lpdwDisposition                     // disposition value buffer
); hKey,                                  // handle to open key
  LPCTSTR lpSubKey,                           // subkey name
  DWORD Reserved,                             // reserved
  LPTSTR lpClass,                             // class string
  DWORD dwOptions,                            // special options
  REGSAM samDesired,                          // desired security access
  LPSECURITY_ATTRIBUTES lpSecurityAttributes, // inheritance
  PHKEY phkResult,                            // key handle 
  LPDWORD lpdwDisposition                     // disposition value buffer
);
```

参数

hkey：当前打开的密钥或以下预定义密钥之一的句柄:

HKEY_CLASSES_ROOT
HKEY_CURRENT_CONFIG
HKEY_CURRENT_USERHKEY_LOCAL_MACHINE
HKEY_USERS
Windows NT / 2000 / XP:HKEY_PERFORMANCE_DATAWindows 95/98 / Me:HKEY_DYN_DATA

ReCreateKeyEx函数打开或创建的键是由hKey参数标识的键的子键。

lpSubKey：指向空终止字符串的指针，该字符串指定此函数打开或创建的子键的名称。指定的子键必须是由hKey参数标识的键的子键。这个参数不能为空。

Windows NT/2000/XP: lpSubKey指定的子键名不能以反斜杠字符('\')开头。如果是，则返回ERROR_BAD_PATHNAME。

Windows 95/98/Me:忽略lpSubKey指定的子键名称中的开始反斜杠字符。

Reserved：保留;必须是零。

lpClass：指向空终止字符串的指针，该字符串指定此键的类(对象类型)。如果键已经存在，则忽略此参数。目前没有定义类;应用程序应该传递一个空字符串。Windows 95和Windows 98只对远程注册表键使用此参数;对于本地注册表项，它是被忽略的。对于本地和远程注册表键，Windows NT/Windows 2000都支持此参数。

dwOptions ：指定密钥的特殊选项。此参数可以是以下值之一。REG_OPTION_NON_VOLATILE、REG_OPTION_VOLATILE、REG_OPTION_BACKUP_RESTORE。

samDesired ：一个访问掩码，它指定对密钥的期望访问权限。这个参数可以是以下值的组合。KEY_CREATE_LINK、KEY_CREATE_SUB_KEY、KEY_ENUMERATE_SUB_KEYS、KEY_EXECUTE、KEY_NOTIFY、KEY_QUERY_VALUE、KEY_SET_VALUE、KEY_ALL_ACCESS、KEY_READ、KEY_WOW64_64KEY、KEY_WOW64_32KEY、KEY_WRITE。

lpSecurityAttributes ：一个SECURITY_ATTRIBUTES结构的指针，该结构确定返回的句柄是否可以被子进程继承。如果lpSecurityAttributes为NULL，则不能继承该句柄。

Windows NT/2000/XP:结构的lpSecurityDescriptor成员为新密钥指定了安全描述符。如果lpSecurityAttributes为空，则该键获得一个默认的安全描述符。

phkResult ：指向一个变量的指针，该变量接收以下配置值之一。REG_CREATED_NEW_KEY、REG_OPENED_EXISTING_KEY，

返回值

如果函数成功，返回值为ERROR_SUCCESS。

如果函数失败，返回值是Winerror.h中定义的非零错误代码。您可以使用FormatMessage函数和FORMAT_MESSAGE_FROM_SYSTEM标志来获得错误的通用描述。

示例代码：

```cpp
#include <windows.h>
#include <stdio.h>
#include <aclapi.h>

void main(int argc, char *argv[]) {

DWORD dwRes, dwDisposition;
PSID pEveryoneSID = NULL, pAdminSID = NULL;
PACL pACL = NULL;
PSECURITY_DESCRIPTOR pSD = NULL;
EXPLICIT_ACCESS ea[2];
SID_IDENTIFIER_AUTHORITY SIDAuthWorld = SECURITY_WORLD_SID_AUTHORITY;
SID_IDENTIFIER_AUTHORITY SIDAuthNT = SECURITY_NT_AUTHORITY;
SECURITY_ATTRIBUTES sa;
LONG lRes;
HKEY hkSub = NULL;

// Create a well-known SID for the Everyone group.

if(! AllocateAndInitializeSid( &SIDAuthWorld, 1,
                 SECURITY_WORLD_RID,
                 0, 0, 0, 0, 0, 0, 0,
                 &pEveryoneSID) ) {
    printf( "AllocateAndInitializeSid Error %u\n", GetLastError() );
    return;
}

// Initialize an EXPLICIT_ACCESS structure for an ACE.
// The ACE will allow Everyone read access to the key.

ZeroMemory(&ea, 2 * sizeof(EXPLICIT_ACCESS));
ea[0].grfAccessPermissions = KEY_READ;
ea[0].grfAccessMode = SET_ACCESS;
ea[0].grfInheritance= NO_INHERITANCE;
ea[0].Trustee.TrusteeForm = TRUSTEE_IS_SID;
ea[0].Trustee.TrusteeType = TRUSTEE_IS_WELL_KNOWN_GROUP;
ea[0].Trustee.ptstrName  = (LPTSTR) pEveryoneSID;

// Create a SID for the BUILTIN\Administrators group.

if(! AllocateAndInitializeSid( &SIDAuthNT, 2,
                 SECURITY_BUILTIN_DOMAIN_RID,
                 DOMAIN_ALIAS_RID_ADMINS,
                 0, 0, 0, 0, 0, 0,
                 &pAdminSID) ) {
    printf( "AllocateAndInitializeSid Error %u\n", GetLastError() );
    goto Cleanup; 
}

// Initialize an EXPLICIT_ACCESS structure for an ACE.
// The ACE will allow the Administrators group full access to the key.

ea[1].grfAccessPermissions = KEY_ALL_ACCESS;
ea[1].grfAccessMode = SET_ACCESS;
ea[1].grfInheritance= NO_INHERITANCE;
ea[1].Trustee.TrusteeForm = TRUSTEE_IS_SID;
ea[1].Trustee.TrusteeType = TRUSTEE_IS_GROUP;
ea[1].Trustee.ptstrName  = (LPTSTR) pAdminSID;

// Create a new ACL that contains the new ACEs.

dwRes = SetEntriesInAcl(2, ea, NULL, &pACL);
if (ERROR_SUCCESS != dwRes) {
    printf( "SetEntriesInAcl Error %u\n", GetLastError() );
    goto Cleanup;
}

// Initialize a security descriptor.  
 
pSD = (PSECURITY_DESCRIPTOR) LocalAlloc(LPTR, 
                         SECURITY_DESCRIPTOR_MIN_LENGTH); 
if (pSD == NULL) { 
    printf( "LocalAlloc Error %u\n", GetLastError() );
    goto Cleanup; 
} 
 
if (!InitializeSecurityDescriptor(pSD, SECURITY_DESCRIPTOR_REVISION)) {  
    printf( "InitializeSecurityDescriptor Error %u\n", 
                            GetLastError() );
    goto Cleanup; 
} 
 
// Add the ACL to the security descriptor. 
 
if (!SetSecurityDescriptorDacl(pSD, 
        TRUE,     // fDaclPresent flag   
        pACL, 
        FALSE))   // not a default DACL 
{  
    printf( "SetSecurityDescriptorDacl Error %u\n", GetLastError() );
    goto Cleanup; 
} 

// Initialize a security attributes structure.

sa.nLength = sizeof (SECURITY_ATTRIBUTES);
sa.lpSecurityDescriptor = pSD;
sa.bInheritHandle = FALSE;

// Use the security attributes to set the security descriptor 
// when you create a key.
 
lRes = RegCreateKeyEx(HKEY_CURRENT_USER, "mykey", 0, "", 0, 
        KEY_READ | KEY_WRITE, &sa, &hkSub, &dwDisposition); 
printf( "RegCreateKeyEx result %u\n", lRes );

Cleanup:

    if (pEveryoneSID) 
        FreeSid(pEveryoneSID);
    if (pAdminSID) 
        FreeSid(pAdminSID);
    if (pACL) 
        LocalFree(pACL);
    if (pSD) 
        LocalFree(pSD);
    if (hkSub) 
        RegCloseKey(hkSub);
    return;

}
```

