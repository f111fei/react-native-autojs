import React from 'react';
//import { View, Text } from 'react-native';
import { NavigationContainerProps } from 'react-navigation';
import {
  NavigationContainer,
  useRoute,
  useNavigationState,
} from '@react-navigation/native';

import { NativeEventEmitter, NativeModules, StatusBar } from 'react-native';

import { View, ToastAndroid, BackHandler, Platform, Text, Button, Alert, StyleSheet, TouchableHighlight } from 'react-native';
import autojs from '../../autojs/autojs';
import requestMultiplePermission from '../../rnservices/QueryPermission';
import { ScrollView } from 'react-native-gesture-handler';

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
  state = { log: "", scriptStat: "尚未运行" };

  public async onClickStartLogin() {
    const password = this.props.navigation?.state?.params?.password;
    const username = this.props.navigation?.state?.params?.username;
    if (typeof (password) == "undefined" || typeof (username) == "undefined") {
      Alert.alert('账号信息错误，无法开始登陆');
    }
    await requestMultiplePermission();
    autojs.shanghao(username, password);

    /*var newlog = this.state.log;
       newlog += "\n";
       newlog += "event.eventProperty;"
       this.setState({log: newlog});*/
  }

  public async onClickStopLogin() {
    autojs.stopScript();
  }

  componentDidMount() {
    const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
    this.eventEmitter = eventEmitter.addListener('EventReminder', (event) => {
      //console.log(event.eventProperty) // "someValue"
      if (typeof (event.eventProperty) != "undefined") {
        var newlog = this.state.log;
        newlog += "\n";
        newlog += event.eventProperty;
        this.setState({ log: newlog });

      } else if (typeof (event.statProperty) != "undefined") {
        this.setState({ scriptStat: event.statProperty });
      }

    })
  }

  componentWillUnmount() {
    if (this.eventEmitter) {
      this.eventEmitter.remove(); // Removes the listener
    }
  }

  public render() {
    return (
      <View style={{ flex: 1 }}>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#210034' }}>
          <TouchableHighlight activeOpacity={0.9}
            underlayColor={'#1aaf00'}
            style={[this.styles.touchButton]}
            onPress={this.onClickStartLogin.bind(this)}>
            <Text style={this.styles.touchButtonText}>开始自动上号</Text>
          </TouchableHighlight>
        </View>

        <View style={{ flex: 9, backgroundColor: '#b0b0b0' }} >
          <ScrollView >
            <Text style={{ textAlign: 'left' }}>
              {this.state.log}
            </Text>
          </ScrollView>
        </View>

        <View style={{ flex: 1, backgroundColor: '#e0e0e0' }} >
          <View >
            <Text style={{ textAlign: 'center' }}>
              当前脚本状态：
                  </Text>
            <Text style={{ textAlign: 'center' }}>
            </Text>
            <Text style={{ textAlign: 'center' }}>
              {this.state.scriptStat}
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00aaaa' }}>
          <TouchableHighlight activeOpacity={0.9}
            underlayColor={'#1aaf00'}
            style={{
              height: 40,
              width: 100,
              borderRadius: 10,
              backgroundColor: '#fa1faa',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={this.onClickStopLogin.bind(this)}>
            <Text style={this.styles.touchButtonText}>停止上号</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }


  styles = StyleSheet.create({
    touchButton: {

      height: 40,
      width: 100,
      borderRadius: 10,
      backgroundColor: '#fa1faa',
      justifyContent: 'center',
      overflow: 'hidden',
      alignItems: 'center'
    },
    touchButtonText: {
      color: 'white',
      textAlign: 'center',
    },
    font: {
      fontSize: 28,
      fontWeight: 'bold',
    },
    font1: {
      color: '#FF7700',
    },
    font2: {
      color: '#2D9900',
    },
    flex: {
      flex: 9
    },
    container: {
      alignItems: 'flex-start',
      backgroundColor: '#b0b0b0',
    },
    viewForTextStyle: {
      height: 100,
      width: 200,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'orange'
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 26
    }
  });
}

export default DetailScreen;