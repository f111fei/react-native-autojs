interface Intent { }

interface Point {
    x: number;
    y: number;
}

interface Toast {
    /**获取Toast的文本内容 */
    getText(): string;
    /**获取发出Toast的应用包名 */
    getPackageName(): string;
}

interface Notification {
    number: number;
    when: number;
    getPackageName(): string;
    getTitle(): string;
    getText(): string;
    click(): void;
    delete(): void;
}

interface AppSendEmailOptions {
    /**收件人的邮件地址。如果有多个收件人，则用字符串数组表示 */
    email: string | string[];
    /**抄送收件人的邮件地址。如果有多个抄送收件人，则用字符串数组表示 */
    cc: string | string[];
    /**密送收件人的邮件地址。如果有多个密送收件人，则用字符串数组表示 */
    bcc: string | string[];
    /**邮件主题(标题) */
    subject: string;
    /**邮件正文 */
    text: string;
    /**附件的路径。 */
    attachment: string;
}

interface AppIntentOptions {
    /**意图的Action，指意图要完成的动作，是一个字符串常量，比如"android.intent.action.SEND"。当action以"android.intent.action"开头时，可以省略前缀，直接用"SEND"代替。参见[Actions](https://developer.android.com/reference/android/content/Intent.html#standard-activity-actions)。 */
    action?: string;
    /**意图的MimeType，表示和该意图直接相关的数据的类型，表示比如"text/plain"为纯文本类型。 */
    type?: string;
    /**意图的Data，表示和该意图直接相关的数据，是一个Uri, 可以是文件路径或者Url等。例如要打开一个文件, action为"android.intent.action.VIEW", data为"file:///sdcard/1.txt"。 */
    data?: string;
    /**意图的类别。比较少用。参见[Categories](https://developer.android.com/reference/android/content/Intent.html#standard-categories)。 */
    category?: string[];
    /**目标包名 */
    packageName?: string;
    /**目标Activity或Service等组件的名称 */
    className?: string;
    /**以键值对构成的这个Intent的Extras(额外信息)。提供该意图的其他信息，例如发送邮件时的邮件标题、邮件正文。参见[Extras](https://developer.android.com/reference/android/content/Intent.html#standard-extra-data)。 */
    extras?: Object;
    /**ntent的标识，字符串数组，例如`["activity_new_task", "grant_read_uri_permission"]`。参见[Flags](https://developer.android.com/reference/android/content/Intent.html#setFlags%28int%29)。 */
    flags?: string[];
    /**是否以root权限启动、发送该intent。使用该参数后，不能使用`context.startActivity()`等方法，而应该直接使用诸如`app.startActivity({...})`的方法。 */
    root?: boolean;
}

interface ConsoleLogConfig {
    /**日志文件路径，将会把日志写入该文件中 */
    file?: string;
    /**最大文件大小，单位字节，默认为512 * 1024 (512KB) */
    maxFileSize?: number;
    /**写入的日志级别，默认为"ALL"（所有日志），可以为"OFF"(关闭), "DEBUG", "INFO", "WARN", "ERROR", "FATAL"等。 */
    rootLevel?: string;
    /**日志备份文件最大数量，默认为5 */
    maxBackupSize?: number;
    /**日志写入格式，参见[PatternLayout](http://logging.apache.org/log4j/1.2/apidocs/org/apache/log4j/PatternLayout.html) */
    filePattern?: string;
}

interface DialogBuildOptions {
    /**对话框标题 */
    title?: string;
    /**对话框标题的颜色 */
    titleColor?: string | number;
    /**对话框按钮的波纹效果颜色 */
    buttonRippleColor?: string | number;
    /**对话框的图标，是一个URL或者图片对象 */
    icon?: string | any;
    /**对话框文字内容 */
    content?: string;
    /**对话框文字内容的颜色 */
    contentColor?: string | number;
    /**对话框文字内容的行高倍数，1.0为一倍行高 */
    contentLineSpacing?: number;
    /**对话框列表的选项 */
    items?: string[];
    /**对话框列表的选项的文字颜色 */
    itemsColor?: string | number;
    /**对话框列表的选项选择模式，可以为: select 普通选择模式, single 单选模式 multi 多选模式 */
    itemsSelectMode?: 'select' | 'single' | 'multi';
    /**对话框列表中预先选中的项目索引，如果是单选模式为一个索引；多选模式则为数组 */
    itemsSelectedIndex?: number | number[];
    /**对话框确定按钮的文字内容(最右边按钮) */
    positive?: string;
    /**对话框确定按钮的文字颜色(最右边按钮) */
    positiveColor?: string | number;
    /**对话框中立按钮的文字内容(最左边按钮) */
    neutral?: string;
    /**对话框中立按钮的文字颜色(最左边按钮) */
    neutralColor?: string | number;
    /**对话框取消按钮的文字内容(确定按钮左边的按钮) */
    negative?: string;
    /**对话框取消按钮的文字颜色(确定按钮左边的按钮) */
    negativeColor?: string | number;
    /**勾选框文字内容 */
    checkBoxPrompt?: string;
    /**勾选框是否勾选 */
    checkBoxChecked?: boolean;
    /**配置对话框进度条的对象 */
    progress?: {
        /**进度条的最大值，如果为-1则为无限循环的进度条 */
        max?: number;
        /**如果为true, 则对话框无限循环的进度条为水平进度条 */
        horizontal?: boolean;
        /**是否显示进度条的最大值和最小值  */
        showMinMax?: boolean;
    };
    /**对话框是否可取消，如果为false，则对话框只能用代码手动取消 */
    cancelable?: boolean;
    /**对话框是否在点击对话框以外区域时自动取消，默认为true */
    canceledOnTouchOutside?: boolean;
    /**对话框的输入框的输入提示 */
    inputHint?: string;
    /**对话框输入框的默认输入内容 */
    inputPrefill?: string;
}

interface App {
    /**
     * 当前软件版本号，整数值。例如160, 256等。
     * 如果在Auto.js中运行则为Auto.js的版本号；在打包的软件中则为打包软件的版本号。
     */
    versionCode: number;

    /**
     * 当前软件的版本名称，例如"3.0.0 Beta"。
     * 如果在Auto.js中运行则为Auto.js的版本名称；在打包的软件中则为打包软件的版本名称。
     */
    versionName: string;

    autojs: {
        /**
         * Auto.js版本号，整数值。例如160, 256等。
         */
        versionCode: number;
        /**
         * Auto.js版本名称，例如"3.0.0 Beta"。
         */
        versionName: string;
    };

    /**
     * 通过应用名称启动应用。如果该名称对应的应用不存在，则返回false; 否则返回true。如果该名称对应多个应用，则只启动其中某一个。
     * 该函数也可以作为全局函数使用。
     * @param appName 应用名称
     */
    launchApp(appName: string): void;

    /**
     * 通过应用包名启动应用。如果该包名对应的应用不存在，则返回false；否则返回true。
     * 该函数也可以作为全局函数使用。
     * @param packageName 应用包名
     */
    launch(packageName: string): void;

    /**
     * 相当于`app.launch(packageName)。`
     * @param packageName 应用包名
     */
    launchPackage(packageName: string): void;

    /**
     * 获取应用名称对应的已安装的应用的包名。如果该找不到该应用，返回null；如果该名称对应多个应用，则只返回其中某一个的包名。
     * 该函数也可以作为全局函数使用。
     * @param appName 应用名称
     */
    getPackageName(appName: string): void;

    /**
     * 获取应用包名对应的已安装的应用的名称。如果该找不到该应用，返回null。
     * 该函数也可以作为全局函数使用。
     * @param packageName 应用包名
     */
    getAppName(packageName: string): void;

    /**
     * 打开应用的详情页(设置页)。如果找不到该应用，返回false; 否则返回true。
     * 该函数也可以作为全局函数使用。
     * @param packageName 应用包名
     */
    openAppSetting(packageName: string): void;

    /**
     * 用其他应用查看文件。文件不存在的情况由查看文件的应用处理。
     * 如果找不出可以查看该文件的应用，则抛出`ActivityNotException`。
     * ```
     * //查看文本文件
     * app.viewFile("/sdcard/1.txt");
     * ```
     * @param path 文件路径
     */
    viewFile(path: string): void;

    /**
     * 用其他应用编辑文件。文件不存在的情况由编辑文件的应用处理。
     * 如果找不出可以编辑该文件的应用，则抛出`ActivityNotException`。
     * ```
     * //编辑文本文件
     * app.editFile("/sdcard/1.txt/);
     * ```
     * @param path 文件路径
     */
    editFile(path: string): void;

    /**
     * 卸载应用。执行后会会弹出卸载应用的提示框。如果该包名的应用未安装，由应用卸载程序处理，可能弹出"未找到应用"的提示。
     * ```
     * //卸载QQ
     * app.uninstall("com.tencent.mobileqq");
     * ```
     * @param packageName 应用包名
     */
    uninstall(packageName: string): void;

    /**
     * 用浏览器打开网站url。
     * 如果没有安装浏览器应用，则抛出`ActivityNotException`。
     * @param url 网站的Url，如果不以**"http://"或"https://"开头则默认是"http://"。**
     */
    openUrl(url: string): void;

    /**
     * 根据选项options调用邮箱应用发送邮件。这些选项均是可选的。
     * 如果没有安装邮箱应用，则抛出`ActivityNotException`。
     * ```
     * //发送邮件给10086@qq.com和10001@qq.com。
     * app.sendEmail({
     *     email: ["10086@qq.com", "10001@qq.com"],
     *     subject: "这是一个邮件标题",
     *     text: "这是邮件正文"
     * });
     * ```
     * @param options 发送邮件的参数
     */
    sendEmail(options: AppSendEmailOptions): void;

    /**
     * 启动Auto.js的特定界面。该函数在Auto.js内运行则会打开Auto.js内的界面，在打包应用中运行则会打开打包应用的相应界面。
     * @param name 活动名称，可选的值为:
     * console 日志界面
     * settings 设置界面
     */
    startActivity(name: 'console' | 'settings'): void;


    //------------
    //Intent(意图) 是一个消息传递对象，您可以使用它从其他应用组件请求操作。
    //------------

    /**
     * 根据选项，构造一个意图Intent对象。
     * 例如：
     * ```
     * //打开应用来查看图片文件
     * var i = app.intent({
     *     action: "VIEW",
     *     type: "image/png",
     *     data: "file:///sdcard/1.png"
     * });
     * context.startActivity(i);
     * ```
     * 需要注意的是，除非应用专门暴露Activity出来，否则在没有root权限的情况下使用intent是无法跳转到特定Activity、应用的特定界面的。例如我们能通过Intent跳转到QQ的分享界面，是因为QQ对外暴露了分享的Activity；而在没有root权限的情况下，我们无法通过intent跳转到QQ的设置界面，因为QQ并没有暴露这个Activity。
     * 
     * 但如果有root权限，则在intent的参数加上`"root": true`即可。例如使用root权限跳转到Auto.js的设置界面为：
     * ```
     * app.startActivity({
     *    packageName: "org.autojs.autojs",
     *    className: "org.autojs.autojs.ui.settings.SettingsActivity_",
     *    root: true
     *});
     * ```
     * 另外，关于intent的参数如何获取的问题，一些intent是意外发现并且在网络中传播的（例如跳转QQ聊天窗口是因为QQ给网页提供了跳转到客服QQ的方法），如果要自己获取活动的intent的参数，可以通过例如"intent记录"，"隐式启动"等应用拦截内部intent或者查询暴露的intent。其中拦截内部intent需要XPosed框架，或者可以通过反编译等手段获取参数。总之，没有简单直接的方法。
     * 更多信息，请百度安卓Intent或参考Android指南: Intent。
     * @param options 选项
     */
    intent(options: AppIntentOptions): Intent;

    /**
     * 根据选项构造一个Intent，并启动该Activity。
     * ```
     *app.startActivity({
     *    action: "SEND",
     *    type: "text/plain",
     *    data: "file:///sdcard/1.txt"
     *});
     * ```
     * @param options 选项 
     */
    startActivity(options: AppIntentOptions): Intent;

    /**
     * 根据选项构造一个Intent，并发送该广播。
     * @param options 选项
     */
    sendBroadcast(options: AppIntentOptions): Intent;

    /**
     * 根据选项构造一个Intent，并启动该服务。
     * @param options 选项
     */
    startService(options: AppIntentOptions): Intent;

    /**
     * 发送以上特定名称的广播可以触发Auto.js的布局分析，方便脚本调试。这些广播在Auto.js发送才有效，在打包的脚本上运行将没有任何效果。
     * @param name 特定的广播名称，包括：
     * inspect_layout_hierarchy 布局层次分析
     * inspect_layout_bounds 布局范围
     */
    sendBroadcast(name: 'inspect_layout_hierarchy' | 'inspect_layout_bounds'): void;

    /**
     * 根据选项构造一个Intent，转换为对应的shell的intent命令的参数。
     * 例如:
     * ```
     * shell("am start " + app.intentToShell({
     *    packageName: "org.autojs.autojs",
     *    className: "org.autojs.autojs.ui.settings.SettingsActivity_"
     *}), true);
     * ```
     * 参见[intent参数的规范](https://developer.android.com/studio/command-line/adb#IntentSpec)。
     * @param options 选项
     */
    intentToShell(options: AppIntentOptions): string;

    /**
     * 解析uri字符串并返回相应的Uri对象。即使Uri格式错误，该函数也会返回一个Uri对象，但之后如果访问该对象的scheme, path等值可能因解析失败而返回`null`。
     * 
     * 需要注意的是，在高版本Android上，由于系统限制直接在Uri暴露文件的绝对路径，因此如果uri字符串是文件`file://...`，返回的Uri会是诸如`content://...`的形式。
     * @param uri 一个代表Uri的字符串，例如`"file:///sdcard/1.txt"`, `"https://www.autojs.org"`
     */
    parseUri(uri: string): Uri;

    /**
     * 从一个文件路径创建一个uri对象。需要注意的是，在高版本Android上，由于系统限制直接在Uri暴露文件的绝对路径，因此返回的Uri会是诸如`content://...`的形式。
     * @param path 文件路径，例如`"/sdcard/1.txt"`
     */
    getUriForFile(path: string): Uri;
}

interface Runtime {
    /**
     * 动态申请安卓的权限。例如：
     * ```
     * //请求GPS权限
     * runtime.requestPermissions(["access_fine_location"]);
     * ```
     * 尽管安卓有很多权限，但必须写入Manifest才能动态申请，为了防止权限的滥用，目前Auto.js只能额外申请两个权限：
     * access_fine_location GPS权限
     * record_audio 录音权限
     * 
     * 您可以通过APK编辑器来增加Auto.js以及Auto.js打包的应用的权限。
     * @param permissions 权限的字符串数组
     */
    requestPermissions(permissions: string[]): void;

    /**
     * 加载目标jar文件，加载成功后将可以使用该Jar文件的类。
     * ```
     * // 加载jsoup.jar
     * runtime.loadJar("./jsoup.jar");
     * // 使用jsoup解析html
     * importClass(org.jsoup.Jsoup);
     * log(Jsoup.parse(files.read("./test.html")));
     * ```
     * (jsoup是一个Java实现的解析Html DOM的库，可以在Jsoup下载)
     * @param path jar文件路径
     */
    loadJar(path: string): void;

    /**
     * 加载目标dex文件，加载成功后将可以使用该dex文件的类。
     * 
     * 因为加载jar实际上是把jar转换为dex再加载的，因此加载dex文件会比jar文件快得多。可以使用Android SDK的build tools的dx工具把jar转换为dex。
     * @param path dex文件路径
     */
    loadDex(path: string): void;
}

interface Console {
    /**
     * 显示控制台。这会显示一个控制台的悬浮窗(需要悬浮窗权限)。
     */
    show(): void;

    /**
     * 隐藏控制台悬浮窗。
     */
    hide(): void;

    /**
     * 清空控制台。
     */
    clear(): void;

    /**
     * 打印到控制台，并带上换行符。 可以传入多个参数，第一个参数作为主要信息，其他参数作为类似于 printf(3) 中的代替值（参数都会传给 util.format()）。
     * ```
     * const count = 5;
     * console.log('count: %d', count);
     * // 打印: count: 5 到 stdout
     * console.log('count:', count);
     * // 打印: count: 5 到 stdout
     * ```
     * 详见 util.format()。该函数也可以作为全局函数使用。
     */
    log(data: string, ...args: any[]): void;

    /**
     * 与console.log类似，但输出结果以灰色字体显示。输出优先级低于log，用于输出观察性质的信息。
     */
    verbose(data: string, ...args: any[]): void;

    /**
     * 与console.log类似，但输出结果以绿色字体显示。输出优先级高于log, 用于输出重要信息。
     */
    info(data: string, ...args: any[]): void;

    /**
     * 与console.log类似，但输出结果以蓝色字体显示。输出优先级高于info, 用于输出警告信息。
     */
    warn(data: string, ...args: any[]): void;

    /**
     * 与console.log类似，但输出结果以红色字体显示。输出优先级高于warn, 用于输出错误信息。
     */
    error(data: string, ...args: any[]): void;

    /**
     * 断言。如果value为false则输出错误信息message并停止脚本运行。
     */
    assert(value: boolean, message: string): void;

    /**
     * 启动一个定时器，用以计算一个操作的持续时间。 定时器由一个唯一的 `label` 标识。 当调用 `console.timeEnd()` 时，可以使用相同的 `label` 来停止定时器，并以毫秒为单位将持续时间输出到控制台。 重复启动同一个标签的定时器会覆盖之前启动同一标签的定时器。
     * @param label 计时器标签，可省略
     */
    time(label?: string): void;

    /**
     * 停止之前通过调用 `console.time()` 启动的定时器，并打印结果到控制台。 调用 `console.timeEnd()` 后定时器会被删除。如果不存在标签指定的定时器则会打印 `NaNms`。
     * ```
     * console.time('求和');
     * var sum = 0;
     * for(let i = 0; i < 100000; i++){
     *     sum += i;
     * }
     * console.timeEnd('求和');
     * // 打印 求和: xxx ms
     * ```
     * @param label 计时器标签
     */
    timeEnd(label?: string): void;

    /**
     * 与console.log类似，同时会打印出调用这个函数所在的调用栈信息（即当前运行的文件、行数等信息）。
     * ```
     * console.trace('Show me');
     * // 打印: (堆栈跟踪会根据被调用的跟踪的位置而变化)
     * // Show me
     * //  at <test>:7
     * ```
     */
    trace(data: string, ...args: any[]): void;

    /**
     * 与console.log一样输出信息，并在控制台显示输入框等待输入。按控制台的确认按钮后会将输入的字符串用eval计算后返回。
     */
    input(data: string, ...args: any[]): string | number | boolean;

    /**
     * 与console.log一样输出信息，并在控制台显示输入框等待输入。按控制台的确认按钮后会将输入的字符串直接返回。
     */
    rawInput(data: string, ...args: any[]): string;

    /**
     * 设置控制台的大小，单位像素。
     */
    setSize(width: number, height: number): void;

    /**
     * 设置控制台的位置，单位像素。
     */
    setPosition(x: number, y: number): void;

    /**
     * 设置日志保存的路径和配置。例如把日志保存到"/sdcard/1.txt":
     * ```
     * console.setGlobalLogConfig({
     *     "file": "/sdcard/1.txt"
     * });
     * ```
     * 注意该函数会影响所有脚本的日志记录。
     * @param config 日志配置
     */
    setGlobalLogConfig(config: ConsoleLogConfig): void;

    /**
     * 相当于`log(text)`。
     * @param text 要打印到控制台的信息
     */
    print(text: string): void;
}

/**
 * 暂停运行n毫秒的时间。1秒等于1000毫秒。
 * @param n 毫秒数
 */
declare function sleep(n: number): void;

/**
 * 返回最近一次监测到的正在运行的应用的包名，一般可以认为就是当前正在运行的应用的包名。
 * 
 * 此函数依赖于无障碍服务，如果服务未启动，则抛出异常并提示用户启动。
 */
declare function currentPackage(): string;

/**
 * 返回最近一次监测到的正在运行的Activity的名称，一般可以认为就是当前正在运行的Activity的名称。
 * 
 * 此函数依赖于无障碍服务，如果服务未启动，则抛出异常并提示用户启动。
 */
declare function currentActivity(): string;

/**
 * 设置剪贴板内容。此剪贴板即系统剪贴板，在一般应用的输入框中"粘贴"既可使用。
 * @param text 文本
 */
declare function setClip(text: string): void;

/**
 * 返回系统剪贴板的内容。
 */
declare function getClip(): string;

/**
 * 以气泡显示信息message几秒。(具体时间取决于安卓系统，一般都是2秒)
 * 
 * 注意，信息的显示是"异步"执行的，并且，不会等待信息消失程序才继续执行。如果在循环中执行该命令，可能出现脚本停止运行后仍然有不断的气泡信息出现的情况。 例如:
 * ```
 * for(var i = 0; i < 100; i++){
 *  toast(i);
 *}
 * ```
 * 运行这段程序以后，会很快执行完成，且不断弹出消息，在任务管理中关闭所有脚本也无法停止。 要保证气泡消息才继续执行可以用：
 * ```
 * for(var i = 0; i < 100; i++){
 *  toast(i);
 *  sleep(2000);
 *}
 * ```
 * 或者修改toast函数：
 * ```
 * var _toast_ = toast;
 * toast = function(message){
 *   _toast_(message);
 *   sleep(2000);
 * }
 * for(var i = 0; i < 100; i++){
 *   toast(i);
 * }
 * ```
 * @param message 要显示的消息
 */
declare function toast(message: string): void;

/**
 * 相当于`toast(message);log(message)`。显示信息message并在控制台中输出。参见console.log。
 * @param message 要显示的消息
 */
declare function toastLog(message: string): void;

/**
 * 等待指定的Activity出现，period为检查Activity的间隔。
 * @param activity Activity名称
 * @param period 轮询等待间隔（毫秒）,默认200
 */
declare function waitForActivity(activity: string, period?: number): void;

/**
 * 等待指定的应用出现。例如`waitForPackage("com.tencent.mm")`为等待当前界面为微信。
 * @param packageName 包名
 * @param period 轮询等待间隔（毫秒）,默认200
 */
declare function waitForPackage(packageName: string, period?: number): void;

/**
 * 立即停止脚本运行。
 * 
 * 立即停止是通过抛出`ScriptInterrupttedException`来实现的，因此如果用`try...catch`把exit()函数的异常捕捉，则脚本不会立即停止，仍会运行几行后再停止。
 */
declare function exit(): void;

/**
 * 返回在[0, 1)的随机浮点数。
 */
declare function random(): number;

/**
 * 返回一个在[min...max]之间的随机数。例如random(0, 2)可能产生0, 1, 2。
 * @param min 随机数产生的区间下界
 * @param max 随机数产生的区间上界
 */
declare function random(min: number, max: number): number;

/**
 * 表示此脚本需要Android API版本达到指定版本才能运行。例如`requiresApi(19)`表示脚本需要在Android 4.4以及以上运行。
 * 调用该函数时会判断运行脚本的设备系统的版本号，如果没有达到要求则抛出异常。
 * @param api 
 */
declare function requiresApi(api: number): void;

/**
 * 表示此脚本需要Auto.js版本达到指定版本才能运行。例如`requiresAutojsVersion("3.0.0 Beta")`表示脚本需要在Auto.js 3.0.0 Beta以及以上运行。
 * 调用该函数时会判断运行脚本的Auto.js的版本号，如果没有达到要求则抛出异常。
 * version参数可以是整数表示版本号，例如`requiresAutojsVersion(250)`；也可以是字符串格式表示的版本，例如"3.0.0 Beta", "3.1.0 Alpha4", "3.2.0"等。
 * 可以通过`app.autojs.versionCode`和`app.autojs.versionName`获取当前的Auto.js版本号和版本。
 * @param version Auto.js的版本或版本号
 */
declare function requiresAutojsVersion(version: string | number): void;


// ---------基于坐标的触摸模拟start------------
// 本章节介绍了一些使用坐标进行点击、滑动的函数。这些函数有的需要安卓7.0以上，有的需要root权限。
// 要获取要点击的位置的坐标，可以在开发者选项中开启"指针位置"。
// 基于坐标的脚本通常会有分辨率的问题，这时可以通过setScreenMetrics()函数来进行自动坐标放缩。这个函数会影响本章节的所有点击、长按、滑动等函数。通过设定脚本设计时的分辨率，使得脚本在其他分辨率下自动放缩坐标。
// 控件和坐标也可以相互结合。一些控件是无法点击的(clickable为false), 无法通过.click()函数来点击，这时如果安卓版本在7.0以上或者有root权限，就可以通过以下方式来点击：
//
// //获取这个控件
// var widget = id("xxx").findOne();
// //获取其中心位置并点击
// click(widget.bounds().centerX(), widget.bounds().centerY());
// //如果用root权限则用Tap


/**
 * 设置脚本坐标点击所适合的屏幕宽高。如果脚本运行时，屏幕宽度不一致会自动放缩坐标。
 * 例如在1920*1080的设备中，某个操作的代码为
 * ```
 * setScreenMetrics(1080, 1920);
 * click(800, 200);
 * longClick(300, 500);
 * ```
 * 那么在其他设备上AutoJs会自动放缩坐标以便脚本仍然有效。例如在540 * 960的屏幕中click(800, 200)实际上会点击位置(400, 100)。
 * @param width 屏幕宽度，单位像素
 * @param height 屏幕高度，单位像素
 */
declare function setScreenMetrics(width: number, height: number): void;

/* 安卓7.0以上的触摸和手势模拟, 注意以下命令只有Android7.0及以上才有效 */

/**
 * 模拟点击坐标(x, y)，并返回是否点击成功。只有在点击执行完成后脚本才继续执行。
 * 
 * 一般而言，只有点击过程(大约150毫秒)中被其他事件中断(例如用户自行点击)才会点击失败。
 * 
 * 使用该函数模拟连续点击时可能有点击速度过慢的问题，这时可以用`press()`函数代替。
 * @param x 要点击的坐标的x值
 * @param y 要点击的坐标的y值
 */
declare function click(x: number, y: number): void;

/**
 * 模拟长按坐标(x, y), 并返回是否成功。只有在长按执行完成（大约600毫秒）时脚本才会继续执行。
 * 
 * 一般而言，只有长按过程中被其他事件中断(例如用户自行点击)才会长按失败。
 * @param x 要点击的坐标的x值
 * @param y 要点击的坐标的y值
 */
declare function longClick(x: number, y: number): void;

/**
 * 模拟按住坐标(x, y), 并返回是否成功。只有按住操作执行完成时脚本才会继续执行。

 * 如果按住时间过短，那么会被系统认为是点击；如果时长超过500毫秒，则认为是长按。
 * 
 * 一般而言，只有按住过程中被其他事件中断才会操作失败。
 * 一个连点器的例子如下：
 * ```
 * //循环100次
 * for(var i = 0; i < 100; i++){
 *   //点击位置(500, 1000), 每次用时1毫秒
 *   press(500, 1000, 1);
 * }
 * ```
 * @param x 要点击的坐标的x值
 * @param y 要点击的坐标的y值
 * @param duration 按住时长，单位毫秒
 */
declare function press(x: number, y: number, duration: number): void;

/**
 * 模拟从坐标(x1, y1)滑动到坐标(x2, y2)，并返回是否成功。只有滑动操作执行完成时脚本才会继续执行。
 * 
 * 一般而言，只有滑动过程中被其他事件中断才会滑动失败。
 * @param x1 滑动的起始坐标的x值
 * @param y1 滑动的起始坐标的y值
 * @param x2 滑动的结束坐标的x值
 * @param y2 滑动的结束坐标的y值
 * @param duration 滑动时长，单位毫秒
 */
declare function swipe(x1: number, y1: number, x2: number, y2: number, duration: number): boolean;

type GesturePoint = [number, number];
/**
 * 模拟手势操作。例如`gesture(1000, [0, 0], [500, 500], [500, 1000])`为模拟一个从(0, 0)到(500, 500)到(500, 100)的手势操作，时长为2秒。
 */
declare function gesture(duration: number, point1: GesturePoint, point2: GesturePoint, ...points: GesturePoint[]): void;

type Gesture = [number, number, GesturePoint, GesturePoint] | [number, GesturePoint, GesturePoint];
/**
 * 同时模拟多个手势。每个手势的参数为[delay, duration, 坐标], delay为延迟多久(毫秒)才执行该手势；duration为手势执行时长；坐标为手势经过的点的坐标。其中delay参数可以省略，默认为0。
 * 例如手指捏合：
 * ```
 * gestures([0, 500, [800, 300], [500, 1000]],
         [0, 500, [300, 1500], [500, 1000]]);
 * ```
 */
declare function gestures(gesture: Gesture, ...gestures: Gesture[]): void;

/**
 * RootAutomator是一个使用root权限来模拟触摸的对象，用它可以完成触摸与多点触摸，并且这些动作的执行没有延迟。
 * 
 * 一个脚本中最好只存在一个RootAutomator，并且保证脚本结束退出他。可以在exit事件中退出RootAutomator，例如：
 * ```
 * var ra = new RootAutomator();
 * events.on('exit', function(){
 *   ra.exit();
 * });
 * //执行一些点击操作
 * ...
 * ```
 */
declare class RootAutomator {
    /**
     * 点击位置(x, y)。其中id是一个整数值，用于区分多点触摸，不同的id表示不同的"手指"，例如：
     * ```
     * var ra = new RootAutomator();
     * //让"手指1"点击位置(100, 100)
     * ra.tap(100, 100, 1);
     * //让"手指2"点击位置(200, 200);
     * ra.tap(200, 200, 2);
     * ra.exit();
     * ```
     * 如果不需要多点触摸，则不需要id这个参数。 多点触摸通常用于手势或游戏操作，例如模拟双指捏合、双指上滑等。
     * 
     * 某些情况下可能存在tap点击无反应的情况，这时可以用RootAutomator.press()函数代替。
     * @param x 横坐标
     * @param y 纵坐标
     * @param id 多点触摸id，可选，默认为1，可以通过setDefaultId指定。
     */
    tap(x: number, y: number, id?: number): void;

    /**
     * 模拟一次从(x1, y1)到(x2, y2)的时间为duration毫秒的滑动。
     * @param x1 滑动起点横坐标
     * @param y1 滑动起点纵坐标
     * @param x2 滑动终点横坐标
     * @param y2 滑动终点纵坐标
     * @param duration 滑动时长，单位毫秒，默认值为300
     * @param id 多点触摸id，可选，默认为1
     */
    swipe(x1: number, x2: number, y1: number, y2: number, duration?: number, id?: number): void;

    /**
     * 模拟按下位置(x, y)，时长为duration毫秒。
     * @param x 横坐标
     * @param y 纵坐标
     * @param duration 按下时长
     * @param id 多点触摸id，可选，默认为1
     */
    press(x: number, y: number, duration: number, id?: number): void;

    /**
     * 模拟长按位置(x, y)。
     * @param x 横坐标
     * @param y 纵坐标
     * @param duration 按下时长
     * @param id 多点触摸id，可选，默认为1
     */
    longPress(x: number, y: number, duration?: number, id?: number): void;

    /**
     * 模拟手指按下位置(x, y)。
     * @param x 横坐标
     * @param y 纵坐标
     * @param id 多点触摸id，可选，默认为1
     */
    touchDown(x: number, y: number, id?: number): void;

    /**
     * 模拟移动手指到位置(x, y)。
     * @param x 横坐标
     * @param y 纵坐标
     * @param id 多点触摸id，可选，默认为1
     */
    touchMove(x: number, y: number, id?: number): void;

    /**
     * 模拟手指弹起。
     * @param id 多点触摸id，可选，默认为1
     */
    touchUp(id?: number): void;
}

/**
 * 需要Root权限
 * 
 * 实验API，请勿过度依赖
 * 
 * 点击位置(x, y), 您可以通过"开发者选项"开启指针位置来确定点击坐标。
 */
declare function Tap(x: number, y: number): void;

/**
 * 需要Root权限
 * 
 * 实验API，请勿过度依赖
 * 
 * 滑动。从(x1, y1)位置滑动到(x2, y2)位置。
 */
declare function Swipe(x1: number, x2: number, y1: number, y2: number, duration?: number): void;

// ---------基于坐标的触摸模拟end------------

interface Device {
    /**
     * 设备屏幕分辨率宽度。例如1080。
     */
    width: number;

    /**
     * 设备屏幕分辨率高度。例如1920。
     */
    height: number;

    /**
     * 修订版本号，或者诸如"M4-rc20"的标识。
     */
    buildId: string;

    /**
     * 设备的主板(?)名称。
     */
    broad: string;

    /**
     * 与产品或硬件相关的厂商品牌，如"Xiaomi", "Huawei"等。
     */
    brand: string;

    /**
     * 设备在工业设计中的名称（代号）。
     */
    device: string;

    /**
     * 设备型号。
     */
    model: string;

    /**
     * 整个产品的名称。
     */
    product: string;

    /**
     * 设备Bootloader的版本。
     */
    bootloader: string;

    /**
     * 设备的硬件名称(来自内核命令行或者/proc)。
     */
    hardware: string;

    /**
     * 构建(build)的唯一标识码。
     */
    fingerprint: string;

    /**
     * 硬件序列号。
     */
    serial: string;

    /**
     * 安卓系统API版本。例如安卓4.4的sdkInt为19。
     */
    sdkInt: number;

    /**
     * 设备固件版本号。
     */
    incremental: string;

    /**
     * Android系统版本号。例如"5.0", "7.1.1"。
     */
    release: string;

    /**
     * 基础操作系统。
     */
    baseOS: string;

    /**
     * 安全补丁程序级别。
     */
    securityPatch: string;

    /**
     * 开发代号，例如发行版是"REL"。
     */
    codename: string;

    /**
     * 返回设备的IMEI。
     */
    getIMEI(): string;

    /**
     * 返回设备的Android ID。
     * 
     * Android ID为一个用16进制字符串表示的64位整数，在设备第一次使用时随机生成，之后不会更改，除非恢复出厂设置。
     */
    getAndroidId(): string;

    /**
     * 返回设备的Mac地址。该函数需要在有WLAN连接的情况下才能获取，否则会返回null。
     * 
     * 可能的后续修改：未来可能增加有root权限的情况下通过root权限获取，从而在没有WLAN连接的情况下也能返回正确的Mac地址，因此请勿使用此函数判断WLAN连接。
     */
    getMacAddress(): string;

    /**
     * 返回当前的(手动)亮度。范围为0~255。
     */
    getBrightness(): number;

    /**
     * 返回当前亮度模式，0为手动亮度，1为自动亮度。
     */
    getBrightnessMode(): number;

    /**
     * 设置当前手动亮度。如果当前是自动亮度模式，该函数不会影响屏幕的亮度。
     * 
     * 此函数需要"修改系统设置"的权限。如果没有该权限，会抛出SecurityException并跳转到权限设置界面。
     * @param b 亮度，范围0~255
     */
    setBrightness(b: number): void;

    /**
     * 设置当前亮度模式。
     * 
     * 此函数需要"修改系统设置"的权限。如果没有该权限，会抛出SecurityException并跳转到权限设置界面。
     * @param mode 亮度模式，0为手动亮度，1为自动亮度
     */
    setBrightnessMode(mode: 0 | 1): void;

    /**
     * 返回当前媒体音量。
     */
    getMusicVolume(): number;

    /**
     * 返回当前通知音量。
     */
    getNotificationVolume(): number;

    /**
     * 返回当前闹钟音量。
     */
    getAlarmVolume(): number;

    /**
     * 返回媒体音量的最大值。
     */
    getMusicMaxVolume(): number;

    /**
     * 返回通知音量的最大值。
     */
    getNotificationMaxVolume(): number;

    /**
     * 返回闹钟音量的最大值。
     */
    getAlarmMaxVolume(): number;

    /**
     * 设置当前媒体音量。
     * 
     * 此函数需要"修改系统设置"的权限。如果没有该权限，会抛出SecurityException并跳转到权限设置界面。
     */
    setMusicVolume(volume: number): void;

    /**
     * 设置当前通知音量。
     * 
     * 此函数需要"修改系统设置"的权限。如果没有该权限，会抛出SecurityException并跳转到权限设置界面。
     */
    setNotificationVolume(volume: number): void;

    /**
     * 设置当前闹钟音量。
     * 
     * 此函数需要"修改系统设置"的权限。如果没有该权限，会抛出SecurityException并跳转到权限设置界面。
     */
    setAlarmVolume(volume: number): void;

    /**
     * 返回当前电量百分比。
     */
    getBattery(): number;

    /**
     * 返回设备是否正在充电。
     */
    isCharging(): boolean;

    /**
     * 返回设备内存总量，单位字节(B)。1MB = 1024 * 1024B。
     */
    getTotalMem(): number;

    /**
     * 返回设备当前可用的内存，单位字节(B)。
     */
    getAvailMem(): number;

    /**
     * 返回设备屏幕是否是亮着的。如果屏幕亮着，返回true; 否则返回false。
     * 
     * 需要注意的是，类似于vivo xplay系列的息屏时钟不属于"屏幕亮着"的情况，虽然屏幕确实亮着但只能显示时钟而且不可交互，此时isScreenOn()也会返回false。
     */
    isScreenOn(): boolean;

    /**
     * 唤醒设备。包括唤醒设备CPU、屏幕等。可以用来点亮屏幕。
     */
    wakeUp(): void;

    /**
     * 如果屏幕没有点亮，则唤醒设备。
     */
    wakeUpIfNeeded(): void;

    /**
     * 保持屏幕常亮。
     * 
     * 此函数无法阻止用户使用锁屏键等正常关闭屏幕，只能使得设备在无人操作的情况下保持屏幕常亮；同时，如果此函数调用时屏幕没有点亮，则会唤醒屏幕。
     * 
     * 在某些设备上，如果不加参数timeout，只能在Auto.js的界面保持屏幕常亮，在其他界面会自动失效，这是因为设备的省电策略造成的。因此，建议使用比较长的时长来代替"一直保持屏幕常亮"的功能，例如device.keepScreenOn(3600 * 1000)。
     * 
     * 可以使用`device.cancelKeepingAwake()`来取消屏幕常亮。
     */
    keepScreenOn(timeout?: number): void;

    /**
     * 保持屏幕常亮，但允许屏幕变暗来节省电量。此函数可以用于定时脚本唤醒屏幕操作，不需要用户观看屏幕，可以让屏幕变暗来节省电量。
     * 
     * 此函数无法阻止用户使用锁屏键等正常关闭屏幕，只能使得设备在无人操作的情况下保持屏幕常亮；同时，如果此函数调用时屏幕没有点亮，则会唤醒屏幕。
     * 
     * 可以使用`device.cancelKeepingAwake()`来取消屏幕常亮。
     */
    keepScreenDim(timeout: number): void;

    /**
     * 取消设备保持唤醒状态。用于取消`device.keepScreenOn()`, `device.keepScreenDim()`等函数设置的屏幕常亮。
     */
    cancelKeepingAwake(): void;

    /**
     * 使设备震动一段时间。
     */
    vibrate(millis: number): void;

    /**
     * 如果设备处于震动状态，则取消震动。
     */
    cancelVibration(): void;
}

interface Dialog {
    /**显示对话框 */
    show(): Dialog;
    /**关闭对话框 */
    dismiss(): Dialog;
    /**获取当前进度条的进度值，是一个整数 */
    getProgress(): number;
    /**获取当前进度条的最大进度值，是一个整数 */
    getMaxProgress(): number;
    /** */
    getActionButton(action: 'positive' | 'negative' | 'neutral'): any;

    /**对话框显示时会触发的事件。 */
    on(eventName: 'show', callback: (dialog?: Dialog) => void): Dialog;
    /**对话框被取消时会触发的事件。一个对话框可能按取消按钮、返回键取消或者点击对话框以外区域取消。 */
    on(eventName: 'cancel', callback: (dialog?: Dialog) => void): Dialog;
    /**对话框消失时会触发的事件。对话框被取消或者手动调用dialog.dismiss()函数都会触发该事件。 */
    on(eventName: 'dismiss', callback: (dialog?: Dialog) => void): Dialog;
    /**确定按钮按下时触发的事件。 */
    on(eventName: 'positive', callback: (dialog?: Dialog) => void): Dialog;
    /**取消按钮按下时触发的事件。 */
    on(eventName: 'negative', callback: (dialog?: Dialog) => void): Dialog;
    /**中性按钮按下时触发的事件。 */
    on(eventName: 'neutral', callback: (dialog?: Dialog) => void): Dialog;
    /**任意按钮按下时触发的事件。 */
    on(eventName: 'any', callback: (action: 'positive' | 'negative' | 'neutral', dialog?: Dialog) => void): Dialog;
    /**对话框列表(itemsSelectMode为"select")的项目被点击选中时触发的事件。 */
    on(eventName: 'item_select', callback: (index: number, item: any, dialog?: Dialog) => void): Dialog;
    /**对话框单选列表(itemsSelectMode为"singleChoice")的项目被选中并点击确定时触发的事件。 */
    on(eventName: 'single_choice', callback: (index: number, item: any, dialog?: Dialog) => void): Dialog;
    /**对话框多选列表(itemsSelectMode为"multiChoice")的项目被选中并点击确定时触发的事件。 */
    on(eventName: 'multi_choice', callback: (indices: number[], items: any[], dialog?: Dialog) => void): Dialog;
    /**带有输入框的对话框当点击确定时会触发的事件。 */
    on(eventName: 'input', callback: (text: string, dialog?: Dialog) => void): Dialog;
    /**对话框的输入框的文本发生变化时会触发的事件。 */
    on(eventName: 'input_change', callback: (text: string, dialog?: Dialog) => void): Dialog;
    /**勾选框 */
    on(eventName: 'check', callback: (checked: boolean) => void): Dialog;
}

interface Dialogs {
    /**
     * 显示一个只包含“确定”按钮的提示对话框。直至用户点击确定脚本才继续运行。
     * 该函数也可以作为全局函数使用。
     * ```
     * alert("出现错误~", "出现未知错误，请联系脚本作者”);
     * ```
     * 在ui模式下该函数返回一个Promise。例如:
     * ```
     * "ui";
     * alert("嘿嘿嘿").then(()=>{
     *     //当点击确定后会执行这里
     * });
     * ```
     * @param title 对话框的标题。 
     * @param content 可选，对话框的内容。默认为空。 
     * @param callback 回调函数，可选。当用户点击确定时被调用,一般用于ui模式。 
     */
    alert(title: string, content?: string, callback?: () => void): Promise<void>;
    alert(title: string, content?: string): void;

    /**
     * 显示一个包含“确定”和“取消”按钮的提示对话框。如果用户点击“确定”则返回 true ，否则返回 false 。
     * 
     * 该函数也可以作为全局函数使用。
     * @param title 对话框的标题。 
     * @param content 可选，对话框的内容。默认为空。 
     * @param callback 回调函数，可选。当用户点击确定时被调用,一般用于ui模式。 
     */
    confirm(title: string, content?: string, callback?: (value: boolean) => void): Promise<boolean>;
    confirm(title: string, content?: string): boolean;

    /**
     * 显示一个包含输入框的对话框，等待用户输入内容，并在用户点击确定时将输入的字符串返回。如果用户取消了输入，返回null。
     * 
     * 该函数也可以作为全局函数使用。
     * @param title 对话框的标题。 
     * @param prefill 输入框的初始内容，可选，默认为空。 
     * @param callback 回调函数，可选。当用户点击确定时被调用,一般用于ui模式。 
     */
    rawInput(title: string, prefill?: string, callback?: (value: string) => void): Promise<string>;
    rawInput(title: string, prefill?: string): string;

    /**
     * 等效于 `eval(dialogs.rawInput(title, prefill, callback))`, 该函数和rawInput的区别在于，会把输入的字符串用eval计算一遍再返回，返回的可能不是字符串。
     * 可以用该函数输入数字、数组等。例如：
     * ```
     * var age = dialogs.input("请输入您的年龄", "18");
     * // new Date().getYear() + 1900 可获取当前年份
     * var year = new Date().getYear() + 1900 - age;
     * alert("您的出生年份是" + year);
     * ```
     * @param title 对话框的标题。 
     * @param prefill 输入框的初始内容，可选，默认为空。 
     * @param callback 回调函数，可选。当用户点击确定时被调用,一般用于ui模式。 
     */
    input(title: string, prefill?: string, callback?: (value: any) => void): Promise<any>;
    input(title: string, prefill?: string): any;

    /**
     * 相当于 `dialogs.rawInput()`;
     */
    prompt(title: string, prefill?: string, callback?: (value: string) => void): Promise<string>;
    prompt(title: string, prefill?: string): string;

    /**
     * 显示一个带有选项列表的对话框，等待用户选择，返回用户选择的选项索引(0 ~ item.length - 1)。如果用户取消了选择，返回-1。
     * @param title 对话框的标题。 
     * @param items 对话框的选项列表，是一个字符串数组。 
     * @param callback 回调函数，可选。当用户点击确定时被调用,一般用于ui模式。 
     */
    select(title: string, items: string[], callback?: (value: number) => void): Promise<number>;
    select(title: string, items: string[]): number;

    /**
     * 显示一个单选列表对话框，等待用户选择，返回用户选择的选项索引(0 ~ item.length - 1)。如果用户取消了选择，返回-1。
     * @param title 对话框的标题。 
     * @param items 对话框的选项列表，是一个字符串数组。 
     * @param index 对话框的初始选项的位置，默认为0。 
     * @param callback 回调函数，可选。当用户点击确定时被调用,一般用于ui模式。 
     */
    singleChoice(title: string, items: string[], index?: number, callback?: (choice: number) => void): Promise<number>;
    singleChoice(title: string, items: string[], index?: number): number;

    /**
     * 显示一个多选列表对话框，等待用户选择，返回用户选择的选项索引的数组。如果用户取消了选择，返回[]。
     * @param title 对话框的标题。 
     * @param items 对话框的选项列表，是一个字符串数组。 
     * @param indices 选项列表中初始选中的项目索引的数组，默认为空数组。 
     * @param callback 回调函数，可选。当用户点击确定时被调用,一般用于ui模式。 
     */
    multiChoice(title: string, items: string[], indices?: number[], callback?: (choices: number[]) => void): Promise<number[]>;
    multiChoice(title: string, items: string[], indices?: number[]): number[];

    /**
     * 创建一个可自定义的对话框。
     * @param options 对话框属性，用于配置对话框。
     */
    build(options: DialogBuildOptions): Dialog;
}

interface ScriptSource {
}

/**
 * 脚本引擎对象。
 */
interface ScriptEngine {
    /**停止脚本引擎的执行。 */
    forceStop(): void;
    /**返回脚本执行的路径。对于一个脚本文件而言为这个脚本所在的文件夹；对于其他脚本，例如字符串脚本，则为null或者执行时的设置值。 */
    cwd(): string;
    /**返回当前脚本引擎正在执行的脚本对象。 */
    getSource(): ScriptSource;
    /**
     * 向该脚本引擎发送一个事件，该事件可以在该脚本引擎对应的脚本的events模块监听到并在脚本主线程执行事件处理。
     * 例如脚本receiver.js的内容如下：
     * ```
     * //监听say事件
     * events.on("say", function(words){
     *     toastLog(words);
     * });
     * //保持脚本运行
     * setInterval(()=>{}, 1000);
     * ```
     * 同一目录另一脚本可以启动他并发送该事件：
     * ```
     * //运行脚本
     * var e = engines.execScriptFile("./receiver.js");
     * //等待脚本启动
     * sleep(2000);
     * //向该脚本发送事件
     * e.getEngine().emit("say", "你好");
     * ```
     * @param eventName 事件名称
     * @param callback 回调函数
     */
    emit(eventName: string, callback: (...args: any) => void): void;
}

/**
 * 执行脚本时返回的对象，可以通过他获取执行的引擎、配置等，也可以停止这个执行。
 * 
 * 要停止这个脚本的执行，使用`exectuion.getEngine().forceStop()`.
 */
interface ScriptExecution {
    /**返回执行该脚本的脚本引擎对象(ScriptEngine) */
    getEngine(): ScriptEngine;
    /**返回该脚本的运行配置(ScriptConfig) */
    getConfig(): ScriptConfig;
}

/**
 * 运行配置项。
 */
interface ScriptConfig {
    /**延迟执行的毫秒数，默认为0。 */
    delay?: number;
    /**循环运行次数，默认为1。0为无限循环。 */
    loopTimes?: number;
    /**循环运行时两次运行之间的时间间隔，默认为0。 */
    interval?: number;
    /**指定脚本运行的目录。这些路径会用于require时寻找模块文件。 */
    path?: string | string[];
    getPath?(): string[];
}

interface Engines {
    /**
     * 在新的脚本环境中运行脚本script。返回一个ScriptExectuion对象。
     * 所谓新的脚本环境，指定是，脚本中的变量和原脚本的变量是不共享的，并且，脚本会在新的线程中运行。
     * 最简单的例子如下：
     * ```
     * engines.execScript("hello world", "toast('hello world')");
     * ```
     * 如果要循环运行，则：
     * ```
     * //每隔3秒运行一次脚本，循环10次
     * engines.execScript("hello world", "toast('hello world')", {
     *     loopTimes: 10,
     *     interval: 3000
     * });
     * ```
     * 用字符串来编写脚本非常不方便，可以结合 `Function.toString()`的方法来执行特定函数:
     * ```
     * function helloWorld(){
     *     //注意，这里的变量和脚本主体的变量并不共享
     *     toast("hello world");
     * }
     * engines.execScript("hello world", "helloWorld();\n" + helloWorld.toString());
     * ```
     * 如果要传递变量，则可以把这些封装成一个函数：
     * ```
     * function exec(action, args){
     *     args = args || {};
     *     engines.execScript(action.name, action + "(" + JSON.stringify(args) + ");\n" + action.toString());
     * }
     * 
     * //要执行的函数，是一个简单的加法
     * function add(args){
     *     toast(args.a + args.b);
     * }
     * 
     * //在新的脚本环境中执行 1 + 2
     * exec(add, {a: 1, b:2});
     * ```
     * @param name 要运行的脚本名称。这个名称和文件名称无关，只是在任务管理中显示的名称。 
     * @param script 要运行的脚本内容。 
     * @param config 运行配置项 
     */
    execScript(name: string, script: string, config?: ScriptConfig): ScriptExecution;

    /**
     * 在新的脚本环境中运行脚本文件path。返回一个ScriptExecution对象。
     * @param path 要运行的脚本路径。
     * @param config 运行配置项。
     */
    execScriptFile(path: string, config?: ScriptConfig): ScriptExecution;

    /**
     * 在新的脚本环境中运行录制文件path。返回一个ScriptExecution对象。
     * @param path 要运行的脚本路径。
     * @param config 运行配置项。
     */
    execAutoFile(path: string, config?: ScriptConfig): ScriptExecution;

    /**
     * 停止所有正在运行的脚本。包括当前脚本自身。
     */
    stopAll(): void;

    /**
     * 停止所有正在运行的脚本并显示停止的脚本数量。包括当前脚本自身。
     */
    stopAllAndToast(): void;

    /**
     * 返回当前脚本的脚本引擎对象(ScriptEngine)
     */
    myEngine(): ScriptEngine;

    /**
     * 返回当前所有正在运行的脚本的脚本引擎ScriptEngine的数组。
     */
    all(): ScriptEngine[];
}

interface EventEmitter {
    /**
     * 每个事件默认可以注册最多 10 个监听器。 单个 EventEmitter 实例的限制可以使用 emitter.setMaxListeners(n) 方法改变。 所有 EventEmitter 实例的默认值可以使用 EventEmitter.defaultMaxListeners 属性改变。
     * 设置 EventEmitter.defaultMaxListeners 要谨慎，因为会影响所有 EventEmitter 实例，包括之前创建的。 因而，调用 emitter.setMaxListeners(n) 优先于 EventEmitter.defaultMaxListeners。
     * 注意，与Node.js不同，这是一个硬性限制。 EventEmitter 实例不允许添加更多的监听器，监听器超过最大数量时会抛出TooManyListenersException。
     */
    defaultMaxListeners: number;

    /**
     * emitter.on(eventName, listener) 的别名。
     */
    addListener(eventName: string, listener: (...args: any[]) => void): EventEmitter;

    /**
     * 按监听器的注册顺序，同步地调用每个注册到名为 eventName 事件的监听器，并传入提供的参数。
     * 如果事件有监听器，则返回 true ，否则返回 false。
     */
    emit(eventName: string, ...args: any[]): boolean;

    /**
     * 返回一个列出触发器已注册监听器的事件的数组。 数组中的值为字符串或符号。
     */
    eventNames(): string[];

    /**
     * 返回 EventEmitter 当前的最大监听器限制值，该值可以通过 emitter.setMaxListeners(n) 设置或默认为 EventEmitter.defaultMaxListeners。
     */
    getMaxListeners(): number;

    /**
     * 返回正在监听名为 eventName 的事件的监听器的数量。
     */
    listenerCount(eventName: string): number;

    /**
     * 返回名为 eventName 的事件的监听器数组的副本。 
     */
    listeners(eventName: string): Function[];

    /**
     * 添加 listener 函数到名为 eventName 的事件的监听器数组的末尾。 不会检查 listener 是否已被添加。 多次调用并传入相同的 eventName 和 listener 会导致 listener 被添加与调用多次。
     */
    on(eventName: string, listener: (...args: any[]) => void): EventEmitter;

    /**
     * 添加一个单次 listener 函数到名为 eventName 的事件。 下次触发 eventName 事件时，监听器会被移除，然后调用。
     */
    once(eventName: string, listener: (...args: any[]) => void): EventEmitter;
    
    /**
     * 添加 listener 函数到名为 eventName 的事件的监听器数组的开头。 不会检查 listener 是否已被添加。 多次调用并传入相同的 eventName 和 listener 会导致 listener 被添加与调用多次。
     */
    prependListener(eventName: string, listener: (...args: any[]) => void): EventEmitter;
    
    /**
     * 添加一个单次 listener 函数到名为 eventName 的事件的监听器数组的开头。 下次触发 eventName 事件时，监听器会被移除，然后调用。
     */
    prependOnceListener(eventName: string, listener: (...args: any[]) => void): EventEmitter;

    /**
     * 移除全部或指定 eventName 的监听器。
     * 注意，在代码中移除其他地方添加的监听器是一个不好的做法，尤其是当 EventEmitter 实例是其他组件或模块创建的。
     */
    removeAllListeners(eventName?: string): EventEmitter;

    /**
     * 从名为 eventName 的事件的监听器数组中移除指定的 listener。
     */
    removeListener(eventName: string, listener: (...args: any[]) => void): EventEmitter;

    /**
     * 默认情况下，如果为特定事件添加了超过 10 个监听器，则 EventEmitter 会打印一个警告。 此限制有助于寻找内存泄露。 但是，并不是所有的事件都要被限为 10 个。 emitter.setMaxListeners() 方法允许修改指定的 EventEmitter 实例的限制。 值设为 Infinity（或 0）表明不限制监听器的数量。
     */
    setMaxListeners(n: number): EventEmitter;
}

type Keys = 'volume_up' | 'volume_down' | 'home' | 'back' | 'menu';

declare class KeyEvent {
    /**按下事件 */
    static ACTION_DOWN: number;
    /**弹起事件 */
    static ACTION_UP: number;
    /**主页键 */
    static KEYCODE_HOME: number;
    /**返回键 */
    static KEYCODE_BACK: number;
    /**菜单键 */
    static KEYCODE_MENU: number;
    /**音量上键 */
    static KEYCODE_VOLUME_UP: number;
    /**音量下键 */
    static KEYCODE_VOLUME_DOWN: number;
}

interface KeyEvent {
    /**返回事件的动作 */
    getAction(): number;
    /**返回按键的键值 */
    getKeyCode(): number;
    /**返回事件发生的时间戳。 */
    getEventTime(): number;
    /**返回最近一次按下事件的时间戳。如果本身是按下事件，则与`getEventTime()`相同。 */
    getDownTime(): number;
    /**把键值转换为字符串。例如KEYCODE_HOME转换为"KEYCODE_HOME"。 */
    keyCodeToString(keyCode: number): string;
}


/**
 * 脚本间通信除了使用engines模块提供的ScriptEngine.emit()方法以外，也可以使用events模块提供的broadcast广播。
 * events.broadcast本身是一个EventEmitter，但它的事件是在脚本间共享的，所有脚本都能发送和监听这些事件；事件处理会在脚本主线程执行（后续可能加入函数onThisThread(eventName, ...args)来提供在其他线程执行的能力）。
 */
interface EventsBroadcast extends EventEmitter {
}

interface Events {
    /**
     * 返回一个新的EventEmitter。这个EventEmitter没有内置任何事件。
     */
    emitter(): EventEmitter;

    /**
     * 启用按键监听，例如音量键、Home键。按键监听使用无障碍服务实现，如果无障碍服务未启用会抛出异常并提示开启。
     * 
     * 只有这个函数成功执行后, onKeyDown, onKeyUp等按键事件的监听才有效。
     */
    observeKey(): void;

    /**
     * 注册一个按键监听函数，当有keyName对应的按键被按下会调用该函数。可用的按键名称参见Keys。例如：
     * ```
     * //启用按键监听
     * events.observeKey();
     * //监听音量上键按下
     * events.onKeyDown("volume_up", function(event){
     *     toast("音量上键被按下了");
     * });
     * //监听菜单键按下
     * events.onKeyDown("menu", function(event){
     *     toast("菜单键被按下了");
     *     exit();
     * });
     * ```
     * @param keyName 要监听的按键名称 
     * @param listener 按键监听器。参数为一个KeyEvent。 
     */
    onKeyDown(keyName: Keys, listener: (e: KeyEvent) => void): void;

    /**
     * 注册一个按键监听函数，当有keyName对应的按键弹起会调用该函数。可用的按键名称参见Keys。
     * 
     * 一次完整的按键动作包括了按键按下和弹起。按下事件会在手指按下一个按键的"瞬间"触发, 弹起事件则在手指放开这个按键时触发。
     * @param keyName 要监听的按键名称 
     * @param listener 按键监听器。参数为一个KeyEvent。 
     */
    onKeyUp(keyName: Keys, listener: (e: KeyEvent) => void): void;

    /**
     * 注册一个按键监听函数，当有keyName对应的按键被按下时会调用该函数，之后会注销该按键监听器。
     * 也就是listener只有在onceKeyDown调用后的第一次按键事件被调用一次。
     * @param keyName 要监听的按键名称 
     * @param listener 按键监听器。参数为一个KeyEvent。 
     */
    onceKeyDown(keyName: Keys, listener: (e: KeyEvent) => void): void;

    /**
     * 注册一个按键监听函数，当有keyName对应的按键弹起时会调用该函数，之后会注销该按键监听器。
     * 也就是listener只有在onceKeyUp调用后的第一次按键事件被调用一次。
     * @param keyName 要监听的按键名称 
     * @param listener 按键监听器。参数为一个KeyEvent。
     */
    onceKeyUp(keyName: Keys, listener: (e: KeyEvent) => void): void;

    /**
     * 删除该按键的KeyDown(按下)事件的所有监听。
     * @param keyName 按键名称
     */
    removeAllKeyDownListeners(keyName: Keys): void;

    /**
     * 删除该按键的KeyUp(弹起)事件的所有监听。
     * @param keyName 按键名称 
     */
    removeAllKeyUpListeners(keyName: Keys): void;

    /**
     * 设置按键屏蔽是否启用。所谓按键屏蔽指的是，屏蔽原有按键的功能，例如使得音量键不再能调节音量，但此时仍然能通过按键事件监听按键。
     * 
     * 如果不加参数key则会屏蔽所有按键。
     * 
     * 例如，调用`events.setKeyInterceptionEnabled(true)`会使系统的音量、Home、返回等键不再具有调节音量、回到主页、返回的作用，但此时仍然能通过按键事件监听按键。
     * 
     * 该函数通常于按键监听结合，例如想监听音量键并使音量键按下时不弹出音量调节框则为：
     * ```
     * events.setKeyInterceptionEnabled("volume_up", true);
     * events.observeKey();
     * events.onKeyDown("volume_up", ()=>{
     *     log("音量上键被按下");
     * });
     * ```
     * 只要有一个脚本屏蔽了某个按键，该按键便会被屏蔽；当脚本退出时，会自动解除所有按键屏蔽。
     * @param key 按键名称
     * @param enabled 是否启用
     */
    setKeyInterceptionEnabled(key: Keys, enabled: boolean): void;
    setKeyInterceptionEnabled(enabled: boolean): void;

    /**
     * 启用屏幕触摸监听。（需要root权限）
     * 只有这个函数被成功执行后, 触摸事件的监听才有效。
     * 没有root权限调用该函数则什么也不会发生。
     */
    observeTouch(): void;

    /**
     * 设置两个触摸事件分发的最小时间间隔。
     * 例如间隔为10毫秒的话，前一个触摸事件发生并被注册的监听器处理后，至少要过10毫秒才能分发和处理下一个触摸事件，这10毫秒之间的触摸将会被忽略。
     * 建议在满足需要的情况下尽量提高这个间隔。一个简单滑动动作可能会连续触发上百个触摸事件，如果timeout设置过低可能造成事件拥堵。强烈建议不要设置timeout为0。
     * @param timeout 两个触摸事件的最小间隔。单位毫秒。默认为10毫秒。如果number小于0，视为0处理。
     */
    setTouchEventTimeout(timeout?: number): void;

    /**
     * 返回触摸事件的最小时间间隔。
     */
    getTouchEventTimeout(): number;

    /**
     * 注册一个触摸监听函数。相当于on("touch", listener)。
     */
    onTouch(listener: (point: Point) => void): void;

    /**
     * 删除所有事件监听函数。
     */
    removeAllTouchListeners(): void;

    /**
     * 当有按键被按下或弹起时会触发该事件。
     */
    on(event: 'key' | 'key_down' | 'key_up', listener: (keyCode: number, e: KeyEvent) => void): void;

    /**
     * 当脚本正常或者异常退出时会触发该事件。事件处理中如果有异常抛出，则立即中止exit事件的处理（即使exit事件有多个处理函数）并在控制台和日志中打印该异常。
     * 一个脚本停止运行时，会关闭该脚本的所有悬浮窗，触发exit事件，之后再回收资源。
     * 如果exit事件的处理中有死循环，则后续资源无法得到及时回收。 此时脚本会停留在任务列表，如果在任务列表中关闭，则会强制结束exit事件的处理并回收后续资源。
     */
    on(event: 'exit', listener: () => void): void;

    /**
     * 当有应用发出通知时会触发该事件
     */
    on(event: 'notification', listener: (notification: Notification) => void): void;

    /**
     * 开启通知监听。例如QQ消息、微信消息、推送等通知。
     * 通知监听依赖于通知服务，如果通知服务没有运行，会抛出异常并跳转到通知权限开启界面。（有时即使通知权限已经开启通知服务也没有运行，这时需要关闭权限再重新开启一次）
     */
    observeNotification(): void;

    /**
     * 开启Toast监听。
     * Toast监听依赖于无障碍服务，因此此函数会确保无障碍服务运行。
     */
    observeToast(): void;

    /**
     * 当有应用发出toast(气泡消息)时会触发该事件。但Auto.js软件本身的toast除外。
     */
    onToast(listener: (toast: Toast) => void): void;

    broadcast: EventsBroadcast;
}

/**
 * 悬浮窗对象，可通过`FloatyWindow.{id}`获取悬浮窗界面上的元素。
 * 例如, 悬浮窗window上一个控件的id为aaa, 那么`window.aaa`即可获取到该控件，类似于ui。
 */
interface FloatyWindow {
    /**
     * 如果enabled为true，则在悬浮窗左上角、右上角显示可供位置、大小调整的标示，就像控制台一样； 如果enabled为false，则隐藏上述标示。
     * @param enabled 是否启用悬浮窗调整(大小、位置)
     */
    setAdjustEnabled(enabled: boolean): void;

    /**
     * 设置悬浮窗位置。
     * @param x 
     * @param y 
     */
    setPosition(x: number, y: number): void;

    /**
     * 返回悬浮窗位置的X坐标。
     */
    getX(): number;

    /**
     * 返回悬浮窗位置的Y坐标。
     */
    getY(): number;

    /**
     * 设置悬浮窗宽高。
     * @param width 宽度
     * @param height 高度
     */
    setSize(width: number, height: number): void;

    /**
     * 返回悬浮窗宽度。
     */
    getWidth(): number;

    /**
     * 返回悬浮窗高度。
     */
    getHeight(): number;

    /**
     * 关闭悬浮窗。如果悬浮窗已经是关闭状态，则此函数将不执行任何操作。
     * 被关闭后的悬浮窗不能再显示。
     */
    close(): void;

    /**
     * 使悬浮窗被关闭时自动结束脚本运行。
     */
    exitOnClose(): void;
}


/**
 * 悬浮窗对象，可通过`FloatyRawWindow.{id}`获取悬浮窗界面上的元素。
 * 例如, 悬浮窗window上一个控件的id为aaa, 那么`window.aaa`即可获取到该控件，类似于ui。
 */
interface FloatyRawWindow {
    /**
     * 设置悬浮窗是否可触摸，如果为true, 则悬浮窗将接收到触摸、点击等事件并且无法继续传递到悬浮窗下面；
     * 如果为false, 悬浮窗上的触摸、点击等事件将被直接传递到悬浮窗下面。处于安全考虑，
     * 被悬浮窗接收的触摸事情无法再继续传递到下层。
     * @param touchable 是否可触摸
     */
    setTouchable(touchable: boolean): void;

    /**
     * 设置悬浮窗位置。
     * @param x 
     * @param y 
     */
    setPosition(x: number, y: number): void;

    /**
     * 返回悬浮窗位置的X坐标。
     */
    getX(): number;

    /**
     * 返回悬浮窗位置的Y坐标。
     */
    getY(): number;

    /**
     * 设置悬浮窗宽高。
     * 特别地，如果设置为-1，则为占满全屏；设置为-2则为根据悬浮窗内容大小而定。
     * @param width 宽度
     * @param height 高度
     */
    setSize(width: number, height: number): void;

    /**
     * 返回悬浮窗宽度。
     */
    getWidth(): number;

    /**
     * 返回悬浮窗高度。
     */
    getHeight(): number;

    /**
     * 关闭悬浮窗。如果悬浮窗已经是关闭状态，则此函数将不执行任何操作。
     * 被关闭后的悬浮窗不能再显示。
     */
    close(): void;

    /**
     * 使悬浮窗被关闭时自动结束脚本运行。
     */
    exitOnClose(): void;
}

interface Floaty {
    /**
     * 指定悬浮窗的布局，创建并显示一个悬浮窗，返回一个`FloatyWindow`对象。
     * 该悬浮窗自带关闭、调整大小、调整位置按键，可根据需要调用`setAdjustEnabled()`函数来显示或隐藏。
     * 其中layout参数可以是xml布局或者一个View，更多信息参见ui模块的说明。
     * 例子：
     * ```
     * var w = floaty.window(
     *     <frame gravity="center">
     *         <text id="text">悬浮文字</text>
     *     </frame>
     * );
     * setTimeout(()=>{
     *     w.close();
     * }, 2000);
     * ```
     * 这段代码运行后将会在屏幕上显示悬浮文字，并在两秒后消失。
     * 另外，因为脚本运行的线程不是UI线程，而所有对控件的修改操作需要在UI线程执行，此时需要用`ui.run`，例如:
     * ```
     * ui.run(function(){
     *     w.text.setText("文本");
     * });
     * ```
     * 
     * @param layout 悬浮窗界面的XML或者View
     */
    window(layout: any): FloatyWindow;

    /**
     * 指定悬浮窗的布局，创建并显示一个原始悬浮窗，返回一个FloatyRawWindow对象。
     * 与floaty.window()函数不同的是，该悬浮窗不会增加任何额外设施（例如调整大小、位置按钮），您可以根据自己需要编写任何布局。
     * 而且，该悬浮窗支持完全全屏，可以覆盖状态栏，因此可以做护眼模式之类的应用。
     * ```
     * var w = floaty.rawWindow(
     *     <frame gravity="center">
     *         <text id="text">悬浮文字</text>
     *     </frame>
     * );
     *
     * w.setPosition(500, 500);
     *
     * setTimeout(()=>{
     *     w.close();
     * }, 2000);
     * ```
     * 这段代码运行后将会在屏幕上显示悬浮文字，并在两秒后消失。
     * @param layout 悬浮窗界面的XML或者View
     */
    rawWindow(layout: any): FloatyRawWindow;

    /**
     * 关闭所有本脚本的悬浮窗。
     */
    closeAll(): void;
}

/**
 * 可读文件对象。
 */
interface ReadableTextFile {
    /**
     * 返回该文件剩余的所有内容的字符串。
     */
    read(): string;

    /**
     * 读取该文件接下来最长为maxCount的字符串并返回。即使文件剩余内容不足maxCount也不会出错。
     * @param maxCount 最大读取的字符数量
     */
    read(maxCount: number): string;

    /**
     * 读取一行并返回（不包含换行符）。
     */
    readline(): string;

    /**
     * 读取剩余的所有行，并返回它们按顺序组成的字符串数组。
     */
    readlines(): string[];

    /**
     * 关闭该文件。
     */
    close(): void;
}

/**
 * 可写文件对象。
 */
interface WritableTextFile {
    /**
     * 把文本内容text写入到文件中。
     * @param text 文本
     */
    write(text: string): void;

    /**
     * 把文本line写入到文件中并写入一个换行符。
     * @param line 文本
     */
    writeline(line: string): void;

    /**
     * 把很多行写入到文件中....
     * @param lines 字符串数组
     */
    writelines(lines: string[]): void;

    /**
     * 把缓冲区内容输出到文件中。
     */
    flush(): void;

    /**
     * 关闭文件。同时会被缓冲区内容输出到文件。
     * 打开一个文件写入后，不再使用时务必关闭，否则文件可能会丢失
     */
    close(): void;
}

interface Files {
    /**
     * 返回路径path是否是文件。
     * ```
     * log(files.isFile("/sdcard/文件夹/")); //返回false
     * log(files.isFile("/sdcard/文件.txt")); //返回true
     * ```
     * @param path 路径
     */
    isFile(path: string): boolean;

    /**
     * 返回路径path是否是文件夹。
     * ```
     * log(files.isDir("/sdcard/文件夹/")); //返回true
     * log(files.isDir("/sdcard/文件.txt")); //返回false
     * ```
     * @param path 路径
     */
    isDir(path: string): boolean;

    /**
     * 返回文件夹path是否为空文件夹。如果该路径并非文件夹，则直接返回false。
     * @param path 路径
     */
    isEmptyDir(path: string): boolean;

    /**
     * 连接两个路径并返回，例如`files.join("/sdcard/", "1.txt")`返回"/sdcard/1.txt"。
     * @param parent 父目录路径
     * @param child 子路径
     */
    join(parent: string, child: string): string;

    /**
     * 创建一个文件或文件夹并返回是否创建成功。如果文件已经存在，则直接返回false。
     * ```
     * files.create("/sdcard/新文件夹/");
     * ```
     * @param path 路径
     */
    create(path: string): boolean;

    /**
     * 创建一个文件或文件夹并返回是否创建成功。如果文件所在文件夹不存在，则先创建他所在的一系列文件夹。
     * 如果文件已经存在，则直接返回false。
     * ```
     * files.createWithDirs("/sdcard/新文件夹/新文件夹/新文件夹/1.txt");
     * ```
     * @param path 路径
     */
    createWithDirs(path: string): boolean;

    /**
     * 返回在路径path处的文件是否存在。
     * @param path 路径
     */
    exists(path: string): boolean;

    /**
     * 确保路径path所在的文件夹存在。如果该路径所在文件夹不存在，则创建该文件夹。
     * @param path 路径
     */
    ensureDir(path: string): void;

    /**
     * 读取文本文件path的所有内容并返回。如果文件不存在，则抛出FileNotFoundException。
     * @param path 路径
     * @param encoding 字符编码，可选，默认为utf-8
     */
    read(path: string, encoding?: string): string;

    /**
     * 读取文件path的所有内容并返回一个字节数组。如果文件不存在，则抛出FileNotFoundException。
     * 注意，该数组是Java的数组，不具有JavaScript数组的forEach, slice等函数。
     * 一个以16进制形式打印文件的例子如下:
     * ```
     * var data = files.readBytes("/sdcard/1.png");
     * var sb = new java.lang.StringBuilder();
     * for(var i = 0; i < data.length; i++){
     *     sb.append(data[i].toString(16));
     * }
     * log(sb.toString());
     * ```
     * @param path 路径
     */
    readBytes(path: string): any;

    /**
     * 把text写入到文件path中。如果文件存在则覆盖，不存在则创建。
     * ```
     * var text = "文件内容";
     * //写入文件
     * files.write("/sdcard/1.txt", text);
     * //用其他应用查看文件
     * app.viewFile("/sdcard/1.txt");
     * ```
     * @param path 路径
     * @param text 要写入的文本内容
     * @param encoding 字符编码，可选，默认为utf-8
     */
    write(path: string, text: string, encoding?: string): void;

    /**
     * 把bytes写入到文件path中。如果文件存在则覆盖，不存在则创建。
     * @param path 路径
     * @param bytes 字节数组，要写入的二进制数据
     */
    writeBytes(path: string, bytes: any): void;

    /**
     * 把text追加到文件path的末尾。如果文件不存在则创建。
     * ```
     * var text = "追加的文件内容";
     * files.append("/sdcard/1.txt", text);
     * files.append("/sdcard/1.txt", text);
     * //用其他应用查看文件
     * app.viewFile("/sdcard/1.txt");
     * ```
     * @param path 路径
     * @param text 要写入的文本内容
     * @param encoding 字符编码，可选，默认为utf-8
     */
    append(path: string, text: string, encoding?: string): void;

    /**
     * 把bytes追加到文件path的末尾。如果文件不存在则创建。
     * @param path 路径
     * @param bytes 字节数组，要写入的二进制数据
     */
    appendBytes(path: string, bytes: any): void;

    /**
     * 复制文件，返回是否复制成功。例如`files.copy("/sdcard/1.txt", "/sdcard/Download/1.txt")`。
     * @param fromPath 要复制的原文件路径
     * @param toPath 复制到的文件路径
     */
    copy(fromPath: string, toPath: string): boolean;

    /**
     * 移动文件，返回是否移动成功。例如`files.move("/sdcard/1.txt", "/sdcard/Download/1.txt")`会把1.txt文件从sd卡根目录移动到Download文件夹。
     * @param fromPath 要移动的原文件路径
     * @param toPath 移动到的文件路径
     */
    move(fromPath: string, toPath: string): boolean;

    /**
     * 重命名文件，并返回是否重命名成功。例如`files.rename("/sdcard/1.txt", "2.txt")`。
     * @param path 要重命名的原文件路径
     * @param newName 要重命名的新文件名
     */
    rename(path: string, newName: string): boolean;

    /**
     * 重命名文件，不包含拓展名，并返回是否重命名成功。例如`files.rename("/sdcard/1.txt", "2")`会把"1.txt"重命名为"2.txt"。
     * @param path 要重命名的原文件路径
     * @param newName 要重命名的新文件名
     */
    renameWithoutExtension(path: string, newName: string): boolean;

    /**
     * 返回文件的文件名。例如`files.getName("/sdcard/1.txt")`返回"1.txt"。
     * @param path 路径
     */
    getName(path: string): string;

    /**
     * 返回不含拓展名的文件的文件名。例如`files.getNameWithoutExtension("/sdcard/1.txt")`返回"1"。
     * @param path 路径
     */
    getNameWithoutExtension(path: string): string;

    /**
     * 返回文件的拓展名。例如`files.getExtension("/sdcard/1.txt")`返回"txt"。
     * @param path 路径
     */
    getExtension(path: string): string;

    /**
     * 删除文件或空文件夹，返回是否删除成功。
     * @param path 路径
     */
    remove(path: string): boolean;

    /**
     * 删除文件夹，如果文件夹不为空，则删除该文件夹的所有内容再删除该文件夹，返回是否全部删除成功。
     * @param path 
     */
    removeDir(path: string): boolean;

    /**
     * 返回SD卡路径。所谓SD卡，即外部存储器。
     */
    getSdcardPath(): string;

    /**
     * 返回脚本的"当前工作文件夹路径"。该路径指的是，如果脚本本身为脚本文件，则返回这个脚本文件所在目录；否则返回null获取其他设定路径。
     * 
     * 例如，对于脚本文件"/sdcard/脚本/1.js"运行files.cwd()返回"/sdcard/脚本/"。
     */
    cwd(): string;

    /**
     * 返回相对路径对应的绝对路径。例如`files.path("./1.png")`，如果运行这个语句的脚本位于文件夹"/sdcard/脚本/"中，则返回`"/sdcard/脚本/1.png"`。
     * @param relativePath 相对路径
     */
    path(relativePath: string): string;

    /**
     * 列出文件夹path下的满足条件的文件和文件夹的名称的数组。如果不加filter参数，则返回所有文件和文件夹。
     * 列出sdcard目录下所有文件和文件夹为:
     * ```
     * var arr = files.listDir("/sdcard/");
     * log(arr);
     * ```
     * 列出脚本目录下所有js脚本文件为:
     * ```
     * var dir = "/sdcard/脚本/";
     * var jsFiles = files.listDir(dir, function(name){
     *     return name.endsWith(".js") && files.isFile(files.join(dir, name));
     * });
     * log(jsFiles);
     * ```
     * @param path 路径
     * @param filter 过滤函数，可选。接收一个string参数（文件名），返回一个boolean值。
     */
    listDir(path: string, filter?: (filename: string) => boolean): string[];

    /**
     * 
     * @param path 文件路径，例如"/sdcard/1.txt"。
     * @param mode 文件打开模式，包括:
     * * "r": 只读文本模式。该模式下只能对文件执行文本读取操作。
     * * "w": 只写文本模式。该模式下只能对文件执行文本覆盖写入操作。
     * * "a": 附加文本模式。该模式下将会把写入的文本附加到文件末尾。
     * * "rw": 随机读写文本模式。该模式下将会把写入的文本附加到文件末尾。
     * * 目前暂不支持二进制模式，随机读写模式。
     * @param encoding 字符编码
     * @param bufferSize 文件读写的缓冲区大小
     */
    open(path: string, mode?: 'r' | 'w' | 'a' | 'rw', encoding?: string, bufferSize?: number): ReadableTextFile | WritableTextFile;
}

/**
 * app模块提供一系列函数，用于使用其他应用、与其他应用交互。例如发送意图、打开文件、发送邮件等。
同时提供了方便的进阶函数startActivity和sendBroadcast，用他们可完成app模块没有内置的和其他应用的交互。
 */
declare var app: App;

/**
 * 全局变量。一个android.content.Context对象。注意该对象为ApplicationContext，因此不能用于界面、对话框等的创建。
 */
declare var context: any;

/**
 * 
 */
declare var runtime: Runtime;

/**
 * 控制台模块提供了一个和Web浏览器中相似的用于调试的控制台。用于输出一些调试信息、中间结果等。 console模块中的一些函数也可以直接作为全局函数使用，例如log, print等。
 */
declare var console: Console;

/**
 * device模块提供了与设备有关的信息与操作，例如获取设备宽高，内存使用率，IMEI，调整设备亮度、音量等。
 * 
 * 此模块的部分函数，例如调整音量，需要"修改系统设置"的权限。如果没有该权限，会抛出SecurityException并跳转到权限设置界面。
 */
declare var device: Device;

/**
 * dialogs 模块提供了简单的对话框支持，可以通过对话框和用户进行交互。
 */
declare var dialogs: Dialogs;

/**
 * engines模块包含了一些与脚本环境、脚本运行、脚本引擎有关的函数，包括运行其他脚本，关闭脚本等。
 */
declare var engines: Engines;

/**
 * events模块提供了监听手机通知、按键、触摸的接口。您可以用他配合自动操作函数完成自动化工作。
 * events本身是一个EventEmiiter, 但内置了一些事件、包括按键事件、通知事件、Toast事件等。
 * 需要注意的是，事件的处理是单线程的，并且仍然在原线程执行，如果脚本主体或者其他事件处理中有耗时操作、轮询等，则事件将无法得到及时处理（会进入事件队列等待脚本主体或其他事件处理完成才执行）。
 */
declare var events: Events;

/**
 * floaty模块提供了悬浮窗的相关函数，可以在屏幕上显示自定义悬浮窗，控制悬浮窗大小、位置等。
 * 悬浮窗在脚本停止运行时会自动关闭，因此，要保持悬浮窗不被关闭，可以用一个空的setInterval来实现，例如：
 * ```
 * setInterval(()=>{}, 1000);
 * ```
 */
declare var floaty: Floaty;

/**
 * files模块提供了一些常见的文件处理，包括文件读写、移动、复制、删掉等。
 * 一次性的文件读写可以直接使用`files.read()`, `files.write()`, `files.append()`等方便的函数，
 * 但如果需要频繁读写或随机读写，则使用`open()`函数打开一个文件对象来操作文件，并在操作完毕后调用`close()`函数关闭文件。
 */
declare var files: Files;