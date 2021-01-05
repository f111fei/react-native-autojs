import React, { useRef } from 'react';
import { Animated, Dimensions, Image, ImageBackground, StatusBar, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
//import { View, Text } from 'react-native';
import { NavigationContainerProps } from 'react-navigation';

let msgIdx = 0
var LoginMsgsArr = new Array()
LoginMsgsArr[0] = "上号过程大约需要一分钟，请勿退出本页面"
LoginMsgsArr[1] = "若无法进入游戏，请结束游戏并从订单页面重启游戏"

const FadeInView = (props: any) => {
    const fadeAnim = useRef(new Animated.Value(0)).current
    var s = 1
    var xiaoguo = () => {
        Animated.timing(
            fadeAnim,
            {
                toValue: s,
                duration: 1000,
            }
        ).start((o) => {
            s = 1 - s
            //console.log("start over")
            if (o.finished) {
                //console.log("call xiaoguo again")
                xiaoguo()
            }
        })
    }
    React.useEffect(xiaoguo, [fadeAnim])
    return (
        <Animated.View
            style={{
                ...props.style,
                opacity: fadeAnim,
            }}
        >
            {props.children}
        </Animated.View>
    );
}

class GetScriptScreen extends React.Component<NavigationContainerProps> {
    state = { tokenstat: "获取中，初始化", loginSha1: "", token: "", progress: 0, loginNoteMsg: LoginMsgsArr[0] };

    timer: any
    win: any = Dimensions.get('window');
    scrn: any = Dimensions.get('screen');
    counter = 0;
    seconds = 0;

    constructor(props: Readonly<NavigationContainerProps<{}, {}, unknown>>) {
        super(props);
    }

    GetResult(code: any) {
        this.props.navigation?.goBack();
        this.props.navigation?.state?.params?.onGetCode(code)
    }

    private async getCodeBytoken(token: string) {
        let result: any;
        try {
            const response = await fetch('http://139.9.120.202:9528/v1/zhz/getscripstat?token=' + token, { method: 'GET' });
            result = await response.json();
            console.log('get correct json');
        } catch (error) {
            console.log(`error ${error}`);
            console.log('catch exception');
            ToastAndroid.show('服务器内部错误，请联系客服', ToastAndroid.SHORT);
            return { 'errorcode': 'failed' };
        }

        console.log(result);


        if (result.code != 0) {
            ToastAndroid.show('订单状态错误：' + result.msg + ",请联系客服", ToastAndroid.SHORT);
            this.GetResult("")
            return
        }

        if (result.code != 0 || result.data?.stat == "ScriptStat_Failed" || result.data?.stat == "ScriptStat_TimeOut") {
            ToastAndroid.show('获取失败，请联系客服', ToastAndroid.SHORT);
            this.GetResult("")
            return
        }

        var jindu = result?.data?.extra?.progress
        if (typeof (jindu) != 'undefined' && jindu != "") {
            this.setState({ tokenstat: "获取中，当前步骤：" + result?.data?.msg })
        } else {
            this.setState({ tokenstat: "正在获取中." })
        }

        var code = result?.data?.extra

        if (result.data?.stat == "ScriptStat_Success" && typeof (code) == 'string' && code != "") {
            this.setState({ tokenstat: "获取成功", progress: 100 })
            this.GetResult(code);
            return
        }
    }

    countDown() {
        this.timer = setInterval(() => {

            if (this.counter % 8 == 0) {
                msgIdx = (msgIdx + 1) % 2
                this.setState({ loginNoteMsg: LoginMsgsArr[msgIdx] })
            }

            if (this.counter % 5 == 0) {
                this.getCodeBytoken(this.state.token)
            }

            /*this.seconds += 1;
            console.log('seconds=', this.seconds);
            console.log('progress---', this.state.progress);
            if (this.seconds <= 15) {
                this.setState({
                    progress: this.seconds * 3,
                });
            }
            if (this.seconds > 15) {
                this.setState({
                    progress: 100,
                });
                //this.timer && clearInterval(this.timer);
            }*/
            this.counter = (this.counter + 1) % 40
        }, 1000);
    }

    componentDidMount() {
        this.setState({ loginSha1: this.props.navigation?.state?.params?.loginSha1, token: this.props.navigation?.state?.params?.token })
        this.countDown()
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    public render() {
        return (
            <View style={{ flex: 1, alignContent: 'center' }}>
                <View style={{ flex: 1, alignContent: 'center' }}>
                    <ImageBackground style={{ flex: 1, width: this.win.width, height: (this.scrn.height) }}
                        source={require("../../images/blackBg.png")}
                        resizeMode='stretch'>
                        <View style={{ height: StatusBar.currentHeight }}></View>

                        <Text style={{ textAlign: 'center', fontSize: 16, color: '#aaaaaa' }}>
                            &emsp;{'手游上号器'}&emsp;
                        </Text>

                        <Text style={{ textAlign: 'left', fontSize: 10, color: '#666666' }}>
                            {'提示:请勿使用第三方外挂，违者没收租金、押金、永久封号'}
                        </Text>

                        <View style={{ width: 100, height: this.win.height / 5 }}>
                        </View>

                        <Text style={{ textAlign: 'left', fontSize: 10, color: '#666666' }}>
                            {'订单号：' + this.state.loginSha1}
                        </Text>

                        <View style={{ width: 500, height: this.win.height * 2 / 5 }}>
                        </View>

                        <Text style={{ textAlign: 'left', fontSize: 10, color: '#666666' }}>
                            {'提示:请勿使用第三方外挂，违者没收租金、押金、永久封号'}
                        </Text>

                        <View style={{ width: 500, height: this.win.height * 1 / 8 }}>
                        </View>

                        <View style={{ alignItems: 'center' }}>

                        </View>

                    </ImageBackground>
                </View>

                <View style={{ overflow: "hidden", borderRadius: 20, flex: 1, alignSelf: 'center', alignItems: 'baseline', backgroundColor: 'rgba(240 , 240, 240, 1)', width: '90%', height: this.scrn.height / 8 }}>

                    <View style={{ alignItems: 'center', height: '7%' }} />

                    <Text style={{ textAlign: 'center', fontSize: 18, color: '#000000', width: '100%' }}>
                        {'正在获取数据中...'}
                    </Text>

                    <View style={{ alignItems: 'center', height: '7%' }} />

                    <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>


                        <AnimatedCircularProgress style={{ borderRadius: 60, width: 120, height: 120 }}
                            size={120}
                            fill={this.state.progress}
                            tintColor="rgba(250,50,76,0.5)"
                            rotation={0}
                            width={5}

                            backgroundColor="#e0e0e0"
                        >{
                                (fill) => (
                                    <View style={{ position: 'absolute', top: 30, left: 30, }}>
                                        <FadeInView>
                                            <Image
                                                style={{ width: 60, height: 60 }}
                                                resizeMode='stretch'
                                                source={require("../../images/lighting.png")}
                                            />
                                        </FadeInView>
                                        <View>
                                            <Text style={{ textAlign: 'center', fontSize: 10, color: '#666666' }}>
                                                {this.state.progress + '%'}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                        </AnimatedCircularProgress>
                    </View>

                    <View style={{ alignItems: 'center', height: '7%' }} />

                    <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 14, color: '#404040' }}>
                            {this.state.loginNoteMsg}
                        </Text>
                    </View>
                    
                    <View style={{ alignItems: 'center', height: '7%' }} />

                    <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 14, color: '#404040' }}>
                            {this.state.tokenstat}
                        </Text>
                    </View>

                </View>

                <View style={{ flex: 1 }} />
            </View>
        );
    }

    styles = StyleSheet.create({
        touchButton: {
            height: 40,
            width: this.win.width - 60,
            //borderRadius: 10,
            backgroundColor: '#e64650',
            justifyContent: 'center',
            overflow: 'hidden',
            alignItems: 'center'
        }
    });
}

export default GetScriptScreen;