import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ImageBackground, TouchableOpacity } from 'react-native';
export default class CreditCard extends Component {


    handleOnPress = () => {
        const { id, onPress } = this.props;
        onPress(id);
    }


    handleLongPress = () => {
        const { id, onLongPress } = this.props;
        onLongPress(id);
    }


    render() {
        let { children, style, active, firstNumber, lastNumber, paymentType} = this.props;
        return (
            <TouchableOpacity onLongPress={this.handleLongPress} onPress={this.handleOnPress} style={[{ position: 'relative' }, style]}>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 20,
                    marginBottom: 20
                }}>
                    <Text style={{ opacity: 0.51, fontFamily: 'Gilroy-Regular' }}>{`${paymentType} **** ${lastNumber}`}</Text>
                    <View style={{ width: 21, height: 21, justifyContent: 'center', alignItems: 'center' }}>
                        {
                            active ?
                                <Image source={require('../source/icons/checkbox-active.png')} resizeMode={'contain'} style={{ width: 24, height: 24 }} />
                                :
                                <Image source={require('../source/icons/checkbox.png')} resizeMode={'contain'} style={{ width: 21, height: 21 }} />
                        }
                    </View>
                </View>
                {/* <ImageBackground
                    source={require('../source/card.png')}
                    resizeMode={'contain'}
                    style={{ width: '100%', height: 200, marginTop: 23 }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 40 }}>
                        <Text style={styles.cardText}>{firstNumber}</Text>
                        <Text style={styles.cardText}>****</Text>
                        <Text style={styles.cardText}>****</Text>
                        <Text style={styles.cardText}>{lastNumber}</Text>
                    </View>
                </ImageBackground> */}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    cardText: {
        fontFamily: 'Gilroy-Regular',
        fontSize: 20, color: '#ffffff'
    }
})




