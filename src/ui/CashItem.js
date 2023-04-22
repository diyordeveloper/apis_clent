import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ImageBackground, TouchableOpacity } from 'react-native';
export default class CashItem extends Component {

    handlePress = () => {
        const { onPress, id } = this.props;
        onPress(id);
    }

    render() {
        let { style, active } = this.props;
        return (
            <TouchableOpacity onPress={this.handlePress} style={[{ position: 'relative' }, style]}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 32
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../source/icons/icon-black-cash.png')} resizeMode={'contain'} style={{ width: 24, height: 24, marginRight: 15 }} />
                        <Text style={{ opacity: 0.51, fontSize: 15, fontFamily: 'Gilroy-Regular' }}>Наличные</Text>
                    </View>
                    <View style={{ width: 21, height: 21, justifyContent: 'center', alignItems: 'center' }}>
                        {
                            active ?
                                <Image source={require('../source/icons/checkbox-active.png')} resizeMode={'contain'} style={{ width: 24, height: 24 }} />
                                :
                                <Image source={require('../source/icons/checkbox.png')} resizeMode={'contain'} style={{ width: 21, height: 21 }} />
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

})




