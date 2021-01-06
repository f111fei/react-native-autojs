import React from 'react';
import { View, Text, TouchableWithoutFeedback, Image, ScrollView, TextInput, Dimensions, TouchableOpacity, TouchableHighlight, StatusBar } from 'react-native';
import { NavigationContainerProps, withNavigation } from 'react-navigation';

class WelcomeScreen extends React.Component<NavigationContainerProps> {

  constructor(props: Readonly<NavigationContainerProps<{}, {}, unknown>>) {
    super(props);
    this.win = Dimensions.get('window');
    this.screen = Dimensions.get('screen');
    this.state = { lastclick: 0 };
  }

  public onClickZHZ() {

    var timestamp3 = new Date().getTime();
    if (timestamp3 - this.state.lastclick < 1000) {
      //this.props.navigation?.navigate('home');
    }
    this.setState({ lastclick: timestamp3 });
  }

  public render() {

    return (
      <View style={{ flex: 1 }}>
            <Image style={{ alignItems: 'center', justifyContent: 'center', width: this.screen.width , height: this.screen.height-StatusBar.currentHeight }}
              source={require("../../images/copywel.jpg")}
              resizeMode='stretch'>
            </Image>
          </View>
    );

    /*return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignContent: 'flex-end' }}>
          <View style={{ flex: 1, alignContent: 'center' }}>
            <Image style={{ alignItems: 'center', justifyContent: 'center', width: this.win.width / 2, height: this.win.height / 2 }}
              source={require("../../images/pubg.png")}
              resizeMode='stretch'>
            </Image>
          </View>
          <View style={{ flex: 1 }}>
            <Image style={{ alignItems: 'center', justifyContent: 'center', width: this.win.width / 2, height: this.win.height / 2 }}
              source={require("../../images/wzry.png")}
              resizeMode='stretch'>
            </Image>
          </View>
        </View>

        <TouchableHighlight style={{ flex: 0.3 }} onPress={() => this.onClickZHZ()}>
          <View style={{ flex: 1, width: this.win.width, alignContent: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: '#b03020' }}>
            <Text style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center', fontSize: 60, color: '#e0d030', fontWeight: 'bold' }}>
              租     号     赚
              </Text>
          </View>
        </TouchableHighlight>

        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Image style={{ alignItems: 'center', justifyContent: 'center', width: this.win.width / 2, height: this.win.height / 2 }}
              source={require("../../images/cf.png")}
              resizeMode='stretch'>
            </Image>
          </View>

          <View style={{ flex: 1 }}>
            <Image style={{ alignItems: 'center', justifyContent: 'center', width: this.win.width / 2, height: this.win.height / 2 }}
              source={require("../../images/lol.png")}
              resizeMode='stretch'>
            </Image>
          </View>
        </View>

      </View>
    );*/

    /*return (
        <ScrollView>
          <Text>Some text</Text>
          <View>
            <Text>Some more text</Text>
            <Image source={{uri:"https://desk-fd.zol-img.com.cn/t_s960x600c5/g2/M00/03/04/ChMlWl6GuAaIa362AAYAWdBHFlkAAOCUgLYqLUABgBx733.jpg"}} style={{width: 200, height: 200}}/>
          </View>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1
            }}
            defaultValue="You can type in me"
          />
        </ScrollView>
      );*/
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.navigation.replace("autologin");
      this.timer && clearTimeout(this.timer);
    }, 3000);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
}

export default WelcomeScreen;