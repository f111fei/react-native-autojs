import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainerProps } from 'react-navigation';

class DetailScreen extends React.Component<NavigationContainerProps> {
    public render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Detail Screen</Text>
            </View>
        );
    }
}

export default DetailScreen;