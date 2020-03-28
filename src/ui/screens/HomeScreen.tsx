import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainerProps } from 'react-navigation';

class HomeScreen extends React.Component<NavigationContainerProps> {

    public onClick() {
		//console.log("home prop is:" + JSON.stringify(this.props));
        //this.props.navigation?.navigate('detail');
    }
	
	

    public render() {
		console.log("home prop is:" + JSON.stringify(this.props));
        return (
            <TouchableWithoutFeedback onPress={this.onClick.bind(this)}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>请联系XXX获取登陆二维码</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default HomeScreen;