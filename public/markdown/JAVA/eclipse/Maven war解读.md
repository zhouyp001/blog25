**maven是干嘛的：**maven其实是一个项目构建和管理的工具，主要就是提供了帮助管理 构建、文档、报告、依赖、scms、发布、分发的方法。是可以方便的编译代码、进行依赖管理、管理二进制库等的。

------

**maven war项目中的pom.xml文件：**描述了maven项目的基本信息，比如groupId，artifactId，version等。也可以对maven项目的远程仓库，打包形式，资源依赖关系等进行配置。一个最简单的pom.xml文件至少需要包含四个元素：modelVersion, groupId, artiffactId和version。

![img](img/20190426174619845.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlX3lpXw==,size_16,color_FFFFFF,t_70)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

------

**创建Maven war项目：**new->project->maven project->(勾选create a simple project)->

![img](img/20190428125914501.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlX3lpXw==,size_16,color_FFFFFF,t_70)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

Group Id和Artifact Id是为了保证项目唯一性而提出的；
Group Id：可以简单理解为项目开发团队的统一标识，一般分为多个段；实际开发中一般使用两段，第一段代表域，类似org，com，cn等；第二段代表公司名称或者团队名称；
ArtifactId：可以简单理解为实际的项目名称；在实际的开发过程中，创建包时包名最好以Group Id+Artifact Id开头；例如，在一个项目中设置了Group Id为com.zyipeng，Artifact Id为test，则Service层的包，完整的包名应该为com.zyipeng.test.service。

------

**Maven war项目的web.xml文件中servlet标签内容：**
重定向类：表示根据servlet-name定向到具体的java servlet类调用service方法，实现请求的操作和响应
重定向路径：表示访问相应的路径就可以调用配置的重定向类。

![img](img/20190428131037602.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

 **Maven war项目文件的架构简单简绍：**

![img](img/20190428132401589.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tlX3lpXw==,size_16,color_FFFFFF,t_70)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

 