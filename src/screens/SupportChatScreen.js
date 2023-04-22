import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  FlatList,
  Platform,
  ActivityIndicator,
  Keyboard,
  Dimensions,
} from 'react-native';
import {LoadScreen, NavbarItem, Navbar, goBack} from '../utils/AppTor';
import {PageContent, Page, openSwipeMenu} from '../utils/AppTor';
import {
  MessageBar,
  MessageRecieve,
  MessageSend,
  KeyboardAvoidingChat,
} from '../ui';
import WebView from 'react-native-webview';
import {observer, inject} from 'mobx-react/native';
import {COLORS} from '../colors';

const {width} = Dimensions.get('screen');

const HTML = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1.0">
    <title>Document</title>
    <script src="https://code-ya.jivosite.com/widget/aBql1lM3bM" async></script>
</head>

<body style="100%!important">
</body>
</html>`;

@inject('appStore')
@observer
export default class SupportChatScreen extends Component {
  state = {
    showWebView: false,
    marginBottom: 0,
  };

  JS_CODE = `
    setTimeout(() => {
        window.jivo_api.open();
        window.jivo_api.setContactInfo({
            name: '${this.props.appStore.profile.full_name}',
            email: '${this.props.appStore.profile.email}',
            phone: '${this.props.appStore.profile.phone}'
        });
        setTimeout(() => {
            let nodeLists = document.getElementsByTagName('jdiv');
            console.log(nodeLists);
            for (let item of nodeLists) {
                console.log(item.className);
                if (item.className !== '' && item.className.includes('headerBox')) {
                    item.style.display = 'none';
                }
                if (item.className !== '' && item.className.includes('body')) {
                    item.style.top = 0;
                }
                if (item.className !== '' && item.className.includes('mobileContainer')) {
                    item.style.cssText = "width:100%!important;min-width:0px!important";
                }
            }
        }, 500);
    }, 1000);
`;

  componentDidMount() {
    if (Platform.OS === 'android') {
      Keyboard.addListener('keyboardDidShow', this.onShowKeyboard);
      Keyboard.addListener('keyboardDidHide', this.onHideKeyboard);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      Keyboard.removeAllListeners('keyboardDidShow', this.onShowKeyboard);
      Keyboard.removeAllListeners('keyboardDidHide', this.onHideKeyboard);
    }
  }

  onShowKeyboard = e => {
    console.log('show', e);
    this.setState({marginBottom: e.endCoordinates.height + 50});
  };

  onHideKeyboard = e => {
    console.log('hide', e);
    this.setState({marginBottom: e.endCoordinates.height});
  };

  onLoadPage = () => {
    console.log('load!', this.JS_CODE);
    this.webRef.injectJavaScript(this.JS_CODE);
    setTimeout(() => {
      this.setState({showWebView: true});
    }, 2000);
  };

  render() {
    const {showWebView, marginBottom} = this.state;
    return (
      <Page top>
        <Navbar>
          <NavbarItem backLink />
          <NavbarItem title="Чат с поддержкой" />
        </Navbar>
        {showWebView === false && (
          <ActivityIndicator
            color={COLORS.LOADER_IOS_COLOR}
            style={{marginTop: 15}}
          />
        )}
        <WebView
          ref={node => (this.webRef = node)}
          javaScriptEnabled={true}
          source={
            Platform.OS === 'ios'
              ? {html: HTML}
              : {uri: 'https://serverway.ru/taxi-chats/'}
          }
          style={{
            flex: 1,
            opacity: showWebView === true ? 1 : 0,
            marginBottom: marginBottom,
          }}
          originWhitelist={['*']}
          onLoadEnd={this.onLoadPage}
        />
      </Page>
    );
  }
}

// renderItem = ({ item, index }) => {
//     if (item == -1)

//         return (
//             <Text style={{ color: '#B1B1B1', fontFamily: 'Gilroy-Regular', textAlign: 'center', marginVertical: 36 }}>Понедельник, 27 ноября</Text>
//         )

//     if (item == 1) {
//         return (
//             <MessageRecieve >Добрый день, чем могу помочь?</MessageRecieve>
//         )
//     }
//     if (item == 2) {
//         return (
//             <MessageSend >Добрый, сейчас опишу подробно вам проблему</MessageSend>
//         )
//     }
// }

{
  /* <View style={{ paddingHorizontal: 32, flex: 1 }}>
                        <FlatList
                            data={[2, 1, -1]}
                            renderItem={this.renderItem}
                            showsVerticalScrollIndicator={false}
                            inverted
                            style={{ flex: 1 }}
                        />
                    </View>
                    <MessageBar /> */
}
