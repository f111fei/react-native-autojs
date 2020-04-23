import React from 'react';
//import { View, Text } from 'react-native';
import { NavigationContainerProps } from 'react-navigation';
import {
    NavigationContainer,
    useRoute,
    useNavigationState,
} from '@react-navigation/native';

import { NativeEventEmitter, NativeModules, Image, Dimensions, ImageBackground, StatusBar, AppState } from 'react-native';

import { View, ToastAndroid, BackHandler, Platform, Text, Button, Alert, StyleSheet, TouchableHighlight } from 'react-native';
import autojs from '../../autojs/autojs';
import requestMultiplePermission from '../../rnservices/QueryPermission';
import { ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { resolvePlugin } from '@babel/core';

class AutologinScreen extends React.Component<NavigationContainerProps> {
    state = { log: "", scriptStat: "尚未运行", loginSha1: "" };

    win = Dimensions.get('window');
    scrn = Dimensions.get('screen');

    constructor(props: Readonly<NavigationContainerProps<{}, {}, unknown>>) {
        super(props);
        this.state = {log: "", scriptStat: "尚未运行", loginSha1: typeof(this.props.navigation?.state?.params?.order)=='undefined' ? "" : this.props.navigation?.state?.params?.order};
        console.log("at construction, logsha1 is " + this.state.loginSha1);
    }

    componentDidMount() {
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setTranslucent(true);
    }

    /*componentDidUpdate() {
        console.log("UNSAFE_componentWillReceiveProps called " + this.props.navigation?.state?.params?.order);
        let tempid = this.props.navigation?.state?.params?.order;
        if(typeof(tempid) != 'undefined' && this.state.loginSha1 != tempid) {
            this.setState({loginSha1: tempid});
        }
    }*/

    static getDerivedStateFromProps(nextProps:NavigationContainerProps ,prevState) {
        let tempid = nextProps.navigation?.state?.params?.order;
        if(typeof(tempid) != 'undefined' && prevState.loginSha1 != tempid) {
            return {loginSha1: tempid};
        }
        return null;
    }

    private async parseSha1(sha1:string) {
        var result;
        await fetch('http://zuhaozhuang.com/api/unified.aspx?key=e6xrW0t6K79bWlt6K79bXE&a=tokenQuery&id=' + sha1, {method: 'GET'})
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('get correct json');
                console.log(responseJson);

                if(responseJson.code != 1) {
                    result = {'errorcode': 'failed'};
                } else {
                result = {'errorcode': 'OK',
                'openid': JSON.parse(responseJson.tokendata).openid,
                'atoken': JSON.parse(responseJson.tokendata).atoken,
                'ptoken': JSON.parse(responseJson.tokendata).ptoken,};
                }
            })
            .catch(e => {
                console.log(`error ${e}`);
                console.log('catch exception');
                return Promise.resolve({'errorcode': 'failed'});
            });

            return(result);
    }

    public async onClickStartLogin() {
        console.log('loginsha1 is[' + this.state.loginSha1 + ']' );
        console.log("at onClickStartLogin, order is " + this.props.navigation?.state?.params?.order);
        if (this.state.loginSha1 == "" || typeof (this.state.loginSha1) == 'undefined') {
            ToastAndroid.show('请输入解锁码', ToastAndroid.SHORT);
            return;
        }

        //await requestMultiplePermission(); //current functions not need dangerous permission.
        var result;
        await this.parseSha1(this.state.loginSha1).then(v => {result = v});
        console.log("result is " + JSON.stringify(result));

        if(result.errorcode== 'OK' ) {
            //ToastAndroid.show("openid:" + result.openid + ",atoken:" + result.atoken + ",ptoken" + result.ptoken, ToastAndroid.SHORT);
            autojs.loginByTokens(result.openid, result.atoken, result.ptoken);
        } else {
            ToastAndroid.show('请输入正确解锁码', ToastAndroid.SHORT);
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
                        &emsp;{'上号器v1.0.0'}
                    </Text>

                    <View style={{ width: 100, height: this.win.height / 5 }}>
                    </View>

                    <View style={{ backgroundColor: '#666666', opacity: 0.8, width: this.win.width, alignItems: 'center', justifyContent: 'center', height: 80 }}>
                        <TextInput style={{ flex: 1, alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#ffffff', width: this.win.width, textAlign: "center"}}
                            placeholder={'请输入游戏解锁码'}
                            onChangeText={(sha1) => this.setState({ loginSha1: sha1 })}
                            value={this.state.loginSha1}
                        />
                    </View>

                    <TouchableHighlight onPress={this.onClickHelp.bind(this)} activeOpacity={1} underlayColor='transparent'>
                        <Text style={{ textAlign: 'right', fontSize: 20, color: '#ffffff', textDecorationLine: 'underline' }}>
                            {'上号帮助'}
                        </Text>
                    </TouchableHighlight>

                    <View style={{ width: 500, height: this.win.height * 2 / 5 }}>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <TouchableHighlight activeOpacity={0.9}
                            underlayColor={'#1aaf00'}
                            style={[this.styles.touchButton]}
                            onPress={this.onClickStartLogin.bind(this)}>
                            <Text style={{color: 'white',textAlign: 'center'}}>登录</Text>
                        </TouchableHighlight>
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