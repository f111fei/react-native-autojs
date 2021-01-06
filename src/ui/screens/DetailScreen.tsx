import React from 'react';
//import { View, Text } from 'react-native';
import { NavigationContainerProps } from 'react-navigation';
import {
  NavigationContainer,
  useRoute,
  useNavigationState,
} from '@react-navigation/native';

import { View, ToastAndroid, BackHandler, Platform, Text, Button, Alert, StyleSheet, TouchableHighlight } from 'react-native';
import autojs from '../../autojs/autojs';
import requestMultiplePermission from '../../rnservices/QueryPermission';

async function getPlayingStat() {
    console.log("aaaaa");
    try {
      const playStat = await autojs.checkplaying();
      console.log("playStat is:" + playStat);
    } catch (e) {
      console.error(e);
    }
  }
  

class DetailScreen extends React.Component<NavigationContainerProps> {
	public async onClick() {
		const password = this.props.navigation?.state?.params?.password;
		const username = this.props.navigation?.state?.params?.username;
		if(typeof(password)=="undefined" || typeof(username)=="undefined") {
			Alert.alert('账号信息错误，无法开始登陆');
    }
    await requestMultiplePermission();
		autojs.shanghao(username, password);
	}
	
    public render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableHighlight activeOpacity={0.9}
                underlayColor={'#1aaf00'}
                style={[this.styles.touchButton]}
                onPress={this.onClick.bind(this)}>
                <Text style={this.styles.touchButtonText}>开始自动上号</Text>
              </TouchableHighlight>
            </View>
        );
    }

    styles = StyleSheet.create({
      touchButton: {
          height: 40,
          width: 100,
          borderRadius: 20,
          backgroundColor: '#fa1faa',
          justifyContent: 'center',
          overflow: 'hidden',
      },
      touchButtonText: {
          color: 'white',
          textAlign: 'center',
      }
  });
}

export default DetailScreen;