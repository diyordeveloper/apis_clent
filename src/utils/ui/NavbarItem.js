import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { goBack } from '../AppTor';

export default class NavbarItem extends Component {
    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                {this.props.title && <Text style={[styles.title, { color: this.props.titleColor }]}>{this.props.title}</Text>}
                {this.props.backLink && <TouchableOpacity onPress={() => goBack(this.props.backRefresh ? true : false)} style={styles.linkItem}>
                    <View style={styles.linkItem}>
                        <Image source={require('../../source/icons/icon-back.png')} resizeMode={'contain'} style={{ width: 12, height: 22 }} />
                    </View>
                </TouchableOpacity>}
                {this.props.more && <TouchableOpacity onPress={this.props.onPress} style={styles.linkItem}>
                    <View style={styles.linkItem}>
                        <Icon name="ios-more" style={{ marginTop: 4 }} size={30} color={this.props.backIconColor} />
                    </View>
                </TouchableOpacity>}
                {this.props.plus && <TouchableOpacity onPress={this.props.onPress} style={styles.linkItem}>
                    <View style={styles.linkItem}>
                        <Icon name="ios-add" style={{ marginTop: 4 }} size={34} color={this.props.backIconColor} />
                    </View>
                </TouchableOpacity>}
                {this.props.close && <TouchableOpacity onPress={this.props.onPress} style={styles.linkItem}>
                    <View style={styles.linkItem}>
                        <Icon name="ios-close" style={{ marginTop: 4 }} size={34} color={this.props.backIconColor} />
                    </View>
                </TouchableOpacity>}
                {this.props.reverse && <TouchableOpacity onPress={this.props.onPress} style={styles.linkItem}>
                    <View style={styles.linkItem}>
                        <Icon name="ios-reverse-camera" style={{ marginTop: 4 }} size={34} color={this.props.backIconColor} />
                    </View>
                </TouchableOpacity>}

                {this.props.children}
            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 44,
        minHeight: 44
    },
    linkItem: {
        minWidth: 44,
        minHeight: 44,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: '400',
        fontFamily: 'Gilroy-Regular',
        fontSize: 17,
        textAlign: 'left'

    }
});

NavbarItem.defaultProps = {
    backIconColor: '#fff',
    titleColor: '#000000'
};