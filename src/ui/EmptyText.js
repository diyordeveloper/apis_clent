import React from 'react';

import { View, Text } from 'react-native';



const EmptyText = ({ children, style }) => {
    return (
        <View style={{ padding: 20, alignItems: 'center', ...style }}>
            <Text style={{ fontFamily: 'Gilroy-Regular', fontSize: 15, color: '#a5a5a5' }}>{children}</Text>
        </View>
    )
}


export default EmptyText;