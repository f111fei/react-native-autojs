import React from 'react';
//import { View, Text } from 'react-native';
import { NavigationContainerProps } from 'react-navigation';
import {
    NavigationContainer,
    useRoute,
    useNavigationState,
} from '@react-navigation/native';

import { NativeEventEmitter, NativeModules, Image, Dimensions, ImageBackground, StatusBar } from 'react-native';

import { View, ToastAndroid, BackHandler, Platform, Text, Button, Alert, StyleSheet, TouchableHighlight } from 'react-native';
import autojs from '../../autojs/autojs';
import requestMultiplePermission from '../../rnservices/QueryPermission';
import { ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';

class AutologinScreen extends React.Component<NavigationContainerProps> {
    state = { log: "", scriptStat: "尚未运行", loginSha1: "" };

    win = Dimensions.get('window');
    scrn = Dimensions.get('screen');

    constructor(props: Readonly<NavigationContainerProps<{}, {}, unknown>>) {
        super(props);
    }


    componentDidMount() {
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setTranslucent(true);
    }

    private parseSha1(sha1:string) {
        if(sha1 == '6744b7d35b34bb943419086'){
            console.log("get right sha1,will return tokens.");
            return {'errorcode': 'OK',
                    'openid': '6A33DDDE887526C4DBB2A9ECEC15500F',
                    'atoken': '6F5E4BA8BF4D8525147FF04813C3B3D0',
                    'ptoken': '1E13CAFACBD9C8699E5BF20697698195'};
        } else if (sha1 == '123456') {

            return {'errorcode': 'OK',
                    'openid': '2B1F8819499A2C8C4062BB1859F3421B',
                    'atoken': '88E39ED743C9FDB422229D8B6DA4C294',
                    'ptoken': 'CBF9A17DFFEBF098273E1261C9988286'};
        } else {
            console.log("invalidate,will return null.");
            return {'errorcode': 'failed',};
        }
    }

    public onClickStartLogin() {
        console.log('loginsha1 is[' + this.state.loginSha1 + ']' );
        if (this.state.loginSha1 == "" ) {
            ToastAndroid.show('请输入解锁码', ToastAndroid.SHORT);
            return;
        }

        //await requestMultiplePermission();
        let result = this.parseSha1(this.state.loginSha1);
        if(result.errorcode== 'OK' ) {
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
                        <TextInput style={{ flex: 1, alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#ffffff' }}
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

                    <View style={{ width: 500, height: this.win.height * 3 / 5 }}>
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