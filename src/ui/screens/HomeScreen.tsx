import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainerProps } from 'react-navigation';

class HomeScreen extends React.Component<NavigationContainerProps> {

    public onClick() {
        this.props.navigation?.navigate({ routeName: 'detail' });
    }

    public render() {
        return (
            <TouchableWithoutFeedback onPress={this.onClick.bind(this)}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Home Screen</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default HomeScreen;