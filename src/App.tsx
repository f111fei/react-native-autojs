import React from 'react';
import { View, ToastAndroid, BackHandler, Platform, Text, Button, Alert } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DetailScreen from './ui/screens/DetailScreen';
import HomeScreen from './ui/screens/HomeScreen';
import autojs from './autojs';

const AppNavigator = createStackNavigator({
    home: {
        screen: HomeScreen,
    },
    detail: {
        screen: DetailScreen
    }
}, {
    initialRouteName: 'home',
    headerMode: 'none'
});

const NavigationContainer = createAppContainer(AppNavigator);

const onButtonPress = () => {

 
    //Alert.alert('点击了Button按钮');
    
    
    
    //autojs.run("amd.js");
    //autojs.shanghao();
    getPlayingStat();
};

async function getPlayingStat() {
    console.log("aaaaa");
    try {
      const playStat = await autojs.checkplaying();
      console.log("playStat is:" + playStat);
    } catch (e) {
      console.error(e);
    }
  }

export default class App extends React.Component {

    private lastBackPressed: number = 0;

    constructor(props: any) {
        super(props);
    }

    private onBackAndroid = () => {
        // const { dispatch, nav } = this.props;
        // if (nav.routes.length > 1) {
        //     dispatch(NavigationActions.back() as any);
        //     return true;
        // } else {
        //     if (Date.now() - this.lastBackPressed < 2000) {
        //         return false;
        //     }
        //     this.lastBackPressed = Date.now();
        //     ToastAndroid.showWithGravity('再按一次退出程序', ToastAndroid.SHORT, ToastAndroid.CENTER);
        //     return true;
        // }
    }

    public componentDidMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    

    public render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>aaa  ss</Text>
                <Button
                    title="我是按钮"
                    onPress={onButtonPress}
                    color="#841584">
                </Button>
                <NavigationContainer/>
            </View>
        );
    }
}