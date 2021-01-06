import React from 'react';
//import { View, Text } from 'react-native';
import { NavigationContainerProps } from 'react-navigation';
import {
    NavigationContainer,
    useRoute,
    useNavigationState,
} from '@react-navigation/native';

import { NativeEventEmitter, NativeModules, Image, Dimensions, ImageBackground, StatusBar } from 'react-native';

import { View, Text, Alert, StyleSheet, TouchableHighlight } from 'react-native';
import autojs from '../../autojs/autojs';
import requestMultiplePermission from '../../rnservices/QueryPermission';
import { ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';


class HelpScreen extends React.Component<NavigationContainerProps> {

    scrn = Dimensions.get('screen');

    constructor(props: Readonly<NavigationContainerProps<{}, {}, unknown>>) {
        super(props);
    }

    public onClickBack() {
        this.props.navigation?.goBack();
    }
    public render() {
        let text = '\t1.订单号的获取' +
            '\n请访问租号赚官方网站：http://http://zuhaozuan.com/或者下载租号赚app，下单获取订单号。' +
            '\n\n\t2.订单号使用方式' +
            '\n请将获取到的解锁码输入到订单号输入框中，并点击登录按钮，开始一键上号。' +
            '\n\n\t3.会员专属客服' +
            '\n如有任何问题，请联系qqXXXXXX或者微信XXXXXX并提供订单号，我们将竭诚为您服务'
        return (
            <View style={{ flex: 1, alignContent: 'center' }}>

                <View style={{ width: this.scrn.width, height: StatusBar.currentHeight, backgroundColor: '#969696' }}>

                </View>

                <View style={{ width: this.scrn.width, height: (StatusBar.currentHeight) * 1.5, backgroundColor: '#bbbbbb', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                    <TouchableHighlight onPress={this.onClickBack.bind(this)} activeOpacity={1} underlayColor='transparent' style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'left', fontSize: 30, color: '#ffffff', fontWeight: 'bold' }}>
                            {'<'}
                        </Text>
                    </TouchableHighlight>
                    <View style={{ flex: 9, backgroundColor: '#bbbbbb', height: StatusBar.currentHeight * 1.5, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'left', fontSize: 22, color: '#ffffff' }}>
                            {'上号帮助说明'}
                        </Text>
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#bbbbbb', height: StatusBar.currentHeight * 1.5}}>
                    </View>
                </View>

                <Text>
                    {text}
                </Text>

            </View>
        );
    }
}

export default HelpScreen;