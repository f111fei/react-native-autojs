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
        let text = '\t1.测试格式1' +
            '\n阿斯顿发送到发送到发送到发送到发送到发的方式；' +
            '\n\n\t2.提示：阿斯顿发就开始地方那就开始发阿斯顿发上看见地方那地方叫跨年阿斯顿发送到发送发的阿斯顿发送到。' +
            '\n阿斯顿发你家卡上的发将卡上地方那可就送来的反馈就是发送那看来大家发送看今年发送地方阿是看得见你发看见你发大水的放假扣那是地方看见你发送看了地方；' +
            '\n\n\t3.阿斯顿发送到付款那是地方卡上地方阿斯顿开发精氨酸的罚款今年发送看见你发送到发送地方阿斯顿发大发送到发送到发送地方阿斯顿发发阿多少分阿斯顿发阿斯顿发送到发发阿多少发送地方发撒地方阿斯顿发发地方阿斯顿发阿斯顿发送到发送到发发；' +
            '\n阿斯顿发送地方阿斯顿发送到发发送到发送地方阿发送到发发大水发阿斯顿发送到发啊阿斯顿发。'
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