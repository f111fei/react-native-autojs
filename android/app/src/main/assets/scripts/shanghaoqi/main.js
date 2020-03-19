/*function sleep(d) {
    for (var t = Date.now(); Date.now() - t <= d;);
}*/

function log(s) {
    console.log(s);
}

var tempStorage = storages.create("test_storage");

var accnum = tempStorage.get("acc");
var accpswd = tempStorage.get("pswd");

auto();

if (!requestScreenCapture(true)) {
    toastLog("请求截图失败,程序即将退出");
    exit();
}
else {
    log("截图权限申请成功");
}

var PLAYMODE = { "weixin": 0, "QQ": 1 };
var playMode = PLAYMODE.QQ;

var updateCancleImg, qqPlayImg, weixinPlayImg, logoutImg;

updateCancleImg = images.read("./suspend.png");
qqPlayImg = images.read("./playByQQ.png");
weixinPlayImg = images.read("./playByWeixin.png");
logoutImg = images.read("./logout.png");

var screenShotImg, templateImg;
var nextPosToClick;

if (playMode == PLAYMODE.weixin) {
    templateImg = weixinPlayImg;
} else {
    templateImg = qqPlayImg;
}

var jamPreventMap = {};
var mainThread = null;

function jamPreventStart(name, info, time) {
    if (jamPreventMap[name]) {
        log("jamPrevent name exist, use other names");
        return false;
    }
    var msg = {};
    msg["startTime"] = Date.now();
    msg["info"] = info;
    msg["timeout"] = time;
    msg["thread"] = threads.start(function () {
        //设置一个空的定时来保持线程的运行状态
        setInterval(function () { console.log("jamPrevent thread is running~~") }, 10000);
    });

    sleep(1000);
    msg["id"] = msg["thread"].setTimeout(function () {
        timeOutHandler();
    }, time);

    log("jamprevent start:" + name);
    jamPreventMap[name] = msg;
}

function jamPreventEnd(name) {
    if (!jamPreventMap[name]) {
        log("jamPrevent name  not exist, code error");
        return false;
    }
    var thread = jamPreventMap[name]["thread"];
    var id = jamPreventMap[name].id;
    thread.clearTimeout(id);
    thread.interrupt();
    log("jamprevent end:" + name);
    delete jamPreventMap[name];
}

function timeOutHandler() {
    console.log("timeout handler");

    Object.keys(jamPreventMap).forEach(function (key) {

        if (jamPreventMap[key]["startTime"] + jamPreventMap[key]["timeout"] < Date.now()) {
            toastLog("things hang:" + jamPreventMap[key].info);
        } else {
            toastLog("timer interupted:" + jamPreventMap[key].info);
            jamPreventMap[key].thread.clearTimeout(jamPreventMap[key].id);
        }
    });

    mainThread = null;
    threads.shutDownAll();
    jamPreventMap = {};
    console.log("shutdown all thread, so i CAN NOT appear");
}

function jamPreventTestMain() {
    console.log("get in jamPreventTestMain");
    jamPreventStart("test", "just a test", 5000);
    jamPreventStart("test2", "test jam prevent2", 9000);

    sleeptime -= 10;
    sleep(sleeptime * 1000);

    jamPreventEnd("test");

    jamPreventEnd("test2");

    console.log("main should over");
    threads.shutDownAll();
    engines.myEngine().forceStop();
}

function HasSuspend() {
    log("hassuspend");
    nextPosToClick = images.findImage(screenShotImg, updateCancleImg);//0.9为相似度，若效果不佳，可以考虑调节
    if (nextPosToClick) {
        console.log("有更新提示，cancle坐标为：" + nextPosToClick);
        return true;
    } else {
        return false;
    }
}

function IsLogined() {
    log("islogined() called");
    nextPosToClick = images.findImage(screenShotImg, logoutImg);
    //0,0);
    if (nextPosToClick) {
        console.log("already logined,will logout");
        return true;
    } else {
        return false;
    }
}

function IsInReadyFrame() {
    log("IsInReadyFrame() called");
    images.save(screenShotImg, "/sdcard/isreadyfunc_screencap.png");
    nextPosToClick = images.findImage(screenShotImg, templateImg);
    //var inputButtonCoor = findImageInRegion(screenShotImg, templateImg, 300, 800, 1600, 200, 0.9);
    if (nextPosToClick) {
        console.log("get in ready frame");
        return true;
    } else {
        console.log("not in ready frame");
        return false;
    }
}

//进入准备界面，并点击与qq好友玩，或者与微信好友玩，如果有更新提示，要自动关闭，如果已登录，要注销
function getInReadyFrame() {
    log("Get in getInReadyFrame()");
    return new Promise(function (resolve, reject) {

        var count = 0;
        var checkSuspend = true, checkLogin = true;

        while (++count < 12) {
            screenShotImg = captureScreen();

            if (checkSuspend && HasSuspend()) {
                click(nextPosToClick.x, nextPosToClick.y);
                checkSuspend = false;
                counter = 0;
                sleep(1000)
            }
            if (checkLogin && IsLogined()) {
                click(nextPosToClick.x, nextPosToClick.y);//米9这些有问题，需要二连点，目前不知道原因，手动点都直接OK
                sleep(200);
                click(nextPosToClick.x, nextPosToClick.y);
                log("logout point is:" + nextPosToClick);
                checkSuspend = false;
                checkLogin = false;
                counter = 0;
                sleep(1000)
            }
            if (IsInReadyFrame()) {
                click(nextPosToClick.x, nextPosToClick.y);
                sleep(10000);
                return resolve();
            }
            if (textContains("登 录").exists() || textContains("登录").exists()) {
                return resolve();
            }
            sleep(5000);
        }

        toastLog("请保证网络畅通且游戏更新完成");
        reject("getInReadyFrame failed");
    })
}

function manMachineDetection() {
    sleep(2000);//wait for detection view appear
    if (textContains("验证码").exists()
        || textContains("图中字符").exists()
        || textContains("换一张").exists()
        || textContains("看不清").exists()
        || textContains("看到的").exists()) {
        toastLog("如有人机检测，请手动通过验证");
        //dialogs.alert("提示", "如有人机检测，请手动通过验证");
    } else {
        console.log("没有检测出现");
    }
}

function loginWithMobileqq() {
    if (id("btn_login").exists()) {
        //btn_login 存在,表示自qq下载后一直没有登陆过，该情况应该几乎不会碰到
        jamPreventStart("loginWithMobileqqFirst", "after qq download,never used", 60000);
        log("mobileqq,下载后没用过");

        id("btn_login").findOne().click();
        log("点击登录按钮后");
        text("QQ号/手机号/邮箱").findOne().setText(accnum);
        log("qq号设置好了");
        id("password").findOne().setText(accpswd);
        log("设置了密码");

        id("login").findOne().click();
        log("click login,login qq over");
        manMachineDetection();
        sleep(1000);
        text("登录").findOne().click();
        log("click login again, give auth to game over");
        jamPreventEnd("loginWithMobileqqFirst");
    } else if (textContains("帐号").clickable().exists()) {
        //切换账号存在，表示有历史记录
        jamPreventStart("loginWithMobileqqNormally", "has another account in mobileqq", 60000);
        log("mobileqq,拥有历史记录");
        textContains("帐号").clickable().click();
        log("点击切换帐号按钮后");
        text("添加帐号").findOne().parent().click();
        log("点击添加帐号按钮后");
        id("account").findOne().setText(accnum);
        log("qq号设置好了");
        id("password").findOne().setText(accpswd);
        log("设置了密码");

        text("登录").findOne().click();
        log("click login,login qq over");
        manMachineDetection();
        sleep(1000);
        if(text("登录").exists()){
            log("登录exits,老版本，点击");
            text("登录").findOne().click();
        }
        if(text("QQ授权登录").exists()){
            log("QQ授权登录exists,新版本，点击");
            text("QQ授权登录").findOne().click();
        }

        sleep(1000);
        log("click login again, give auth to game over");
        if(text("完成QQ授权").exists()) {
            text("完成QQ授权").findOne().click();
        }
        log("确认授权");
        jamPreventEnd("loginWithMobileqqNormally");
    } else if (id("login").exists()) {
              //login 存在,目前只在有QQ被挤下线的时候出现过
              jamPreventStart("loginWithMobileqqLoginOut", "qq logout", 60000);
              log("mobileqq,被挤下线了");

              desc("请输入QQ号码或手机或邮箱").findOne().setText(accnum);
              log("qq号设置好了");
              id("password").findOne().setText(accpswd);
              log("设置了密码");

              id("login").findOne().click();
              log("click login,login qq over");
              manMachineDetection();
              sleep(1000);
              if(text("登录").exists()){
                  log("登录exits,老版本，点击");
                  text("登录").findOne().click();
              }
              if(text("QQ授权登录").exists()){
                  log("QQ授权登录exists,新版本，点击");
                  text("QQ授权登录").findOne().click();
              }

              sleep(1000);
              log("click login again, give auth to game over");
              if(text("完成QQ授权").exists()) {
                  text("完成QQ授权").findOne().click();
              }
              log("确认授权");
              jamPreventEnd("loginWithMobileqqLoginOut");
          } else {
        log("有其他未考虑到的情况");
    }
}

function loginWithHDqq() {
    var editTextArr = className("android.widget.EditText").find();
    log(editTextArr.size());

    if (editTextArr.size() >= 2) {
        //可以直接输入.第一次登录
        jamPreventStart("loginWithHDqqFirst", "after HD qq download,never used", 60000);
        log("第一次登录");

        log("qqhd 开始输入账号密码");
        id("account").findOne().setText(accnum);
        log("qq号设置好了");
        id("password").findOne().setText(accpswd);
        log("设置了密码");

        log("第一次点击");
        id("open_login_btn").findOne().click();
        log("click login,login qq over");

        manMachineDetection()
        sleep(1000);
        id("open_login_btn").findOne().click();
        log("click login again, give auth to game over");
        jamPreventEnd("loginWithHDqqFirst");
    } else if (id("ivTitleBtnRightText").exists()) {
        //有其他账号，切换帐号，然后添加帐号，随后登录
        jamPreventStart("loginWithHDqqNormally", "has another account in mobileqq", 60000);
        log("之前已有qq记录");

        log("开始点击切换帐号");
        id("ivTitleBtnRightText").findOne().click();
        log("切换帐号点完了");
        sleep(1000);

        if (id("new_account").exists()) {
            log("添加帐号按钮存在，常规情况");
            id("new_account").findOne().parent().click();
        } else {
            log("直接弹出了添加帐号界面，很少出现");
        }

        log("qqhd 开始输入账号密码"); //这一段和上面一毛一样，测试如果无异常，修改流程
        id("account").findOne().setText(accnum);
        log("qq号设置好了");
        id("password").findOne().setText(accpswd);
        log("设置了密码");

        log("第一次点击");
        id("open_login_btn").findOne().click();
        log("click login,login qq over");
        manMachineDetection();
        sleep(1000);
        id("open_login_btn").findOne().click();
        log("click login again, give auth to game over");
        jamPreventEnd("loginWithHDqqNormally");
    } else {
        log("其他未考虑到的情况，或者界面还未跳转成功");
    }
}

function loginDirectyly() {
    //目前直接登录几乎一定会弹出提示框;
    if (id("go").exists()) {
        jamPreventStart("loginDirctlyFirst", "no qq, first use of game", 60000);
        log("没有记录，直接登陆");

        log("直接登录，开始输入账号密码");
        id("u").findOne().setText(accnum);
        log("qq号设置好了");
        id("p").findOne().setText(accpswd);
        log("设置了密码");

        sleep(500);
        id("go").findOne().click();
        manMachineDetection();
        log("登录应该成功了");
        jamPreventEnd("loginDirctlyFirst");
    } else if (id("go2").exists()) {
        jamPreventStart("loginDirctlyNormal", "no qq, has another account logined", 60000);
        log("id go2存在，有历史记录，需要切换帐号");

        log("点切换帐号");
        id("swicth_login").findOne().click();
        log("切换帐号已点击");

        log("直接登录，开始输入账号密码");//又和上面一样了
        id("u").findOne().setText(accnum);
        log("qq号设置好了");
        id("p").findOne().setText(accpswd);
        log("设置了密码");

        id("go").findOne().click();
        manMachineDetection();
        log("登录应该成功了");
        jamPreventEnd("loginDirctlyNormal");
    } else {
        log("其他未考虑到的情况，或者界面还未跳转成功");
    }
}

function loginWithLiteqq() {
    if (id("btn_login").exists()) {
        //btn_login 存在,表示自qq下载后一直没有登陆过，该情况应该几乎不会碰到
        //这种情况下农药自己有BUG：qq登陆后会留在qq界面，不会弹回授权界面
        log("liteqq,下载后没用过.这种情况下会失败.");
        jamPreventStart("loginWithLiteqqFirst", "qq lite never logined, qqlite cannot return to game", 60000);

        id("btn_login").findOne().click();
        log("点击登录按钮后");
        text("QQ号/手机号/邮箱").findOne().setText(accnum);
        log("qq号设置好了");
        id("password").findOne().setText(accpswd);
        log("设置了密码");

        id("login").findOne().click();
        log("click login,login qq over");
        manMachineDetection();
        sleep(1000);
        jamPreventEnd("loginWithLiteqqFirst")

        //bug情况，多处理一下
        var temLg = text("登录").findOne(1000);
        if (temlg) {
            temlg.click();
        }
        log("click login again, give auth to game over");
    } else if (text("切换帐号").exists()) {//DONE
        //切换账号存在，表示有历史记录
        jamPreventStart("loginWithLiteqqNormally", "qq lite logined with other account", 60000);
        log("liteqq,拥有历史记录");
        text("切换帐号").findOne().click();
        log("点击切换帐号按钮后");
        text("添加帐号").findOne().parent().click();
        log("点击添加帐号按钮后");
        id("account").findOne().setText(accnum);
        log("qq号设置好了");
        id("password").findOne().setText(accpswd);
        log("设置了密码");

        log("第一次点击登录");
        id("open_login_btn").findOne().click();
        log("click login,login qq over");
        manMachineDetection();
        sleep(1000);
        id("open_login_btn").findOne().click();
        log("click login again, give auth to game over");
        jamPreventEnd("loginWithLiteqqNormally")
    } else {
        log("有其他未考虑到的情况");
    }
}

//根据各种条件，找到输入账号密码的界面并输入账号密码，然后点击登录，暂不考虑验证的问题
function accLogin() {

    log("Get in accLogin()");
    return new Promise(function (resolve, reject) {
        var count = 0;


        while (++count < 5) {//整体流程走5次，如果还不行则退出,登陆成功后，回弹界面会比较慢，所以多循环几次容错
            //click setText and so on
            var curLogPkgName = currentPackage();
            log("当前的登录包名为：" + curLogPkgName + "version:20");
            switch (curLogPkgName) {
                case "com.tencent.mobileqq":
                    loginWithMobileqq();
                    break;

                case "com.tencent.minihd.qq":
                    loginWithHDqq();
                    break;

                case "com.tencent.tmgp.sgame":
                    loginDirectyly();
                    break;

                case "com.tencent.qqlite":
                    loginWithLiteqq();
                    break;
            }
            sleep(2000);
            screenShotImg = captureScreen();
            if (IsLogined()) {
                return resolve("login success");
            }
            sleep(5000);
        }
        //5次失败
        reject("accLogin failed");
    })
}

function colorBlockPos(color, step) {
    var pos = images.findMultiColors(screenShotImg, color, [[0, -step, color], [step / 2, -step / 2, color],
    [step, 0, color], [step / 2, step / 2, color],
    [0, step, color], [-step / 2, step / 2, color],
    [-step, 0, color], [-step / 2, -step / 2, color]]);

    return pos;
}

function selectPlayArea() {
    log("Get in selectPlayArea()");
    return new Promise(function (resolve, reject) {
        var count = 0;
        while (++count < 4) {
            screenShotImg = captureScreen();
            var searchWidth = 7;
            while (searchWidth > 4) {
                //爆满颜色：ff3333  流畅颜色： 71fd1f   维护颜色： dcedfd
                var colorSet = ["#ff3333", "#71fd1f", "#dcedfd"];//维护是白色，白色区域太多了，容易找失败，下面的条件剔除白色
                for (var i = 0; i < 2; i++) {
                    var pos = colorBlockPos(colorSet[i], searchWidth);
                    if (pos) {

                        log("pos is " + pos.x + "," + pos.y + ", i is" + i + ", width is"
                            + searchWidth + ",color is" + images.pixel(screenShotImg, pos.x, pos.y));
                        click(pos.x, pos.y);
                        i = 4; //stop find;
                        searchWidth = 0;//stop search;
                        count = 10//stop count;
                    }
                }
                --searchWidth;
            }
            sleep(4000);
            //先找到selectarea.png,然后点击，再根据参数，滑动左侧，找到对应的区，点击（还未考虑去爆满无法进入的问题）（如果已有角色应该不存在这个问题）
            //return resolve("select area success");
        }
        log("try to find change area:" + count);
        //change area
        //最坏情况：（按照流程来说不会出现这种情况，但是作为万一）
        var findMyArea = false;
        var ClickTargetArea = false;
        if (count == 11) {
            log("get in count = 10");
            var count2 = 0;
            var mySrvImg1 = images.read("./mySrv1.png");//获得焦点的“我的服务器”图片
            var mySrvImg2 = images.read("./mySrv2.png");//未获得焦点的图片
            var targetArea1 = images.read("./targArea1.png");//目标区图片1
            var targetArea2 = images.read("./targArea2.png");//目标区图片2
            while (++count2 < 3 && !ClickTargetArea) {
                findMyArea = false;
                screenShotImg = captureScreen();

                if (!ClickTargetArea) {
                    var myTargAreaPos = images.findImage(screenShotImg, targetArea1, {threshold: 0.5});
                    if (myTargAreaPos) {
                        ClickTargetArea = true;
                        log("find ClickTargetArea1,x:" + myTargAreaPos.x + ",y:" + myTargAreaPos.y);
                        click(myTargAreaPos.x, myTargAreaPos.y);
                        sleep(1000);
                        break;
                    } else {
                        log("can not find targetArea1");
                    }
                }

                if (!ClickTargetArea) {
                    var myTargAreaPos = images.findImage(screenShotImg, targetArea2, {threshold: 0.5});
                    if (myTargAreaPos) {
                        ClickTargetArea = true;
                        log("find ClickTargetArea2,x:" + myTargAreaPos.x + ",y:" + myTargAreaPos.y);
                        click(myTargAreaPos.x, myTargAreaPos.y);
                        sleep(1000);
                        break;
                    } else {
                        log("can not find targetArea2");
                    }
                }

                if (!findMyArea) {
                    log("try to find srv1");
                    var mySrvPos = images.findImage(screenShotImg, mySrvImg1);
                    if (mySrvPos) {
                        log("find srv1,x:" + mySrvPos.x + ",y:" + mySrvPos.y);
                        findMyArea = true;
                        click(mySrvPos.x, mySrvPos.y);
                        sleep(1000);
                    }
                }
                if (!findMyArea) {
                    log("try to find srv2");
                    var mySrvPos = images.findImage(screenShotImg, mySrvImg2);
                    if (mySrvPos) {
                        log("find srv2");
                        findMyArea = true;
                        click(mySrvPos.x, mySrvPos.y);
                        sleep(1000);
                    }
                }
                //两种图片都没找到，除非手动滑到底，不然不会出现。增加各种情况的考虑，我们拉动选择条下滑10次
                if (!findMyArea) {
                    log("try to swip");
                    var height = screenShotImg.getHeight();
                    for (var cors = 0; cors < 10; cors++) {
                        swipe(50, height / 4, 50, height * 3 / 4, 500);
                    }
                }
                sleep(3000);
            }
            mySrvImg1.recycle();
            mySrvImg2.recycle();
            targetArea1.recycle();
            targetArea2.recycle();
        }
        //在当前界面点击目标区域（如果有号的区域过多，可能需要滑动，暂不考虑）

        if (ClickTargetArea) {
            resolve("select target area");
        } else {
            reject("selectPlayArea failed");
        }
    })
}

//最后一步，找到“开始游戏”按钮，并点击
//用两张不同的stargame.png，一个小一点，难找，但是点击位置更准，另一个相反
function startGame() {
    log("Get in startGame()");
    return new Promise(function (resolve, reject) {
        var count = 0;
        var clickSuccess = false;
        var startGameSamll = images.read("./startGameSmall.png");
        var startGameBig = images.read("./startGameFull.png");
        var agreeBtnImg = images.read("./agree.png");
        while (++count < 4) {
            screenShotImg = captureScreen();
            var startgamePos,agreePos;

            agreePos = images.findImage(screenShotImg, agreeBtnImg);
            if (agreePos) {
                log("ask is agree appear,x:" + agreePos.x + ",y:" + agreePos.y);
                count = 0;
                click(agreePos.x, agreePos.y);
                sleep(1000);
            }
            startgamePos = images.findImage(screenShotImg, startGameSamll);
            if (startgamePos) {
                log("find small target");
                clickSuccess = true;
                click(startgamePos.x, startgamePos.y);
                sleep(1000);
                break;
            }
            tartgamePos = images.findImage(screenShotImg, startGameBig);
            if (tartgamePos) {
                log("find big target");
                clickSuccess = true;
                click(tartgamePos.x, tartgamePos.y);
                sleep(1000);
                break;
            }
            sleep(5000);
        }
        log("recycle success222");
        startGameSamll.recycle();
        log("recycle success222");
        startGameBig.recycle();

        if (clickSuccess) {
            resolve("startGame success");
        } else {
            reject("startGame failed");
        }
    })
}



function getReadyFunc(resolve, reject) {
    log("let's go 2");

    launchApp("王者荣耀");
    sleep(3000);
    //函数有BUG，在王者荣耀界面，currentPackage()一直返回com.android.systemui,waitForPackage()会一直阻塞，还是sleep最靠谱
    //waitForPackage("com.tencent.tmgp.sgame");

    log("game started");
    screenShotImg = captureScreen();
    log("after first get cap");
    if (screenShotImg.getWidth() < screenShotImg.getHeight()) {
        log("使用参数ture申请截图后，宽高不对：width为" + screenShotImg.getWidth() + ",height为:" + screenShotImg.getHeight());
        setScreenCapture(false);
        screenShotImg = captureScreen();
        log("使用false修正后,width = " + screenShotImg.getWidth() + ", height = " + screenShotImg.getHeight());
    } else {
        log("申请截图参数正确，无需调整");
    }

    resolve();
}

function exitfunc() {
    mainThread = null;
    threads.shutDownAll();
    jamPreventMap = {};
}

function stopScript() {
    updateCancleImg.recycle();
    qqPlayImg.recycle();
    weixinPlayImg.recycle();
    logoutImg.recycle();

    w.close();
    threads.shutDownAll();
    jamPreventMap = {};
    engines.myEngine().forceStop();
}

function HostingThreadFuc() {
    //console.log("get in HostingThreadFuc");
    if (!mainThread) {
        console.log("mainThread is null, start thread");
        mainThread = threads.start(function () {
            try {
                new Promise(getReadyFunc)
                    .then(getInReadyFrame)
                    .then(accLogin)
                    //.then(selectPlayArea)
                    .then(startGame)
                    .then(function (result) {
                        log("成功：" + result);
                        stopScript();

                    })
                    .catch(function (reason) {
                        log('失败：' + reason);
                        exitfunc();
                    });
            } catch (err) {
                console.log("catch exception:" + err);
                exitfunc();
            }
        });
    } else {
        //console.log("mainThread running, sleep 1 second");
    }

}

events.observeKey();

var keyNames = {
    "KEYCODE_VOLUME_UP": "音量上键",
    "KEYCODE_VOLUME_DOWN": "音量下键",
    "KEYCODE_HOME": "Home键",
    "KEYCODE_BACK": "返回键",
    "KEYCODE_MENU": "菜单键",
    "KEYCODE_POWER": "电源键",
};

events.on("key", function(code, event){
    var keyName = getKeyName(code, event);
    if(event.getAction() == event.ACTION_DOWN){
        toastLog(keyName + "被按下");
    }else if(event.getAction() == event.ACTION_UP){
        toastLog(keyName + "弹起");
    }
});

function getKeyName(code, event){
    var keyCodeStr = event.keyCodeToString(code);
    var keyName = keyNames[keyCodeStr];
    if(!keyName){
        return keyCodeStr;
    }
    return keyName;
}

var w = floaty.rawWindow(
    <frame gravity="center" bg="#44ffcc00">
        <text id="text">悬浮文字</text>
    </frame>
);

w.setSize(-1, -1);
w.setTouchable(true);




setInterval(HostingThreadFuc, 1000);
