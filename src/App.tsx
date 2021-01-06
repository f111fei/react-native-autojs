import React from 'react';
import { View, ToastAndroid, BackHandler, Platform, Text, Button, Alert, PermissionsAndroid  } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DetailScreen from './ui/screens/DetailScreen';
import HomeScreen from './ui/screens/HomeScreen';
import WelcomeScreen from './ui/screens/WelcomeScreen';
import AutologinScreen from './ui/screens/AutoLoginScreen';
import autojs from './autojs/autojs';
import HelpScreen from './ui/screens/LoginHelp';

const AppNavigator = createStackNavigator({
    home: {
        screen: HomeScreen
    },
    detail: {
        screen: DetailScreen,
		/*path: 'zuhao.com',
		parse: {
            username: id => `there, ${id}`,
            password: Number,
        },*/
    },
    welcome: {
        screen: WelcomeScreen
    },
    autologin: {
        screen: AutologinScreen,
        path: 'zhz.com',
		parse: {
            order: Number,
        },
    },
    help: {
        screen: HelpScreen,
    }
}, {
    initialRouteName: 'welcome',
    headerMode: 'none',
    headerTransparent: true
});

const NavigationContainer = createAppContainer(AppNavigator);

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
                <NavigationContainer/>
            </View>
        );
    }
}