import React from 'react';
import { Dimensions, ImageBackground, StatusBar, StyleSheet, Text, ToastAndroid, TouchableHighlight, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
//import { View, Text } from 'react-native';
import { NavigationContainerProps } from 'react-navigation';
import autojs from '../../autojs/autojs';



const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

class AutologinScreen extends React.Component<NavigationContainerProps> {
    state = { tokenstat: "", log: "", scriptStat: "尚未运行", loginSha1: "" };

    win = Dimensions.get('window');
    scrn = Dimensions.get('screen');

    constructor(props: Readonly<NavigationContainerProps<{}, {}, unknown>>) {
        super(props);
        this.state = { tokenstat: "", log: "", scriptStat: "尚未运行", loginSha1: typeof (this.props.navigation?.state?.params?.order) == 'undefined' ? "" : this.props.navigation?.state?.params?.order };
        console.log("at construction, logsha1 is " + this.state.loginSha1);
    }

    componentDidMount() {
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setTranslucent(true);
    }

    static getDerivedStateFromProps(nextProps: NavigationContainerProps, prevState: any) {
        let tempid = nextProps.navigation?.state?.params?.order;
        if (typeof (tempid) != 'undefined' && prevState.loginSha1 != tempid) {
            return { loginSha1: tempid };
        }
        return null;
    }

    private async parseSha1(sha1: string) {
        var bDebug = false;
        var testType = 'wx';
        var result;
        try {
            const response = await fetch('http://zuhaozhuang.com/api/unified.aspx?key=e6xrW0t6K79bWlt6K79bXE&a=tokenQuery&id=' + sha1, { method: 'GET' });
            const responseJson = await response.json();
            console.log('get correct json');
            console.log(responseJson);

            if (responseJson.code != 1) {
                result = { 'errorcode': 'failed' };
                if (bDebug) {
                    if (testType == 'qq') {
                        result = {
                            'errorcode': 'OK',
                            'type': 'qq',
                            'openid': '11111111111111111',
                            'atoken': '22222222222222222',
                            'ptoken': '33333333333333333',
                        };
                    } else {
                        result = {
                            'errorcode': 'OK',
                            'type': 'wx',
                            'token': sha1,
                        };
                    }
                }
            } else {
                if (responseJson.type == 'qq') {
                    result = {
                        'errorcode': 'OK',
                        'type': responseJson.type,
                        'openid': JSON.parse(responseJson.tokendata).openid,
                        'atoken': JSON.parse(responseJson.tokendata).atoken,
                        'ptoken': JSON.parse(responseJson.tokendata).ptoken,
                    };
                } else if (responseJson.type == 'wx') {
                    result = {
                        'errorcode': 'OK',
                        'type': responseJson.type,
                        'token': JSON.parse(responseJson.tokendata).token,
                    };
                } else {
                    result = { 'errorcode': 'failed' };
                }
            }
            console.log("parseSha1 will return ", result)
            return (result);
        } catch (error) {
            console.log(`error ${error}`);
            console.log('catch exception');

            return { 'errorcode': 'failed' };
        }


    }

    private async parseQQ(sha1: string) {
        var bDebug = false;
        var testType = 'wx';
        var result;
        try {
            const response = await fetch('http://27.221.74.56:1889/Api/unified.aspx?a=qqCheckToken&key=e6xrW0t6K79bWlt6K79bXE&qq=' + sha1, { method: 'GET' });
            const responseJson = await response.json();
            console.log('get correct json');
            console.log(responseJson);

            if (responseJson.code != 1) {
                result = { 'errorcode': 'failed' };
                if (bDebug) {
                    if (testType == 'qq') {
                        result = {
                            'errorcode': 'OK',
                            'type': 'qq',
                            'openid': '11111111111111111',
                            'atoken': '22222222222222222',
                            'ptoken': '33333333333333333',
                        };
                    } else {
                        result = {
                            'errorcode': 'OK',
                            'type': 'wx',
                            'token': sha1,
                        };
                    }
                }
            } else {
                if (responseJson.type == 'qq') {
                    result = {
                        'errorcode': 'OK',
                        'type': responseJson.type,
                        'openid': JSON.parse(responseJson.tokendata).openid,
                        'atoken': JSON.parse(responseJson.tokendata).atoken,
                        'ptoken': JSON.parse(responseJson.tokendata).ptoken,
                    };
                } else if (responseJson.type == 'wx') {
                    result = {
                        'errorcode': 'OK',
                        'type': responseJson.type,
                        'token': JSON.parse(responseJson.tokendata).token,
                    };
                } else {
                    result = { 'errorcode': 'failed' };
                }
            }
            console.log("parseSha1 will return ", result)
            return (result);
        } catch (error) {
            console.log(`error ${error}`);
            console.log('catch exception');
            return { 'errorcode': 'failed' };
        }
    }

    private onGetCode(code: any) {
        if (code == "" || typeof (code) == 'undefined') {
            //ToastAndroid.show('get code failed' +code, ToastAndroid.SHORT);
        } else {
            //ToastAndroid.show("get code success ,code is " + code, ToastAndroid.SHORT);
            autojs.loginByCode(code);
        }
    };

    public async onClickStartLogin() {
        console.log('loginsha1 is[' + this.state.loginSha1 + ']');
        if (this.state.loginSha1 == "" || typeof (this.state.loginSha1) == 'undefined') {
            ToastAndroid.show('请输入解锁码', ToastAndroid.SHORT);
            return;
        }

        let result: any;
        if (this.state.loginSha1.startsWith("qq:")) {

            result = await this.parseQQ(this.state.loginSha1);
            console.log("result is " + JSON.stringify(result));

            if (result.errorcode == 'OK') {
                //ToastAndroid.show("openid:" + result.openid + ",atoken:" + result.atoken + ",ptoken" + result.ptoken, ToastAndroid.SHORT);
                if (result.type == 'qq') {
                    autojs.loginByTokens(result.openid, result.atoken, result.ptoken);
                } else if (result.type == 'wx') {
                    this.props.navigation?.navigate('getscriptstat', { onGetCode: this.onGetCode.bind(this), loginSha1: this.state.loginSha1, token: result.token });
                    return;
                }
            } else {
                ToastAndroid.show('请输入正确解锁码', ToastAndroid.SHORT);
            }
        } else {
            //await requestMultiplePermission(); //current functions not need dangerous permission.
            result = await this.parseSha1(this.state.loginSha1);
            console.log("result is " + JSON.stringify(result));

            if (result.errorcode == 'OK') {
                //ToastAndroid.show("openid:" + result.openid + ",atoken:" + result.atoken + ",ptoken" + result.ptoken, ToastAndroid.SHORT);

                if (result.type == 'qq') {
                    autojs.loginByTokens(result.openid, result.atoken, result.ptoken);
                } else if (result.type == 'wx') {
                    //autojs.loginByCode(result.code);
                    this.props.navigation?.navigate('getscriptstat', { onGetCode: this.onGetCode.bind(this), loginSha1: this.state.loginSha1, token: result.token });
                    return;
                }
            } else {
                ToastAndroid.show('请输入正确解锁码', ToastAndroid.SHORT);
            }
        }
    }

    public onClickHelp() {
        console.log("home prop is:" + JSON.stringify(this.props));
        this.props.navigation?.navigate('help');
    }

    public render() {

        return (
            <View style={{ flex: 1, alignContent: 'center' }}>
                <ImageBackground style={{ flex: 1, width: this.win.width, height: (this.scrn.height) }}
                    source={require("../../images/timg.jpg")}
                    resizeMode='stretch'>
                    <View style={{ height: StatusBar.currentHeight }}></View>
                    <Text style={{ textAlign: 'left', fontSize: 20, color: '#ffffff' }}>
                        &emsp;{'上号器v1.0.0-WX'}
                    </Text>

                    <View style={{ width: 100, height: this.win.height / 5 }}>
                    </View>

                    <View style={{ backgroundColor: '#666666', opacity: 0.8, width: this.win.width, alignItems: 'center', justifyContent: 'center', height: 80 }}>
                        <TextInput style={{ flex: 1, alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#ffffff', width: this.win.width, textAlign: "center" }}
                            placeholder={'请输入订单号'}
                            onChangeText={(sha1) => this.setState({ loginSha1: sha1 })}
                            value={this.state.loginSha1}
                        />
                    </View>

                    {/*                     <TouchableHighlight onPress={this.onClickHelp.bind(this)} activeOpacity={1} underlayColor='transparent'>
                        <Text style={{ textAlign: 'right', fontSize: 20, color: '#ffffff', textDecorationLine: 'underline' }}>
                            {'上号帮助'}
                        </Text>
                    </TouchableHighlight> */}

                    <View style={{ width: 500, height: this.win.height * 2 / 5 }}>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <TouchableHighlight activeOpacity={0.9}
                            underlayColor={'#1aaf00'}
                            style={[this.styles.touchButton]}
                            onPress={this.onClickStartLogin.bind(this)}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>登录</Text>
                        </TouchableHighlight>
                    </View>

                    <View style={{ width: 500, height: this.win.height * 1 / 8 }}>
                    </View>

                    <View style={{ alignItems: 'center' }}>

                        <Text style={{ color: 'white', textAlign: 'auto' }}>{this.state.tokenstat}</Text>

                    </View>

                </ImageBackground>
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

export default AutologinScreen;