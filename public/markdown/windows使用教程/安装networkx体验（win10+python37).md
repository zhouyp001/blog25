开始百度了一下安装方式，需要下载networkx、pywin32、numpy、matplotlib一些软件。

根据百度的提示，手动下载，手动安装，完全没有成功，也不排除问题在我。安装失败

然后我通过pip下载，下载最新的python，使用自带pip，pip在python安装文件夹的scripts文件夹下面，将路径加入path（这样就不要在pip所在文件夹下运行pip命令），通过pip install ***（前面四个需要安装的模块都是可以这样安装的）。

\#安装下载的whl文件也是可以用pip的，pip install ***（文件路径+文件全名），其实我也是因为看到whl文件可以用pip安装才想到用它去安装那些的  / xyx

安装成功后就可以开始调用这些东西了，去调用试试。，不行再回来接着写

下面是安装的全部过程，中间因为网速问题有几次中断

【当时使用的是管理院权限下的dos，因为我将python安装在敏感的地方，需要管理员权限才能更改】

```bash
Microsoft Windows [版本 10.0.17134.523]
(c) 2018 Microsoft Corporation。保留所有权利。

C:\WINDOWS\system32>pip install numpy
Collecting numpy
  Using cached https://files.pythonhosted.org/packages/dd/3e/0d7a914ee6cceef588dd83b18e257dc474ac67028a8d340dfec644878128/numpy-1.16.0-cp37-cp37m-win_amd64.whl
Installing collected packages: numpy
Successfully installed numpy-1.16.0

C:\WINDOWS\system32>pip install matplotlib
Collecting matplotlib
  Downloading https://files.pythonhosted.org/packages/5c/ee/efaf04efc763709f6840cd8d08865d194f7453f43e98d042c92755cdddec/matplotlib-3.0.2-cp37-cp37m-win_amd64.whl (8.9MB)
    66% |█████████████████████▌          | 6.0MB 11kB/s eta 0:04:25Exception:
Traceback (most recent call last):
  File "c:\program files\python37\lib\site-packages\pip\_vendor\urllib3\response.py", line 331, in _error_catcher
    yield
  File "c:\program files\python37\lib\site-packages\pip\_vendor\urllib3\response.py", line 413, in read
    data = self._fp.read(amt)
  File "c:\program files\python37\lib\site-packages\pip\_vendor\cachecontrol\filewrapper.py", line 62, in read
    data = self.__fp.read(amt)
  File "c:\program files\python37\lib\http\client.py", line 447, in read
    n = self.readinto(b)
  File "c:\program files\python37\lib\http\client.py", line 491, in readinto
    n = self.fp.readinto(b)
  File "c:\program files\python37\lib\socket.py", line 589, in readinto
    return self._sock.recv_into(b)
  File "c:\program files\python37\lib\ssl.py", line 1052, in recv_into
    return self.read(nbytes, buffer)
  File "c:\program files\python37\lib\ssl.py", line 911, in read
    return self._sslobj.read(len, buffer)
socket.timeout: The read operation timed out

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "c:\program files\python37\lib\site-packages\pip\_internal\cli\base_command.py", line 143, in main
    status = self.run(options, args)
  File "c:\program files\python37\lib\site-packages\pip\_internal\commands\install.py", line 318, in run
    resolver.resolve(requirement_set)
  File "c:\program files\python37\lib\site-packages\pip\_internal\resolve.py", line 102, in resolve
    self._resolve_one(requirement_set, req)
  File "c:\program files\python37\lib\site-packages\pip\_internal\resolve.py", line 256, in _resolve_one
    abstract_dist = self._get_abstract_dist_for(req_to_install)
  File "c:\program files\python37\lib\site-packages\pip\_internal\resolve.py", line 209, in _get_abstract_dist_for
    self.require_hashes
  File "c:\program files\python37\lib\site-packages\pip\_internal\operations\prepare.py", line 283, in prepare_linked_requirement
    progress_bar=self.progress_bar
  File "c:\program files\python37\lib\site-packages\pip\_internal\download.py", line 836, in unpack_url
    progress_bar=progress_bar
  File "c:\program files\python37\lib\site-packages\pip\_internal\download.py", line 673, in unpack_http_url
    progress_bar)
  File "c:\program files\python37\lib\site-packages\pip\_internal\download.py", line 897, in _download_http_url
    _download_url(resp, link, content_file, hashes, progress_bar)
  File "c:\program files\python37\lib\site-packages\pip\_internal\download.py", line 617, in _download_url
    hashes.check_against_chunks(downloaded_chunks)
  File "c:\program files\python37\lib\site-packages\pip\_internal\utils\hashes.py", line 48, in check_against_chunks
    for chunk in chunks:
  File "c:\program files\python37\lib\site-packages\pip\_internal\download.py", line 585, in written_chunks
    for chunk in chunks:
  File "c:\program files\python37\lib\site-packages\pip\_internal\utils\ui.py", line 159, in iter
    for x in it:
  File "c:\program files\python37\lib\site-packages\pip\_internal\download.py", line 574, in resp_read
    decode_content=False):
  File "c:\program files\python37\lib\site-packages\pip\_vendor\urllib3\response.py", line 465, in stream
    data = self.read(amt=amt, decode_content=decode_content)
  File "c:\program files\python37\lib\site-packages\pip\_vendor\urllib3\response.py", line 430, in read
    raise IncompleteRead(self._fp_bytes_read, self.length_remaining)
  File "c:\program files\python37\lib\contextlib.py", line 130, in __exit__
    self.gen.throw(type, value, traceback)
  File "c:\program files\python37\lib\site-packages\pip\_vendor\urllib3\response.py", line 336, in _error_catcher
    raise ReadTimeoutError(self._pool, None, 'Read timed out.')
pip._vendor.urllib3.exceptions.ReadTimeoutError: HTTPSConnectionPool(host='files.pythonhosted.org', port=443): Read timed out.

C:\WINDOWS\system32>pip install matplotlib
Collecting matplotlib
  Downloading https://files.pythonhosted.org/packages/5c/ee/efaf04efc763709f6840cd8d08865d194f7453f43e98d042c92755cdddec/matplotlib-3.0.2-cp37-cp37m-win_amd64.whl (8.9MB)
    100% |████████████████████████████████| 8.9MB 88kB/s
Collecting python-dateutil>=2.1 (from matplotlib)
  Downloading https://files.pythonhosted.org/packages/74/68/d87d9b36af36f44254a8d512cbfc48369103a3b9e474be9bdfe536abfc45/python_dateutil-2.7.5-py2.py3-none-any.whl (225kB)
    100% |████████████████████████████████| 235kB 75kB/s
Requirement already satisfied: numpy>=1.10.0 in c:\program files\python37\lib\site-packages (from matplotlib) (1.16.0)
Collecting pyparsing!=2.0.4,!=2.1.2,!=2.1.6,>=2.0.1 (from matplotlib)
  Downloading https://files.pythonhosted.org/packages/de/0a/001be530836743d8be6c2d85069f46fecf84ac6c18c7f5fb8125ee11d854/pyparsing-2.3.1-py2.py3-none-any.whl (61kB)
    100% |████████████████████████████████| 71kB 59kB/s
Collecting kiwisolver>=1.0.1 (from matplotlib)
  Downloading https://files.pythonhosted.org/packages/7c/be/7ae355b45699460e369ebf88d86058fca26827933974cc3f6b6b7800a324/kiwisolver-1.0.1-cp37-none-win_amd64.whl (57kB)
    100% |████████████████████████████████| 61kB 86kB/s
Collecting cycler>=0.10 (from matplotlib)
  Downloading https://files.pythonhosted.org/packages/f7/d2/e07d3ebb2bd7af696440ce7e754c59dd546ffe1bbe732c8ab68b9c834e61/cycler-0.10.0-py2.py3-none-any.whl
Collecting six>=1.5 (from python-dateutil>=2.1->matplotlib)
  Downloading https://files.pythonhosted.org/packages/73/fb/00a976f728d0d1fecfe898238ce23f502a721c0ac0ecfedb80e0d88c64e9/six-1.12.0-py2.py3-none-any.whl
Requirement already satisfied: setuptools in c:\program files\python37\lib\site-packages (from kiwisolver>=1.0.1->matplotlib) (40.6.2)
Installing collected packages: six, python-dateutil, pyparsing, kiwisolver, cycler, matplotlib
Successfully installed cycler-0.10.0 kiwisolver-1.0.1 matplotlib-3.0.2 pyparsing-2.3.1 python-dateutil-2.7.5 six-1.12.0

C:\WINDOWS\system32>pip install networkx
Collecting networkx
  Downloading https://files.pythonhosted.org/packages/f3/f4/7e20ef40b118478191cec0b58c3192f822cace858c19505c7670961b76b2/networkx-2.2.zip (1.7MB)
    17% |█████▌                          | 296kB 7.7kB/s eta 0:03:03Exception:
Traceback (most recent call last):
  File "c:\program files\python37\lib\site-packages\pip\_vendor\urllib3\response.py", line 331, in _error_catcher
    yield
  File "c:\program files\python37\lib\site-packages\pip\_vendor\urllib3\response.py", line 413, in read
    data = self._fp.read(amt)
  File "c:\program files\python37\lib\site-packages\pip\_vendor\cachecontrol\filewrapper.py", line 62, in read
    data = self.__fp.read(amt)
  File "c:\program files\python37\lib\http\client.py", line 447, in read
    n = self.readinto(b)
  File "c:\program files\python37\lib\http\client.py", line 491, in readinto
    n = self.fp.readinto(b)
  File "c:\program files\python37\lib\socket.py", line 589, in readinto
    return self._sock.recv_into(b)
  File "c:\program files\python37\lib\ssl.py", line 1052, in recv_into
    return self.read(nbytes, buffer)
  File "c:\program files\python37\lib\ssl.py", line 911, in read
    return self._sslobj.read(len, buffer)
socket.timeout: The read operation timed out

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "c:\program files\python37\lib\site-packages\pip\_internal\cli\base_command.py", line 143, in main
    status = self.run(options, args)
  File "c:\program files\python37\lib\site-packages\pip\_internal\commands\install.py", line 318, in run
    resolver.resolve(requirement_set)
  File "c:\program files\python37\lib\site-packages\pip\_internal\resolve.py", line 102, in resolve
    self._resolve_one(requirement_set, req)
  File "c:\program files\python37\lib\site-packages\pip\_internal\resolve.py", line 256, in _resolve_one
    abstract_dist = self._get_abstract_dist_for(req_to_install)
  File "c:\program files\python37\lib\site-packages\pip\_internal\resolve.py", line 209, in _get_abstract_dist_for
    self.require_hashes
  File "c:\program files\python37\lib\site-packages\pip\_internal\operations\prepare.py", line 283, in prepare_linked_requirement
    progress_bar=self.progress_bar
  File "c:\program files\python37\lib\site-packages\pip\_internal\download.py", line 836, in unpack_url
    progress_bar=progress_bar
  File "c:\program files\python37\lib\site-packages\pip\_internal\download.py", line 673, in unpack_http_url
    progress_bar)
  File "c:\program files\python37\lib\site-packages\pip\_internal\download.py", line 897, in _download_http_url
    _download_url(resp, link, content_file, hashes, progress_bar)
  File "c:\program files\python37\lib\site-packages\pip\_internal\download.py", line 617, in _download_url
    hashes.check_against_chunks(downloaded_chunks)
  File "c:\program files\python37\lib\site-packages\pip\_internal\utils\hashes.py", line 48, in check_against_chunks
    for chunk in chunks:
  File "c:\program files\python37\lib\site-packages\pip\_internal\download.py", line 585, in written_chunks
    for chunk in chunks:
  File "c:\program files\python37\lib\site-packages\pip\_internal\utils\ui.py", line 159, in iter
    for x in it:
  File "c:\program files\python37\lib\site-packages\pip\_internal\download.py", line 574, in resp_read
    decode_content=False):
  File "c:\program files\python37\lib\site-packages\pip\_vendor\urllib3\response.py", line 465, in stream
    data = self.read(amt=amt, decode_content=decode_content)
  File "c:\program files\python37\lib\site-packages\pip\_vendor\urllib3\response.py", line 430, in read
    raise IncompleteRead(self._fp_bytes_read, self.length_remaining)
  File "c:\program files\python37\lib\contextlib.py", line 130, in __exit__
    self.gen.throw(type, value, traceback)
  File "c:\program files\python37\lib\site-packages\pip\_vendor\urllib3\response.py", line 336, in _error_catcher
    raise ReadTimeoutError(self._pool, None, 'Read timed out.')
pip._vendor.urllib3.exceptions.ReadTimeoutError: HTTPSConnectionPool(host='files.pythonhosted.org', port=443): Read timed out.

C:\WINDOWS\system32>pip install networkx
Collecting networkx
  Downloading https://files.pythonhosted.org/packages/f3/f4/7e20ef40b118478191cec0b58c3192f822cace858c19505c7670961b76b2/networkx-2.2.zip (1.7MB)
    100% |████████████████████████████████| 1.7MB 187kB/s
Collecting decorator>=4.3.0 (from networkx)
  Downloading https://files.pythonhosted.org/packages/bc/bb/a24838832ba35baf52f32ab1a49b906b5f82fb7c76b2f6a7e35e140bac30/decorator-4.3.0-py2.py3-none-any.whl
Installing collected packages: decorator, networkx
  Running setup.py install for networkx ... done
Successfully installed decorator-4.3.0 networkx-2.2

C:\WINDOWS\system32>pip install pywin32
Collecting pywin32
  Downloading https://files.pythonhosted.org/packages/a3/8a/eada1e7990202cd27e58eca2a278c344fef190759bbdc8f8f0eb6abeca9c/pywin32-224-cp37-cp37m-win_amd64.whl (9.0MB)
    47% |███████████████                 | 4.3MB 7.0kB/s eta 0:11:20Exception:
Traceback (most recent call last):
  File "c:\program files\python37\lib\site-packages\pip\_vendor\urllib3\response.py", line 331, in _error_catcher
    yield
  File "c:\program files\python37\lib\site-packages\pip\_vendor\urllib3\response.py", line 413, in read
    data = self._fp.read(amt)
  File "c:\program files\python37\lib\site-packages\pip\_vendor\cachecontrol\filewrapper.py", line 62, in read
    data = self.__fp.read(amt)
  File "c:\program files\python37\lib\http\client.py", line 447, in read
    n = self.readinto(b)
  File "c:\program files\python37\lib\http\client.py", line 491, in readinto
    n = self.fp.readinto(b)
  File "c:\program files\python37\lib\socket.py", line 589, in readinto
    return self._sock.recv_into(b)
  File "c:\program files\python37\lib\ssl.py", line 1052, in recv_into
    return self.read(nbytes, buffer)
  File "c:\program files\python37\lib\ssl.py", line 911, in read
    return self._sslobj.read(len, buffer)
socket.timeout: The read operation timed out

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "c:\program files\python37\lib\site-packages\pip\_internal\cli\base_command.py", line 143, in main
    status = self.run(options, args)
  File "c:\program files\python37\lib\site-packages\pip\_internal\commands\install.py", line 318, in run
    resolver.resolve(requirement_set)
  File "c:\program files\python37\lib\site-packages\pip\_internal\resolve.py", line 102, in resolve
    self._resolve_one(requirement_set, req)
  File "c:\program files\python37\lib\site-packages\pip\_internal\resolve.py", line 256, in _resolve_one
    abstract_dist = self._get_abstract_dist_for(req_to_install)
  File "c:\program files\python37\lib\site-packages\pip\_internal\resolve.py", line 209, in _get_abstract_dist_for
    self.require_hashes
  File "c:\program files\python37\lib\site-packages\pip\_internal\operations\prepare.py", line 283, in prepare_linked_requirement
    progress_bar=self.progress_bar
  File "c:\program files\python37\lib\site-packages\pip\_internal\download.py", line 836, in unpack_url
    progress_bar=progress_bar
  File "c:\program files\python37\lib\site-packages\pip\_internal\download.py", line 673, in unpack_http_url
    progress_bar)
  File "c:\program files\python37\lib\site-packages\pip\_internal\download.py", line 897, in _download_http_url
    _download_url(resp, link, content_file, hashes, progress_bar)
  File "c:\program files\python37\lib\site-packages\pip\_internal\download.py", line 617, in _download_url
    hashes.check_against_chunks(downloaded_chunks)
  File "c:\program files\python37\lib\site-packages\pip\_internal\utils\hashes.py", line 48, in check_against_chunks
    for chunk in chunks:
  File "c:\program files\python37\lib\site-packages\pip\_internal\download.py", line 585, in written_chunks
    for chunk in chunks:
  File "c:\program files\python37\lib\site-packages\pip\_internal\utils\ui.py", line 159, in iter
    for x in it:
  File "c:\program files\python37\lib\site-packages\pip\_internal\download.py", line 574, in resp_read
    decode_content=False):
  File "c:\program files\python37\lib\site-packages\pip\_vendor\urllib3\response.py", line 465, in stream
    data = self.read(amt=amt, decode_content=decode_content)
  File "c:\program files\python37\lib\site-packages\pip\_vendor\urllib3\response.py", line 430, in read
    raise IncompleteRead(self._fp_bytes_read, self.length_remaining)
  File "c:\program files\python37\lib\contextlib.py", line 130, in __exit__
    self.gen.throw(type, value, traceback)
  File "c:\program files\python37\lib\site-packages\pip\_vendor\urllib3\response.py", line 336, in _error_catcher
    raise ReadTimeoutError(self._pool, None, 'Read timed out.')
pip._vendor.urllib3.exceptions.ReadTimeoutError: HTTPSConnectionPool(host='files.pythonhosted.org', port=443): Read timed out.

C:\WINDOWS\system32>pip install pywin32
Collecting pywin32
  Downloading https://files.pythonhosted.org/packages/a3/8a/eada1e7990202cd27e58eca2a278c344fef190759bbdc8f8f0eb6abeca9c/pywin32-224-cp37-cp37m-win_amd64.whl (9.0MB)
    100% |████████████████████████████████| 9.1MB 6.3kB/s
Installing collected packages: pywin32
Successfully installed pywin32-224

C:\WINDOWS\system32>
```

