importPackage (Packages.com.siran.autojs.javanative);
var s1 = 0, s2 = 1, s3 = 2;
var k = 1;
if(k == 1 ) {
    s1 = 1;
}
//使用异步函数，流程：rn调用check函数，chech执行脚本，然后while循环等待，
//等待同步锁完成，之后读取结果值，并通过promis返回。脚本使用与java代码协作的特性，在得到想要的结果后，调用java
//静态函数，写入结果并解除同步锁。